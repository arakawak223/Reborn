import type { Dictionary } from "./ja";

const en: Dictionary = {
  // Metadata
  meta: {
    title: "RE:BORN \u2014 The Comeback Athlete Archive \u2014 Soul Collection",
    description:
      "Stories of athletes who overcame devastating injuries and made remarkable comebacks, presented in an interactive archive format.",
  },

  // Header
  header: {
    subtitle: "The Comeback Athlete Archive",
    athletes: "Athletes",
    explore: "Explore",
  },

  // Footer
  footer: {
    subtitle: "The Comeback Athlete Archive",
    description:
      "Stories of athletes who overcame devastating injuries and made remarkable comebacks",
  },

  // Home page
  home: {
    tagline: "The Comeback Athlete Archive",
    subtitle: "Soul Collection",
    heroLine1: "Beyond the resolve, the true self awaits.",
    heroLine2:
      "Their way of life shakes the soul and moves the heart.",
    heroLine3:
      "Broken bodies, spirits on the verge of collapse\u2014yet they rose again.",
    heroLine4:
      "May the words and stories gathered here reach something deep within you.",
    nationality: "Nationality",
    birthplace: "Birthplace",
    sport: "Sport",
    birthDate: "Born",
    age: "y/o",
    achievements: "Achievements",
    injuryDetail: "Injury Details",
    readStory: "Read this story \u2192",
    takeQuiz: "Take Quiz \u2192",
  },

  // Athletes list page
  athletesList: {
    title: "Athletes",
    subtitle: "Featured Athletes",
  },

  // Athlete layout
  athleteLayout: {
    backToTop: "\u2190 Back to Archive",
    profile: "Profile",
    story: "Story",
    injuryMap: "Injury Map",
    quiz: "Quiz",
  },

  // Athlete profile page
  profile: {
    basicInfo: "Basic Info",
    nationality: "Nationality",
    birthplace: "Birthplace",
    birthDateAge: "Born / Age",
    family: "Family",
    achievements: "Achievements",
    injuryDetail: "Injury Details",
    injuryNarrate: "Read injury info aloud",
    goldenQuotes: "Golden Quotes",
    testimonies: "Testimonies",
    year: "",
    recoveryMonths: "{n} months recovery",
  },

  // Story page
  story: {
    title: "The Comeback Story",
    subtitle: "The comeback of {name}, told in 5 chapters",
    narrateAll: "Read all chapters aloud",
    narrateChapter: "Read this chapter aloud",
    fullNarrationPrefix: "The comeback story of {name}.",
    stageOrigin: "Origin",
    stageDespair: "Despair",
    stageVoid: "The Void",
    stageAwakening: "Awakening",
    stageRebirth: "Rebirth",
  },

  // Injury page
  injury: {
    title: "Injury Map",
    description:
      "View injury locations and severity on the human body. Click markers or cards for details.",
    loading: "Loading...",
    noData: "No injury data available",
    musculoskeletal: "Musculoskeletal",
    organs: "Organs",
    injuryList: "Injuries ({n})",
    severe: "Severe",
    moderate: "Moderate",
    mild: "Mild",
    primary: "Primary",
    year: "",
    recovery: "{n} months recovery",
    anatomyAlt: "Human anatomy ({view})",
  },

  // Quiz page
  quiz: {
    coffeeBreak: "Coffee Break Quiz",
    serious: "Deep Analysis Quiz",
    noData: "No quiz data available",
    correct: "correct",
    perfectMessage: "You have a deep understanding of {name}'s comeback story!",
    retryMessage: "Read the story again and try once more.",
    retry: "Try Again",
    explanation: "Explanation",
    next: "Next Question",
    showResults: "See Results",
  },

  // Explore page
  explore: {
    title: "Explore",
    description:
      "Search for athletes who overcame similar challenges by injury location or type",
    bodyRegion: "Injury Location",
    headNeck: "Head & Neck",
    upperBody: "Upper Body",
    lowerBody: "Lower Body",
    injuryType: "Injury Type",
    fracture: "Fracture",
    tear: "Tear",
    rupture: "Rupture",
    sprain: "Sprain",
    other: "Other",
    search: "Search",
    noResults: "No athletes found matching the criteria",
    resultCount: "{n} results",
  },

  // TextToSpeech
  tts: {
    readAloud: "Read Aloud",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    speaking: "Speaking",
    loading: "Preparing audio...",
  },

  // BackButton
  back: {
    label: "\u2190 Go Back",
  },

  // BgmProvider
  bgm: {
    on: "Turn BGM On",
    off: "Turn BGM Off",
  },

  // Loading
  loading: "Loading...",

  // Body region labels
  bodyRegions: {
    head: "Head",
    neck: "Neck",
    shoulder_left: "Left Shoulder",
    shoulder_right: "Right Shoulder",
    upper_arm_left: "Left Upper Arm",
    upper_arm_right: "Right Upper Arm",
    elbow_left: "Left Elbow",
    elbow_right: "Right Elbow",
    forearm_left: "Left Forearm",
    forearm_right: "Right Forearm",
    wrist_left: "Left Wrist",
    wrist_right: "Right Wrist",
    hand_left: "Left Hand",
    hand_right: "Right Hand",
    chest: "Chest",
    ribcage: "Ribcage",
    upper_back: "Upper Back",
    lower_back: "Lower Back",
    abdomen: "Abdomen",
    spine: "Spine",
    pelvis: "Pelvis",
    hip_left: "Left Hip",
    hip_right: "Right Hip",
    thigh_left: "Left Thigh",
    thigh_right: "Right Thigh",
    knee_left: "Left Knee",
    knee_right: "Right Knee",
    shin_left: "Left Shin",
    shin_right: "Right Shin",
    calf_left: "Left Calf",
    calf_right: "Right Calf",
    ankle_left: "Left Ankle",
    ankle_right: "Right Ankle",
    foot_left: "Left Foot",
    foot_right: "Right Foot",
    jaw: "Jaw",
    eye_left: "Left Eye",
    eye_right: "Right Eye",
  },
} as const;

export default en;
