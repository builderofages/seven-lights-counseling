export type Light = {
  n: number;
  name: string;
  latin: string;
  theme: string;
  question: string;
  body: string;
  clinical: string;
  color: string;
};

/**
 * The Seven Lights — the practice's clinical map.
 * Informed by contemplative traditions, expressed in plain psychological terms.
 * No belief system is required to use it.
 */
export const lights: Light[] = [
  {
    n: 1,
    name: "Ground",
    latin: "Safety",
    theme: "The body and its baseline",
    question: "Is it safe to be here?",
    body: "Everything begins with whether the nervous system believes the present moment is survivable. Where this light is dim, there is bracing, insomnia, startle, and an inability to rest even when nothing is wrong.",
    clinical: "Nervous-system regulation · trauma stabilisation · sleep and physiology",
    color: "#8C4A44",
  },
  {
    n: 2,
    name: "Flow",
    latin: "Feeling",
    theme: "Appetite, pleasure, aliveness",
    question: "Am I allowed to want things?",
    body: "The capacity to feel — including pleasure — without immediately managing or numbing it. Where this light is dim, feeling gets outsourced to substances, screens, work, or nothing at all.",
    clinical: "Numbing and compulsion · anhedonia · emotional literacy",
    color: "#B0703F",
  },
  {
    n: 3,
    name: "Will",
    latin: "Agency",
    theme: "Boundaries and self-worth",
    question: "Does what I want count?",
    body: "The seat of agency: choosing, refusing, and holding a limit through the discomfort that follows. Where this light is dim, there is over-functioning, collapse, or the exhausting rotation between the two.",
    clinical: "Assertiveness · boundaries · shame and self-worth",
    color: "#BE9A4E",
  },
  {
    n: 4,
    name: "Heart",
    latin: "Connection",
    theme: "Closeness, grief, compassion",
    question: "Can I be close without disappearing?",
    body: "Attachment lives here — the ability to let someone matter without losing yourself, and to grieve what has been lost rather than route around it.",
    clinical: "Attachment repair · grief work · relational patterns",
    color: "#6E8663",
  },
  {
    n: 5,
    name: "Voice",
    latin: "Expression",
    theme: "Truth and being known",
    question: "Can I say the true thing?",
    body: "The distance between what is felt and what is said. Where this light is dim, there is chronic accommodation, resentment held in the body, and the sense of never quite being seen.",
    clinical: "Communication · conflict repair · authenticity",
    color: "#4E7183",
  },
  {
    n: 6,
    name: "Insight",
    latin: "Perspective",
    theme: "Seeing clearly",
    question: "Is this story actually true?",
    body: "The capacity to observe your own mind rather than be run by it — to notice the pattern while it is happening and choose differently inside it.",
    clinical: "Cognitive restructuring · metacognition · pattern recognition",
    color: "#4B527B",
  },
  {
    n: 7,
    name: "Meaning",
    latin: "Purpose",
    theme: "What the life is for",
    question: "What is worth building?",
    body: "The largest frame: purpose, belonging, and whatever you understand to be greater than yourself. Held with curiosity, never prescribed.",
    clinical: "Existential work · values · spiritual and religious exploration",
    color: "#6D5578",
  },
];
