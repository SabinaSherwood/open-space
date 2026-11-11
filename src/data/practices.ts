import type { BreathPattern, PracticeStage } from '../types';

export const DAILY_INTENTIONS: string[] = [
  'You are allowed to take up space.',
  'Your body is doing its best to support you.',
  'It is okay to rest right now.',
  'You can go at your own pace.',
  'There is no rush to heal.',
  'Your feelings are valid, even if they are confusing.',
  'You are safe in this moment.',
  'You have survived all of your hardest days.',
  'It is okay to put down what you are carrying for a little while.',
];

export const PRACTICE_STAGES: PracticeStage[] = [
  {
    id: 'stage-1',
    stageNumber: 1,
    title: 'Establishing Ground & Somatic Ease',
    subtitle: 'Settling into bodily presence with gentleness and choice',
    durationMinutes: 5,
    description:
      'A gentle invitation to allow the physical body to settle naturally. Step away from rigid alignment commands and discover an organic, comfortable posture that honors your nervous system in this moment.',
    guidanceText: [
      'You are invited to let your eyes rest softly—either gently closed or resting open with an unhurried, soft focus.',
      'Notice the quiet feeling of contact where your body meets the earth, chair, or cushion. Allow yourself to feel supported.',
      'Scanning softly from crown down through forehead, jaw, shoulders, and chest—inviting any tension to soften without force.',
      'There is nothing to fix, achieve, or perform. Simply allow gravity to hold your weight.',
    ],
    inquiryPrompts: [
      'Where in your body do you feel a quiet sense of support or grounding right now?',
      'If it feels safe, can you allow your shoulders to drop half an inch?',
    ],
    invitation:
      'You remain the authority over your practice. Feel free to shift position, stretch, or open your eyes whenever you wish.',
    ambientFreqHz: 174,
  },
  {
    id: 'stage-2',
    stageNumber: 2,
    title: 'Quiet Observation of the Mind Field',
    subtitle: 'Observing mental activity like weather passing across open sky',
    durationMinutes: 7,
    description:
      'In the Indo-Tibetan Mahamudra tradition, practice moves from trying to control thoughts to resting as an unhurried observer. Thoughts, sensations, and ambient sounds arise, display their nature, and dissolve back into space.',
    guidanceText: [
      'Bring a soft, relaxed awareness to the natural rhythm of your breathing, wherever it feels most accessible.',
      'As thoughts, memories, or sensations arise, notice them without chasing them or pushing them away.',
      'Imagine your awareness is like a vast sky, and thoughts are like passing mountain clouds. The sky remains untouched by any weather.',
      'Whenever you notice you have entered a story, gently acknowledge it with kindness and return to spacious presence.',
    ],
    inquiryPrompts: [
      'Can you notice a thought arising without needing to solve or categorize it?',
      'Where does a thought go when its energy subsides?',
    ],
    invitation:
      'You do not need to force a quiet mind. Whatever appears is welcome to exist in this open context.',
    ambientFreqHz: 285,
  },
  {
    id: 'stage-3',
    stageNumber: 3,
    title: 'Recognizing the Space of Awareness',
    subtitle: 'Turning attention back to notice the knowing presence itself',
    durationMinutes: 8,
    description:
      'A central shift in Mahamudra practice as synthesized by Dr. Daniel P. Brown: moving focus from the objects of awareness (thoughts, sounds, feelings) to recognizing the open, aware nature holding them all.',
    guidanceText: [
      'Pause for a moment and softly ask yourself: "What is aware of these sounds, thoughts, and sensations right now?"',
      'Notice that awareness itself has no physical edge, no weight, and no shape, yet it is vividly present, clear, and open.',
      'Rest in this gentle, uncontrived knowing. It is boundlessly spacious, calm, and naturally luminous.',
      'You are not creating awareness; you are simply recognizing what has been quietly present all along.',
    ],
    inquiryPrompts: [
      'Does awareness itself have a boundary or a center?',
      'How does it feel to rest in the spacious presence that receives all experience?',
    ],
    invitation:
      'If this inquiry feels abstract, simply return to the gentle feeling of your natural breath resting in open space.',
    ambientFreqHz: 432,
  },
  {
    id: 'stage-4',
    stageNumber: 4,
    title: 'Abiding in Uncontrived Natural Rest',
    subtitle: 'Releasing technique and resting in non-dual presence',
    durationMinutes: 10,
    description:
      'Surrendering all effortful meditation techniques. Stepping into non-interfering, effortless presence where everything is allowed to be exactly as it is (Tibetan: rigpa / uncontrived rest).',
    guidanceText: [
      'Release even the subtle effort of watching the breath or observing mind-states.',
      'Let your awareness rest completely uncontrived—like clear mountain water settling in a quiet basin.',
      'No striving, no searching, no attempt to attain a special state or insight.',
      'Just this: spacious, unconstructed, effortless presence.',
    ],
    inquiryPrompts: [
      'What remains when all effort to manage or control this moment is surrendered?',
      'Can you allow yourself to just be, exactly as you are right now?',
    ],
    invitation:
      'Rest in this open expanse for as long as feels nourishing to your nervous system.',
    ambientFreqHz: 528,
  },
  {
    id: 'stage-5',
    stageNumber: 5,
    title: 'Seamless Everyday Integration',
    subtitle: 'Carrying open awareness into movement, relationship, and action',
    durationMinutes: 5,
    description:
      'Bridging formal contemplative rest with active living. Recognizing that open space is not separate from daily conversation, creative work, or ordinary movement.',
    guidanceText: [
      'Slowly bring subtle movement back into your fingers, toes, and neck.',
      'Gently open your eyes, taking in colors, light, and shapes in your room without immediately labeling or categorizing them.',
      'Notice that the open space of awareness remains present even as you look around and prepare to move.',
      'Carry this soft, wide-angle right-hemisphere perspective into your next activity today.',
    ],
    inquiryPrompts: [
      'How might you invite this open spaciousness into your next interaction or task today?',
      'What changes when you view your environment as a living, interconnected whole?',
    ],
    invitation: 'Thank yourself for offering your body and mind this spacious time.',
    ambientFreqHz: 639,
  },
];

export const BREATH_PATTERNS: BreathPattern[] = [
  {
    id: 'relaxing',
    name: 'Restorative Unwinding (4 - 7 - 8)',
    description:
      'A classic vagal regulation cycle: 4s gentle inhale, 7s spacious hold in still awareness, 8s soft dissolving exhale to ease tension.',
    inhaleSec: 4,
    holdInSec: 7,
    exhaleSec: 8,
    holdOutSec: 0,
  },
  {
    id: 'gentle',
    name: 'Gentle Flow (4 - 6)',
    description:
      'Elongates the exhale softly to soothe the sympathetic nervous system and settle racing thoughts.',
    inhaleSec: 4,
    holdInSec: 0,
    exhaleSec: 6,
    holdOutSec: 0,
  },
  {
    id: 'box',
    name: 'Equal Grounding Box (4 - 4 - 4 - 4)',
    description:
      'Equally balanced rhythm across all phases to foster centered focus and somatic stabilization.',
    inhaleSec: 4,
    holdInSec: 4,
    exhaleSec: 4,
    holdOutSec: 4,
  },
];
