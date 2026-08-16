export type Service = {
  slug: string;
  index: string;
  title: string;
  navTitle: string;
  eyebrow: string;
  lede: string;
  body: string[];
  signals: string[];
  work: { title: string; text: string }[];
  modalities: string[];
  lights: number[];
  image: string;
  imageAlt: string;
  accent: string;
  duration: string;
};

export const services: Service[] = [
  {
    slug: "individual-therapy",
    index: "01",
    title: "Individual Psychotherapy",
    navTitle: "Individual therapy",
    eyebrow: "Weekly, one to one",
    lede: "A steady hour that belongs entirely to you — where the things you carry can be set down, examined, and understood without performance.",
    body: [
      "Most people arrive not because one thing is wrong, but because a number of things have quietly stopped working. Sleep. Focus. Patience. The sense that you recognise yourself. Individual therapy is the room where those threads get untangled at a pace that respects how long they took to form.",
      "Sessions are unhurried and collaborative. We spend the early weeks building a clear picture of your history, your nervous system, and the patterns that keep reasserting themselves. From there the work becomes specific — not endless insight, but change you can feel in an ordinary Tuesday.",
    ],
    signals: [
      "You function well on the outside and feel unreachable on the inside",
      "The same argument, the same spiral, the same three weeks — on repeat",
      "You can name what you should do and cannot make yourself do it",
      "You have done therapy before and it stayed on the surface",
    ],
    work: [
      { title: "Orientation", text: "Two to three sessions mapping history, current load, and what you actually want to be different." },
      { title: "Stabilise", text: "Skills and structure first, so the deeper work has something solid underneath it." },
      { title: "Excavate", text: "The origins — attachment, family system, trauma, the beliefs formed before you could evaluate them." },
      { title: "Integrate", text: "Practising the new response until it stops being a technique and starts being you." },
    ],
    modalities: ["Psychodynamic", "Internal Family Systems (IFS)", "ACT", "Somatic awareness"],
    lights: [1, 4, 6],
    image: "/media/svc-talk.webp",
    imageAlt: "Two handmade stoneware cups of tea on a linen cloth in low afternoon light",
    accent: "light-4",
    duration: "50 minutes · weekly",
  },
  {
    slug: "substance-use-recovery",
    index: "02",
    title: "Substance Use & Recovery",
    navTitle: "Substance use & recovery",
    eyebrow: "Addiction, compulsion, relapse",
    lede: "Addiction is rarely about the substance. It is about what the substance was solving. We work at that level — without shame, ultimatums, or a script you have to accept.",
    body: [
      "Whether you are in early sobriety, years into recovery and quietly struggling, or still deciding whether there is a problem at all, this work meets you where you actually are. There is no requirement to label yourself before you begin.",
      "We treat the substance and the architecture underneath it at the same time: the trauma it anaesthetised, the relationships built around it, the nervous system that learned it as the fastest route to relief. Recovery holds when the underlying need has somewhere else to go.",
      "Care is coordinated. Where medical detox, psychiatric prescribing, intensive outpatient, or peer fellowship would strengthen the work, we build those connections rather than duplicate them.",
    ],
    signals: [
      "The promises you make to yourself about it no longer hold",
      "You have achieved abstinence before and could not sustain it",
      "The behaviour has changed form — one thing stopped, another started",
      "People who love you have begun to organise around it",
    ],
    work: [
      { title: "Honest inventory", text: "A non-judgemental map of use, triggers, function, and risk — including what it has genuinely given you." },
      { title: "Stabilisation", text: "Relapse-prevention architecture, urge tolerance, and coordination with medical care where indicated." },
      { title: "Root work", text: "Trauma, grief, and attachment injuries that the substance has been managing on your behalf." },
      { title: "Rebuilding", text: "Identity, relationships, and a life with enough in it that recovery is worth protecting." },
    ],
    modalities: ["Motivational Interviewing", "Relapse prevention (CBT)", "Trauma-informed care", "Harm reduction"],
    lights: [1, 2, 3],
    image: "/media/svc-addiction.webp",
    imageAlt: "First light of dawn across a still lake with a single stone emerging from the mist",
    accent: "light-2",
    duration: "50 minutes · weekly or twice weekly",
  },
  {
    slug: "anxiety-depression",
    index: "03",
    title: "Anxiety & Depression",
    navTitle: "Anxiety & depression",
    eyebrow: "Mood, worry, and the flat grey",
    lede: "Anxiety and depression are not personality traits. They are states — and states can be changed once you understand what is holding them in place.",
    body: [
      "For some people this looks like a mind that will not stop scanning for threat. For others it is the absence of signal altogether: the calls unreturned, the flatness that makes everything feel slightly underwater. Frequently it is both, alternating.",
      "We work on two tracks at once. The practical track builds real relief — regulating the body, interrupting rumination, restoring sleep and movement and contact. The deeper track asks what the anxiety is protecting and what the depression is protesting, because symptoms that are only suppressed tend to return.",
    ],
    signals: [
      "Persistent worry that outpaces the actual evidence",
      "Waking at 3am with your chest already tight",
      "Things you used to enjoy now cost more energy than they return",
      "Irritability, numbness, or exhaustion that sleep does not touch",
    ],
    work: [
      { title: "Regulate", text: "Nervous-system tools that work in the moment — breath, grounding, exposure, behavioural activation." },
      { title: "Restructure", text: "Identifying and testing the thought patterns that keep the loop closed." },
      { title: "Locate", text: "The unmet need, unspoken grief, or unacceptable anger underneath the symptom." },
      { title: "Sustain", text: "Building the daily architecture — sleep, movement, connection — that makes relapse less likely." },
    ],
    modalities: ["CBT", "ACT", "Behavioural activation", "Mindfulness-based approaches"],
    lights: [3, 5, 6],
    image: "/media/svc-anxiety.webp",
    imageAlt: "Morning fog dissolving between trees as light begins to penetrate the woodland",
    accent: "light-5",
    duration: "50 minutes · weekly",
  },
  {
    slug: "complex-trauma-ptsd",
    index: "04",
    title: "Complex Trauma, PTSD & C-PTSD",
    navTitle: "Complex trauma & PTSD",
    eyebrow: "Single-incident and developmental",
    lede: "Trauma is not the event. It is what the nervous system had to become in order to survive it — and it is treatable.",
    body: [
      "Single-incident trauma tends to announce itself: intrusive memory, hypervigilance, avoidance of anything adjacent to what happened. Complex trauma is quieter and older. It comes from environments that were unsafe or unpredictable over long stretches of time, often in childhood, often at the hands of people who were also sources of love.",
      "The result is rarely one clean symptom. It is a way of moving through the world — braced, apologetic, over-responsible, unable to rest, certain that closeness precedes harm.",
      "This work is paced deliberately. We do not open anything the system cannot yet hold. Stabilisation comes first and is never rushed; processing follows only when there is enough internal ground to stand on. Nothing about the pace is decided without you.",
    ],
    signals: [
      "Startle, hypervigilance, or a body that will not stand down",
      "Losing time, going blank, or watching yourself from outside",
      "A pervasive sense of being fundamentally defective rather than hurt",
      "Relationships that feel like either engulfment or abandonment",
    ],
    work: [
      { title: "Safety first", text: "Resourcing, grounding, and window-of-tolerance work before any processing begins." },
      { title: "Parts work", text: "Meeting the protective strategies that formed early — not to remove them, but to relieve them." },
      { title: "Processing", text: "Working through traumatic material at a titrated pace, with somatic tracking throughout." },
      { title: "Reconsolidation", text: "Restoring a coherent narrative and a body that can register present-day safety." },
    ],
    modalities: ["Internal Family Systems (IFS)", "Somatic Experiencing principles", "Phase-based trauma treatment", "Attachment-focused work"],
    lights: [1, 4, 7],
    image: "/media/svc-trauma.webp",
    imageAlt: "A broken river stone rejoined with fine gold seams in the kintsugi tradition",
    accent: "light-1",
    duration: "50 or 80 minutes · weekly",
  },
  {
    slug: "adult-relationships",
    index: "05",
    title: "Adult Relationship Difficulties",
    navTitle: "Adult relationships",
    eyebrow: "Partnership, family, friendship, work",
    lede: "You can understand your patterns perfectly and still repeat them. Relationship work is where understanding finally becomes different behaviour.",
    body: [
      "Individual work on relationships is often more useful than people expect. You are the one common variable across every relationship you have ever had — which means the leverage sits with you, whether or not the other person ever changes.",
      "We look at what you are drawn to and why, what you tolerate and why, how conflict goes in your body before it goes out of your mouth, and what a boundary would cost you to hold. This includes relationships with partners, parents, adult children, friends, and colleagues.",
    ],
    signals: [
      "Different people, the same ending",
      "You over-function until you resent it, then withdraw entirely",
      "Conflict becomes catastrophic, or is avoided until it becomes catastrophic",
      "You are more fluent in other people's needs than your own",
    ],
    work: [
      { title: "Pattern mapping", text: "Tracing the recurring shape across relationships and locating where it was learned." },
      { title: "Regulation in conflict", text: "Staying present and legible when your body wants to fight, freeze, or leave." },
      { title: "Boundaries", text: "Building the capacity to hold a limit through the discomfort that follows it." },
      { title: "Repair", text: "Learning to rupture and reconnect — the actual skill underneath durable closeness." },
    ],
    modalities: ["Attachment theory", "Emotionally Focused principles", "Systems perspective", "Assertiveness training"],
    lights: [4, 5],
    image: "/media/svc-relationships.webp",
    imageAlt: "Two smooth river stones resting against each other on dark wet sand",
    accent: "light-4",
    duration: "50 minutes · weekly",
  },
  {
    slug: "attachment-codependency",
    index: "06",
    title: "Attachment Wounds & Codependency",
    navTitle: "Attachment & codependency",
    eyebrow: "Early blueprints, adult consequences",
    lede: "Your first relationships taught you what closeness costs. That lesson is still running — and it can be rewritten.",
    body: [
      "Attachment style is not a personality quiz result. It is a survival strategy formed in a specific environment, and it remains sensible in that environment long after you have left it. Anxious pursuit, avoidant distance, and the exhausting oscillation between them are all intelligent adaptations to early conditions.",
      "Codependency sits close by: the habit of managing other people's states to secure your own safety, until you can no longer locate where they end and you begin. It reads as generosity from the outside and feels like disappearing from the inside.",
      "This work is slower and more relational than most. The therapeutic relationship itself becomes the practice ground — a place to experience consistency, rupture, and repair with someone who is not going anywhere.",
    ],
    signals: [
      "Your sense of okay-ness rises and falls with someone else's mood",
      "You cannot rest until everyone around you is settled",
      "Saying no produces guilt out of all proportion to the request",
      "You lose your preferences, opinions, or plans inside a relationship",
    ],
    work: [
      { title: "Origin", text: "Understanding the environment that made the strategy necessary — without blame or excuse." },
      { title: "Differentiation", text: "Rebuilding the line between your emotional state and everyone else's." },
      { title: "Tolerating disapproval", text: "Practising the exact discomfort that has always triggered collapse or over-giving." },
      { title: "Earned security", text: "Consolidating a self that stays intact inside closeness." },
    ],
    modalities: ["Attachment-based therapy", "IFS", "Psychodynamic", "Boundary and assertiveness work"],
    lights: [1, 3, 4],
    image: "/media/svc-attachment.webp",
    imageAlt: "A hand-twisted natural fibre cord lying in a loosening knot on bone linen",
    accent: "light-7",
    duration: "50 minutes · weekly",
  },
  {
    slug: "stress-burnout",
    index: "07",
    title: "Stress & Burnout",
    navTitle: "Stress & burnout",
    eyebrow: "Capacity, load, and recovery",
    lede: "Burnout is not weakness under load. It is what happens when demand stays high and recovery never arrives.",
    body: [
      "High-functioning people are often the last to seek help for this, because the evidence of competence keeps arriving. The work still gets done. The tell is internal: cynicism where there used to be care, exhaustion that a weekend does not touch, and a growing distance from the parts of your life you chose.",
      "We treat this as a physiological problem with a psychological driver. The body needs genuine recovery installed into the week. The mind needs to examine why rest has felt unavailable — the identity built on capability, the guilt attached to slowing down, the fear of what stillness might surface.",
    ],
    signals: [
      "Sunday evening arrives with a specific kind of dread",
      "Recovery time exists on the calendar and does not restore anything",
      "Cynicism or detachment toward work and people you used to care about",
      "Physical symptoms with no clear medical explanation",
    ],
    work: [
      { title: "Load audit", text: "An honest accounting of demand, recovery, and the gap between them." },
      { title: "Physiology", text: "Sleep, movement, and nervous-system recovery built in as non-negotiable structure." },
      { title: "The driver", text: "The beliefs about worth and productivity that make rest feel like a risk." },
      { title: "Sustainable design", text: "Boundaries and rhythms that hold once therapy ends." },
    ],
    modalities: ["ACT", "Behavioural design", "Mindfulness-based stress reduction", "Values clarification"],
    lights: [1, 3, 6],
    image: "/media/svc-stress.webp",
    imageAlt: "A single concentric ripple expanding across still dark water in a stone basin",
    accent: "light-3",
    duration: "50 minutes · weekly or fortnightly",
  },
  {
    slug: "spiritual-exploration",
    index: "08",
    title: "Spiritual & Religious Exploration",
    navTitle: "Spiritual exploration",
    eyebrow: "Meaning, belief, belonging",
    lede: "Whatever you believe or no longer believe, the questions underneath it belong in therapy — held with curiosity rather than an agenda.",
    body: [
      "This is not religious counselling and it is not an argument against faith. It is space for a category of question that most clinical settings quietly avoid: what your life is for, what happens when a framework you were raised inside stops holding, and how to grieve a community you can no longer belong to honestly.",
      "People come here after leaving a tradition, after returning to one, after a loss that rearranged their sense of meaning, or after an experience they have no vocabulary for. Devout, deconstructing, secular, and undecided are all equally welcome. The therapist's beliefs stay out of the room.",
    ],
    signals: [
      "You are leaving, or have left, a faith community and cannot name the loss",
      "Grief has raised questions your existing framework does not answer",
      "Practices that once sustained you have gone hollow",
      "You want a spiritual life and are wary of what came with the last one",
    ],
    work: [
      { title: "Non-imposition", text: "Establishing plainly that your beliefs lead and the therapist's stay out of it." },
      { title: "Deconstruction & grief", text: "Naming what was lost — community, certainty, identity — and letting it be grieved." },
      { title: "Discernment", text: "Separating genuine conviction from inherited obligation and from fear." },
      { title: "Reconstruction", text: "Building a framework of meaning you have actually chosen." },
    ],
    modalities: ["Existential therapy", "Meaning-centred approaches", "Religious trauma-informed care", "Narrative therapy"],
    lights: [6, 7],
    image: "/media/svc-spiritual.webp",
    imageAlt: "Light descending through a tall cathedral-like canopy of ancient trees",
    accent: "light-6",
    duration: "50 minutes · weekly or fortnightly",
  },
  {
    slug: "psychedelic-integration",
    index: "09",
    title: "Psychedelic Integration",
    navTitle: "Psychedelic integration",
    eyebrow: "Preparation and integration support",
    lede: "An experience can open something. Integration is the work of making that opening durable — and it is where most of the lasting change actually happens.",
    body: [
      "Integration therapy supports people who have had, or are preparing for, a significant non-ordinary experience — whether within a legal clinical protocol, an approved research setting, or a ceremonial context. The purpose is to translate insight into changed living.",
      "Preparation sessions clarify intention, screen for risk, and build the internal resources needed to meet difficult material. Integration sessions follow: making meaning of what surfaced, metabolising anything destabilising, and converting realisation into concrete behavioural change before it fades.",
      "This is a harm-reduction and meaning-making service delivered inside standard clinical practice. Seven Lights does not provide, administer, source, supply, or direct the use of any controlled substance, and does not advise on obtaining one. Care is coordinated with your prescriber and medical providers.",
    ],
    signals: [
      "An experience surfaced material you have no framework for",
      "The insight was profound and six weeks later nothing had changed",
      "You are preparing for a clinical or research protocol and want proper groundwork",
      "Something destabilising happened and you need clinical support to metabolise it",
    ],
    work: [
      { title: "Screening", text: "Honest assessment of psychiatric risk, medication interaction, and suitability, with medical referral where indicated." },
      { title: "Preparation", text: "Intention, expectation, internal resourcing, and a plan for meeting difficulty." },
      { title: "Integration", text: "Meaning-making, somatic processing, and stabilisation in the weeks that follow." },
      { title: "Translation", text: "Turning insight into specific, sustained changes in how you actually live." },
    ],
    modalities: ["Integration-focused psychotherapy", "IFS", "Somatic processing", "Harm reduction"],
    lights: [2, 6, 7],
    image: "/media/svc-spiritual.webp",
    imageAlt: "Light descending through a tall canopy of ancient trees",
    accent: "light-7",
    duration: "50 or 80 minutes · as needed",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Ambient motion loop that heads each service page. */
export const serviceVideo: Record<string, string> = {
  "individual-therapy": "/media/svc-talk.mp4",
  "substance-use-recovery": "/media/svc-addiction.mp4",
  "anxiety-depression": "/media/svc-anxiety.mp4",
  "complex-trauma-ptsd": "/media/svc-trauma.mp4",
  "adult-relationships": "/media/svc-relationships.mp4",
  "attachment-codependency": "/media/svc-attachment.mp4",
  "stress-burnout": "/media/svc-stress.mp4",
  "spiritual-exploration": "/media/svc-spiritual.mp4",
  "psychedelic-integration": "/media/prism.mp4",
};
