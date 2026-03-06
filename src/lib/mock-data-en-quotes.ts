import type { GoldenQuote, Testimony } from "./mock-data";

export const goldenQuotes: GoldenQuote[] = [
  // McMorris
  {
    id: "gq-001",
    athlete_id: "mcmorris",
    quote: "When I woke up, I was just grateful to be alive. Before the accident, I was crushed by the pressure of having to win. But that catastrophic injury taught me that simply being able to snowboard is a miracle in itself.",
    context: null,
  },
  {
    id: "gq-002",
    athlete_id: "mcmorris",
    quote: "During rehab, I treated myself like a corporate turnaround project. Did my 'assets' grow from yesterday? If my knee could bend a little more, that was a massive 'profit.'",
    context: "His mindset during rehabilitation",
  },
  // Hirano
  {
    id: "gq-003",
    athlete_id: "hirano",
    quote: "When I injured my liver, it was the first time I truly confronted death. But that experience stripped away all the noise in my head. 'Ride so you have no regrets, no matter when it ends.' My strength today was born from that moment of despair.",
    context: null,
  },
  {
    id: "gq-004",
    athlete_id: "hirano",
    quote: "I'd be lying if I said it doesn't hurt. But I don't have time to sit around waiting for bones to heal. I ride by letting my mind take control of my body. The fracture is just part of who I am.",
    context: "Competing at the Milan Olympics with a pelvic fracture",
  },
  // Okamoto
  {
    id: "gq-005",
    athlete_id: "okamoto",
    quote: "Right after the accident, I thought I'd never set foot on a mountain again. But when I discovered the world of para sports during rehab, I felt this rush of excitement — a whole new adventure was about to begin.",
    context: null,
  },
  {
    id: "gq-006",
    athlete_id: "okamoto",
    quote: "I can honestly say I love snowboarding more now than I did as a pro. Losing my ability changed the weight of every single moment I strap into a board. That's an asset I never could have gained without the injury.",
    context: null,
  },
  // Ohtani
  { id: "gq-007", athlete_id: "ohtani", quote: "I see rehab as a chance to 'update' myself.", context: null },
  { id: "gq-008", athlete_id: "ohtani", quote: "Because of the injury, I was able to rethink how to use my body more efficiently than ever before.", context: "After Tommy John surgery" },
  // Murray
  { id: "gq-009", athlete_id: "murray", quote: "To play the sport I love without pain — that alone already makes me a winner.", context: null },
  { id: "gq-010", athlete_id: "murray", quote: "They told me I'd never play professionally again. But my heart was screaming, 'This isn't over yet.'", context: "After hip resurfacing surgery" },
  // Kunieda
  { id: "gq-011", athlete_id: "kunieda", quote: "I am the strongest!", context: null },
  { id: "gq-012", athlete_id: "kunieda", quote: "It's always your own mind that sets the limits. My wheelchair isn't a constraint — it's my legs and my wings.", context: null },
  // Ikee
  { id: "gq-013", athlete_id: "ikee", quote: "Adversity doesn't visit those who can't overcome it. God only gives trials to those strong enough to endure them.", context: null },
  { id: "gq-014", athlete_id: "ikee", quote: "In the hardest moments, someone is always there to hold you up. That's the greatest happiness of all.", context: "After returning from leukemia" },
  // Woods
  { id: "gq-015", athlete_id: "woods", quote: "I just wanted to play with my son one more time. That wish is what pulled me back to my feet.", context: null },
  { id: "gq-016", athlete_id: "woods", quote: "The pain may never go away. But how you accept it and how you manage it — that's what golf is all about.", context: "After the car accident" },
  // Mitoma
  { id: "gq-017", athlete_id: "mitoma", quote: "I saw the injury as a gift — a chance to analyze my own game from the outside.", context: null },
  { id: "gq-018", athlete_id: "mitoma", quote: "Giving up was never in my vocabulary. The only option I've ever known is to keep going.", context: null },
  // Abe
  { id: "gq-019", athlete_id: "abe", quote: "Having the courage to step back gives you the power to take two steps forward.", context: null },
  { id: "gq-020", athlete_id: "abe", quote: "Who you are after a loss — that's where your true character reveals itself.", context: null },
  // Kimura
  { id: "gq-021", athlete_id: "kimura", quote: "Because I can't see, my other senses are sharpened to a level others will never know. That's my privilege alone.", context: null },
  { id: "gq-022", athlete_id: "kimura", quote: "The years without a gold medal taught me the true value of the people around me.", context: "After the Rio Olympics" },
  { id: "gq-051", athlete_id: "kimura", quote: "I want to measure happiness by my own yardstick, not anyone else's. Being blind is not a misfortune. What you feel and what you believe in — those are what give life its color.", context: null },
  { id: "gq-052", athlete_id: "kimura", quote: "When I came away from Rio with silver, it was the first time I truly felt that anything less than gold meant nothing to me. Without that frustration, I never would have found the resolve to move to America.", context: "His determination after the Rio Paralympics" },
  // Sanibrawn
  { id: "gq-023", athlete_id: "sanibrawn", quote: "The time I spent injured was a research period — a chance to have a deep conversation with my own body.", context: null },
  { id: "gq-024", athlete_id: "sanibrawn", quote: "There's no need to rush back. When I return at 100%, the results will follow.", context: null },
  // Ito
  { id: "gq-025", athlete_id: "ito", quote: "The bitterness of defeat is the greatest investment toward winning the next match.", context: null },
  { id: "gq-026", athlete_id: "ito", quote: "I don't care what anyone else says. I'm walking my own path.", context: null },
  // Toratani
  { id: "gq-027", athlete_id: "toratani", quote: "Once I pick up the sword, it doesn't matter that my legs can't move. In that world, I am free.", context: null },
  { id: "gq-028", athlete_id: "toratani", quote: "The person I am today exists to surpass the person I was yesterday.", context: null },
  // ===== NEW ATHLETES (15-50) =====
  // Durant
  {
    id: "gq-029",
    athlete_id: "durant",
    quote: "When I tore my Achilles, I saw it as a chance to rebuild myself from scratch. My walk, my jump, my shooting angle — I redesigned everything from the ground up. It was lonely work, but it was a 'reinvention' that only I could do.",
    context: "On his return from the Achilles tendon rupture",
  },
  {
    id: "gq-030",
    athlete_id: "durant",
    quote: "My mother always said, 'You are special. But you only become special after you put in the work.' When I called her the 'real MVP' in my trophy speech, I meant every word. Without her, I never would have stepped on that court.",
    context: "Reflecting on his MVP acceptance speech",
  },
  // Takahashi Ran
  {
    id: "gq-031",
    athlete_id: "takahashi_ran",
    quote: "The time I couldn't be on court was time spent studying volleyball more objectively than anyone else. I analyzed hundreds of plays by the world's best. By the time I came back, I had dozens of new tools in my arsenal.",
    context: "On his rehabilitation during an ankle injury",
  },
  {
    id: "gq-032",
    athlete_id: "takahashi_ran",
    quote: "My brother Rui always told me, 'Don't rush — your time will come.' Those words kept me going through every day on crutches. I truly believe that setbacks are just the windup before something greater.",
    context: null,
  },
  // Leitch
  {
    id: "gq-033",
    athlete_id: "leitch",
    quote: "When I came to Japan at 15, I didn't understand the language or the culture. But a rugby ball is the same in any country. Overcoming that fear is exactly why I could decide not to back down when I got injured right before the World Cup.",
    context: null,
  },
  {
    id: "gq-034",
    athlete_id: "leitch",
    quote: "The times I couldn't play because of injury were when I thought the hardest about what I could do for my team. Standing at the tactics board, mentoring the younger players, being the loudest voice at training. A captain's job doesn't end at the sideline.",
    context: "On his injury period before the 2019 World Cup",
  },
  // Irie
  {
    id: "gq-035",
    athlete_id: "irie",
    quote: "I don't have natural talent. That's exactly why the only way I can feel confident is by training harder than anyone else. Repetition after repetition after repetition. Like a frog coiling before a jump, I repeat the same motion thousands of times. That accumulation is my only weapon.",
    context: null,
  },
  {
    id: "gq-036",
    athlete_id: "irie",
    quote: "When I was in a slump and considering retirement, I spent hours watching my pet frog at home. Frogs don't rush. They stay perfectly still, gathering energy until the moment they leap. My frog taught me that I should do the same.",
    context: "Her mindset during the slump",
  },
  // Kasai
  {
    id: "gq-037",
    athlete_id: "kasai",
    quote: "My true ski jumping career only began after I turned 40. When I was young, I wanted to fly. Now, I'm grateful that I can fly. I believe that shift in mindset is what earned me a medal at 41.",
    context: "After winning silver at the Sochi Olympics",
  },
  {
    id: "gq-038",
    athlete_id: "kasai",
    quote: "The death of my sister, hardships in my family — life has thrown countless trials at me. But the moment I stand atop the jump, I'm free from all gravity. In those seconds of flight, I'm freer than anyone on earth. That's why I keep jumping.",
    context: null,
  },
  // Tanaka
  {
    id: "gq-039",
    athlete_id: "tanaka",
    quote: "My obsession with every single pitch — that's the one thing I refuse to lose to anyone. It wasn't until I blew out my elbow that I realized the old me, who relied on raw power, didn't know what true pitching was. The injury taught me to think on the mound.",
    context: null,
  },
  {
    id: "gq-040",
    athlete_id: "tanaka",
    quote: "My wife Mai managed my meals down to every last detail. She taught me, someone who knew nothing about nutrition, what recovery through diet really means. The reason I could keep pitching with a ticking time bomb in my elbow was because of what she put on that table every night.",
    context: "On his wife Mai Satoda's nutritional management",
  },
  // Ishikawa
  {
    id: "gq-041",
    athlete_id: "ishikawa",
    quote: "If you want to be the best in the world, you need to put yourself in the toughest environment in the world. Going to Italy meant leaving my comfort zone behind. And the injuries that followed were just another test on that same path of commitment.",
    context: null,
  },
  {
    id: "gq-042",
    athlete_id: "ishikawa",
    quote: "While I was out with injuries, I spiked the ball hundreds of times in my mind. I spent my days with my physical therapist, adjusting my body balance down to the millimeter. By the time I returned, I had developed a spike built on technique, not just power.",
    context: "After returning from back and lower-body injuries",
  },
  // Yamamoto
  {
    id: "gq-043",
    athlete_id: "yamamoto",
    quote: "Your unique strength is born from questioning conventional wisdom. When I incorporated a javelin throw motion into my pitching, people laughed. But that unconventional approach is what brought me this far. I overcame my injuries the same way — by refusing to follow the standard playbook.",
    context: null,
  },
  {
    id: "gq-044",
    athlete_id: "yamamoto",
    quote: "I reframed the time I couldn't pitch as the perfect investment period to rest my shoulder. I spent three months indoors, repeating mechanical adjustments thousands of times to adapt to major league mounds. Without those three months, that flawless playoff performance never would have happened.",
    context: "On his return from a right shoulder injury in 2024",
  },
  // Fukuhara
  {
    id: "gq-045",
    athlete_id: "fukuhara",
    quote: "Even if you lose, if you take something away from it, it's not really a loss. Every tear I shed made me stronger. The racket I've been swinging through tears since I was three years old is the origin of everything I am.",
    context: null,
  },
  {
    id: "gq-046",
    athlete_id: "fukuhara",
    quote: "When an injury kept me from holding a racket, I started playing table tennis with my left hand. There's always something you can do. My entire table tennis career has been about finding solutions, not excuses.",
    context: "During rehabilitation from a fracture",
  },
  // Inoue
  {
    id: "gq-047",
    athlete_id: "inoue",
    quote: "Only an overwhelming volume of training can silence the fear inside the ring. The fundamentals my father drilled into me tens of thousands of times live in my fists. It's not talent that creates a monster — it's repetition.",
    context: null,
  },
  {
    id: "gq-048",
    athlete_id: "inoue",
    quote: "When I fractured my orbital bone, I was seeing double. But I told myself, 'If one eye still works, I can win.' Pain is temporary, but the regret of giving up lasts forever.",
    context: "On the orbital floor fracture in the Donaire fight",
  },
  // Kunieda v2
  {
    id: "gq-049",
    athlete_id: "kunieda_v2",
    quote: "The wheelchair is my 'legs.' Mastering how to ride it is my tennis. The sensation of becoming one with your equipment — that might be a realm able-bodied athletes can never experience.",
    context: null,
  },
  {
    id: "gq-050",
    athlete_id: "kunieda_v2",
    quote: "When injuries led to a losing streak, I got stronger by finally admitting my own weakness. Before I could shout 'I am the strongest,' I first had to accept the weakest parts of myself. That was true strength.",
    context: "Reflecting on his slump after right elbow surgery",
  },
  // Tani
  {
    id: "gq-053",
    athlete_id: "tani",
    quote: "Instead of counting what I've lost, I want to make the most of what remains. Even after losing my right leg, I still had the desire to run. That was more than enough.",
    context: null,
  },
  {
    id: "gq-054",
    athlete_id: "tani",
    quote: "When the earthquake and tsunami washed away my hometown, I became certain that as long as you're alive, anything is possible. The grief of losing a leg, the grief of losing a home — and still, human beings can stand back up.",
    context: "Her feelings after the Great East Japan Earthquake",
  },
  // Murata
  {
    id: "gq-055",
    athlete_id: "murata",
    quote: "In life, I want to go the distance — a complete game. I want to stay on my own two feet until the very end. If I can still stand on that mound, I'll pitch as many times as it takes. That's just what a pitcher is.",
    context: null,
  },
  {
    id: "gq-056",
    athlete_id: "murata",
    quote: "They told me the surgery would end my career. Fine — then I'll write a new chapter of history. A road no one has walked before is a road worth walking precisely because it's uncharted.",
    context: "His mindset when deciding to undergo Tommy John surgery",
  },
  // Watanabe
  {
    id: "gq-057",
    athlete_id: "watanabe",
    quote: "If you don't have talent, you show up to the gym earlier than everyone else and leave later than everyone else. To survive at the highest level in the NBA, that was the only way I knew how.",
    context: null,
  },
  {
    id: "gq-058",
    athlete_id: "watanabe",
    quote: "The time you can't be on the court is the most important time to look inward. What you think about on the days you can't run, what you sharpen — that determines who you are the next time you step on the floor.",
    context: "During rehabilitation from a hamstring injury",
  },
  // Akiyama
  {
    id: "gq-059",
    athlete_id: "akiyama",
    quote: "Preparation is everything. The result is just a confirmation of your preparation. Those 216 hits were simply the culmination of swinging a bat every single day.",
    context: null,
  },
  {
    id: "gq-060",
    athlete_id: "akiyama",
    quote: "Being on the verge of being cut taught me the weight of every single day I get to play baseball. Swinging a bat, standing on the field — the moment I realized those aren't guaranteed, I fell even more in love with the game.",
    context: "His mindset after being designated for assignment in MLB",
  },
  // Uchimura
  {
    id: "gq-061",
    athlete_id: "uchimura",
    quote: "I'm not a genius. I just trained harder and thought about gymnastics more deeply than anyone else. Because I don't have natural talent, I repeat a single skill thousands of times. Beauty lives on the other side of that repetition.",
    context: null,
  },
  {
    id: "gq-062",
    athlete_id: "uchimura",
    quote: "The pain in both shoulders taught me the ultimate efficiency — how to move without relying on strength. Not muscling through the air, but making gravity and centrifugal force my allies. Injury forced me to evolve.",
    context: "Interview before the Tokyo Olympics",
  },
  // Tomita
  {
    id: "gq-063",
    athlete_id: "tomita",
    quote: "Despair is nothing more than a screen on which a new version of yourself is projected. Only in the darkness could I finally see the light within me.",
    context: null,
  },
  {
    id: "gq-064",
    athlete_id: "tomita",
    quote: "Because I lost my sight, the resistance of the water and the movement of my muscles became more vivid than vision ever was. Water never lies to me. Water is the only thing that can see for me.",
    context: "After the Paris Paralympics",
  },
  // Sato Mami
  {
    id: "gq-065",
    athlete_id: "sato_mami",
    quote: "Sport saved my life. That's why I want to give back through sport. The day I lost my right leg was the day my real life began.",
    context: null,
  },
  {
    id: "gq-066",
    athlete_id: "sato_mami",
    quote: "Even without a leg, my heart has wings. I wanted to bring smiles to the people of my hometown, the ones who lost everything to the tsunami, by showing them what it looks like to run. That's what drives me.",
    context: "The night before the Olympic bid speech",
  },
  // Zanardi
  {
    id: "gq-067",
    athlete_id: "zanardi",
    quote: "When I lost both legs, I thought, 'Well, this is my chance to pick up a new hobby — handcycling.' Life is a race. The course changed, but the finish line didn't.",
    context: null,
  },
  {
    id: "gq-068",
    athlete_id: "zanardi",
    quote: "In life, you have two choices: give up, or keep moving forward. I've always chosen the second one. That's the only talent I have.",
    context: "After winning Paralympic gold",
  },
  // Eriksen
  {
    id: "gq-069",
    athlete_id: "eriksen",
    quote: "Just standing on the pitch makes me feel alive. The smell of the grass, the roar of the stadium, the feel of the ball — everything feels like a miracle.",
    context: null,
  },
  {
    id: "gq-070",
    athlete_id: "eriksen",
    quote: "The day my heart stopped was simply my second birthday. From that day on, I've been living my second life at full throttle. I don't want to waste a single second.",
    context: "Interview after returning to the Premier League",
  },
  // Yamasaki
  {
    id: "gq-071",
    athlete_id: "yamasaki",
    quote: "The mound is where I belong. I won't give it up to anyone. Having nearly lost it once, I understand better than anyone how precious it is to stand there.",
    context: null,
  },
  {
    id: "gq-072",
    athlete_id: "yamasaki",
    quote: "A slump is a gift that forces you to go back to basics. The time I spent in the minors, rebuilding my pitching from zero, became the foundation of who I am today.",
    context: "Interview after his comeback",
  },
  // Hanyu
  {
    id: "gq-073",
    athlete_id: "hanyu",
    quote: "Effort can deceive you. But that deception is never wasted. There's no such thing as effort that goes unrewarded — it just pays off on a different timeline.",
    context: null,
  },
  {
    id: "gq-074",
    athlete_id: "hanyu",
    quote: "The worse the pain in my right ankle got, the more liberated I became. Pain erases fear. And once the fear is gone, all that's left to do is jump.",
    context: "After winning gold at the PyeongChang Olympics",
  },
  // Endo
  {
    id: "gq-075",
    athlete_id: "endo",
    quote: "Preparation is everything. The outcome is decided before the match even starts. I step onto the pitch with a hundred patterns of my opponent's movement in my head. That's why I never hesitate in the moment.",
    context: null,
  },
  {
    id: "gq-076",
    athlete_id: "endo",
    quote: "Being benched made me even tougher. The view from the bench taught me things I could never see from inside the pitch.",
    context: "After his transfer to Liverpool",
  },
  // Ueno
  {
    id: "gq-077",
    athlete_id: "ueno",
    quote: "Limits are something you set for yourself. I can still evolve. Standing on the mound past 40 is both my way of giving back to softball and proof of who I am.",
    context: null,
  },
  {
    id: "gq-078",
    athlete_id: "ueno",
    quote: "The day I broke my jaw, my softball career was reset to zero. My mouth was wired shut. I couldn't eat. But my legs still worked. I trained everything that still moved with everything I had. That was the beginning of a new me.",
    context: "During rehabilitation from a compound jaw fracture",
  },
  // Nishikori
  {
    id: "gq-079",
    athlete_id: "nishikori",
    quote: "Every time I get injured and come back, I rediscover the joy of playing tennis. Because I know that being on the court isn't a given, I can pour my soul into every single ball.",
    context: null,
  },
  {
    id: "gq-080",
    athlete_id: "nishikori",
    quote: "During my time away, I fell even more in love with tennis. That alone makes the comeback worthwhile. Even if my body isn't perfect, I want to prove that you can compete with tennis IQ.",
    context: "On his return through Challenger tournaments in 2023",
  },
  // Fujiwara
  {
    id: "gq-081",
    athlete_id: "fujiwara",
    quote: "My wheelchair is my 'fighter jet.' On the court, we clash with the same intensity as able-bodied athletes. Discovering this world was the greatest stroke of luck in my entire life.",
    context: null,
  },
  {
    id: "gq-082",
    athlete_id: "fujiwara",
    quote: "I consider my life to be bonus time — I already died once. That's why I fear nothing. The reason I fight harder under the basket than anyone else is because I know I have nothing left to lose.",
    context: "Upon being selected for Team Japan",
  },
  // Sasaki
  {
    id: "gq-083",
    athlete_id: "sasaki",
    quote: "Baseball is how I repay the people who supported me. After the earthquake took everything, baseball was all I had left. For me, pitching and living are the same thing.",
    context: null,
  },
  {
    id: "gq-084",
    athlete_id: "sasaki",
    quote: "The time I can't pitch is preparation time for my body to grow even bigger and stronger. I want to see what lies beyond 165 km/h. That's why I don't rush.",
    context: "On being held back from pitching in his rookie pro season",
  },
  // Kimura Saori
  {
    id: "gq-085",
    athlete_id: "kimura_saori",
    quote: "Volleyball is about connecting as a team. I got stronger the moment I realized I don't have to carry the weight alone. When the pressure of being captain was crushing me, it was my teammates' smiles that saved me.",
    context: null,
  },
  {
    id: "gq-086",
    athlete_id: "kimura_saori",
    quote: "I broke my fingers, but my spirit never broke. A spike hit with hands covered in tape carries the weight of all that pain. I believed that, and I went after that medal — Japan's first in 28 years.",
    context: "Before the London Olympics",
  },
  // Takahashi Naoko
  {
    id: "gq-087",
    athlete_id: "takahashi_naoko",
    quote: "Enjoying yourself is always the shortest path. Even the most brutal training became fun with Coach Koide by my side. Because I can run with a smile, the finish line 42.195 kilometers away stays in sight.",
    context: null,
  },
  {
    id: "gq-088",
    athlete_id: "takahashi_naoko",
    quote: "When plantar fasciitis stopped me from running, I trained every muscle in my body except my soles harder than anyone in Japan. If you can't run, build a body that can. It took a lot of tears to arrive at that simple answer.",
    context: "During her injury period after the Sydney Olympics",
  },
  // Oe
  {
    id: "gq-089",
    athlete_id: "oe",
    quote: "The loneliness of not being able to ride was far greater than the fear of getting back on the board. Every time my knee gave out, I thought, 'Maybe this is the end.' But the mountain kept calling, and its voice drowned out the fear.",
    context: null,
  },
  {
    id: "gq-090",
    athlete_id: "oe",
    quote: "Rehab is like reassembling your muscles piece by piece, like a puzzle. When you carefully fit each piece into place, the picture that emerges is more beautiful than before. My knees are a wreck, but my riding is smoother than ever.",
    context: "After her second ACL reconstruction surgery",
  },
  // Taniguchi
  {
    id: "gq-091",
    athlete_id: "taniguchi",
    quote: "My disability is just one part of who I am. On the board, we're all the same. The moment I touch the snow, there's no such thing as disabled or able-bodied. There's just a person who rides.",
    context: null,
  },
  {
    id: "gq-092",
    athlete_id: "taniguchi",
    quote: "If you fall and get back up, it's not a failure. I don't bother counting how many times I've fallen. I only count how many times I've gotten back up. That's my style.",
    context: "At the Beijing Paralympics",
  },
  // Ikezaki
  {
    id: "gq-093",
    athlete_id: "ikezaki",
    quote: "Wheelchair rugby is a combat sport. The impact that shatters wheelchairs is proof that I'm alive. The fear of my body gradually shutting down from disease — the only time I can forget it, no, overwrite it, is the moment of a tackle.",
    context: null,
  },
  {
    id: "gq-094",
    athlete_id: "ikezaki",
    quote: "Even as the disease takes away more and more of my movement, I just train what's left ten times harder. If my grip strength drops by one kilogram, I make my core ten kilograms stronger. That's how I've been balancing the equation all along.",
    context: "After winning gold at the Paris Paralympics",
  },
  // Kobayashi
  {
    id: "gq-095",
    athlete_id: "kobayashi",
    quote: "Those who enjoy it the most, win. Flying through the air feels incredible. There were times when the pressure nearly crushed me, but in the end, the pure joy of it overcame everything.",
    context: null,
  },
  {
    id: "gq-096",
    athlete_id: "kobayashi",
    quote: "Going through a terrible slump taught me the patience to wait for the right wind. In ski jumping, the wind can change everything. When I realized life is exactly the same, I felt my mental game level up.",
    context: "After winning the overall World Cup title",
  },
  // Suzuki Takayuki
  {
    id: "gq-097",
    athlete_id: "suzuki_takayuki",
    quote: "Instead of searching for what I'm missing, I think about how to use what I have. I may be missing limbs, but in the water, I'm free. Water doesn't treat me as disabled.",
    context: null,
  },
  {
    id: "gq-098",
    athlete_id: "suzuki_takayuki",
    quote: "I went thirteen years without a gold medal. That time is what made me a real athlete. From Beijing onward, I thought about quitting countless times. But I moved to England, rebuilt my stroke from the ground up, and the result was gold in Tokyo and Paris.",
    context: "After winning gold at the Tokyo Paralympics",
  },
  // Otaki
  {
    id: "gq-099",
    athlete_id: "otaki",
    quote: "The true path is moving forward one step at a time, even if you have to crawl. It took decades to reach the grand stage. But every single step built the person I am today. There were no shortcuts.",
    context: null,
  },
  {
    id: "gq-100",
    athlete_id: "otaki",
    quote: "It's in the moments of failure that your true self shows its face. War, poverty, illness — having experienced all of it, I could finally speak in 'real words.' I was a late bloomer as an actor because I needed life's fertilizer first.",
    context: "From a late-career interview",
  },
];

