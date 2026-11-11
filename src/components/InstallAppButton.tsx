import { Download } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface NavigatorWithInstall extends Navigator {
  install?: () => Promise<void>;
  standalone?: boolean;
}

interface InstallAppButtonProps {
  mobileFullWidth?: boolean;
}

export const InstallAppButton: React.FC<InstallAppButtonProps> = ({ mobileFullWidth = false }) => {
  const nav = typeof navigator !== 'undefined' ? (navigator as NavigatorWithInstall) : undefined;
  const supportsWebInstall = typeof nav?.install === 'function';

  const [isStandalone, setIsStandalone] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as NavigatorWithInstall).standalone === true
    );
  });
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | undefined>(
    undefined,
  );
  const [busy, setBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const mq = window.matchMedia('(display-mode: standalone)');
    const handleDisplayChange = (e: MediaQueryListEvent) => setIsStandalone(e.matches);
    mq.addEventListener('change', handleDisplayChange);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(undefined);
      setStatusMessage('Quiet Ground was installed.');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      mq.removeEventListener('change', handleDisplayChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const canInstall = !isStandalone && (supportsWebInstall || Boolean(deferredPrompt));

  const handleInstallClick = async () => {
    if (busy || !canInstall) return;
    setBusy(true);

    try {
      if (supportsWebInstall && nav?.install) {
        // Call directly inside the click handler to preserve transient user activation
        await nav.install();
        setStatusMessage('Quiet Ground was installed or opened.');
        setIsStandalone(true);
      } else if (deferredPrompt) {
        // Clear the single-use event reference before awaiting user choice
        const promptEvent = deferredPrompt;
        setDeferredPrompt(undefined);
        await promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        setStatusMessage(
          outcome === 'accepted' ? 'Quiet Ground was installed.' : 'Installation canceled.',
        );
        if (outcome === 'accepted') {
          setIsStandalone(true);
        }
      }
    } catch (err) {
      const error = err as DOMException;
      if (error?.name === 'AbortError') {
        setStatusMessage('Installation was canceled or could not complete.');
      } else {
        setStatusMessage('Installation could not start.');
        console.error(error);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        type="button"
        hidden={!canInstall}
        aria-disabled={busy ? 'true' : undefined}
        onClick={handleInstallClick}
        className={
          mobileFullWidth
            ? 'w-full py-3 px-4 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-center border border-stone-300/60 flex items-center justify-center gap-2 cursor-pointer transition-colors aria-disabled:opacity-60'
            : 'px-3.5 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer border border-stone-200/60 aria-disabled:opacity-60'
        }
      >
        <Download aria-hidden="true" className="w-3.5 h-3.5 text-sage-700" />
        <span>Install App</span>
      </button>
      <span role="status" className="visually-hidden">
        {statusMessage}
      </span>
    </>
  );
};
