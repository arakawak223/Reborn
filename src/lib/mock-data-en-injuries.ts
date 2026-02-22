import type { InjuryRecord, QuizQuestion, BodyCoord } from "./mock-data";
import { athletes } from "./mock-data";

// ===== Athlete Injuries (English) =====
export const athleteInjuries: InjuryRecord[] = [
  // McMorris
  { id: "inj-001", athlete_id: "mcmorris", body_region: "chest", injury_type: "rupture", diagnosis: "Lung rupture", severity: 10, recovery_months: 9, year_occurred: 2017, description: "Crashed into a tree and ruptured his lung", is_primary: true },
  { id: "inj-002", athlete_id: "mcmorris", body_region: "abdomen", injury_type: "rupture", diagnosis: "Spleen rupture", severity: 10, recovery_months: 9, year_occurred: 2017, description: "Emergency surgery for ruptured internal organs", is_primary: true },
  { id: "inj-003", athlete_id: "mcmorris", body_region: "hip_left", injury_type: "fracture", diagnosis: "Pelvic fracture", severity: 9, recovery_months: 9, year_occurred: 2017, description: "One of 17 fractures across his entire body", is_primary: false },
  { id: "inj-004", athlete_id: "mcmorris", body_region: "ribcage", injury_type: "fracture", diagnosis: "Multiple rib fractures", severity: 8, recovery_months: 9, year_occurred: 2017, description: "Multiple ribs were broken", is_primary: false },
  { id: "inj-005", athlete_id: "mcmorris", body_region: "upper_arm_left", injury_type: "fracture", diagnosis: "Left arm fracture", severity: 7, recovery_months: 6, year_occurred: 2017, description: "Fractured his left arm", is_primary: false },
  { id: "inj-006", athlete_id: "mcmorris", body_region: "jaw", injury_type: "fracture", diagnosis: "Jaw fracture", severity: 7, recovery_months: 4, year_occurred: 2017, description: "Fractured his jaw", is_primary: false },
  // Hirano
  { id: "inj-007", athlete_id: "hirano", body_region: "abdomen", injury_type: "rupture", diagnosis: "Liver damage", severity: 9, recovery_months: 6, year_occurred: 2017, description: "Suffered liver damage from a fall. A life-threatening injury", is_primary: true },
  { id: "inj-008", athlete_id: "hirano", body_region: "knee_left", injury_type: "tear", diagnosis: "Left knee ligament injury", severity: 7, recovery_months: 6, year_occurred: 2017, description: "Occurred simultaneously with the liver damage", is_primary: true },
  { id: "inj-009", athlete_id: "hirano", body_region: "hip_left", injury_type: "fracture", diagnosis: "Pelvic (ilium) fracture", severity: 8, recovery_months: 3, year_occurred: 2026, description: "Fracture just before the Milan Olympics", is_primary: true },
  // Okamoto
  { id: "inj-010", athlete_id: "okamoto", body_region: "lower_back", injury_type: "other", diagnosis: "Spinal cord injury (right knee-down paralysis)", severity: 10, recovery_months: 24, year_occurred: 2015, description: "Fell from a cliff. Permanently lost sensation from the right knee down", is_primary: true },
  { id: "inj-011", athlete_id: "okamoto", body_region: "chest", injury_type: "fracture", diagnosis: "15 fractures across the entire body", severity: 10, recovery_months: 12, year_occurred: 2015, description: "Bones throughout his body were shattered", is_primary: true },
  // Ohtani
  { id: "inj-012", athlete_id: "ohtani", body_region: "elbow_right", injury_type: "tear", diagnosis: "Right elbow UCL tear (1st time)", severity: 8, recovery_months: 18, year_occurred: 2018, description: "Tommy John surgery. Sidelined as a pitcher", is_primary: true },
  { id: "inj-013", athlete_id: "ohtani", body_region: "elbow_right", injury_type: "tear", diagnosis: "Right elbow UCL tear (2nd time)", severity: 9, recovery_months: 12, year_occurred: 2023, description: "Second surgery. His two-way career was in jeopardy", is_primary: true },
  // Murray
  { id: "inj-014", athlete_id: "murray", body_region: "hip_right", injury_type: "other", diagnosis: "Osteoarthritis of the hip", severity: 9, recovery_months: 12, year_occurred: 2017, description: "Worn-out cartilage. Excruciating pain making even putting on socks difficult", is_primary: true },
  { id: "inj-015", athlete_id: "murray", body_region: "hip_right", injury_type: "other", diagnosis: "Hip replacement surgery", severity: 10, recovery_months: 6, year_occurred: 2019, description: "Replaced with a metal artificial joint. No precedent for returning to professional play", is_primary: true },
  // Kunieda
  { id: "inj-016", athlete_id: "kunieda", body_region: "lower_back", injury_type: "other", diagnosis: "Spinal tumor (age 9)", severity: 10, recovery_months: 0, year_occurred: 1993, description: "Lost the use of his lower body at age 9", is_primary: true },
  { id: "inj-017", athlete_id: "kunieda", body_region: "elbow_right", injury_type: "other", diagnosis: "Right elbow loose body (cartilage fragment)", severity: 7, recovery_months: 12, year_occurred: 2016, description: "Severe pain from cartilage fragments interfered with play", is_primary: true },
  // Ikee
  { id: "inj-018", athlete_id: "ikee", body_region: "abdomen", injury_type: "other", diagnosis: "Acute lymphoblastic leukemia", severity: 10, recovery_months: 20, year_occurred: 2019, description: "Diagnosed in 2019. 10 months of hospitalization and chemotherapy", is_primary: true },
  // Woods
  { id: "inj-019", athlete_id: "woods", body_region: "knee_right", injury_type: "fracture", diagnosis: "Right tibia and fibula compound fracture", severity: 10, recovery_months: 14, year_occurred: 2021, description: "Car accident. Right leg shattered, nearly amputated", is_primary: true },
  { id: "inj-020", athlete_id: "woods", body_region: "ankle_right", injury_type: "fracture", diagnosis: "Right ankle comminuted fracture", severity: 9, recovery_months: 14, year_occurred: 2021, description: "Multiple ankle fractures from the accident", is_primary: true },
  { id: "inj-021", athlete_id: "woods", body_region: "lower_back", injury_type: "other", diagnosis: "Lumbar spinal fusion (prior)", severity: 7, recovery_months: 12, year_occurred: 2017, description: "History of lower back surgery", is_primary: false },
  // Mitoma
  { id: "inj-022", athlete_id: "mitoma", body_region: "lower_back", injury_type: "other", diagnosis: "Lumbar spine injury", severity: 7, recovery_months: 6, year_occurred: 2024, description: "Lumbar spine injury from accumulated damage in the Premier League", is_primary: true },
  // Abe
  { id: "inj-023", athlete_id: "abe", body_region: "hand_right", injury_type: "other", diagnosis: "Finger deformity and injury", severity: 5, recovery_months: 3, year_occurred: 2022, description: "Finger deformation and grip strength loss from repeated training", is_primary: true },
  // Kimura
  { id: "inj-024", athlete_id: "kimura", body_region: "head", injury_type: "other", diagnosis: "Total blindness from congenital condition", severity: 10, recovery_months: 0, year_occurred: 1992, description: "Lost sight at age 2. Turned to para swimming", is_primary: true },
  // Sanibrawn
  { id: "inj-025", athlete_id: "sanibrawn", body_region: "lower_back", injury_type: "fracture", diagnosis: "Lumbar spondylolysis", severity: 7, recovery_months: 8, year_occurred: 2020, description: "A devastating lower back injury for a sprinter", is_primary: true },
  { id: "inj-026", athlete_id: "sanibrawn", body_region: "thigh_right", injury_type: "tear", diagnosis: "Hamstring injury", severity: 6, recovery_months: 4, year_occurred: 2021, description: "A rear thigh injury compounding the lumbar spondylolysis", is_primary: true },
  // Ito
  { id: "inj-027", athlete_id: "ito", body_region: "lower_back", injury_type: "other", diagnosis: "Lower back pain", severity: 5, recovery_months: 3, year_occurred: 2024, description: "Chronic lower back pain. Affected Paris Olympics selection", is_primary: true },
  // Toratani
  { id: "inj-028", athlete_id: "toratani", body_region: "lower_back", injury_type: "other", diagnosis: "Spinal cord injury", severity: 10, recovery_months: 0, year_occurred: 0, description: "Spinal cord injury from an accident. Lost the use of his lower body", is_primary: true },
  // ===== NEW ATHLETES (15-50) =====
  // Durant
  { id: "inj-029", athlete_id: "durant", body_region: "ankle_right", injury_type: "tear", diagnosis: "Right Achilles tendon rupture", severity: 10, recovery_months: 18, year_occurred: 2019, description: "Complete Achilles tendon rupture during the NBA Finals. The most devastating injury for a basketball player", is_primary: true },
  // Takahashi Ran
  { id: "inj-030", athlete_id: "takahashi_ran", body_region: "ankle_right", injury_type: "other", diagnosis: "Ankle injury", severity: 6, recovery_months: 3, year_occurred: 2024, description: "Ankle injury during a crucial league period. Sidelined ahead of the Olympics", is_primary: true },
  // Leitch
  { id: "inj-031", athlete_id: "leitch", body_region: "hip_right", injury_type: "other", diagnosis: "Hip injury", severity: 7, recovery_months: 2, year_occurred: 2019, description: "Hip injury just before the World Cup. Unable to walk properly", is_primary: true },
  { id: "inj-032", athlete_id: "leitch", body_region: "knee_right", injury_type: "other", diagnosis: "Knee injury", severity: 6, recovery_months: 2, year_occurred: 2019, description: "Knee injury around the same time as the hip injury", is_primary: true },
  // Irie
  { id: "inj-033", athlete_id: "irie", body_region: "head", injury_type: "other", diagnosis: "Mental slump (losing streak, considered retirement)", severity: 6, recovery_months: 12, year_occurred: 2020, description: "A string of losses during national team selection, leading to a mental setback where she considered retirement", is_primary: true },
  // Kasai
  { id: "inj-034", athlete_id: "kasai", body_region: "knee_right", injury_type: "other", diagnosis: "Severe knee injury", severity: 7, recovery_months: 12, year_occurred: 1998, description: "A knee injury early in his career. A devastating blow for a jumper, losing the 'spring' in his takeoff", is_primary: true },
  { id: "inj-035", athlete_id: "kasai", body_region: "head", injury_type: "other", diagnosis: "Prolonged poor performance", severity: 5, recovery_months: 0, year_occurred: 2005, description: "Performance decline in his 30s. A mental battle against the perception of being a 'finished athlete'", is_primary: false },
  // Tanaka
  { id: "inj-036", athlete_id: "tanaka", body_region: "elbow_right", injury_type: "tear", diagnosis: "Partial tear of right elbow UCL", severity: 8, recovery_months: 6, year_occurred: 2014, description: "Chose conservative therapy over Tommy John surgery. Played with a ticking time bomb in his elbow", is_primary: true },
  // Ishikawa
  { id: "inj-037", athlete_id: "ishikawa", body_region: "lower_back", injury_type: "other", diagnosis: "Worsening lower back pain", severity: 7, recovery_months: 4, year_occurred: 2023, description: "Lower back pain worsened mid-season. Compounded by the pressure of being national team captain", is_primary: true },
  { id: "inj-038", athlete_id: "ishikawa", body_region: "thigh_right", injury_type: "other", diagnosis: "Lower limb injury", severity: 6, recovery_months: 3, year_occurred: 2023, description: "The lower back pain also spread to the lower limb", is_primary: true },
  // Yamamoto
  { id: "inj-039", athlete_id: "yamamoto", body_region: "shoulder_right", injury_type: "other", diagnosis: "Right shoulder triceps strain", severity: 6, recovery_months: 3, year_occurred: 2024, description: "Injured his right shoulder struggling to adapt to the hard MLB mound in his first year with the Dodgers", is_primary: true },
  // Fukuhara
  { id: "inj-045", athlete_id: "fukuhara", body_region: "foot_left", injury_type: "fracture", diagnosis: "Left big toe fracture", severity: 6, recovery_months: 3, year_occurred: 2014, description: "A devastating foot fracture for a table tennis player. Impaired footwork", is_primary: true },
  { id: "inj-046", athlete_id: "fukuhara", body_region: "elbow_right", injury_type: "other", diagnosis: "Chronic right elbow pain", severity: 5, recovery_months: 0, year_occurred: 2012, description: "Chronic pain in the right elbow from years of overuse", is_primary: false },
  { id: "inj-047", athlete_id: "fukuhara", body_region: "shoulder_right", injury_type: "other", diagnosis: "Chronic right shoulder pain", severity: 5, recovery_months: 0, year_occurred: 2012, description: "Chronic pain in the right shoulder from years of play", is_primary: false },
  // Inoue
  { id: "inj-048", athlete_id: "inoue", body_region: "head", injury_type: "fracture", diagnosis: "Right orbital floor fracture", severity: 8, recovery_months: 4, year_occurred: 2019, description: "Fractured the orbital floor near his right eye during the Donaire fight. Saw double vision during the bout", is_primary: true },
  { id: "inj-049", athlete_id: "inoue", body_region: "head", injury_type: "fracture", diagnosis: "Nasal bone fracture", severity: 6, recovery_months: 2, year_occurred: 2019, description: "Also fractured his nose during the Donaire fight", is_primary: false },
  // Kunieda v2
  { id: "inj-050", athlete_id: "kunieda_v2", body_region: "elbow_right", injury_type: "other", diagnosis: "Right elbow surgery (yips-like condition)", severity: 8, recovery_months: 12, year_occurred: 2016, description: "Right elbow surgery just before the Rio Olympics. Developed a yips-like condition from fear of pain", is_primary: true },
  { id: "inj-051", athlete_id: "kunieda_v2", body_region: "lower_back", injury_type: "other", diagnosis: "Spinal tumor (age 9)", severity: 10, recovery_months: 0, year_occurred: 1993, description: "Lost the use of his lower body at age 9", is_primary: true },
  // Kimura v2
  { id: "inj-052", athlete_id: "kimura_v2", body_region: "head", injury_type: "other", diagnosis: "Loss of sight (age 2)", severity: 10, recovery_months: 0, year_occurred: 1992, description: "Lost sight at age 2. An acquired visual disability, not congenital", is_primary: true },
  // Tani
  { id: "inj-053", athlete_id: "tani", body_region: "ankle_right", injury_type: "other", diagnosis: "Right foot amputation below the ankle (osteosarcoma)", severity: 10, recovery_months: 12, year_occurred: 2002, description: "Right foot amputated below the ankle due to osteosarcoma", is_primary: true },
  // Murata
  { id: "inj-054", athlete_id: "murata", body_region: "elbow_right", injury_type: "tear", diagnosis: "Right elbow ligament rupture", severity: 9, recovery_months: 24, year_occurred: 1982, description: "A devastating right elbow injury threatening his pitching career. Underwent Tommy John surgery", is_primary: true },
  // Watanabe
  { id: "inj-055", athlete_id: "watanabe", body_region: "thigh_right", injury_type: "tear", diagnosis: "Recurring hamstring injury", severity: 6, recovery_months: 2, year_occurred: 2019, description: "Repeatedly suffered hamstring injuries during his NBA career", is_primary: true },
  { id: "inj-056", athlete_id: "watanabe", body_region: "ankle_right", injury_type: "other", diagnosis: "Recurring ankle sprain", severity: 5, recovery_months: 1, year_occurred: 2020, description: "Frequent ankle sprains during intense play", is_primary: false },
  // Akiyama
  { id: "inj-057", athlete_id: "akiyama", body_region: "foot_right", injury_type: "other", diagnosis: "Foot injury (MLB era)", severity: 5, recovery_months: 2, year_occurred: 2021, description: "Foot injury during his MLB career. Led to a drastic reduction in playing time", is_primary: true },
  // Uchimura
  { id: "inj-057", athlete_id: "uchimura", body_region: "shoulder_left", injury_type: "other", diagnosis: "Chronic left shoulder disorder", severity: 7, recovery_months: 0, year_occurred: 2017, description: "Chronic injury in both shoulders from years of overuse. A factor in giving up the individual all-around", is_primary: true },
  { id: "inj-058", athlete_id: "uchimura", body_region: "shoulder_right", injury_type: "other", diagnosis: "Chronic right shoulder disorder", severity: 7, recovery_months: 0, year_occurred: 2017, description: "Chronically worsened along with the left shoulder. Forced to transition to a less power-dependent gymnastics style", is_primary: true },
  { id: "inj-059", athlete_id: "uchimura", body_region: "ankle_right", injury_type: "tear", diagnosis: "Ankle ligament injury", severity: 6, recovery_months: 3, year_occurred: 2019, description: "Damaged ankle ligaments on landing. The foundation of his 'aesthetics of landing' was shaken", is_primary: false },
  // Tomita
  { id: "inj-060", athlete_id: "tomita", body_region: "head", injury_type: "other", diagnosis: "Retinitis pigmentosa (progressive visual impairment, total blindness)", severity: 10, recovery_months: 0, year_occurred: 2005, description: "Developed in high school. Completely lost sight due to a progressive visual impairment", is_primary: true },
  // Sato Mami
  { id: "inj-061", athlete_id: "sato_mami", body_region: "knee_right", injury_type: "other", diagnosis: "Right leg amputation below the knee (osteosarcoma)", severity: 10, recovery_months: 12, year_occurred: 2002, description: "Right leg amputated below the knee due to malignant bone tumor", is_primary: true },
  { id: "inj-062", athlete_id: "sato_mami", body_region: "knee_right", injury_type: "other", diagnosis: "Phantom limb pain", severity: 7, recovery_months: 6, year_occurred: 2002, description: "Suffered prolonged phantom pain in the absent limb after amputation", is_primary: false },
  // Zanardi
  { id: "inj-063", athlete_id: "zanardi", body_region: "thigh_left", injury_type: "other", diagnosis: "Left leg amputation (above the knee)", severity: 10, recovery_months: 24, year_occurred: 2001, description: "Both legs amputated after a collision at 320 km/h", is_primary: true },
  { id: "inj-064", athlete_id: "zanardi", body_region: "thigh_right", injury_type: "other", diagnosis: "Right leg amputation (above the knee)", severity: 10, recovery_months: 24, year_occurred: 2001, description: "Lost 70% of his blood volume in a near-fatal injury", is_primary: true },
  { id: "inj-065", athlete_id: "zanardi", body_region: "head", injury_type: "other", diagnosis: "Head trauma (2020 accident)", severity: 9, recovery_months: 36, year_occurred: 2020, description: "Severe head trauma from a truck collision during training", is_primary: false },
  // Eriksen
  { id: "inj-066", athlete_id: "eriksen", body_region: "chest", injury_type: "other", diagnosis: "Cardiac arrest (heart attack)", severity: 10, recovery_months: 7, year_occurred: 2021, description: "Cardiac arrest during a Euro 2020 match. Resuscitated with an AED. ICD implanted", is_primary: true },
  // Yamasaki
  { id: "inj-067", athlete_id: "yamasaki", body_region: "shoulder_right", injury_type: "other", diagnosis: "Pitching slump (two-seam read, mental struggles)", severity: 6, recovery_months: 12, year_occurred: 2020, description: "His signature two-seam was being read by batters, sent to the minors. A technical and mental slump", is_primary: true },
  // Hanyu
  { id: "inj-068", athlete_id: "hanyu", body_region: "ankle_right", injury_type: "tear", diagnosis: "Right ankle ligament injury (multiple times)", severity: 8, recovery_months: 3, year_occurred: 2017, description: "Countless right ankle ligament injuries. Severely hurt just before the PyeongChang Olympics", is_primary: true },
  { id: "inj-069", athlete_id: "hanyu", body_region: "ankle_right", injury_type: "tear", diagnosis: "Right ankle ligament injury (2014 Cup of China)", severity: 7, recovery_months: 2, year_occurred: 2014, description: "Ligament injury from a collision during practice", is_primary: false },
  // Endo
  { id: "inj-070", athlete_id: "endo", body_region: "head", injury_type: "other", diagnosis: "Concussion", severity: 7, recovery_months: 1, year_occurred: 2022, description: "Concussion just before the World Cup. His participation was in doubt", is_primary: true },
  // Ueno
  { id: "inj-069", athlete_id: "ueno", body_region: "jaw", injury_type: "fracture", diagnosis: "Compound jaw fracture", severity: 9, recovery_months: 10, year_occurred: 2019, description: "A line drive hit her face during a game. Compound jaw fracture, mouth wired shut", is_primary: true },
  { id: "inj-070", athlete_id: "ueno", body_region: "shoulder_right", injury_type: "other", diagnosis: "Chronic right shoulder fatigue", severity: 5, recovery_months: 3, year_occurred: 2015, description: "Right shoulder wear from years of pitching", is_primary: false },
  // Nishikori
  { id: "inj-071", athlete_id: "nishikori", body_region: "hand_right", injury_type: "tear", diagnosis: "Right wrist ligament injury", severity: 8, recovery_months: 6, year_occurred: 2017, description: "Long-term absence from a wrist ligament injury", is_primary: true },
  { id: "inj-072", athlete_id: "nishikori", body_region: "hip_right", injury_type: "other", diagnosis: "Right hip surgery", severity: 8, recovery_months: 12, year_occurred: 2022, description: "Long-term absence due to hip surgery", is_primary: true },
  { id: "inj-073", athlete_id: "nishikori", body_region: "elbow_right", injury_type: "other", diagnosis: "Right elbow surgery", severity: 7, recovery_months: 8, year_occurred: 2019, description: "Right elbow surgery. Significantly affected his serve", is_primary: true },
  { id: "inj-074", athlete_id: "nishikori", body_region: "knee_right", injury_type: "other", diagnosis: "Right knee surgery", severity: 7, recovery_months: 6, year_occurred: 2020, description: "Right knee surgery. Overlapped with the COVID-19 pandemic, extending his absence", is_primary: false },
  // Fujiwara
  { id: "inj-075", athlete_id: "fujiwara", body_region: "lower_back", injury_type: "other", diagnosis: "Spinal cord injury", severity: 10, recovery_months: 0, year_occurred: 2018, description: "Spinal cord injury from a traffic accident. Lower body paralysis", is_primary: true },
  // Sasaki
  { id: "inj-076", athlete_id: "sasaki", body_region: "shoulder_right", injury_type: "strain", diagnosis: "Right shoulder fatigue", severity: 6, recovery_months: 3, year_occurred: 2020, description: "Pitching appearances limited to protect his still-developing body", is_primary: true },
  { id: "inj-077", athlete_id: "sasaki", body_region: "hand_right", injury_type: "other", diagnosis: "Right finger blisters", severity: 3, recovery_months: 1, year_occurred: 2022, description: "Finger stress from throwing 165 km/h fastballs", is_primary: false },
  // Kimura Saori
  { id: "inj-078", athlete_id: "kimura_saori", body_region: "knee_right", injury_type: "sprain", diagnosis: "Right knee ligament injury", severity: 7, recovery_months: 6, year_occurred: 2014, description: "Injured her right knee on landing. Rehabilitation toward the Rio Olympics", is_primary: true },
  { id: "inj-079", athlete_id: "kimura_saori", body_region: "shoulder_right", injury_type: "strain", diagnosis: "Right shoulder pain", severity: 5, recovery_months: 3, year_occurred: 2012, description: "Shoulder wear from repeated spiking", is_primary: false },
  // Takahashi Naoko
  { id: "inj-080", athlete_id: "takahashi_naoko", body_region: "knee_right", injury_type: "fracture", diagnosis: "Right knee meniscus injury", severity: 8, recovery_months: 8, year_occurred: 1996, description: "Knee injury just before the Olympics. Could barely walk", is_primary: true },
  { id: "inj-081", athlete_id: "takahashi_naoko", body_region: "lower_back", injury_type: "other", diagnosis: "Lower back pain", severity: 5, recovery_months: 3, year_occurred: 1998, description: "Chronic lower back pain from long-distance running", is_primary: false },
  // Oe
  { id: "inj-082", athlete_id: "oe", body_region: "knee_left", injury_type: "tear", diagnosis: "Left knee ACL rupture", severity: 9, recovery_months: 12, year_occurred: 2017, description: "Ruptured the left knee ACL during play", is_primary: true },
  { id: "inj-083", athlete_id: "oe", body_region: "knee_left", injury_type: "tear", diagnosis: "Left knee ACL re-rupture", severity: 10, recovery_months: 14, year_occurred: 2019, description: "Ruptured the same spot again after returning. A second major surgery", is_primary: true },
  // Taniguchi
  { id: "inj-084", athlete_id: "taniguchi", body_region: "ankle_right", injury_type: "fracture", diagnosis: "Right ankle fracture", severity: 8, recovery_months: 8, year_occurred: 2016, description: "Fractured right ankle from a contact play during a match", is_primary: true },
  // Ikezaki
  { id: "inj-085", athlete_id: "ikezaki", body_region: "lower_back", injury_type: "other", diagnosis: "Spinal cord injury", severity: 10, recovery_months: 0, year_occurred: 2004, description: "Spinal cord injury from a traffic accident. Began life in a wheelchair", is_primary: true },
  // Kobayashi
  { id: "inj-086", athlete_id: "kobayashi", body_region: "knee_right", injury_type: "tear", diagnosis: "Right knee ligament injury", severity: 8, recovery_months: 10, year_occurred: 2019, description: "Knee injury on landing. Devastating for a ski jumping athlete", is_primary: true },
  // Suzuki Takayuki
  { id: "inj-087", athlete_id: "suzuki_takayuki", body_region: "shoulder_right", injury_type: "tear", diagnosis: "Right shoulder rotator cuff tear", severity: 9, recovery_months: 12, year_occurred: 2018, description: "Tore the right shoulder rotator cuff during a throwing motion. Career-threatening injury", is_primary: true },
  // Otaki
  { id: "inj-088", athlete_id: "otaki", body_region: "chest", injury_type: "other", diagnosis: "Tuberculosis", severity: 9, recovery_months: 24, year_occurred: 1945, description: "Developed tuberculosis amid postwar malnutrition. Forced into long-term treatment", is_primary: true },
  { id: "inj-089", athlete_id: "otaki", body_region: "lower_back", injury_type: "other", diagnosis: "Spinal deterioration", severity: 7, recovery_months: 12, year_occurred: 1970, description: "Spinal issues from aging and the effects of past long-term treatment", is_primary: false },
];