// ===== Testimonies =====
export const testimonies: Testimony[] = [
  {
    id: "tm-001",
    athlete_id: "mcmorris",
    speaker_name: "Craig McMorris",
    speaker_role: "Brother",
    quote: "Even in the hospital bed, he already had that look in his eyes — 'I'm going to ride again.' He'd been through hell, and he hadn't lost a thing.",
  },
  {
    id: "tm-002",
    athlete_id: "hirano",
    speaker_name: "Hidetaka Hirano",
    speaker_role: "Father",
    quote: "Ayumu always comes back from injury even sharper than before. He turns setbacks into seeds of evolution.",
  },
  {
    id: "tm-003",
    athlete_id: "okamoto",
    speaker_name: "A fellow snowboarder",
    speaker_role: "Fellow rider",
    quote: "The moment he stood on the snow again, it felt like the entire mountain was filled with hope.",
  },
  { id: "tm-004", athlete_id: "ohtani", speaker_name: "Dave Roberts", speaker_role: "Manager", quote: "He doesn't waste a single second, even during rehab. That level of focus is his true talent." },
  { id: "tm-005", athlete_id: "murray", speaker_name: "Roger Federer", speaker_role: "Tennis player", quote: "A man who keeps fighting with metal in his bones is the very definition of an indomitable spirit." },
  { id: "tm-006", athlete_id: "kunieda", speaker_name: "Rival players", speaker_role: "Players", quote: "Kunieda is a genius who never stops upgrading himself." },
  { id: "tm-007", athlete_id: "ikee", speaker_name: "Japan national team head coach", speaker_role: "Coach", quote: "The moment she appears at the poolside, the atmosphere of the entire team shifts." },
  { id: "tm-008", athlete_id: "woods", speaker_name: "Justin Thomas", speaker_role: "Golfer", quote: "The fact that he walked out there again is the greatest miracle in sports history." },
  { id: "tm-009", athlete_id: "mitoma", speaker_name: "Club manager", speaker_role: "Manager", quote: "Even when he was injured, he grew more off the pitch than anyone else on it." },
  { id: "tm-010", athlete_id: "abe", speaker_name: "All Japan head coach", speaker_role: "Coach", quote: "His attacking judo only gets sharper with every setback." },
  { id: "tm-011", athlete_id: "kimura", speaker_name: "U.S. coach", speaker_role: "Coach", quote: "His strength lies in never looking away from his own weaknesses." },
  { id: "tm-026", athlete_id: "kimura", speaker_name: "Japan national team coach", speaker_role: "Coach", quote: "His journey in America gave him depth as a human being, not just as a swimmer. The courage to move alone to a country where he's totally blind and doesn't speak the language — that multiplied the weight of his gold medal many times over." },
  { id: "tm-012", athlete_id: "sanibrawn", speaker_name: "U.S. coach", speaker_role: "Coach", quote: "After the injury, he came back a smarter, stronger athlete than he was before." },
  { id: "tm-013", athlete_id: "ito", speaker_name: "National team coach", speaker_role: "Coach", quote: "Her creativity deepened even further after she experienced adversity." },
  { id: "tm-014", athlete_id: "toratani", speaker_name: "Fencing official", speaker_role: "Official", quote: "The tip of her blade carries an edge that only someone who has overcome true despair can possess." },
  // ===== NEW ATHLETES (15-50) =====
  {
    id: "tm-015",
    athlete_id: "durant",
    speaker_name: "Steve Kerr",
    speaker_role: "Head coach",
    quote: "No player in NBA history has ever come back from an Achilles rupture at this level. He made the impossible possible.",
  },
  {
    id: "tm-016",
    athlete_id: "takahashi_ran",
    speaker_name: "Japan national team head coach",
    speaker_role: "Coach",
    quote: "He's incredibly mature mentally. Even when injured, he always understood exactly what he needed to be doing.",
  },
  {
    id: "tm-017",
    athlete_id: "leitch",
    speaker_name: "A teammate",
    speaker_role: "Player",
    quote: "Just having him around doubles the team's intensity. He's a true leader who leads by example.",
  },
  {
    id: "tm-018",
    athlete_id: "irie",
    speaker_name: "Her coach",
    speaker_role: "Coach",
    quote: "Her strength is deceptive — she may seem hesitant on the surface, but at her core, she has an unbreakable will.",
  },
  {
    id: "tm-019",
    athlete_id: "kasai",
    speaker_name: "An international rival",
    speaker_role: "Player",
    quote: "He has shattered every convention in ski jumping. He's still evolving past the age of 50.",
  },
  {
    id: "tm-020",
    athlete_id: "tanaka",
    speaker_name: "A former Yankees teammate",
    speaker_role: "Player",
    quote: "He never makes excuses, no matter what. Even when he's pitching through pain, he's a professional who finds a way to win.",
  },
  {
    id: "tm-021",
    athlete_id: "ishikawa",
    speaker_name: "Serie A head coach",
    speaker_role: "Coach",
    quote: "He's a coach on the court. Every time he overcomes an injury, his tactical vision expands.",
  },
  {
    id: "tm-022",
    athlete_id: "yamamoto",
    speaker_name: "Shohei Ohtani",
    speaker_role: "Teammate",
    quote: "He seemed to actually enjoy his rehab routine. That positivity is what accelerated his recovery.",
  },
  {
    id: "tm-023",
    athlete_id: "fukuhara",
    speaker_name: "Her coach at the time",
    speaker_role: "Coach",
    quote: "She never once said 'I can't' after an injury. She was always thinking, 'How can I make this work?' That mental flexibility is what propelled her to the top of the world.",
  },
  {
    id: "tm-024",
    athlete_id: "inoue",
    speaker_name: "International sports journalist",
    speaker_role: "International media",
    quote: "Beating Donaire with that injury is proof that his mental toughness is beyond human. Calmly executing his game plan with a fractured orbital floor was one of the most courageous moments in boxing history.",
  },
  {
    id: "tm-025",
    athlete_id: "kunieda_v2",
    speaker_name: "An international rival",
    speaker_role: "Player",
    quote: "He died once and came back to life. Now he's more unstoppable than ever. After his right elbow surgery, his backhand evolved even further.",
  },
  {
    id: "tm-027",
    athlete_id: "tani",
    speaker_name: "The people of Kesennuma",
    speaker_role: "Local residents",
    quote: "Her smile became a light for so many disaster survivors and children with disabilities. She lost her leg, she lost her hometown, and still she smiled. That smile saved us.",
  },
  {
    id: "tm-028",
    athlete_id: "murata",
    speaker_name: "Baseball analyst",
    speaker_role: "Analyst",
    quote: "Because he came back, an entire generation of pitchers stopped fearing the surgery and started believing in second chances. Murata Choji is Japan's Tommy John surgery pioneer.",
  },
  {
    id: "tm-029",
    athlete_id: "watanabe",
    speaker_name: "Former NBA teammate",
    speaker_role: "Player",
    quote: "I've never seen anyone work as hard as him. Even the stars respect him. When he was hurt, Yuta was always the first one in the training room.",
  },
  {
    id: "tm-030",
    athlete_id: "akiyama",
    speaker_name: "Team official",
    speaker_role: "Official",
    quote: "His dedication to the game is the greatest textbook any young player could have. When you see a 37-year-old sprinting out every ground ball, no one on the team can afford to take a play off.",
  },
  {
    id: "tm-031",
    athlete_id: "uchimura",
    speaker_name: "An international rival",
    speaker_role: "Gymnast",
    quote: "His spirit far transcends his body's limits. He turned pain into a spice for his performances. Kohei is gymnastics itself.",
  },
  {
    id: "tm-032",
    athlete_id: "tomita",
    speaker_name: "Para swimming coach",
    speaker_role: "Coach",
    quote: "His intellectual, composed analysis turned total blindness into his most powerful weapon. In the water, he 'sees' more than anyone.",
  },
  {
    id: "tm-033",
    athlete_id: "sato_mami",
    speaker_name: "Olympic bid committee member",
    speaker_role: "Official",
    quote: "It was her speech that brought the Olympics to Tokyo. That kind of persuasive power belongs only to someone who has conquered despair.",
  },
  {
    id: "tm-034",
    athlete_id: "zanardi",
    speaker_name: "Former F1 teammate",
    speaker_role: "Racing driver",
    quote: "He's a force of life. If there's one thing he's incapable of, it's giving up.",
  },
  {
    id: "tm-035",
    athlete_id: "eriksen",
    speaker_name: "Club manager",
    speaker_role: "Manager",
    quote: "The moment he walked back onto the pitch, the entire stadium was engulfed in tears and joy. This is a modern-day miracle.",
  },
  {
    id: "tm-036",
    athlete_id: "yamasaki",
    speaker_name: "Pitching coach",
    speaker_role: "Coach",
    quote: "Hitting rock bottom made him far more cunning in how he outthinks batters. The slump is what turned him into a true closer.",
  },
  {
    id: "tm-037",
    athlete_id: "hanyu",
    speaker_name: "International sports journalist",
    speaker_role: "Media",
    quote: "He is beloved by the god of ice, but he is an even harder taskmaster on himself. Yuzuru's performances transcend art — they are prayer.",
  },
  {
    id: "tm-038",
    athlete_id: "endo",
    speaker_name: "Jurgen Klopp",
    speaker_role: "Manager",
    quote: "He's the midfield sweeper. His fearless play inspires courage in his teammates. Wataru is the heartbeat of my team.",
  },
  {
    id: "tm-039",
    athlete_id: "ueno",
    speaker_name: "Reika Utsugi",
    speaker_role: "Manager",
    quote: "She's like a cyborg. Even with a broken jaw, all she could think about was getting back on the mound. When she started lower-body training with her mouth still wired shut, I knew she was beyond human.",
  },
  {
    id: "tm-040",
    athlete_id: "nishikori",
    speaker_name: "A rival player",
    speaker_role: "Tennis player",
    quote: "His tennis IQ is world-class. At full fitness, he can beat anyone, even now. Every time he comes back from an injury absence, his game is smarter.",
  },
  {
    id: "tm-041",
    athlete_id: "fujiwara",
    speaker_name: "Wheelchair basketball head coach",
    speaker_role: "Coach",
    quote: "Her positivity completely transformed the team's outlook on disability. Her ability to turn post-accident despair into a smile supports the team both on and off the court.",
  },
  {
    id: "tm-042",
    athlete_id: "sasaki",
    speaker_name: "Yoshinobu Yoshii",
    speaker_role: "Manager",
    quote: "His talent is a national treasure. Developing him patiently, without rushing, is what created the dominant force he is today. Having lived through the earthquake, his eyes always carry a pure gratitude for baseball.",
  },
  {
    id: "tm-043",
    athlete_id: "kimura_saori",
    speaker_name: "Masayoshi Manabe",
    speaker_role: "Coach",
    quote: "When she smiles, the whole team lights up. She had the strength to hide her injuries and fight through them, all while wrapping it in that smile. Saori was the embodiment of Japanese women's volleyball.",
  },
  {
    id: "tm-044",
    athlete_id: "takahashi_naoko",
    speaker_name: "Yoshio Koide",
    speaker_role: "Coach",
    quote: "She never takes a day off from training, even when injured. My job was to cut her workload. Q-chan's cheerfulness comes through directly in her running. That's why she's so strong.",
  },
  {
    id: "tm-045",
    athlete_id: "oe",
    speaker_name: "Snowboard industry insider",
    speaker_role: "Industry insider",
    quote: "Her knees should be in ruins, but her riding is smoother and stronger than before. The core strength she built during rehab translates directly into the beauty of her aerials.",
  },
  {
    id: "tm-046",
    athlete_id: "taniguchi",
    speaker_name: "National team staff",
    speaker_role: "Staff",
    quote: "Her rate of growth is staggering. She has a gift for embracing difficulty. The instinct to turn her disability into a unique weapon is something she was born with.",
  },
  {
    id: "tm-047",
    athlete_id: "ikezaki",
    speaker_name: "A teammate",
    speaker_role: "Player",
    quote: "His tackles are the heaviest in the world. I've never once seen him use his illness as an excuse. He's a man who sets a new personal best every year while battling a progressive disease.",
  },
  {
    id: "tm-048",
    athlete_id: "kobayashi",
    speaker_name: "Ski jumping insider",
    speaker_role: "Industry insider",
    quote: "He's a modern-day genius. He fused Kasai's mental toughness with his own unique sense of flight. Having weathered the slump, he can now fly through the air with that trademark grin.",
  },
  {
    id: "tm-049",
    athlete_id: "suzuki_takayuki",
    speaker_name: "Japan national team head coach",
    speaker_role: "Coach",
    quote: "His swimming is art. There's not a single wasted movement — he understands water resistance better than anyone alive. The mental fortitude to stay the course through 13 years without a gold medal is his greatest weapon.",
  },
  {
    id: "tm-050",
    athlete_id: "otaki",
    speaker_name: "Theater industry insider",
    speaker_role: "Industry insider",
    quote: "He was an athlete of the spirit, transcending words. His very existence was a symbol of Japan's rebirth. Like the archery principle of 'true aim, certain hit,' the way he poured his entire being into every role was a model for everyone who stands on a stage.",
  },
];
