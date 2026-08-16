export type Faq = { q: string; a: string; group: string };

export const faqs: Faq[] = [
  {
    group: "Getting started",
    q: "I have never been to therapy. What actually happens in the first session?",
    a: "You talk and Kerry asks questions. There is no couch, no silence you are expected to fill, and no requirement to start at the beginning. Most of the first fifty minutes is spent building a picture: what is happening now, what has happened before, and what you would like to be different. You will not be asked to disclose anything you are not ready to disclose, and saying 'not yet' is always an acceptable answer.",
  },
  {
    group: "Getting started",
    q: "How do I know if I need therapy or if I am just having a hard time?",
    a: "There is no severity threshold you have to clear. A useful test is duration and cost: if something has persisted for more than a few weeks and is taking a measurable toll on your sleep, work, relationships, or sense of self, therapy is a reasonable response. The free consultation exists precisely so you can ask this question of a clinician instead of yourself.",
  },
  {
    group: "Getting started",
    q: "How long does therapy take?",
    a: "It depends on what you are treating. Focused work on a specific problem — a phobia, a discrete stressor, a skills gap — often runs eight to sixteen sessions. Complex trauma and long-standing attachment patterns take considerably longer, usually a year or more. Kerry will give you an honest estimate after the first two or three sessions, and the work is formally reviewed every six to eight weeks so it never drifts.",
  },
  {
    group: "Fees & insurance",
    q: "Do you take insurance?",
    a: "Seven Lights is an out-of-network practice. This keeps your record private, keeps session length and treatment decisions clinical rather than administrative, and means no diagnosis has to be filed with an insurer to justify care. A superbill is provided monthly, which many PPO plans reimburse at 50–80% once your out-of-network deductible is met.",
  },
  {
    group: "Fees & insurance",
    q: "How do I find out what my plan will reimburse?",
    a: "Call the member number on your card and ask three questions: do I have out-of-network outpatient mental health benefits; what is my out-of-network deductible and how much of it have I met; and what percentage of CPT code 90837 do you reimburse at the allowed amount. Those three answers give you your real cost. There is a printable script on the Rates page.",
  },
  {
    group: "Fees & insurance",
    q: "Is there a sliding scale?",
    a: "A limited number of reduced-fee places are held at any given time and are prioritised for people for whom the standard fee is a genuine barrier to care. Ask on the consultation call — it is a normal question and it will not affect how you are treated.",
  },
  {
    group: "How we work",
    q: "Is this a religious or spiritual practice?",
    a: "No. The Seven Lights framework borrows structure from contemplative traditions, but it is used here in plain psychological terms and requires no belief of any kind. Devout, deconstructing, secular, and undecided clients are equally welcome, and the therapist's own beliefs stay out of the room. If you want to explore spiritual questions, there is space for it. If you do not, it will never come up.",
  },
  {
    group: "How we work",
    q: "Do I have to stop drinking or using before I start?",
    a: "No. Abstinence is not a precondition for being seen. Where use is at a level that carries medical risk, Kerry will be direct with you about that and will help coordinate appropriate medical support — but the door is not closed until you have solved the thing you are coming for help with.",
  },
  {
    group: "How we work",
    q: "What is psychedelic integration, and is it legal?",
    a: "Integration is standard psychotherapy that helps a person make durable meaning and behavioural change out of a significant non-ordinary experience, and preparation work that reduces the risk of harm beforehand. Seven Lights does not provide, administer, source, supply, or advise on obtaining any controlled substance. It is a harm-reduction and meaning-making service delivered inside ordinary clinical practice, coordinated with your medical providers.",
  },
  {
    group: "Practical",
    q: "In person or online?",
    a: "Both. In-person sessions are held in Annapolis; telehealth is available anywhere in the state of Maryland via a HIPAA-compliant platform. Many clients mix the two. Outcome research finds no meaningful difference in effectiveness for most presentations.",
  },
  {
    group: "Practical",
    q: "Is what I say confidential?",
    a: "Yes, with the narrow legal exceptions every clinician carries: imminent risk of serious harm to yourself or another person, suspected abuse or neglect of a child or vulnerable adult, and a valid court order. These are explained in full at the first session before anything else. Records are kept encrypted and are not shared with an insurer.",
  },
  {
    group: "Practical",
    q: "What if it is not the right fit?",
    a: "Say so. Fit is the single strongest predictor of whether therapy works, and it is not a judgement of either person. Kerry will help you find someone better suited and will make the referral properly rather than handing you a list.",
  },
];

export const faqGroups = [...new Set(faqs.map((f) => f.group))];