// ===== Quiz Questions (English) =====
export const quizQuestions: QuizQuestion[] = [
  // Coffee break (general)
  {
    id: "quiz-001",
    athlete_id: null,
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "Many professional baseball players who overcame Tommy John surgery (elbow ligament reconstruction) commonly cite the same thing as 'the hardest part' of rehab. Which of the following is it?",
    choices: [
      "The pain of the surgery itself",
      "The sense of alienation that 'the team keeps playing just fine without me'",
      "The hospital food not being to their liking",
      "The monotony of the strength training program",
    ],
    correct_index: 1,
    rationale: "The fear of 'losing your place' (psychological debt) torments athletes more than physical pain. However, athletes who used this period to reflect objectively and discover 'what only I can do right now' went on to achieve great comebacks.",
    encouragement: "Have you ever experienced 'a world that keeps turning without you'? Within that loneliness, there may be an opportunity to discover a new self.",
  },
  // Serious analysis (Hirano)
  {
    id: "quiz-002",
    athlete_id: "hirano",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "Even in the dire situation of a pelvic fracture in 2026, why was Ayumu Hirano able to make the decision to 'compete anyway'? Think about it from the perspective of his 'strengths (assets).'",
    choices: [
      "It was simply a reckless decision driven by youth",
      "Pressure from sponsors was too strong",
      "His past experience of surviving a near-fatal injury allowed him to precisely 'calculate' his limits beyond the pain",
      "He had a condition that made him insensitive to pain",
    ],
    correct_index: 2,
    rationale: "The experience of overcoming his past liver damage -- a moment of despair -- became his greatest 'experiential asset.' He didn't act on emotion; he chose comeback based on precise calculation: 'With this level of pain, I can control my ride if I adjust this way.'",
    encouragement: "Past painful experiences become 'assets' that help your future self. What you've overcome surely works the same way.",
  },
  // McMorris
  {
    id: "quiz-003",
    athlete_id: "mcmorris",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "Which best describes how Mark McMorris viewed himself during his post-accident rehabilitation?",
    choices: [
      "He tried to garner sympathy as a tragic hero",
      "Like a corporate turnaround project, he treated each day's recovery as an 'increase in assets'",
      "He immersed himself in other hobbies to forget about the injury",
      "He ignored doctors' orders to train and rush his comeback",
    ],
    correct_index: 1,
    rationale: "McMorris approached rehab asking himself, 'Did my assets increase today compared to yesterday?' If his knee could bend a little more, that was a significant 'profit.' This mindset became the driving force to keep moving forward even in despair.",
    encouragement: "'Am I a little better today than I was yesterday?' -- this simple question might be the ultimate recovery method anyone can use.",
  },
  // Okamoto
  {
    id: "quiz-004",
    athlete_id: "okamoto",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "When Keiji Okamoto discovered para snowboarding after his spinal cord injury, which best describes how he felt?",
    choices: [
      "He reluctantly accepted it as his only remaining option",
      "Driven by anger over what he'd lost, he wanted to do anything",
      "He felt the excitement of a new adventure beginning",
      "He was motivated by Paralympic prize money",
    ],
    correct_index: 2,
    rationale: "Okamoto has said he 'felt the excitement of a new adventure beginning.' With the same spirit of adventure that once drove him to explore uncharted lines on snowy mountains, he dove into the new world of para snowboarding.",
    encouragement: "Life has not 'endings' but 'new beginnings.' Okamoto's attitude gives courage to everyone.",
  },
  // Coffee break
  {
    id: "quiz-005",
    athlete_id: "mcmorris",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "How many bones did Mark McMorris break in his 2017 accident?",
    choices: ["7", "12", "17", "23"],
    correct_index: 2,
    rationale: "He broke 17 bones across his entire body. The accident also involved ruptured lungs and spleen, yet just 11 months later he won an Olympic medal.",
    encouragement: "From 17 broken bones to Olympic medalist. The human body's ability to recover is far greater than we think.",
  },
  {
    id: "quiz-006",
    athlete_id: "hirano",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "What is the meaning behind Ayumu Hirano's given name 'Ayumu'?",
    choices: ["To walk through dreams", "To fulfill dreams by walking", "Walking within a dream", "Approaching dreams one step at a time"],
    correct_index: 0,
    rationale: "His mother gave him the name meaning 'to walk through dreams.' True to his name, no matter how many times he falls, he keeps walking toward his dreams.",
    encouragement: "Your name probably carries a wonderful meaning too.",
  },
  // Ohtani
  {
    id: "quiz-007",
    athlete_id: "ohtani",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What is the most essential reason Shohei Ohtani refused to give up his two-way career even after two Tommy John surgeries?",
    choices: [
      "It was a condition of his sponsorship deals",
      "He viewed his rehab period as 'upgrade time' and knew he could evolve as a hitter while unable to pitch",
      "His doctor gave him a clean bill of health",
      "Pressure from teammates",
    ],
    correct_index: 1,
    rationale: "Ohtani viewed his injury as 'time to upgrade himself.' He devoted his time unable to pitch to evolving as a hitter, ultimately achieving the first 50-50 season in MLB history. This mindset of converting negatives into positives was the driving force behind his two-way career.",
    encouragement: "Focus not on 'what you can't do' but on 'what you can uniquely do right now.' Ohtani's way of thinking offers hints applicable to everyday life.",
  },
  {
    id: "quiz-008",
    athlete_id: "ohtani",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "What goal-setting tool did Shohei Ohtani use in middle school?",
    choices: ["Mandala chart", "Gantt chart", "Flowchart", "Mind map"],
    correct_index: 0,
    rationale: "Using a 9x9 Mandala chart, he mapped out specific goals like 'first-round draft pick, 8 teams' during his time at Hanamaki Higashi High School.",
    encouragement: "Making goals visible might significantly increase the chances of achieving them.",
  },
  // Murray
  {
    id: "quiz-009",
    athlete_id: "murray",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "From the perspective of Andy Murray's 'assets,' what most accurately explains why he chose hip replacement surgery?",
    choices: [
      "It was solely to improve his daily life",
      "It was surgery to accept retirement",
      "His indomitable spirit and tenacity inherited from his mother drove him to pursue an unprecedented challenge, believing 'it's not over yet'",
      "There were no other options",
    ],
    correct_index: 2,
    rationale: "Murray's greatest 'asset' was the tenacious mentality forged by his mother in Scotland. There was no precedent for returning to professional play with a metal hip, yet he kept believing 'it's not over yet.' That indomitable spirit was the source that made the impossible possible.",
    encouragement: "'No precedent' does not mean 'impossible.' You could become the first 'precedent.'",
  },
  {
    id: "quiz-010",
    athlete_id: "murray",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "What daily activity was most difficult for Andy Murray due to his hip osteoarthritis?",
    choices: ["Putting on socks", "Climbing stairs", "Turning over in bed", "Eating meals"],
    correct_index: 0,
    rationale: "He has said that the pain from osteoarthritis made even the simple act of putting on socks feel like agony.",
    encouragement: "Realizing the value of things we take for granted may be an important lesson in itself.",
  },
  // Kunieda
  {
    id: "quiz-011",
    athlete_id: "kunieda",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the most innovative action Shingo Kunieda took to recover from his post-Rio Olympics slump?",
    choices: [
      "He doubled his training volume",
      "He fundamentally changed his wheelchair propulsion technique based on biomechanics research",
      "He brought in a coach from overseas",
      "He temporarily retired from competition",
    ],
    correct_index: 1,
    rationale: "Rather than relying on years of experience, Kunieda fundamentally redesigned his wheelchair propulsion based on scientific biomechanics research. This is why he is called 'a genius who never stops upgrading himself.'",
    encouragement: "The courage to abandon 'the way things have always been done' can bring a new version of yourself.",
  },
  {
    id: "quiz-012",
    athlete_id: "kunieda",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "What is Shingo Kunieda's trademark phrase?",
    choices: ["I am the strongest!", "Nothing is impossible for me!", "I'm not done yet!", "No one can stop me!"],
    correct_index: 0,
    rationale: "'I am the strongest!' is both self-suggestion and conviction. This phrase was the driving force behind his wheelchair tennis career.",
    encouragement: "Having words you believe in about yourself can be an incredibly powerful source of strength.",
  },
  // Ikee
  {
    id: "quiz-013",
    athlete_id: "ikee",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the first thing Rikako Ikee did in the pool after her return from leukemia?",
    choices: [
      "Measured her time",
      "Swam 100 meters at full speed",
      "Practiced floating in the water",
      "Practiced diving",
    ],
    correct_index: 2,
    rationale: "A national record holder starting from 'just floating.' Chemotherapy had stripped away her muscle, and even floating was a fresh start from zero. This 'rebuilding from zero' became the foundation for her dramatic comeback later.",
    encouragement: "No matter how long the road, the first step is 'floating.' Taking it at your own pace, without rushing, is what matters.",
  },
  {
    id: "quiz-014",
    athlete_id: "ikee",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "How many gold medals did Rikako Ikee win at the 2018 Asian Games?",
    choices: ["6", "4", "3", "8"],
    correct_index: 0,
    rationale: "She was named MVP at the 2018 Jakarta Asian Games, winning 6 gold medals.",
    encouragement: "Her talent continues to shine even after battling leukemia.",
  },
  // Woods
  {
    id: "quiz-015",
    athlete_id: "woods",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the greatest motivation for Tiger Woods during his rehabilitation after the car accident?",
    choices: [
      "The drive to win a 16th major",
      "Obligations from sponsor contracts",
      "The wish to play golf with his son Charlie one more time",
      "The doctor's assurance that 'you will walk again'",
    ],
    correct_index: 2,
    rationale: "'I want to play with my son one more time' -- what lifted Tiger back up was not titles or glory, but a father's simple wish. His comeback was a miracle born of family love.",
    encouragement: "What is your 'one more time'? That wish will surely give you strength.",
  },
  {
    id: "quiz-016",
    athlete_id: "woods",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "How many career major victories does Tiger Woods have?",
    choices: ["15", "18", "12", "20"],
    correct_index: 0,
    rationale: "With 15 career major wins, he holds the second-highest record in history, behind only Jack Nicklaus's 18.",
    encouragement: "Tiger continues to compete. 'The end' is something you decide for yourself.",
  },
  // Mitoma
  {
    id: "quiz-017",
    athlete_id: "mitoma",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What unique 'asset' did Kaoru Mitoma leverage during his injury rehabilitation?",
    choices: [
      "Strength training know-how",
      "The analytical ability he developed from scientifically researching dribbling at university",
      "His network of overseas connections",
      "The bond with his teammates",
    ],
    correct_index: 1,
    rationale: "Mitoma is a 'theorist' who wrote his university thesis at the University of Tsukuba on the scientific analysis of dribbling effectiveness. Even during his injury, he used this analytical ability to scientifically reconstruct movements that minimized strain on his lower back. After his return, he acquired sharper dribbling than before.",
    encouragement: "'Learning' never betrays you. The knowledge you've accumulated will surely help you someday.",
  },
  {
    id: "quiz-018",
    athlete_id: "mitoma",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "Which country was the opponent in the match that produced 'Mitoma's 1 millimeter'?",
    choices: ["Spain", "Germany", "Brazil", "France"],
    correct_index: 0,
    rationale: "At the 2022 Qatar World Cup against Spain, his goal-line assist was etched into Japanese football history as 'Mitoma's 1 millimeter.'",
    encouragement: "A 1-millimeter difference can change history. The accumulation of small efforts truly matters.",
  },
  // Abe
  {
    id: "quiz-019",
    athlete_id: "abe",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What did Hifumi Abe do during the period when he couldn't practice throws due to his finger injury?",
    choices: [
      "He rested completely and focused on finger recovery",
      "He turned the time he couldn't throw into a golden period for building core strength",
      "He spent it studying sports psychology",
      "He switched to training in other martial arts",
    ],
    correct_index: 1,
    rationale: "'The courage to step back gives you the power to take two steps forward.' He used the time when he couldn't do throwing practice to strengthen his foundational fitness, which ultimately enabled even more explosive throws than before.",
    encouragement: "Within 'what you can't do,' there hides 'what only you can do right now.'",
  },
  {
    id: "quiz-020",
    athlete_id: "abe",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "Which family member won a gold medal at the Tokyo Olympics on the same day as Hifumi Abe?",
    choices: ["His younger sister, Uta Abe", "His older brother", "His father", "His cousin"],
    correct_index: 0,
    rationale: "At the 2021 Tokyo Olympics, brother Hifumi (66 kg class) and sister Uta (52 kg class) both won gold medals on the same day. An historic feat in Olympic history.",
    encouragement: "Having a family environment where you can push each other is truly wonderful!",
  },
  // Kimura
  {
    id: "quiz-021",
    athlete_id: "kimura",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What action did Keiichi Kimura take to recover from his post-Rio Olympics setback?",
    choices: [
      "He changed his training environment within Japan",
      "He moved to America alone, rebuilding himself from scratch in an environment where he didn't even speak the language",
      "He retired once and then came back",
      "He focused on mental training",
    ],
    correct_index: 1,
    rationale: "The decision to move to America alone while completely blind required unimaginable courage. Yet Kimura resolved 'not to run from my weak self' and rebuilt himself in a foreign country where he couldn't even communicate. The result: consecutive gold medals at the Tokyo and Paris Games.",
    encouragement: "The strength to not look away from your weakness -- that may be what true courage really is.",
  },
  {
    id: "quiz-022",
    athlete_id: "kimura",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "When Keiichi Kimura won gold at the Tokyo Paralympics, who told him the result?",
    choices: ["His rival Uchu Tomita, swimming in the next lane", "His coach", "He knew from the crowd's cheers", "Someone read the scoreboard to him"],
    correct_index: 0,
    rationale: "Being completely blind, Kimura couldn't see the results after touching the wall. He asked his rival Tomita in the next lane, and upon hearing 'It's gold!', he collapsed in the water with emotion.",
    encouragement: "A rival who told him about his gold medal. A moment that captures the beauty of sports.",
  },
  // Sanibrawn
  {
    id: "quiz-023",
    athlete_id: "sanibrawn",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What unique rehabilitation method did Sani Brown use during the period when he couldn't run due to injury?",
    choices: [
      "He focused on aquatic training",
      "He used biomechanical video analysis to construct the 'ultimate sprint' in his mind",
      "He concentrated on upper body training",
      "He switched to cycling training",
    ],
    correct_index: 1,
    rationale: "Even when he couldn't run, he was running thousands of times in his head. Through scientific video analysis, he deconstructed the mechanics of sprinting and mentally constructed the 'ultimate sprint' that eliminated the root causes of his injury.",
    encouragement: "Even when your body can't move, your mind can. Visualization training is a powerful tool anyone can use anywhere.",
  },
  {
    id: "quiz-024",
    athlete_id: "sanibrawn",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "Which American university did Sani Brown attend?",
    choices: ["University of Florida", "UCLA", "Stanford University", "University of Texas"],
    correct_index: 0,
    rationale: "He built his foundation as a sprinter at the University of Florida, which has one of the world's top track and field programs, working with its coaching staff.",
    encouragement: "Choosing an environment that pushes you to grow is itself an important talent.",
  },
  // Ito
  {
    id: "quiz-025",
    athlete_id: "ito",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What became the catalyst for Mima Ito's comeback after failing to make the Paris Olympics team?",
    choices: [
      "She immediately increased her practice volume to prepare for the next tournament",
      "She stepped away from table tennis to rediscover her love for the sport",
      "She transferred to an overseas league",
      "She changed coaches",
    ],
    correct_index: 1,
    rationale: "By stepping away from table tennis, she rediscovered how much she truly loved the sport. The shift from 'table tennis to win' to 'table tennis for enjoyment' -- returning to the starting point became the greatest catalyst for her comeback.",
    encouragement: "'Stepping away' is not 'giving up.' Sometimes only distance gives you clarity.",
  },
  {
    id: "quiz-026",
    athlete_id: "ito",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "In which event did Mima Ito win gold at the Tokyo Olympics?",
    choices: ["Mixed doubles", "Women's singles", "Women's doubles", "Women's team"],
    correct_index: 0,
    rationale: "She won gold in mixed doubles with Jun Mizutani at the 2021 Tokyo Olympics. It was the first Olympic gold medal in Japanese table tennis history.",
    encouragement: "Meeting the perfect partner can produce the greatest results.",
  },
  // Toratani
  {
    id: "quiz-027",
    athlete_id: "toratani",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "When Mao Toratani discovered wheelchair fencing, what was the greatest 'asset' she brought with her?",
    choices: [
      "Wheelchair operation skills",
      "Reflexes and sword techniques honed through kendo and fencing as an able-bodied athlete",
      "Upper body strength built during rehabilitation",
      "Knowledge of para sports",
    ],
    correct_index: 1,
    rationale: "Wheelchair fencing is fought using only the upper body. The kendo and fencing skills she refined as an able-bodied athlete directly carried over as 'assets.' Even amid loss, something remained. That was the key to her comeback.",
    encouragement: "What you have built up so far will never go to waste.",
  },
  {
    id: "quiz-028",
    athlete_id: "toratani",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "Which of the following is a characteristic of wheelchair fencing?",
    choices: ["Wheelchairs are fixed in place and athletes fight using only the upper body", "Athletes freely move their wheelchairs to fight", "Athletes sometimes fight standing up", "Wheelchair speed is also factored into scoring"],
    correct_index: 0,
    rationale: "In wheelchair fencing, wheelchairs are fixed to a device called a 'piste,' and athletes fence using only their upper body.",
    encouragement: "The world of para sports holds so many fascinating aspects yet to discover!",
  },
  // ===== NEW ATHLETES (15-50) =====
  // Durant
  {
    id: "quiz-029",
    athlete_id: "durant",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What was the single greatest factor behind Kevin Durant's historically unprecedented comeback from an Achilles tendon rupture?",
    choices: [
      "He relied solely on cutting-edge medical technology",
      "He aimed to return to the 'same self' as before the injury",
      "He adopted the approach of redesigning 'a new self' that accounted for the injury, reconstructing everything from walking to jumping from scratch",
      "He rushed his return and got back on the court early",
    ],
    correct_index: 2,
    rationale: "Rather than 'going back to the way he was,' Durant approached rehab with the mindset of 'building a new self.' By redesigning everything -- his gait, his jump, his shooting form -- he achieved a level of comeback unimaginable for someone who suffered an Achilles rupture.",
    encouragement: "'Rebuild' instead of 'restore' -- this shift in mindset can be applied to any setback in life.",
  },
  // Takahashi Ran
  {
    id: "quiz-030",
    athlete_id: "takahashi_ran",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "In which league does Ran Takahashi play in Italy?",
    choices: ["Serie A", "Bundesliga", "Premier League", "La Liga"],
    correct_index: 0,
    rationale: "Italy's Serie A is one of the world's top volleyball leagues. Takahashi moved to Italy while still in university and continues to grow in a world-class environment.",
    encouragement: "The courage to venture into the world at a young age is itself a great talent.",
  },
  // Leitch
  {
    id: "quiz-031",
    athlete_id: "leitch",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What did Michael Leitch do during the period when he couldn't participate in training due to his pre-World Cup injury?",
    choices: [
      "He completely separated from the team and focused on treatment",
      "He threw himself into tactical analysis and mental support for younger players, fulfilling his role as captain off the pitch",
      "He ignored doctors' orders in an attempt to return early",
      "He decided to retire and make way for the next generation",
    ],
    correct_index: 1,
    rationale: "Even when he couldn't play due to injury, Leitch continued to contribute to the team through tactical analysis and mentoring younger players. 'When you can't play due to injury, that's when you think about what you can do for the team' -- the embodiment of true leadership.",
    encouragement: "The mindset of doing things 'for the team' can ultimately save yourself as well.",
  },
  // Irie
  {
    id: "quiz-032",
    athlete_id: "irie",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "Which manga inspired Sena Irie to start boxing?",
    choices: ["Ganbare Genki", "Hajime no Ippo", "Ashita no Joe", "Ring ni Kakero"],
    correct_index: 0,
    rationale: "She was moved by Yu Koyama's manga 'Ganbare Genki' and started boxing. She is also known for her love of frogs.",
    encouragement: "The things you love can change your life. Manga and frogs are both irreplaceable to Irie.",
  },
  // Kasai
  {
    id: "quiz-033",
    athlete_id: "kasai",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What unique training method did Noriaki Kasai develop to combat age-related decline?",
    choices: [
      "An improved version of altitude training",
      "Underwater jumping exercises",
      "The 'Kasai Method' focusing on core stability",
      "Virtual jump training using VR",
    ],
    correct_index: 2,
    rationale: "Even as leg strength declined, he independently developed the 'Kasai Method' to enhance mid-air posture control by strengthening the core. This method made his Olympic silver medal at age 41 possible.",
    encouragement: "'Compensating for decline through ingenuity' is wisdom that applies to any field. Let's think about turning weaknesses into strengths.",
  },
  // Tanaka
  {
    id: "quiz-034",
    athlete_id: "tanaka",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "What astonishing record did pitcher Masahiro Tanaka achieve in 2013?",
    choices: ["24 consecutive wins with no losses", "20 shutouts", "300 strikeouts", "15 complete games"],
    correct_index: 0,
    rationale: "He achieved an unprecedented record of 24 wins and 0 losses in the 2013 season. He led the Rakuten Eagles to their first Japan Series championship.",
    encouragement: "Behind 24 consecutive wins are 24 rounds of preparation. A 'winning pitcher' might simply be a 'prepared pitcher.'",
  },
  // Ishikawa
  {
    id: "quiz-035",
    athlete_id: "ishikawa",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "How did Yuki Ishikawa's playing style change after his return from injury?",
    choices: [
      "He specialized in power-focused spikes",
      "He transitioned to a defense-only player",
      "He established a new style of scoring with 'technique' in addition to power, broadening his tactical vision",
      "His playing style didn't change",
    ],
    correct_index: 2,
    rationale: "During his time away with injury, he fine-tuned his body balance to millimeter precision. As a result, his offensive repertoire expanded beyond power to include placement shots and feints. His Serie A coach called him 'a coach on the court,' reflecting how much his tactical vision had broadened.",
    encouragement: "New strengths can emerge from the process of compensating for weaknesses. Injuries too can be 'seeds of evolution.'",
  },
  // Yamamoto
  {
    id: "quiz-036",
    athlete_id: "yamamoto",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "What unique training did pitcher Yoshinobu Yamamoto incorporate to improve his pitching?",
    choices: ["Javelin throwing and bridge exercises", "Boxing and yoga", "Swimming and archery", "Soccer and ballet"],
    correct_index: 0,
    rationale: "He applied javelin-throwing form to his pitching motion and maximized spinal flexibility through bridge exercises. This 'questioning conventional wisdom' approach produced the first three consecutive quintuple crown in NPB history.",
    encouragement: "'Questioning the norm' can produce 'extraordinary' results. Let's value thinking outside the box.",
  },
  // Fukuhara
  {
    id: "quiz-037",
    athlete_id: "fukuhara",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What rehabilitation method, uniquely her own, did Ai Fukuhara use when she couldn't hold a racket due to a fracture?",
    choices: [
      "She rested completely and focused on recovery",
      "Match video analysis and practicing table tennis with her left hand",
      "She tried to switch to another sport",
      "She focused solely on mental training",
    ],
    correct_index: 1,
    rationale: "With the unconventional idea of practicing with her non-dominant hand when her dominant hand was unusable, she learned about ball trajectory and spin differences she never noticed with her right hand. At the same time, she analyzed match footage from a commentator's perspective, broadening her tactical range.",
    encouragement: "Instead of focusing on 'what you can't do,' look for 'what you can do differently.' That mindset offers hints for everyday life too.",
  },
  // Inoue
  {
    id: "quiz-038",
    athlete_id: "inoue",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What was the greatest reason Naoya Inoue could keep fighting despite fracturing his orbital floor during the Donaire fight?",
    choices: [
      "He had a constitution that was insensitive to pain",
      "He didn't know the rules about stopping the fight",
      "The thousands upon thousands of basic repetitions drilled with his father created a state where his body moved automatically even when his vision was distorted",
      "Painkillers eliminated his pain",
    ],
    correct_index: 2,
    rationale: "Overwhelming fundamental repetition was Inoue's greatest 'asset.' Even in the desperate situation of seeing double, the movements ingrained in his body automatically constructed his fight strategy. As he says, 'Only overwhelming practice can erase the fear in the ring.'",
    encouragement: "The quiet, daily accumulation of effort may save you in a crisis you never imagined.",
  },
  // Kunieda v2
  {
    id: "quiz-039",
    athlete_id: "kunieda_v2",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What was the most critical psychological shift that helped Shingo Kunieda recover from the yips after his right elbow surgery?",
    choices: [
      "He intensified his self-suggestion of 'I am the strongest' even more than before",
      "He ignored the pain and increased his practice volume",
      "For the first time, he acknowledged his weakness and fundamentally rebuilt his backhand technique",
      "He felt relieved after deciding to retire",
    ],
    correct_index: 2,
    rationale: "The champion who had always proclaimed 'I am the strongest' acknowledged his weakness for the very first time -- and that was the first step toward true strength. By accepting his weakness, he rebuilt his backhand from scratch and worked with a mental coach to reconstruct his mind, technique, and body.",
    encouragement: "Acknowledging weakness is not defeat; it's the entrance to becoming a stronger self.",
  },
  // Kimura v2
  {
    id: "quiz-040",
    athlete_id: "kimura_v2",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "From the perspective of 'his own measuring stick,' what is the most essential action Keiichi Kimura took to recover from his post-Rio Olympics setback?",
    choices: [
      "He searched for the best coach in Japan",
      "He let go of his obsession with medals and focused on enjoying himself",
      "Despite being completely blind and unable to speak English, he moved to America alone, choosing a trial to 'not run from his weak self'",
      "He retired and explored other paths",
    ],
    correct_index: 2,
    rationale: "Kimura, who lives by 'his own measuring stick' rather than 'others' measuring sticks,' chose to move to America to confront his own weaknesses. By abandoning a comfortable environment and deliberately placing himself in a difficult situation, he gained depth as a human being.",
    encouragement: "The courage to face your weakness without running away -- that may be the starting point of true strength.",
  },
  // Tani
  {
    id: "quiz-041",
    athlete_id: "tani",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was Mami Tani's greatest 'asset' behind her Olympic bid speech that moved the world?",
    choices: [
      "Her English skills and oratory techniques",
      "The 'lived experience' of losing her leg to osteosarcoma, losing her hometown to disaster, and still standing back up through sports",
      "Her fame as a public figure",
      "Her connections with IOC members",
    ],
    correct_index: 1,
    rationale: "It was 'lived experience,' not technique, that was her greatest asset. Words born from the experience of losing her leg, losing her hometown, and still getting back up carried a weight and persuasiveness that no one could replicate.",
    encouragement: "Your painful experiences too may one day become 'assets' that move someone's heart.",
  },
  // Murata
  {
    id: "quiz-042",
    athlete_id: "murata",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the primary motivation for Choji Murata choosing Tommy John surgery in an era when 'surgery meant retirement'?",
    choices: [
      "He had no other options",
      "A pioneering spirit of 'I'll make new history myself' combined with his belief in 'going the distance as a starting pitcher'",
      "He wanted to live in America",
      "The team ordered him to",
    ],
    correct_index: 1,
    rationale: "'They said surgery meant the end. Then I'll make new history.' The perseverance he learned from his fisherman father on a remote island, combined with his conviction of 'going the distance,' drove him to choose an unprecedented path. That decision paved the way for today's pitchers.",
    encouragement: "It's precisely because 'there is no precedent' that you have the chance to become the 'precedent.'",
  },
  // Watanabe
  {
    id: "quiz-043",
    athlete_id: "watanabe",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What is the core of the 'selfless playing style' Yuta Watanabe established to survive in the NBA?",
    choices: [
      "Standing out with flashy dunks and assists",
      "Playing it safe to avoid injuries",
      "Becoming 'indispensable to the team' through three-point shooting accuracy and defensive hustle",
      "Building relationships with star players",
    ],
    correct_index: 2,
    rationale: "To carve out a place in the NBA despite being outmatched in talent, Watanabe aimed to be 'indispensable to the team.' The three-point shooting he honed during rehab and his all-out defensive effort earned him respect from star players.",
    encouragement: "'First to arrive, last to leave.' Even without natural talent, the density of effort can open doors.",
  },
  // Akiyama
  {
    id: "quiz-044",
    athlete_id: "akiyama",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the greatest reason Shogo Akiyama could revive as 'the face of the team' at Hiroshima Carp after his MLB setback?",
    choices: [
      "His batting technique improved drastically from the MLB experience",
      "The experience of near-release taught him 'the weight of each day he can play baseball,' and his never-slacking hustle became an example for younger players",
      "Hiroshima's ballpark suited him",
      "His lowered salary boosted his motivation",
    ],
    correct_index: 1,
    rationale: "His MLB setback taught Akiyama 'the weight of each day he can play baseball.' His attitude of never slacking on running out balls at age 37, and giving his all for every at-bat -- that sincerity became the ultimate textbook for younger players and the spiritual pillar of the team.",
    encouragement: "Preparation is everything. Results follow later. Your daily attitude shapes your future self.",
  },
  // Uchimura
  {
    id: "quiz-045",
    athlete_id: "uchimura",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What was the 'asset transformation' behind Kohei Uchimura's decision to give up the individual all-around at the Tokyo Olympics and focus solely on the horizontal bar?",
    choices: [
      "He simply couldn't handle all events anymore due to physical decline",
      "The horizontal bar was his best event",
      "The 'ultimate efficiency without relying on power' that his shoulder pain taught him, combined with the aerial sense he cultivated since childhood, were focused on the single event where they could be maximized",
      "He was simply following his coach's instructions",
    ],
    correct_index: 2,
    rationale: "Uchimura's greatest 'assets' were the aerial sense developed on a trampoline in childhood and the efficient body mechanics his injuries taught him. The decision of a six-event champion to focus on one event was not 'regression' but a 'concentrated investment' to maximize his remaining assets.",
    encouragement: "The courage to let go of everything can make what matters most stand out. What should you be 'concentrating on'?",
  },
  // Tomita
  {
    id: "quiz-046",
    athlete_id: "tomita",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What became the greatest 'asset' when Uchu Tomita transitioned from an able-bodied athlete to a totally blind para swimmer?",
    choices: [
      "His swimming records as an able-bodied athlete",
      "Senses beyond vision sharpened through the process of losing his sight, and the presence of rival Keiichi Kimura",
      "The small number of para swimming competitors",
      "Support from surrounding sympathy",
    ],
    correct_index: 1,
    rationale: "Through the gradual process of losing his sight, his ability to sense water resistance and subtle muscle movements became 'sharper than sight.' Furthermore, the presence of Keiichi Kimura as an ultimate rival drew out his competitive spirit in the darkness. The source of new strength lay within what he had lost.",
    encouragement: "New possibilities may be hiding within what you've lost.",
  },
  // Sato Mami
  {
    id: "quiz-047",
    athlete_id: "sato_mami",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the greatest reason Mami Sato's Olympic bid speech moved the world?",
    choices: [
      "She was fluent in English",
      "The overwhelming persuasiveness rooted in lived experience of overcoming both right leg amputation and earthquake devastation",
      "The speech prepared by the Japanese government was excellent",
      "The Paralympics had high name recognition",
    ],
    correct_index: 1,
    rationale: "Her words about 'the power of sports' were not textbook platitudes but were born from her actual experience of losing her right leg and having her hometown swallowed by the tsunami. That is precisely why they moved the hearts of IOC members.",
    encouragement: "True persuasiveness belongs only to those who have lived it. Your experiences surely have the power to move someone's heart too.",
  },
  // Zanardi
  {
    id: "quiz-048",
    athlete_id: "zanardi",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What is the most essential reason Alex Zanardi remained remarkably positive after losing both legs?",
    choices: [
      "He had an optimistic personality",
      "Doctors told him he could 'return to a normal life'",
      "His 'indomitable fighting spirit' as a racer became the driving force to keep seeking 'the next race (in life)' even after losing both legs",
      "He received a large insurance payout",
    ],
    correct_index: 2,
    rationale: "Zanardi's greatest 'asset' was his indomitable fighting spirit as a racer. In racing, even after a crash, you head toward the next race -- that mentality became the driving force to keep seeking 'new races' even after losing both legs.",
    encouragement: "Life is a race. Even if the course changes, as long as you have the will to keep going, you'll always find a new finish line.",
  },
  // Eriksen
  {
    id: "quiz-049",
    athlete_id: "eriksen",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What was the greatest factor behind Christian Eriksen returning to the Premier League roughly 7 months after cardiac arrest?",
    choices: [
      "His heart recovered miraculously quickly",
      "ICD technology had advanced significantly",
      "The willpower to keep training alone even after losing his team, and his pure love for football",
      "He rushed his return",
    ],
    correct_index: 2,
    rationale: "Even after Inter Milan terminated his contract and he lost his place, Eriksen kept training alone in silence. His pure love of football -- 'Just being on the pitch makes me feel alive' -- made his unprecedented return to the Premier League with an ICD possible.",
    encouragement: "Those who truly love something can always find their way back. What is it that you love?",
  },
  // Yamasaki
  {
    id: "quiz-050",
    athlete_id: "yamasaki",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the greatest turning point in Yasuaki Yamasaki's recovery from his slump?",
    choices: [
      "He mastered a new breaking ball",
      "In the minors, he re-examined not just his technique but his mental approach, supported by letters from fans, and returned to his roots",
      "His pitching coach changed",
      "His stamina recovered",
    ],
    correct_index: 1,
    rationale: "The cause of his slump was not just technical but also mental. While rebuilding his form from scratch in the minors, he was supported by letters from fans, found gratitude for his mother, and returned to the fundamental truth that 'the mound is where I belong.' That was the key to his revival.",
    encouragement: "A slump is an opportunity to 'return to basics.' What you're missing today might surprisingly be found in your original passion.",
  },
  // Hanyu
  {
    id: "quiz-051",
    athlete_id: "hanyu",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What was the greatest 'asset' that allowed Yuzuru Hanyu to win gold at the PyeongChang Olympics despite a severe right ankle injury?",
    choices: [
      "Youth-driven recovery ability",
      "Effective pain medication",
      "A scientific approach of self-studying anatomy to manage his body at millimeter precision, combined with the mental strength to channel pain into performance",
      "His rivals were in poor form",
    ],
    correct_index: 2,
    rationale: "During the period he couldn't step on the ice, Hanyu self-studied anatomy and scientifically determined a landing method that minimized strain on his right ankle. The fusion of his mentality -- 'the stronger the pain, the more I can unleash myself' -- and his scientific approach created the legend of winning Olympic gold right after an injury.",
    encouragement: "The fusion of knowledge and mental strength is the ultimate weapon. As long as you never stop learning, a path will always open.",
  },
  // Endo
  {
    id: "quiz-052",
    athlete_id: "endo",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the greatest reason Wataru Endo became a key player in defeating Germany and Spain at the World Cup?",
    choices: [
      "Physical strength alone",
      "The quality of preparation -- thoroughly analyzing opponents' video during concussion rehab so the outcome was decided before the match began",
      "The team's superior tactics",
      "The opponents were complacent",
    ],
    correct_index: 1,
    rationale: "'Preparation is everything. The outcome is decided before the match begins.' While unable to take the pitch due to a concussion, he analyzed videos of Germany's and Spain's players hundreds of times, making every opponent's move 'already predicted' before stepping onto the field. A textbook example of turning adversity into preparation time.",
    encouragement: "'Preparation' may be unglamorous, but it's the most reliable way to produce results. Today's preparation will change tomorrow's you.",
  },
  // Ueno
  {
    id: "quiz-053",
    athlete_id: "ueno",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the most essential factor in Yukiko Ueno's recovery from a compound jaw fracture?",
    choices: [
      "Youth-driven recovery ability",
      "Even with her mouth wired shut, she trained the parts she could still move (legs and hips) with full intensity, evolving her pitching style into a mature, control-based approach",
      "The injury was minor",
      "Her teammates pitched in her place",
    ],
    correct_index: 1,
    rationale: "Ueno focused on 'what she could move' rather than 'what she couldn't.' If her jaw was out of commission, she would train her legs and core, transitioning from power pitching to refined command. This mindset of 'turning constraints into catalysts for evolution' made her Olympic gold at age 39 possible.",
    encouragement: "Rather than lamenting 'what you can't do,' focus on 'what you can.' Ueno's rehabilitation philosophy offers wisdom applicable to everyday life.",
  },
  // Nishikori
  {
    id: "quiz-054",
    athlete_id: "nishikori",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What is the most essential reason Kei Nishikori chose to restart from Challenger tournaments after his long-term absence?",
    choices: [
      "It was a sponsor's request",
      "He wasn't physically ready for Grand Slams",
      "During his time away, he rediscovered his pure love of tennis, prioritizing the joy of playing over winning and losing",
      "It was for ranking points",
    ],
    correct_index: 2,
    rationale: "Nishikori has said, 'During my time off, I fell even more in love with tennis.' Freed from past pressures and returning to a pure love of tennis, he was able to set aside his pride and choose to rebuild from the Challenger circuit.",
    encouragement: "The feeling of 'love' is the strongest motivation. Believe in the power of purely loving something.",
  },
  // Fujiwara
  {
    id: "quiz-055",
    athlete_id: "fujiwara",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "How did Noriko Fujiwara's 'purpose of rehabilitation' change after discovering wheelchair basketball?",
    choices: [
      "It changed from 'being able to walk' to 'being able to push a wheelchair faster'",
      "The purpose of rehabilitation didn't change",
      "It changed from 'daily life functioning' to 'competing in the Paralympics'",
      "It changed from 'healing' to 'training'",
    ],
    correct_index: 0,
    rationale: "Fujiwara's rehabilitation goal shifted from 'running' to 'pushing.' By reframing the wheelchair from 'a symbol of disability' to 'a cool fighting machine,' she flipped the switch to reboot her life.",
    encouragement: "Changing your goal is not the same as giving up. Finding a new finish line can be the beginning of a new life.",
  },
  // Sasaki
  {
    id: "quiz-056",
    athlete_id: "sasaki",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What is the most accurate reason Roki Sasaki was kept off the mound during his first professional year?",
    choices: [
      "He lacked the skill level",
      "He was injured",
      "His still-developing body was handled like 'delicate glasswork,' prioritizing building his body for the future",
      "He personally refused to pitch",
    ],
    correct_index: 2,
    rationale: "Manager Yoshii upheld the policy of 'developing without rushing.' The body capable of throwing 165 km/h was also fragile. By treating his 'period of not pitching' as 'preparation time' and building up his body, it led to the remarkable achievement of a perfect game.",
    encouragement: "'The courage to wait' is also a legitimate strength. Even if results don't come now, preparation time will definitely change the future.",
  },
  // Kimura Saori
  {
    id: "quiz-057",
    athlete_id: "kimura_saori",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the turning point that allowed Saori Kimura to win a medal for the first time in 28 years at the London Olympics?",
    choices: [
      "She learned a new spiking technique",
      "When she realized 'it's not all on my shoulders alone,' she was freed from the pressure of captaincy and could bring out the team's full potential",
      "The opponents were weak",
      "The coach's tactics were superior",
    ],
    correct_index: 1,
    rationale: "Kimura has said, 'Volleyball is about connecting together. I became stronger when I realized it's not all my responsibility alone.' Learning to share the burden of captaincy with the team instead of shouldering it alone opened the path to the first medal in 28 years.",
    encouragement: "You don't have to carry everything alone. Asking for help is also a form of strength.",
  },
  // Takahashi Naoko
  {
    id: "quiz-058",
    athlete_id: "takahashi_naoko",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the most effective thing Naoko Takahashi did during the period she couldn't run due to plantar fasciitis?",
    choices: [
      "She rested completely and focused on foot recovery",
      "While unable to run, she trained 'every muscle except the sole of her foot' to be the best in Japan, completing a total body transformation",
      "She tried switching to another sport",
      "She focused on mental training",
    ],
    correct_index: 1,
    rationale: "'If I can't run, I'll build a body that's ready to run.' She reframed the situation and trained her abs and core thousands of times a day, preparing her body to perform at its best the moment she could run again. The result: she broke the world record at the Berlin Marathon upon her return.",
    encouragement: "Give your all to 'what you can do now.' Takahashi's shift in mindset is applicable to any difficulty.",
  },
  // Oe
  {
    id: "quiz-059",
    athlete_id: "oe",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the greatest reason Hikari Oe was able to come back from the worst-case scenario of tearing both ACLs?",
    choices: [
      "Advances in medical technology",
      "Youth-driven recovery ability",
      "During rehab, she fundamentally improved her landing form and constructed a new style that minimized stress on her knees",
      "Improved performance of knee braces",
    ],
    correct_index: 2,
    rationale: "Through rehabilitation that involved 'rebuilding muscle like assembling a puzzle,' Oe analyzed her landing motion in slow motion hundreds of times. Achieving a more beautiful, softer landing than before her injuries is what made her comeback on 'battered knees' possible.",
    encouragement: "Sometimes what you rebuild after breaking turns out better than before. That may be true for things and for people alike.",
  },
  // Taniguchi
  {
    id: "quiz-060",
    athlete_id: "taniguchi",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What is the background behind the 'uniquely personal riding style' Rea Taniguchi demonstrated at the Beijing Paralympics?",
    choices: [
      "State-of-the-art snowboarding equipment",
      "She refined a unique sense of balance while optimizing prosthetics and braces, overcoming both congenital disability and acquired injury",
      "Superior coaching",
      "She practiced more than other athletes",
    ],
    correct_index: 1,
    rationale: "Taniguchi says, 'My disability is part of my individuality.' She overcame the double handicap of a congenital left leg disability and competition injuries through adjustments to prosthetics and braces, creating a riding style that nobody else can replicate.",
    encouragement: "The mindset of turning 'weaknesses' into 'individuality' is the ultimate weapon anyone can apply to their own life.",
  },
  // Ikezaki
  {
    id: "quiz-061",
    athlete_id: "ikezaki",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What was the greatest factor behind Daisuke Ikezaki winning a gold medal in his 40s despite living with a progressive disease?",
    choices: [
      "The disease progression stopped",
      "He devised new training methods matched to his declining functions, taking a unique approach of training remaining abilities tenfold",
      "His teammates covered everything for him",
      "The rules of wheelchair rugby changed",
    ],
    correct_index: 1,
    rationale: "Ikezaki's philosophy of 'just train what's left tenfold' drove him to constantly reconstruct his training as his condition progressed. When grip strength declined, he strengthened his core; when leg sensation faded, he fortified his upper body. This 'power of continuous adaptation' made the Paris gold medal possible.",
    encouragement: "Continuously adapting to change may be the strongest way to live. Why not try adapting to just one thing today?",
  },
  // Kobayashi
  {
    id: "quiz-062",
    athlete_id: "kobayashi",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "What was the greatest reason Ryoyu Kobayashi overcame his mental slump?",
    choices: [
      "He hired a mental trainer",
      "He temporarily stepped away from competition",
      "He learned resilience from his mentor Noriaki Kasai's 'commitment to continuing' and rediscovered the 'joy of jumping'",
      "The structure of the ski jump hill changed",
    ],
    correct_index: 2,
    rationale: "Noriaki Kasai, still competing past 50, taught Kobayashi mental toughness through the 'power of perseverance.' Returning to his core philosophy of 'having fun wins,' Kobayashi was freed from pressure and won the first individual gold medal in 24 years.",
    encouragement: "Have you forgotten to 'enjoy' things? The joy of doing what you love might be the ultimate mental training.",
  },
  // Suzuki Takayuki
  {
    id: "quiz-063",
    athlete_id: "suzuki_takayuki",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What was the most important action Takayuki Suzuki took to win gold after a 13-year gap?",
    choices: [
      "He increased his training volume",
      "He developed a new swimsuit",
      "He relocated to the UK and fundamentally reconstructed his swimming using cutting-edge sports science",
      "He changed his events",
    ],
    correct_index: 2,
    rationale: "To push 'how to use what he has' to the limit, Suzuki relocated to the UK. By incorporating cutting-edge science such as fluid dynamics and motion analysis, he constructed an 'artistic swimming style' that minimized water resistance. Competing on efficiency rather than power, this new approach bridged the 13-year gap.",
    encouragement: "The courage to change your environment can break through stagnation. A single step into a new place might change your future.",
  },
  // Otaki
  {
    id: "quiz-064",
    athlete_id: "otaki",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "What is the most essential reason Hideji Otaki was called a 'spiritual athlete'?",
    choices: [
      "He held a rank in kyudo (Japanese archery)",
      "Having experienced war, poverty, illness, and long years of obscurity, he embodied the kyudo spirit of 'seisha hicchu' (true aim, certain hit) by honing 'words' and 'timing' to their absolute limits",
      "He had high physical ability",
      "He won many awards",
    ],
    correct_index: 1,
    rationale: "Like the kyudo principle of 'seisha hicchu,' Otaki poured his entire being into each role. War, poverty, illness, and long years of obscurity became 'life's fertilizer,' giving his words a singular weight that elevated him into a being known as a 'spiritual athlete.'",
    encouragement: "No experience in life is wasted. The difficult times will give depth to your words and your presence.",
  },
];

// ===== Body Region Coordinates (English labels) =====
export const bodyRegionCoordinates: BodyCoord[] = [
  { region: "head", x: 0, y: 1.7, z: 0, label_ja: "Head" },
  { region: "neck", x: 0, y: 1.55, z: 0, label_ja: "Neck" },
  { region: "shoulder_left", x: -0.25, y: 1.4, z: 0, label_ja: "Left Shoulder" },
  { region: "shoulder_right", x: 0.25, y: 1.4, z: 0, label_ja: "Right Shoulder" },
  { region: "upper_arm_left", x: -0.35, y: 1.25, z: 0, label_ja: "Left Upper Arm" },
  { region: "upper_arm_right", x: 0.35, y: 1.25, z: 0, label_ja: "Right Upper Arm" },
  { region: "elbow_left", x: -0.4, y: 1.1, z: 0, label_ja: "Left Elbow" },
  { region: "elbow_right", x: 0.4, y: 1.1, z: 0, label_ja: "Right Elbow" },
  { region: "forearm_left", x: -0.4, y: 0.95, z: 0, label_ja: "Left Forearm" },
  { region: "forearm_right", x: 0.4, y: 0.95, z: 0, label_ja: "Right Forearm" },
  { region: "chest", x: 0, y: 1.3, z: 0.1, label_ja: "Chest" },
  { region: "upper_back", x: 0, y: 1.3, z: -0.1, label_ja: "Upper Back" },
  { region: "lower_back", x: 0, y: 1.05, z: -0.1, label_ja: "Lower Back" },
  { region: "abdomen", x: 0, y: 1.1, z: 0.1, label_ja: "Abdomen" },
  { region: "hip_left", x: -0.15, y: 0.9, z: 0, label_ja: "Left Hip" },
  { region: "hip_right", x: 0.15, y: 0.9, z: 0, label_ja: "Right Hip" },
  { region: "thigh_left", x: -0.15, y: 0.7, z: 0, label_ja: "Left Thigh" },
  { region: "thigh_right", x: 0.15, y: 0.7, z: 0, label_ja: "Right Thigh" },
  { region: "knee_left", x: -0.15, y: 0.5, z: 0, label_ja: "Left Knee" },
  { region: "knee_right", x: 0.15, y: 0.5, z: 0, label_ja: "Right Knee" },
  { region: "ankle_left", x: -0.15, y: 0.15, z: 0, label_ja: "Left Ankle" },
  { region: "ankle_right", x: 0.15, y: 0.15, z: 0, label_ja: "Right Ankle" },
  { region: "foot_left", x: -0.15, y: 0.05, z: 0.05, label_ja: "Left Foot" },
  { region: "foot_right", x: 0.15, y: 0.05, z: 0.05, label_ja: "Right Foot" },
];

// ===== Helper Functions =====
export function getAthleteById(id: string) {
  return athletes.find((a) => a.id === id) ?? null;
}

export function getInjuriesByAthleteId(id: string) {
  return athleteInjuries.filter((i) => i.athlete_id === id).sort((a, b) => b.severity - a.severity);
}

export function getQuizById(id: string) {
  return quizQuestions.find((q) => q.id === id) ?? null;
}

export function getQuizzesByAthleteId(id: string | null) {
  if (!id) return quizQuestions;
  return quizQuestions.filter((q) => q.athlete_id === id || q.athlete_id === null);
}

export function searchInjuries(bodyRegion?: string | null, injuryType?: string | null) {
  let results = [...athleteInjuries];
  if (bodyRegion) results = results.filter((i) => i.body_region === bodyRegion);
  if (injuryType) results = results.filter((i) => i.injury_type === injuryType);
  return results
    .sort((a, b) => b.severity - a.severity)
    .map((injury) => ({
      ...injury,
      athletes: athletes.find((a) => a.id === injury.athlete_id)!,
    }));
}
