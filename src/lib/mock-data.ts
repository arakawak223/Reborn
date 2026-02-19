// ===================================================
// RE:BORN 復活アスリート図鑑 — 魂のアーカイブ
// ===================================================

// ---------- Athlete profiles ----------
export interface AthleteProfile {
  id: string;
  name: string;
  name_en: string;
  nationality: string;
  birthplace: string;
  birth_date: string;
  age: number;
  sport: string;
  family: string;
  upbringing: string;
  main_quote: string;
  sub_quote: string;
  achievements: string[];
  injury_detail: string;
  image_url: string | null;
  comeback_status: "in_progress" | "completed_success" | "completed_partial" | "retired";
}

export interface GoldenQuote {
  id: string;
  athlete_id: string;
  quote: string;
  context: string | null;
}

export interface Testimony {
  id: string;
  athlete_id: string;
  speaker_name: string;
  speaker_role: string;
  quote: string;
}

export interface StoryChapter {
  id: string;
  athlete_id: string;
  order: number;
  stage: "origin" | "despair" | "void" | "awakening" | "rebirth";
  title: string;
  body: string; // long-form markdown-ish
  year_label: string | null;
}

export interface InjuryRecord {
  id: string;
  athlete_id: string;
  body_region: string;
  injury_type: string;
  diagnosis: string;
  severity: number; // 1-10
  recovery_months: number;
  year_occurred: number;
  description: string;
  is_primary: boolean;
}

export interface QuizQuestion {
  id: string;
  athlete_id: string | null; // null = general
  quiz_type: "serious" | "coffee_break";
  difficulty: number;
  question_text: string;
  choices: string[];
  correct_index: number;
  rationale: string;
  encouragement: string;
}

export interface BodyCoord {
  region: string;
  x: number;
  y: number;
  z: number;
  label_ja: string;
}

// ===== Athletes =====
export const athletes: AthleteProfile[] = [
  {
    id: "mcmorris",
    name: "マーク・マクモリス",
    name_en: "Mark McMorris",
    nationality: "カナダ",
    birthplace: "サスカチュワン州レジーナ",
    birth_date: "1993年12月9日",
    age: 32,
    sport: "スノーボード",
    family: "州議会議員の父、看護師の母、プロスノーボーダーの兄（クレイグ）",
    upbringing: "雪山のない平原地帯で育つ。裏庭の小さな段差をジャンプ台に見立て、兄と競い合いながら独自のスタイルを独学で磨き上げた。",
    main_quote: "滑れるだけで幸せだ。メダルはただのボーナスに過ぎない",
    sub_quote: "1ミリでも指が動くようになったら、それを全力で喜んだ。小さな前進を祝うことが、大きな復活に繋がるんだ",
    achievements: ["2014・2018・2022年 五輪3大会連続銅メダル", "X Games金メダル11個"],
    injury_detail: "2017年、ウィスラーのバックカントリーでジャンプの着地に失敗し木に激突。17箇所の骨折（顎、左腕、骨盤、肋骨等）、肺破裂、脾臓破裂を伴う昏睡状態。",
    image_url: null,
    comeback_status: "completed_success",
  },
  {
    id: "hirano",
    name: "平野 歩夢",
    name_en: "Ayumu Hirano",
    nationality: "日本",
    birthplace: "新潟県村上市",
    birth_date: "1998年11月29日",
    age: 27,
    sport: "スノーボード",
    family: "父（英功）、母（富美子）、共にプロの兄（英樹）と弟（海祝）。妻・子。",
    upbringing: "父が自作した日本海スケートパークで幼少期から極限の練習を積む。「1mmの狂いも許さない」父の指導が精密な技術の基盤となった。",
    main_quote: "夢を歩む。母がくれた名前が、僕の生き方になった",
    sub_quote: "恐怖は消えない。でも、その恐怖が自分をより慎重に、より強くしてくれる",
    achievements: ["2022年 北京五輪金メダル", "2014・2018年 五輪銀メダル"],
    injury_detail: "2017年3月、ハーフパイプのデッキに強打し肝臓破裂。2026年1月、ミラノ五輪目前に骨盤（腸骨）を骨折。",
    image_url: null,
    comeback_status: "in_progress",
  },
  {
    id: "okamoto",
    name: "岡本 圭司",
    name_en: "Keiji Okamoto",
    nationality: "日本",
    birthplace: "兵庫県三木市",
    birth_date: "1982年2月20日",
    age: 43,
    sport: "パラスノーボード",
    family: "妻、子供。",
    upbringing: "日本のスノーボード界を代表するトッププロとして、映像制作や開拓に情熱を注ぐ。",
    main_quote: "失ったものを数えるより、今残っているもので何ができるかを考える方が楽しい",
    sub_quote: "『怪我をしたから不幸』なんじゃない。その後の人生をどう描くかで意味が変わるんだ",
    achievements: ["2007年 X-TRAIL JAM日本人最高位", "2022年 北京パラリンピック8位入賞"],
    injury_detail: "2015年、撮影中に崖から転落。コンクリートに叩きつけられ全身15箇所骨折、脊髄損傷、右膝下麻痺。",
    image_url: null,
    comeback_status: "completed_success",
  },
  {
    id: "ohtani",
    name: "大谷 翔平",
    name_en: "Shohei Ohtani",
    nationality: "日本",
    birthplace: "岩手県奥州市",
    birth_date: "1994年7月5日",
    age: 31,
    sport: "野球",
    family: "父（社会人野球）、母（バドミントン）、兄、姉。",
    upbringing: "岩手の豊かな自然の中、「野球ノート」で自己分析を徹底。中学時代から目標達成シート（マンダラチャート）を活用し、夢を可視化。",
    main_quote: "リハビリは、自分を『アップデート』するための時間だと思っています",
    sub_quote: "怪我をしたからこそ、以前よりも効率的な体の使い方を考えることができました",
    achievements: ["2021・2023年 MLB MVP", "2023年 ホームラン王、WBC優勝"],
    injury_detail: "右肘内側側副靭帯の損傷。2018年、2023年と2度の手術（トミー・ジョン手術等）。",
    image_url: null,
    comeback_status: "completed_success",
  },
  {
    id: "murray",
    name: "アンディ・マレー",
    name_en: "Andy Murray",
    nationality: "イギリス",
    birthplace: "スコットランド",
    birth_date: "1987年5月15日",
    age: 38,
    sport: "テニス",
    family: "母（テニスコーチ）、兄（元世界1位）、妻、子供4人。",
    upbringing: "母の指導の下、厳しい気候のスコットランドで粘り強い戦術を習得。",
    main_quote: "痛みを感じずに愛するスポーツができる。それだけで、僕はもう勝者なんだ",
    sub_quote: "二度とプロとしてプレーできないと言われた。でも、僕の心は『まだ終わっていない』と叫んでいた",
    achievements: ["ウィンブルドン優勝2回", "五輪2連覇、元世界ランク1位"],
    injury_detail: "変形性股関節症。靴下を履くことも困難な激痛に数年間耐え続けた。",
    image_url: null,
    comeback_status: "retired",
  },
  {
    id: "kunieda",
    name: "国枝 慎吾",
    name_en: "Shingo Kunieda",
    nationality: "日本",
    birthplace: "千葉県柏市",
    birth_date: "1984年2月21日",
    age: 41,
    sport: "車いすテニス",
    family: "妻（愛さん）、両親。",
    upbringing: "9歳で車いす生活に。母の勧めでテニスを始め、車いすを「足」のように自在に操るチェアワークを習得。",
    main_quote: "俺は最強だ！（I am the strongest!）",
    sub_quote: "限界を作るのは、いつも自分の心。車いすは僕の足であり、翼なんだ",
    achievements: ["パラ金メダル3個、生涯ゴールデンスラム達成", "国民栄誉賞"],
    injury_detail: "9歳の脊髄腫瘍。2016年、右肘の関節鼠（軟骨片）による激痛。",
    image_url: null,
    comeback_status: "retired",
  },
  {
    id: "ikee",
    name: "池江 璃花子",
    name_en: "Rikako Ikee",
    nationality: "日本",
    birthplace: "東京都",
    birth_date: "2000年7月4日",
    age: 25,
    sport: "水泳",
    family: "母、姉、兄。",
    upbringing: "幼児教育に長けた母の指導で、幼少期から雲梯等を通じて抜群の身体バランスを身につけた。",
    main_quote: "逆境は、乗り越えられない人には訪れない。神様は乗り越えられる人にしか試練を与えない",
    sub_quote: "しんどい時、誰かが支えてくれる。それが一番の幸せ",
    achievements: ["2018年 アジア大会6冠", "2021年 日本選手権4冠、2024年 パリ五輪代表"],
    injury_detail: "2019年、急性リンパ性白血病を発症。",
    image_url: null,
    comeback_status: "completed_success",
  },
  {
    id: "woods",
    name: "タイガー・ウッズ",
    name_en: "Tiger Woods",
    nationality: "アメリカ",
    birthplace: "カリフォルニア州",
    birth_date: "1975年12月30日",
    age: 50,
    sport: "ゴルフ",
    family: "父（故・アール）、母、娘（サム）、息子（チャーリー）。",
    upbringing: "軍人の父から、コース外でも通用する鋼の精神教育を受ける。",
    main_quote: "もう一度、息子と一緒にプレーしたい。その願いが僕を立ち上がらせた",
    sub_quote: "痛みは消えないかもしれない。でも、それをどう受け入れ、どう制御するかがゴルフなんだ",
    achievements: ["メジャー通算15勝", "2019年 マスターズ復活優勝"],
    injury_detail: "2021年、自動車事故。右足粉砕骨折、切断の危機。",
    image_url: null,
    comeback_status: "completed_partial",
  },
  {
    id: "mitoma",
    name: "三笘 薫",
    name_en: "Kaoru Mitoma",
    nationality: "日本",
    birthplace: "神奈川県川崎市",
    birth_date: "1997年5月20日",
    age: 28,
    sport: "サッカー",
    family: "父、母、兄、妻。",
    upbringing: "川崎フロンターレのアカデミー育ち。大学時代にドリブルを科学的に分析する卒論を書くほどの理論派。",
    main_quote: "怪我は、自分のプレーを客観的に分析するためのギフトだと思った",
    sub_quote: "あきらめないという選択肢以外、僕の辞書には最初からなかった",
    achievements: ["2022年 W杯「三笘の1ミリ」", "プレミアリーグ日本人最多得点"],
    injury_detail: "2024年、腰椎の負傷。",
    image_url: null,
    comeback_status: "completed_success",
  },
  {
    id: "abe",
    name: "阿部 一二三",
    name_en: "Hifumi Abe",
    nationality: "日本",
    birthplace: "兵庫県神戸市",
    birth_date: "1997年8月9日",
    age: 28,
    sport: "柔道",
    family: "消防士の父、母、兄、妹（詩）。",
    upbringing: "幼少期から妹・詩と競い合い、攻撃柔道を追求。父のトレーニングで強靭な足腰を育成。",
    main_quote: "一歩引く勇気が、次に二歩進むための力を生んでくれる",
    sub_quote: "負けてからの自分の姿にこそ、その人の本質が現れる",
    achievements: ["2021・2024年 五輪66kg級金メダル（連覇）"],
    injury_detail: "指の負傷、熾烈な代表選考のプレッシャー。",
    image_url: null,
    comeback_status: "completed_success",
  },
  {
    id: "kimura",
    name: "木村 敬一",
    name_en: "Keiichi Kimura",
    nationality: "日本",
    birthplace: "滋賀県栗東市",
    birth_date: "1990年9月11日",
    age: 35,
    sport: "パラ水泳",
    family: "両親。",
    upbringing: "2歳で失明。「なんでもやらせる」母の方針で水泳に出会い、研ぎ澄まされた触覚を武器にする。",
    main_quote: "見えないからこそ、研ぎ澄まされる感覚がある。それは僕だけの特権",
    sub_quote: "金メダルを獲れなかった時間は、仲間の大切さを教えてくれた",
    achievements: ["2021・2024年 東京・パリパラ金メダル"],
    injury_detail: "全盲。2016年リオ五輪での金メダルゼロという挫折。",
    image_url: null,
    comeback_status: "completed_success",
  },
  {
    id: "sanibrawn",
    name: "サニブラウン・アブデル・ハキーム",
    name_en: "Abdul Hakim Sani Brown",
    nationality: "日本",
    birthplace: "東京都",
    birth_date: "1999年3月6日",
    age: 26,
    sport: "陸上",
    family: "ガーナ人の父、日本人の母、弟。",
    upbringing: "サッカーと陸上の二刀流を経験。世界水準の体格と日本式の規律が融合。",
    main_quote: "怪我をした時間は、自分の体と対話する研究期間だった",
    sub_quote: "焦って戻る必要はない。100%の自分に戻った時、結果はついてくる",
    achievements: ["2022・2023年 世界陸上100m連続決勝進出", "2024年 パリ五輪9秒96"],
    injury_detail: "2020-21年 腰椎分離症、ハムストリング負傷。",
    image_url: null,
    comeback_status: "completed_success",
  },
  {
    id: "ito",
    name: "伊藤 美誠",
    name_en: "Mima Ito",
    nationality: "日本",
    birthplace: "静岡県磐田市",
    birth_date: "2000年10月21日",
    age: 25,
    sport: "卓球",
    family: "母（美乃り）。",
    upbringing: "母の英才教育。深夜まで及ぶ独創的なサーブ練習を欠かさなかった。",
    main_quote: "負けた悔しさは、次の試合で勝つための最大の貯金になる",
    sub_quote: "周りが何を言っても関係ない。私は私の道を進むだけ",
    achievements: ["2021年 東京五輪混合ダブルス金メダル"],
    injury_detail: "腰痛、2024年パリ五輪代表選考での敗退による精神的打撃。",
    image_url: null,
    comeback_status: "in_progress",
  },
  {
    id: "toratani",
    name: "虎谷 真央",
    name_en: "Mao Toratani",
    nationality: "日本",
    birthplace: "京都府",
    birth_date: "2000年頃",
    age: 25,
    sport: "車いすフェンシング",
    family: "両親。",
    upbringing: "剣道・フェンシングの有望選手として育ち、高い身体能力を誇る。",
    main_quote: "剣を持てば、足が動かないことなんて関係ない。そこは自由な世界だ",
    sub_quote: "過去の自分を追い越すために、今の自分がいる",
    achievements: ["2024年 パリパラリンピック出場"],
    injury_detail: "事故により脊髄損傷。",
    image_url: null,
    comeback_status: "completed_success",
  },
];

// ===== Golden Quotes (追加の金言) =====
export const goldenQuotes: GoldenQuote[] = [
  // McMorris
  {
    id: "gq-001",
    athlete_id: "mcmorris",
    quote: "目が覚めたとき、自分が生きていることに感謝した。それまでの僕は『勝たなければならない』という重圧の中にいたけれど、あの大怪我は僕に『スノーボードができること自体の奇跡』を教えてくれたんだ。",
    context: null,
  },
  {
    id: "gq-002",
    athlete_id: "mcmorris",
    quote: "リハビリ中、僕は自分を企業の再生案件のように捉えていたよ。今日の僕の『資産』は昨日より増えたか？ 膝が少し曲がるようになったなら、それは大きな『利益』なんだ。",
    context: "リハビリ期間の心境",
  },
  // Hirano
  {
    id: "gq-003",
    athlete_id: "hirano",
    quote: "肝臓を痛めたとき、初めて『死』を意識した。でも、その経験が僕から雑念を消してくれた。『いつ終わっても後悔しない滑りをする』。今の僕の強さは、あの時の絶望から始まっている。",
    context: null,
  },
  {
    id: "gq-004",
    athlete_id: "hirano",
    quote: "痛くないと言えば嘘になる。でも、骨がくっつくのを待つ時間なんてない。心で体をコントロールする感覚で滑っている。骨折も、僕の一部だ。",
    context: "骨盤骨折で挑むミラノ五輪にて",
  },
  // Okamoto
  {
    id: "gq-005",
    athlete_id: "okamoto",
    quote: "事故直後は、二度と雪山には戻れないと思った。でも、リハビリの中で『パラ』という世界に出会ったとき、新しい冒険が始まるワクワク感があった。",
    context: null,
  },
  {
    id: "gq-006",
    athlete_id: "okamoto",
    quote: "僕は今、プロ時代よりもスノーボードが大好きだと言える。障害を負ったことで、板を履く一瞬の重みが変わったんだ。これは怪我をしなければ得られなかった『資産』だよ。",
    context: null,
  },
  // Ohtani
  { id: "gq-007", athlete_id: "ohtani", quote: "リハビリは、自分を『アップデート』するための時間だと思っています", context: null },
  { id: "gq-008", athlete_id: "ohtani", quote: "怪我をしたからこそ、以前よりも効率的な体の使い方を考えることができました", context: "トミー・ジョン手術後" },
  // Murray
  { id: "gq-009", athlete_id: "murray", quote: "痛みを感じずに愛するスポーツができる。それだけで、僕はもう勝者なんだ", context: null },
  { id: "gq-010", athlete_id: "murray", quote: "二度とプロとしてプレーできないと言われた。でも、僕の心は『まだ終わっていない』と叫んでいた", context: "人工股関節手術後" },
  // Kunieda
  { id: "gq-011", athlete_id: "kunieda", quote: "俺は最強だ！（I am the strongest!）", context: null },
  { id: "gq-012", athlete_id: "kunieda", quote: "限界を作るのは、いつも自分の心。車いすは僕の足であり、翼なんだ", context: null },
  // Ikee
  { id: "gq-013", athlete_id: "ikee", quote: "逆境は、乗り越えられない人には訪れない。神様は乗り越えられる人にしか試練を与えない", context: null },
  { id: "gq-014", athlete_id: "ikee", quote: "しんどい時、誰かが支えてくれる。それが一番の幸せ", context: "白血病からの復帰後" },
  // Woods
  { id: "gq-015", athlete_id: "woods", quote: "もう一度、息子と一緒にプレーしたい。その願いが僕を立ち上がらせた", context: null },
  { id: "gq-016", athlete_id: "woods", quote: "痛みは消えないかもしれない。でも、それをどう受け入れ、どう制御するかがゴルフなんだ", context: "自動車事故後" },
  // Mitoma
  { id: "gq-017", athlete_id: "mitoma", quote: "怪我は、自分のプレーを客観的に分析するためのギフトだと思った", context: null },
  { id: "gq-018", athlete_id: "mitoma", quote: "あきらめないという選択肢以外、僕の辞書には最初からなかった", context: null },
  // Abe
  { id: "gq-019", athlete_id: "abe", quote: "一歩引く勇気が、次に二歩進むための力を生んでくれる", context: null },
  { id: "gq-020", athlete_id: "abe", quote: "負けてからの自分の姿にこそ、その人の本質が現れる", context: null },
  // Kimura
  { id: "gq-021", athlete_id: "kimura", quote: "見えないからこそ、研ぎ澄まされる感覚がある。それは僕だけの特権", context: null },
  { id: "gq-022", athlete_id: "kimura", quote: "金メダルを獲れなかった時間は、仲間の大切さを教えてくれた", context: "リオ五輪後" },
  // Sanibrawn
  { id: "gq-023", athlete_id: "sanibrawn", quote: "怪我をした時間は、自分の体と対話する研究期間だった", context: null },
  { id: "gq-024", athlete_id: "sanibrawn", quote: "焦って戻る必要はない。100%の自分に戻った時、結果はついてくる", context: null },
  // Ito
  { id: "gq-025", athlete_id: "ito", quote: "負けた悔しさは、次の試合で勝つための最大の貯金になる", context: null },
  { id: "gq-026", athlete_id: "ito", quote: "周りが何を言っても関係ない。私は私の道を進むだけ", context: null },
  // Toratani
  { id: "gq-027", athlete_id: "toratani", quote: "剣を持てば、足が動かないことなんて関係ない。そこは自由な世界だ", context: null },
  { id: "gq-028", athlete_id: "toratani", quote: "過去の自分を追い越すために、今の自分がいる", context: null },
];

// ===== Testimonies =====
export const testimonies: Testimony[] = [
  {
    id: "tm-001",
    athlete_id: "mcmorris",
    speaker_name: "クレイグ・マクモリス",
    speaker_role: "兄",
    quote: "病院のベッドで、彼はすでに『また滑る』という目をしていた。彼は怪我をしても何も失っていなかった。",
  },
  {
    id: "tm-002",
    athlete_id: "hirano",
    speaker_name: "平野英功",
    speaker_role: "父",
    quote: "歩夢は怪我をすると、以前よりさらに研ぎ澄まされた状態で戻ってくる。彼は挫折を『進化の種』にしている。",
  },
  {
    id: "tm-003",
    athlete_id: "okamoto",
    speaker_name: "スノーボード仲間",
    speaker_role: "仲間",
    quote: "彼が再び雪の上に立った瞬間、スキー場全体が希望に包まれたようだった。",
  },
  { id: "tm-004", athlete_id: "ohtani", speaker_name: "デーブ・ロバーツ", speaker_role: "監督", quote: "彼はリハビリ中も一秒たりとも無駄な時間を過ごさない。その集中力こそが真の才能だ。" },
  { id: "tm-005", athlete_id: "murray", speaker_name: "ロジャー・フェデラー", speaker_role: "テニス選手", quote: "金属製の骨で戦い続ける彼は、不屈の精神の象徴だ。" },
  { id: "tm-006", athlete_id: "kunieda", speaker_name: "ライバル選手たち", speaker_role: "選手", quote: "国枝は自分をアップデートし続ける天才だ。" },
  { id: "tm-007", athlete_id: "ikee", speaker_name: "日本代表監督", speaker_role: "監督", quote: "彼女がプールサイドに現れるだけで、チーム全体の空気が変わる。" },
  { id: "tm-008", athlete_id: "woods", speaker_name: "ジャスティン・トーマス", speaker_role: "ゴルフ選手", quote: "彼が再び歩いて現れたこと自体が、スポーツ史上最大の奇跡だ。" },
  { id: "tm-009", athlete_id: "mitoma", speaker_name: "所属監督", speaker_role: "監督", quote: "彼は怪我をしても、ピッチの外で誰よりも成長していた。" },
  { id: "tm-010", athlete_id: "abe", speaker_name: "全日本監督", speaker_role: "監督", quote: "彼の攻撃柔道は、挫折のたびに鋭くなっている。" },
  { id: "tm-011", athlete_id: "kimura", speaker_name: "米国コーチ", speaker_role: "コーチ", quote: "彼の強さは、弱さから目を逸らさないことにある。" },
  { id: "tm-012", athlete_id: "sanibrawn", speaker_name: "米国コーチ", speaker_role: "コーチ", quote: "彼は怪我を経て、以前よりさらに賢く、強いアスリートになった。" },
  { id: "tm-013", athlete_id: "ito", speaker_name: "代表コーチ", speaker_role: "コーチ", quote: "彼女の独創性は、挫折を経験してさらに深みを増した。" },
  { id: "tm-014", athlete_id: "toratani", speaker_name: "フェンシング関係者", speaker_role: "関係者", quote: "彼女の剣先には、過去の絶望を乗り越えた者だけが持つ鋭さがある。" },
];

// ===== Story Chapters =====
export const storyChapters: StoryChapter[] = [
  // --- McMorris ---
  {
    id: "sc-001", athlete_id: "mcmorris", order: 1, stage: "origin",
    title: "カナダの雪原に生まれた天才",
    body: "サスカチュワン州レジーナ。カナダの大平原に生まれたマークは、兄クレイグの影響で幼少期からスノーボードに没頭した。16歳でX Gamesに出場、17歳でビッグエアの世界記録を樹立。その才能は「カナダのスノーボード界の未来」と称されるほどだった。\n\n州議会議員の父と看護師の母という堅実な家庭に育ちながら、彼が選んだのは雪山という極限の世界だった。",
    year_label: "〜2016",
  },
  {
    id: "sc-002", athlete_id: "mcmorris", order: 2, stage: "despair",
    title: "17箇所の骨折、肺破裂、昏睡",
    body: "2017年3月、バックカントリーでの滑走中に木に激突。顎、左腕、骨盤、肋骨など全身17箇所を骨折。肺と脾臓が破裂し、昏睡状態に陥った。\n\n「意識が戻ったとき、自分の名前すら思い出せなかった」。医師からは「二度とスポーツはできない可能性がある」と告げられた。27歳、まさにキャリアの絶頂期での壊滅的な事故だった。",
    year_label: "2017年3月",
  },
  {
    id: "sc-003", athlete_id: "mcmorris", order: 3, stage: "void",
    title: "1ミリの前進を祝う日々",
    body: "車椅子から始まったリハビリ。指が動く。肘が曲がる。一歩歩ける——「小さな前進」の積み重ねだけが、彼の世界だった。\n\n「リハビリ中、僕は自分を企業の再生案件のように捉えていたよ。今日の僕の『資産』は昨日より増えたか？ 膝が少し曲がるようになったなら、それは大きな『利益』なんだ。」\n\nかつてのように空を飛ぶ感覚は遠い記憶の中にあった。それでも、窓から見える雪山が彼を呼んでいた。",
    year_label: "2017年春〜冬",
  },
  {
    id: "sc-004", athlete_id: "mcmorris", order: 4, stage: "awakening",
    title: "「滑れる」という奇跡の再発見",
    body: "事故からわずか9ヶ月後、マークはスノーボードの板に再び足を通した。全身にボルトとプレートが埋め込まれた身体で。\n\n「初めてターンを決めたとき、涙が止まらなかった。メダルを獲った時よりも、あの一回のターンの方がずっと美しかった」\n\n彼はこの瞬間に悟った——勝つためではなく、滑ること自体が目的だったのだと。",
    year_label: "2017年末",
  },
  {
    id: "sc-005", athlete_id: "mcmorris", order: 5, stage: "rebirth",
    title: "3大会連続の五輪メダリスト",
    body: "2018年平昌五輪。事故からわずか11ヶ月で五輪の舞台に立ったマークは、スロープスタイルで銅メダルを獲得。そして2022年北京五輪でも銅メダル——3大会連続のメダルは「奇跡」を超えた「意志の証明」だった。\n\n「滑れるだけで幸せだ。メダルはただのボーナスに過ぎない」\n\n17箇所の骨折を乗り越えた男は、勝利よりも大切なものを見つけた。",
    year_label: "2018〜2022",
  },
  // --- Hirano ---
  {
    id: "sc-006", athlete_id: "hirano", order: 1, stage: "origin",
    title: "夢を歩む少年",
    body: "新潟県村上市。父・英功が自宅裏にスケートパークを手作りし、幼い歩夢はそこで育った。「夢を歩む」——母がつけてくれた名前の通り、彼は4歳でスノーボードを始め、瞬く間にその才能を開花させた。\n\n14歳でソチ五輪に出場し銀メダル。当時の最年少メダリストとして世界に衝撃を与えた。兄と弟もプロスノーボーダーという、まさにスノーボード一家の申し子だった。",
    year_label: "〜2014",
  },
  {
    id: "sc-007", athlete_id: "hirano", order: 2, stage: "despair",
    title: "肝臓損傷——初めて意識した「死」",
    body: "2017年、練習中の転倒で肝臓を損傷。同時に左膝靭帯も損傷した。内臓の出血という命に関わる怪我に、19歳の少年は初めて「死」を意識した。\n\n「肝臓を痛めたとき、初めて『死』を意識した。でも、その経験が僕から雑念を消してくれた。『いつ終わっても後悔しない滑りをする』。今の僕の強さは、あの時の絶望から始まっている。」\n\n平昌五輪の年、彼は身体だけでなく精神も作り直さなければならなかった。",
    year_label: "2017年",
  },
  {
    id: "sc-008", athlete_id: "hirano", order: 3, stage: "void",
    title: "恐怖との共存",
    body: "怪我からの復帰後、歩夢は以前と同じ技ができなくなっていた。身体の問題ではない——恐怖だ。\n\n「恐怖は消えない。でも、その恐怖が自分をより慎重に、より強くしてくれる」\n\n彼は恐怖を敵ではなく、味方として受け入れることを学んだ。繊細な着地、ミリ単位の調整——恐怖が彼の技術をさらに研ぎ澄ませていった。\n\nそしてこの期間、彼はスケートボードにも挑戦し、東京五輪出場を果たす。夏冬の二刀流は、ひとつの居場所に依存しない彼の生き方そのものだった。",
    year_label: "2018〜2021",
  },
  {
    id: "sc-009", athlete_id: "hirano", order: 4, stage: "awakening",
    title: "北京の空に刻んだ「トリプルコーク1440」",
    body: "2022年北京五輪ハーフパイプ決勝。歩夢は人類初の「トリプルコーク1440」を大舞台で成功させた。3回転しながら縦に4回転する、物理法則に挑む技。\n\n2本目の滑走で完璧に決めたにもかかわらず、採点は物議を醸す低さだった。しかし歩夢は怒りを力に変え、3本目に再びトリプルコーク1440を叩きつけた。結果は文句なしの金メダル。\n\n「怒りで滑ったんじゃない。自分を証明するために滑った」",
    year_label: "2022年2月",
  },
  {
    id: "sc-010", athlete_id: "hirano", order: 5, stage: "rebirth",
    title: "骨盤骨折、そしてミラノへ",
    body: "2026年1月、練習中に骨盤（腸骨）を骨折。ミラノ五輪を目前にした致命的な負傷。しかし歩夢は欠場を選ばなかった。\n\n「痛くないと言えば嘘になる。でも、骨がくっつくのを待つ時間なんてない。心で体をコントロールする感覚で滑っている。骨折も、僕の一部だ。」\n\n肝臓損傷、膝靭帯損傷、そして骨盤骨折——何度壊れても、何度でも立ち上がる。「夢を歩む」少年は、27歳になった今も名前の通りに生きている。\n\n2025年に生まれた第一子のためにも、彼はまだ滑り続ける。",
    year_label: "2026年〜",
  },
  // --- Okamoto ---
  {
    id: "sc-011", athlete_id: "okamoto", order: 1, stage: "origin",
    title: "兵庫から世界へ飛び出したライダー",
    body: "兵庫県三木市出身の岡本圭司は、日本のスノーボードシーンを牽引するプロライダーだった。2007年のX-TRAIL JAMでは日本人最高位を記録。海外のビッグマウンテンでの映像作品でも知られ、スノーボードの「自由さ」を体現する存在だった。\n\n大胆なライン取りと、どんな地形でも楽しそうに滑る姿。彼のスタイルはファンから「見ているだけで幸せになる」と愛された。",
    year_label: "〜2014",
  },
  {
    id: "sc-012", athlete_id: "okamoto", order: 2, stage: "despair",
    title: "崖からの転落、全身15箇所の骨折、脊髄損傷",
    body: "2015年、撮影中に崖から転落。全身15箇所を骨折し、脊髄を損傷。右膝から下の感覚を永遠に失った。\n\n「事故直後は、二度と雪山には戻れないと思った。」\n\nプロスノーボーダーとしてのキャリアは、一瞬にして断たれた。33歳。最も脂がのった時期の、あまりに残酷な出来事だった。妻と子供の前で泣くことすらできなかった——自分が崩れたら、家族も崩れると思ったから。",
    year_label: "2015年",
  },
  {
    id: "sc-013", athlete_id: "okamoto", order: 3, stage: "void",
    title: "「パラ」という新しい世界",
    body: "長い入院生活の中で、岡本はパラスノーボードの存在を知る。義足やプロテーゼをつけて雪山を滑る選手たち。\n\n「リハビリの中で『パラ』という世界に出会ったとき、新しい冒険が始まるワクワク感があった。」\n\n失ったものを嘆くのではなく、残されたもので何ができるかを探す——それは、彼がかつて雪山で未知のラインを探していた時と同じ感覚だった。スノーボーダーの魂は、足の感覚を失っても消えなかった。",
    year_label: "2016〜2017",
  },
  {
    id: "sc-014", athlete_id: "okamoto", order: 4, stage: "awakening",
    title: "板を履いた瞬間、世界が変わった",
    body: "義足をつけ、再びスノーボードの板に足を通した日。その感覚は、プロとして何百回も経験したはずの「滑る」とは全く違うものだった。\n\n「僕は今、プロ時代よりもスノーボードが大好きだと言える。障害を負ったことで、板を履く一瞬の重みが変わったんだ。これは怪我をしなければ得られなかった『資産』だよ。」\n\n仲間たちの目に涙が浮かんだ。「圭司が再び板を履いて雪の上に立った瞬間、スキー場全体が希望に包まれたようだった。」",
    year_label: "2018年",
  },
  {
    id: "sc-015", athlete_id: "okamoto", order: 5, stage: "rebirth",
    title: "パラリンピアン、そして伝道者",
    body: "北京パラリンピックに出場し入賞。かつてのプロスノーボーダーが、パラアスリートとして世界の舞台に戻ってきた。\n\n「失ったものを数えるより、今残っているもので何ができるかを考える方が楽しい」\n\n現在、岡本はパラスノーボードの普及活動にも力を注ぐ。全国の学校を訪問し、子供たちに伝える——「怪我をしたから不幸なんじゃない。怪我をした後の人生をどう描くかで、その怪我の意味が変わるんだ」と。\n\n彼の物語は「復活」を超え、「再定義」と呼ぶにふさわしい。",
    year_label: "2022年〜",
  },
  // --- Ohtani ---
  {
    id: "sc-016", athlete_id: "ohtani", order: 1, stage: "origin",
    title: "岩手の野球少年、マンダラチャートに刻んだ夢",
    body: "岩手県奥州市。社会人野球の父とバドミントン選手の母のもとに生まれた翔平は、幼い頃から抜群の身体能力を見せた。花巻東高校では投手と打者の「二刀流」を開花させ、160km/hを記録。\n\n中学時代にマンダラチャートに書いた目標——「ドラ1、8球団」。彼は夢を可視化し、計画的に実現していく天才だった。2018年、メジャーリーグへ。エンゼルスのユニフォームに袖を通した瞬間、日本の少年の夢がアメリカの大地に立った。",
    year_label: "〜2018",
  },
  {
    id: "sc-017", athlete_id: "ohtani", order: 2, stage: "despair",
    title: "右肘の断裂——二刀流の危機",
    body: "2018年シーズン途中、右肘内側側副靭帯の損傷が判明。トミー・ジョン手術を決断せざるを得なかった。投手として最も大切な肘。復帰まで最低1年半。「投げることができない」という現実は、二刀流という彼のアイデンティティを根底から揺さぶった。\n\n2023年、再び同じ右肘を負傷。2度目の手術。「二刀流はもう無理だ」という声が世界中から聞こえてきた。",
    year_label: "2018・2023",
  },
  {
    id: "sc-018", athlete_id: "ohtani", order: 3, stage: "void",
    title: "アップデートの時間",
    body: "「リハビリは、自分を『アップデート』するための時間だと思っています」\n\n投げられない期間を、大谷は「打者に専念できる機会」として捉えた。動作解析のデータを徹底的に研究し、筋力を増強し、打撃フォームを最適化。リハビリ中も一秒たりとも無駄にしなかった。\n\n「怪我をしたからこそ、以前よりも効率的な体の使い方を考えることができました」——絶望を「進化の時間」に変換する思考こそが、大谷翔平の最大の武器だった。",
    year_label: "2019・2024",
  },
  {
    id: "sc-019", athlete_id: "ohtani", order: 4, stage: "awakening",
    title: "50-50——歴史が動いた日",
    body: "2024年、ドジャースに移籍した大谷は「打者専念」のシーズンで、MLB史上初の「50本塁打・50盗塁」を達成。投げられない悔しさを、バットと走塁に全て注ぎ込んだ結果だった。\n\nシーズン最終戦で達成した51-51。スタジアムは興奮に包まれ、相手チームのベンチですら拍手が起きた。怪我で投げられなかったシーズンが、打撃の歴史を塗り替えるシーズンになった。",
    year_label: "2024",
  },
  {
    id: "sc-020", athlete_id: "ohtani", order: 5, stage: "rebirth",
    title: "再び投げる日——完全体の復活",
    body: "2025年、投手として復帰。2度の肘の手術を乗り越え、投打両面でフルシーズンを戦う「完全体の大谷翔平」が帰ってきた。\n\n「彼はリハビリ中も一秒たりとも無駄な時間を過ごさない。その集中力こそが真の才能だ。」（デーブ・ロバーツ監督）\n\n右肘にメスを入れること2回。それでも二刀流を諦めなかった男は、怪我のたびにアップデートされた自分で戻ってきた。大谷翔平の復活は「回復」ではなく「進化」と呼ぶにふさわしい。",
    year_label: "2025〜",
  },
  // --- Murray ---
  {
    id: "sc-021", athlete_id: "murray", order: 1, stage: "origin",
    title: "スコットランドの粘り強さ",
    body: "スコットランド・ダンブレーン出身。テニスコーチの母に手ほどきを受け、兄のジェイミー（後のダブルス世界1位）と切磋琢磨した。寒冷な気候の中で育まれた粘り強いプレースタイルは、やがて世界の頂点へ。\n\n2012年ロンドン五輪で金メダル。2013年ウィンブルドンではイギリス人として77年ぶりの優勝。BIG4の一角として、フェデラー・ナダル・ジョコビッチと死闘を繰り広げた。",
    year_label: "〜2016",
  },
  {
    id: "sc-022", athlete_id: "murray", order: 2, stage: "despair",
    title: "靴下すら履けない——股関節の崩壊",
    body: "変形性股関節症。関節の軟骨がすり減り、骨と骨が直接ぶつかる激痛。テニスどころか、靴下を履くことすら困難だった。\n\n「朝起きて、靴下を履く。たったそれだけのことが地獄だった」\n\n2019年1月、全豪オープンの記者会見で引退を示唆。涙を見せたマレーに、会場からスタンディングオベーションが起きた。テニス界全体が、彼の別れを覚悟した瞬間だった。",
    year_label: "2017〜2019",
  },
  {
    id: "sc-023", athlete_id: "murray", order: 3, stage: "void",
    title: "金属の股関節という賭け",
    body: "人工股関節置換手術——金属製の関節で、プロテニスに復帰した前例はなかった。医師すら「日常生活の改善が目的」と考える手術を、マレーは「復帰への切符」と捉えた。\n\n「二度とプロとしてプレーできないと言われた。でも、僕の心は『まだ終わっていない』と叫んでいた」\n\n手術後、歩行訓練から再スタート。赤ちゃんのように一歩ずつ歩く元世界1位の姿は、周囲の涙を誘った。",
    year_label: "2019",
  },
  {
    id: "sc-024", athlete_id: "murray", order: 4, stage: "awakening",
    title: "金属の身体で勝利を掴む",
    body: "復帰後、マレーはダブルスから始め、徐々にシングルスへ。2019年のクイーンズクラブでダブルス優勝。そして2022年にはシングルスでATPタイトルを奪還した。\n\n金属の股関節でサーブを打ち、スライディングし、5セットを戦う。不可能だと誰もが思ったことを、彼は現実にした。\n\n「痛みを感じずに愛するスポーツができる。それだけで、僕はもう勝者なんだ」",
    year_label: "2019〜2022",
  },
  {
    id: "sc-025", athlete_id: "murray", order: 5, stage: "rebirth",
    title: "不屈の象徴、そしてパリ五輪",
    body: "2024年パリ五輪。37歳のマレーは、金属の股関節で3度目の五輪に出場。シングルスでの勝利は叶わなかったが、ダブルスでメダルを争い、満員の観客がスタンディングオベーションで彼を見送った。\n\n「金属製の骨で戦い続ける彼は、不屈の精神の象徴だ。」（ロジャー・フェデラー）\n\n人工股関節でBIG4と戦い続けた男。彼の物語は、身体の限界を精神で超えることの証明だった。",
    year_label: "2024",
  },
  // --- Kunieda ---
  {
    id: "sc-026", athlete_id: "kunieda", order: 1, stage: "origin",
    title: "車いすを「翼」に変えた少年",
    body: "9歳のとき、脊髄腫瘍により下半身の自由を失った。しかし母の「何かスポーツをしなさい」という勧めでテニスに出会い、車いすを「足」のように自在に操る天才的なチェアワークを習得。\n\n23歳で世界ランク1位に到達。パラリンピックでは金メダルを量産し、車いすテニスの歴史を塗り替えていく。「俺は最強だ！」——自ら鼓舞する叫びは、彼のトレードマークとなった。",
    year_label: "1993〜2007",
  },
  {
    id: "sc-027", athlete_id: "kunieda", order: 2, stage: "despair",
    title: "勝てない——右肘の激痛と焦燥",
    body: "2016年リオパラリンピック。絶対王者として臨んだ大会で、まさかの敗退。原因は右肘の関節鼠（軟骨片）による激痛だった。\n\nかつて無敵を誇ったプレーが、痛みに蝕まれていく。「勝たなければならない」というプレッシャーと、「もう勝てないのではないか」という恐怖。引退すら頭をよぎった。",
    year_label: "2016",
  },
  {
    id: "sc-028", athlete_id: "kunieda", order: 3, stage: "void",
    title: "漕ぎ方を変える——根本からの再構築",
    body: "国枝は「車いすの漕ぎ方」を根本から変えるという大胆な決断をした。バイオメカニクスの研究に没頭し、推進力を生むメカニズムを科学的に分析。\n\n「限界を作るのは、いつも自分の心。車いすは僕の足であり、翼なんだ」\n\nメンタルコーチのアン・クインとの出会いも転機となった。技術だけでなく、心の在り方を根底から見直す日々。妻の支えが、暗闇の中の光だった。",
    year_label: "2017〜2020",
  },
  {
    id: "sc-029", athlete_id: "kunieda", order: 4, stage: "awakening",
    title: "東京パラリンピック——自国での復活",
    body: "2021年東京パラリンピック。自国開催の大舞台で、国枝は圧倒的な強さを見せつけた。決勝では第2セットから逆転し、金メダルを獲得。\n\nマッチポイントで放ったバックハンドが決まった瞬間、国枝は車いすの上で天を仰いだ。苦しんだ5年間のすべてが報われた瞬間だった。\n\n「国枝は自分をアップデートし続ける天才だ。」——ライバルたちが口を揃えてそう言った。",
    year_label: "2021",
  },
  {
    id: "sc-030", athlete_id: "kunieda", order: 5, stage: "rebirth",
    title: "生涯ゴールデンスラム、そして国民栄誉賞",
    body: "パラリンピック金メダル3個、四大大会全制覇（生涯ゴールデンスラム）を達成した国枝は、2023年に現役を引退。国民栄誉賞が贈られた。\n\n「俺は最強だ！」——この言葉は自己暗示であり、信念であり、車いすテニスの歴史そのものだった。\n\n9歳で下半身の自由を失った少年は、車いすを「翼」に変え、世界の頂点に立ち、国民的英雄となった。彼の物語は、限界とは心が作るものであることの究極の証明だ。",
    year_label: "2022〜2023",
  },
  // --- Ikee ---
  {
    id: "sc-031", athlete_id: "ikee", order: 1, stage: "origin",
    title: "水の天才少女",
    body: "東京都出身の池江璃花子。幼児教育に精通した母の指導で、幼少期から雲梯やトランポリンで抜群の身体感覚を磨いた。中学時代から日本記録を次々と更新し、2018年のジャカルタ・アジア大会では6つの金メダルを獲得。日本水泳界の至宝として、2020年東京五輪での金メダルが確実視されていた。\n\n18歳。あらゆる可能性が彼女の前に広がっていた。",
    year_label: "〜2018",
  },
  {
    id: "sc-032", athlete_id: "ikee", order: 2, stage: "despair",
    title: "白血病——突然の宣告",
    body: "2019年2月12日。Twitterで「白血病と診断されました」と公表した一文が、日本中を震撼させた。急性リンパ性白血病。東京五輪を目前に、命の危機に直面した。\n\nプールではなく、病院のベッドが彼女の世界になった。抗がん剤の副作用で髪が抜け落ち、食事もままならない。水泳どころか、生きるための戦いが始まった。",
    year_label: "2019年2月",
  },
  {
    id: "sc-033", athlete_id: "ikee", order: 3, stage: "void",
    title: "水に浮くところからの再出発",
    body: "10ヶ月の入院生活を経て退院。しかし、かつてのアスリートの面影はなかった。筋肉は削げ落ち、体重は大幅に減少。退院後、プールに入った彼女が最初にしたことは「水に浮く」練習だった。\n\n日本記録保持者が、浮くことから始める——その姿に涙しない者はいなかった。\n\n「しんどい時、誰かが支えてくれる。それが一番の幸せ」——母の存在と、全国から届く応援メッセージが、彼女を支え続けた。",
    year_label: "2019〜2020",
  },
  {
    id: "sc-034", athlete_id: "ikee", order: 4, stage: "awakening",
    title: "日本選手権4冠——「逆境は乗り越えられる人にしか来ない」",
    body: "2021年4月、日本選手権。退院から約1年半で、池江は100mバタフライで優勝。東京五輪の代表切符を掴んだ。しかもそれだけでなく、計4種目で優勝。\n\nゴールタッチの瞬間、電光掲示板のタイムを見た池江は号泣した。\n\n「逆境は、乗り越えられない人には訪れない。神様は乗り越えられる人にしか試練を与えない」\n\nその言葉は、病と闘う全ての人への希望となった。",
    year_label: "2021年4月",
  },
  {
    id: "sc-035", athlete_id: "ikee", order: 5, stage: "rebirth",
    title: "パリ五輪、そして泳ぎ続ける理由",
    body: "2024年パリ五輪に出場。メダルには届かなかったが、白血病を乗り越え、世界最高峰の舞台に立った事実そのものが「奇跡」だった。\n\n「彼女がプールサイドに現れるだけで、チーム全体の空気が変わる。」（日本代表監督）\n\n池江璃花子の物語は、タイムやメダルを超えた場所にある。命を脅かす病から這い上がり、再び水の中で輝く姿——それは「生きる力」そのものの証明だ。",
    year_label: "2024〜",
  },
  // --- Woods ---
  {
    id: "sc-036", athlete_id: "woods", order: 1, stage: "origin",
    title: "父が育てたゴルフの超人",
    body: "カリフォルニア州サイプレス。軍人の父アール・ウッズは、2歳の息子にゴルフクラブを握らせた。テレビ出演は3歳、ジュニア大会優勝は8歳。そして21歳のマスターズ初優勝は、12打差という記録的圧勝。\n\n「彼の登場は、ゴルフというスポーツを変えた」——フィジカルの強さ、精神力、スター性。タイガー・ウッズはゴルフ界のマイケル・ジョーダンだった。メジャー通算15勝は、ジャック・ニクラウスの18勝に次ぐ歴代2位。",
    year_label: "〜2008",
  },
  {
    id: "sc-037", athlete_id: "woods", order: 2, stage: "despair",
    title: "自動車事故——右足粉砕骨折、切断の危機",
    body: "2021年2月23日早朝、ロサンゼルスで自動車事故。車は大破し、タイガーは右足を粉砕骨折。脛骨と腓骨の開放骨折、足首の粉砕。医師は足の切断を検討するほどだった。\n\nゴルフ以前に、二度と自力で歩けないかもしれない——それほどの壊滅的な怪我だった。過去に腰と膝の手術を5回経験してきたタイガーだが、今回の事故は次元が違った。",
    year_label: "2021年2月",
  },
  {
    id: "sc-038", athlete_id: "woods", order: 3, stage: "void",
    title: "息子のために立ち上がる",
    body: "事故後3ヶ月間は車椅子生活。その後、松葉杖、そして杖。冷たい水の中での歩行訓練を、毎日泥臭く繰り返した。\n\n「もう一度、息子と一緒にプレーしたい。その願いが僕を立ち上がらせた」\n\n45歳のタイガーを突き動かしたのは、トロフィーでもタイトルでもなく、息子チャーリーと肩を並べてコースを歩くという、父親としてのシンプルな願いだった。",
    year_label: "2021年春〜冬",
  },
  {
    id: "sc-039", athlete_id: "woods", order: 4, stage: "awakening",
    title: "マスターズ復帰——歩いただけで奇跡",
    body: "2022年4月、マスターズ。タイガーは自力で歩いてオーガスタの1番ティーに立った。事故から14ヶ月。脚にはロッドとスクリューが入った状態。\n\n「彼が再び歩いて現れたこと自体が、スポーツ史上最大の奇跡だ。」（ジャスティン・トーマス）\n\n4日間72ホールを完歩し、予選を通過。成績よりも、コースを歩く姿そのものがゴルフ界への贈り物だった。",
    year_label: "2022年4月",
  },
  {
    id: "sc-040", athlete_id: "woods", order: 5, stage: "rebirth",
    title: "痛みと共に生きる覚悟",
    body: "完全復活ではない。歩くたびに痛みが走り、かつてのように週4で試合に出ることはできない。それでもタイガーは選ばれた大会に出場し続ける。\n\n「痛みは消えないかもしれない。でも、それをどう受け入れ、どう制御するかがゴルフなんだ」\n\n息子チャーリーとの親子大会で、笑顔でプレーするタイガー。切断の危機を乗り越えた脚で歩くその姿は、「勝つこと」よりも「続けること」の価値を世界に教えている。\n\nメジャー15勝の伝説は、事故後の姿によって、さらに偉大なものとなった。",
    year_label: "2022〜",
  },
  // --- Mitoma ---
  {
    id: "sc-041", athlete_id: "mitoma", order: 1, stage: "origin",
    title: "ドリブルを科学した理論派",
    body: "神奈川県川崎市。川崎フロンターレのアカデミーで育った三笘は、大学時代に「サッカーにおけるドリブルの有効性」を卒論テーマに選ぶほどの理論派だった。筑波大学で理論と実践を融合させ、プロ入り後は川崎で主力に成長。\n\n2022年カタールW杯。スペイン戦で見せた「三笘の1ミリ」——ゴールラインギリギリのアシストは、日本サッカー史に刻まれる名場面となった。ブライトンでプレミアリーグ日本人最多得点を記録。",
    year_label: "〜2023",
  },
  {
    id: "sc-042", athlete_id: "mitoma", order: 2, stage: "despair",
    title: "腰椎の悲鳴",
    body: "2024年、プレミアリーグでの激しいプレーの蓄積が腰椎を襲った。ドリブラーにとって腰は生命線。急加速・急減速・方向転換——全ての動きの起点が機能しなくなった。\n\n長期離脱を余儀なくされ、チームの試合をスタンドから見つめる日々。「ピッチに立てないもどかしさは、言葉にできなかった」",
    year_label: "2024",
  },
  {
    id: "sc-043", athlete_id: "mitoma", order: 3, stage: "void",
    title: "ギフトとしてのリハビリ",
    body: "「怪我は、自分のプレーを客観的に分析するためのギフトだと思った」\n\n三笘は離脱期間を徹底した動作分析に費やした。かつて卒論で研究したドリブルの理論を、今度は自分の身体で再検証する。腰に負担をかけない体幹の使い方、重心移動の最適化。\n\n理論派の真骨頂が、怪我のリハビリで発揮された。走れない時間が、より「賢い」ドリブラーへの進化を促した。",
    year_label: "2024",
  },
  {
    id: "sc-044", athlete_id: "mitoma", order: 4, stage: "awakening",
    title: "復帰戦——以前より鋭いドリブル",
    body: "復帰戦。三笘のドリブルは、怪我前よりも明らかに鋭くなっていた。体幹の再構築により、加速と減速の切り替えがさらに速くなり、相手DFが反応できないレベルに達していた。\n\n「あきらめないという選択肢以外、僕の辞書には最初からなかった」\n\n科学者のような分析力と、アスリートとしての闘志。その両方を持つ三笘の復活は、理論に裏打ちされた必然だった。",
    year_label: "2025",
  },
  {
    id: "sc-045", athlete_id: "mitoma", order: 5, stage: "rebirth",
    title: "プレミアリーグで輝き続ける1ミリの男",
    body: "復帰後のシーズン、三笘はプレミアリーグで再び存在感を放つ。「1ミリ」のプレーを生んだ精密さは、怪我を経てさらに研ぎ澄まされた。\n\n「彼は怪我をしても、ピッチの外で誰よりも成長していた。」（所属監督）\n\nドリブルを科学する男は、怪我すらも研究材料に変えてしまう。三笘薫の物語は、知性と情熱の融合が生む「不屈の進化」の物語だ。",
    year_label: "2025〜",
  },
  // --- Abe ---
  {
    id: "sc-046", athlete_id: "abe", order: 1, stage: "origin",
    title: "兄妹で極めた攻撃柔道",
    body: "兵庫県神戸市。消防士の父のもと、幼少期から妹・詩と切磋琢磨した。「投げて勝つ」攻撃柔道を信条とし、高校時代に全日本ジュニアを制覇。\n\n2021年東京五輪では66kg級で金メダル。同じ日に妹・詩も金メダルを獲得し、「兄妹同日金メダル」という五輪史上に残る快挙を達成した。",
    year_label: "〜2021",
  },
  {
    id: "sc-047", athlete_id: "abe", order: 2, stage: "despair",
    title: "指の負傷と選考の壁",
    body: "度重なる稽古で指は変形し、握力は落ちた。66kg級という激戦区では、代表選考が毎回「命がけの戦い」となる。\n\n柔道家にとって「指が握れない」ことは、剣士が刀を持てないに等しい。組み手で相手の道着を掴めなければ、得意の投げ技は封じられる。精神的にも追い詰められた時期があった。",
    year_label: "2022〜2023",
  },
  {
    id: "sc-048", athlete_id: "abe", order: 3, stage: "void",
    title: "投げられない身体で磨いた体幹",
    body: "「一歩引く勇気が、次に二歩進むための力を生んでくれる」\n\n指を痛めて投げ込みができない期間。阿部はそれを「投げられない体幹を作る黄金期」に変えた。基礎トレーニングを徹底し、足腰の土台を作り直す。\n\n「負けてからの自分の姿にこそ、その人の本質が現れる」——この信念が、彼を支え続けた。",
    year_label: "2023",
  },
  {
    id: "sc-049", athlete_id: "abe", order: 4, stage: "awakening",
    title: "選考会の死闘を制す",
    body: "パリ五輪の代表選考。66kg級は日本柔道界屈指の激戦区。阿部は選考会で渾身の一本勝ちを見せ、2大会連続の代表切符を掴んだ。\n\n指の痛みは消えていない。しかし、基礎から鍛え直した体幹と足腰が、かつて以上の爆発的な投げを可能にしていた。怪我が彼の柔道を、さらに強くしていた。",
    year_label: "2024年春",
  },
  {
    id: "sc-050", athlete_id: "abe", order: 5, stage: "rebirth",
    title: "パリ五輪連覇——攻撃柔道の完成形",
    body: "2024年パリ五輪66kg級決勝。阿部一二三は圧倒的な攻撃柔道で金メダルを獲得。東京に続く五輪連覇を達成した。\n\n「彼の攻撃柔道は、挫折のたびに鋭くなっている。」（全日本監督）\n\n表彰台で見せた涙は、指の痛みに耐え、選考会の重圧に打ち勝ち、二連覇を成し遂げた全ての苦しみと喜びが凝縮されたものだった。妹・詩と共に、阿部家の柔道はまだ終わらない。",
    year_label: "2024年夏",
  },
  // --- Kimura ---
  {
    id: "sc-051", athlete_id: "kimura", order: 1, stage: "origin",
    title: "「なんでもやらせる」母と見えない世界の水泳",
    body: "滋賀県栗東市。2歳で先天性疾患により全盲となった敬一に、母は「なんでもやらせる」という方針を貫いた。水泳との出会いは4歳。見えないからこそ研ぎ澄まされた水の感覚は、やがて世界トップクラスの泳ぎを生み出す。\n\nパラリンピックに4大会連続出場。しかし、金メダルだけが手に入らなかった。",
    year_label: "〜2016",
  },
  {
    id: "sc-052", athlete_id: "kimura", order: 2, stage: "despair",
    title: "リオの絶望——金メダルゼロ",
    body: "2016年リオパラリンピック。4種目に出場し、銀メダルと銅メダルは獲れた。しかし金メダルだけがない。「あと一歩」が永遠に遠い。\n\n帰国後、木村は深い虚無感に陥った。「自分にはもう限界なのではないか」。全盲のハンディキャップを言い訳にしたくない——しかし、結果が伴わない現実に、心が折れかけた。",
    year_label: "2016",
  },
  {
    id: "sc-053", athlete_id: "kimura", order: 3, stage: "void",
    title: "単身アメリカへ——言葉なき再構築",
    body: "2017年、木村は単身アメリカへ渡った。言葉も通じない異国の地で、ゼロから自分を作り直す覚悟だった。\n\n「金メダルを獲れなかった時間は、仲間の大切さを教えてくれた」\n\n新しいコーチ、新しい練習環境、新しいライバル。見えない世界で見知らぬ土地に飛び込む勇気は、並大抵のものではない。しかし木村は「弱い自分から逃げない」と決めていた。",
    year_label: "2017〜2020",
  },
  {
    id: "sc-054", athlete_id: "kimura", order: 4, stage: "awakening",
    title: "東京パラリンピック——悲願の金メダル",
    body: "2021年東京パラリンピック100mバタフライ。木村敬一は、ついに金メダルに手を届かせた。ゴールタッチした瞬間、隣のレーンのライバル・富田宇宙に結果を聞いた。「金だよ！」の声に、木村は水中で崩れ落ちた。\n\n「見えないからこそ、研ぎ澄まされる感覚がある。それは僕だけの特権」\n\n全盲の世界で、世界の頂点に立った瞬間。涙は水の中に溶けていった。",
    year_label: "2021年夏",
  },
  {
    id: "sc-055", athlete_id: "kimura", order: 5, stage: "rebirth",
    title: "パリ連覇——見えない世界の最強の泳ぎ",
    body: "2024年パリパラリンピック。34歳の木村は再び金メダルを獲得。悲願から連覇へ。\n\n「彼の強さは、弱さから目を逸らさないことにある。」（米国コーチ）\n\n2歳で光を失い、リオで挫折し、アメリカで自分を作り直し、東京とパリで金メダルを掴んだ。木村敬一の物語は、「見えないこと」が「見えることの何倍もの感覚を研ぎ澄ませる」という、人間の可能性の証明だ。",
    year_label: "2024〜",
  },
  // --- Sanibrawn ---
  {
    id: "sc-056", athlete_id: "sanibrawn", order: 1, stage: "origin",
    title: "ガーナと日本の血が生んだスプリンター",
    body: "東京都出身。ガーナ人の父と日本人の母のもとに生まれたハキームは、幼少期はサッカーに熱中。陸上に転向すると、その恵まれた身体能力が一気に開花。高校時代に世界ユース選手権で100m・200mの2冠を達成し、「和製ボルト」と称された。\n\nフロリダ大学に進学し、世界トップレベルの環境で自らを磨く。2019年には9秒97の日本記録を樹立。",
    year_label: "〜2019",
  },
  {
    id: "sc-057", athlete_id: "sanibrawn", order: 2, stage: "despair",
    title: "腰と太ももの限界",
    body: "2020年、腰椎分離症を発症。さらにハムストリングの負傷が追い打ちをかけた。スプリンターにとって腰と太ももは「エンジン」そのもの。全力で走れない日々が続いた。\n\n東京五輪を目前に、「100%の状態で走れない」という焦燥感。「焦って戻る必要はない」——自分にそう言い聞かせることが、最も難しい戦いだった。",
    year_label: "2020〜2021",
  },
  {
    id: "sc-058", athlete_id: "sanibrawn", order: 3, stage: "void",
    title: "究極の走りを脳内に構築する",
    body: "「怪我をした時間は、自分の体と対話する研究期間だった」\n\nバイオメカニクスのビデオ分析を徹底し、怪我をしない「究極の走り」を脳内で構築した。走れなくても、頭の中では何千回も走っていた。\n\nフロリダ大学のコーチ陣と共に、筋肉のバランス、接地の角度、推進力の生成メカニズムを一つ一つ最適化。怪我の原因を根本から排除する、科学的アプローチのリハビリだった。",
    year_label: "2021〜2022",
  },
  {
    id: "sc-059", athlete_id: "sanibrawn", order: 4, stage: "awakening",
    title: "世界陸上——連続決勝進出",
    body: "2022年・2023年の世界陸上で、100m連続決勝進出。日本人として快挙だった。怪我から復帰したサニブラウンは、以前よりも効率的で安定した走りを見せた。\n\n「焦って戻る必要はない。100%の自分に戻った時、結果はついてくる」\n\nその言葉通り、彼は100%に戻った時、世界のファイナリストになっていた。",
    year_label: "2022〜2023",
  },
  {
    id: "sc-060", athlete_id: "sanibrawn", order: 5, stage: "rebirth",
    title: "パリ五輪9秒96——進化し続ける日本最速の男",
    body: "2024年パリ五輪。サニブラウンは9秒96を記録。日本記録を更新し、世界と対等に戦うスプリンターへと進化した。\n\n「彼は怪我を経て、以前よりさらに賢く、強いアスリートになった。」（米国コーチ）\n\n腰椎分離症で走れなかった時期に脳内で構築した「究極の走り」が、パリの風の中で現実になった。ガーナと日本の血が生んだスプリンターは、怪我を「研究期間」に変え、まだ加速を続けている。",
    year_label: "2024〜",
  },
  // --- Ito ---
  {
    id: "sc-061", athlete_id: "ito", order: 1, stage: "origin",
    title: "母と二人三脚で磨いた天才",
    body: "静岡県磐田市。母・美乃りの英才教育のもと、2歳で卓球を始めた美誠は、小学1年で全日本選手権バンビの部を制覇。最年少記録を次々と更新し、「卓球の天才」として注目を集めた。\n\n2021年東京五輪では混合ダブルスで金メダル、シングルスで銅メダル。独創的なサーブと予測不能なプレースタイルで世界を翻弄した。",
    year_label: "〜2021",
  },
  {
    id: "sc-062", athlete_id: "ito", order: 2, stage: "despair",
    title: "パリへの切符を逃した日",
    body: "2024年、パリ五輪代表選考で敗退。東京五輪メダリストが代表から外れる衝撃。腰痛を抱えながらの選考会で、本来の動きが出せなかった。\n\n「負けた瞬間は、頭が真っ白になった」\n\n卓球漬けの人生で、初めて「卓球が嫌になった」と感じた。五輪の舞台に立てない——その現実は、怪我の痛み以上に深く心を刺した。",
    year_label: "2024年初",
  },
  {
    id: "sc-063", athlete_id: "ito", order: 3, stage: "void",
    title: "卓球と距離を置いた日々",
    body: "選考落ちの後、美誠は一度卓球から距離を置いた。ラケットを握らず、友人と出かけ、普通の20代の女性としての時間を過ごした。\n\n「周りが何を言っても関係ない。私は私の道を進むだけ」\n\n休息の中で気づいたのは、自分がどれほど卓球を愛しているかということだった。勝つための卓球ではなく、楽しむための卓球——原点に立ち返る時間となった。",
    year_label: "2024年",
  },
  {
    id: "sc-064", athlete_id: "ito", order: 4, stage: "awakening",
    title: "「楽しい」の再発見",
    body: "再びラケットを握った美誠の表情は、以前とは違っていた。肩の力が抜け、目が輝いていた。\n\n「負けた悔しさは、次の試合で勝つための最大の貯金になる」\n\n母との特訓で磨いた独創的なサーブは健在。それに加えて、休息期間中に心が柔らかくなったことで、プレーにも余裕が生まれた。「楽しむ」ことが、最強の武器だった。",
    year_label: "2025",
  },
  {
    id: "sc-065", athlete_id: "ito", order: 5, stage: "rebirth",
    title: "私の道を進むだけ",
    body: "国際大会に復帰した美誠は、再び世界のトップ選手たちと渡り合う。パリに行けなかった悔しさは消えない。しかし、その悔しさを「貯金」に変えた彼女は、以前よりも深みのあるプレーを見せている。\n\n「彼女の独創性は、挫折を経験してさらに深みを増した。」（代表コーチ）\n\n母と二人三脚で歩んできた道。挫折を経て見つけた「楽しむ心」。伊藤美誠の物語は、まだ続いている。",
    year_label: "2025〜",
  },
  // --- Toratani ---
  {
    id: "sc-066", athlete_id: "toratani", order: 1, stage: "origin",
    title: "フェンシングの有望選手",
    body: "京都府出身の虎谷真央。幼い頃から剣道で鍛えた反射神経と、フェンシングに転向してから磨いた技術。高い身体能力を武器に、将来を嘱望される選手だった。\n\n剣を持つことは、彼女にとって「自分らしさの証明」だった。",
    year_label: "〜事故前",
  },
  {
    id: "sc-067", athlete_id: "toratani", order: 2, stage: "despair",
    title: "脊髄損傷——歩けない現実",
    body: "事故により脊髄を損傷。下半身の自由を突然奪われた。昨日まで走り、飛び、剣を振るっていた身体が、突然動かなくなる。\n\n「最初は受け入れられなかった。鏡に映る車いすの自分が、別人のように見えた」\n\nフェンシングの有望選手から、車いすの生活者へ。あまりに突然の転落だった。",
    year_label: "事故直後",
  },
  {
    id: "sc-068", athlete_id: "toratani", order: 3, stage: "void",
    title: "アイデンティティの再構築",
    body: "車いす生活を受け入れるまでに、長い時間がかかった。リハビリの連続。「自分は何者なのか」を問い直す日々。\n\n「過去の自分を追い越すために、今の自分がいる」\n\nそんな中、車いすフェンシングの存在を知る。座った状態で剣を交える——足は動かなくても、剣を持つ腕は健在だった。",
    year_label: "リハビリ期間",
  },
  {
    id: "sc-069", athlete_id: "toratani", order: 4, stage: "awakening",
    title: "剣を持てば、自由だ",
    body: "再び剣を握った瞬間、虎谷は「自分」を取り戻した。\n\n「剣を持てば、足が動かないことなんて関係ない。そこは自由な世界だ」\n\n車いすフェンシングでは、車いすを固定した状態で上半身のみで戦う。健常者時代に培った反射神経と剣技が、新しいフィールドで輝き始めた。過去の自分とは違う、しかし確かに「自分」だった。",
    year_label: "転向後",
  },
  {
    id: "sc-070", athlete_id: "toratani", order: 5, stage: "rebirth",
    title: "パリパラリンピックの舞台へ",
    body: "2024年パリパラリンピックに出場。世界の強豪と剣を交え、堂々と戦う姿がそこにあった。\n\n「彼女の剣先には、過去の絶望を乗り越えた者だけが持つ鋭さがある。」（フェンシング関係者）\n\n剣道・フェンシング・車いすフェンシング。形は変わっても、剣を持つ自分は変わらない。虎谷真央の物語は、「自分らしさ」を失わないことの力強い証明だ。",
    year_label: "2024",
  },
];

// ===== Injuries =====
export const athleteInjuries: InjuryRecord[] = [
  // McMorris
  { id: "inj-001", athlete_id: "mcmorris", body_region: "chest", injury_type: "rupture", diagnosis: "肺破裂", severity: 10, recovery_months: 9, year_occurred: 2017, description: "木に激突し肺が破裂", is_primary: true },
  { id: "inj-002", athlete_id: "mcmorris", body_region: "abdomen", injury_type: "rupture", diagnosis: "脾臓破裂", severity: 10, recovery_months: 9, year_occurred: 2017, description: "内臓破裂で緊急手術", is_primary: true },
  { id: "inj-003", athlete_id: "mcmorris", body_region: "hip_left", injury_type: "fracture", diagnosis: "骨盤骨折", severity: 9, recovery_months: 9, year_occurred: 2017, description: "全身17箇所の骨折のうちの一つ", is_primary: false },
  { id: "inj-004", athlete_id: "mcmorris", body_region: "lower_back", injury_type: "fracture", diagnosis: "肋骨多発骨折", severity: 8, recovery_months: 9, year_occurred: 2017, description: "複数の肋骨が折れた", is_primary: false },
  { id: "inj-005", athlete_id: "mcmorris", body_region: "upper_arm_left", injury_type: "fracture", diagnosis: "左腕骨折", severity: 7, recovery_months: 6, year_occurred: 2017, description: "左腕を骨折", is_primary: false },
  { id: "inj-006", athlete_id: "mcmorris", body_region: "head", injury_type: "fracture", diagnosis: "顎骨折", severity: 7, recovery_months: 4, year_occurred: 2017, description: "顎を骨折", is_primary: false },
  // Hirano
  { id: "inj-007", athlete_id: "hirano", body_region: "abdomen", injury_type: "rupture", diagnosis: "肝臓損傷", severity: 9, recovery_months: 6, year_occurred: 2017, description: "転倒により肝臓を損傷。命に関わる怪我", is_primary: true },
  { id: "inj-008", athlete_id: "hirano", body_region: "knee_left", injury_type: "tear", diagnosis: "左膝靭帯損傷", severity: 7, recovery_months: 6, year_occurred: 2017, description: "肝臓損傷と同時に発生", is_primary: true },
  { id: "inj-009", athlete_id: "hirano", body_region: "hip_left", injury_type: "fracture", diagnosis: "骨盤（腸骨）骨折", severity: 8, recovery_months: 3, year_occurred: 2026, description: "ミラノ五輪直前の骨折", is_primary: true },
  // Okamoto
  { id: "inj-010", athlete_id: "okamoto", body_region: "lower_back", injury_type: "other", diagnosis: "脊髄損傷（右膝下麻痺）", severity: 10, recovery_months: 24, year_occurred: 2015, description: "崖から転落。右膝から下の感覚を永久に失った", is_primary: true },
  { id: "inj-011", athlete_id: "okamoto", body_region: "chest", injury_type: "fracture", diagnosis: "全身15箇所骨折", severity: 10, recovery_months: 12, year_occurred: 2015, description: "全身の骨が砕けた", is_primary: true },
  // Ohtani
  { id: "inj-012", athlete_id: "ohtani", body_region: "elbow_right", injury_type: "tear", diagnosis: "右肘内側側副靭帯損傷（1回目）", severity: 8, recovery_months: 18, year_occurred: 2018, description: "トミー・ジョン手術。投手としての離脱", is_primary: true },
  { id: "inj-013", athlete_id: "ohtani", body_region: "elbow_right", injury_type: "tear", diagnosis: "右肘内側側副靭帯損傷（2回目）", severity: 9, recovery_months: 12, year_occurred: 2023, description: "2度目の手術。二刀流の危機", is_primary: true },
  // Murray
  { id: "inj-014", athlete_id: "murray", body_region: "hip_right", injury_type: "other", diagnosis: "変形性股関節症", severity: 9, recovery_months: 12, year_occurred: 2017, description: "関節軟骨の摩耗。靴下を履くことすら困難な激痛", is_primary: true },
  { id: "inj-015", athlete_id: "murray", body_region: "hip_right", injury_type: "other", diagnosis: "人工股関節置換術", severity: 10, recovery_months: 6, year_occurred: 2019, description: "金属製の人工関節に置換。プロ復帰の前例なし", is_primary: true },
  // Kunieda
  { id: "inj-016", athlete_id: "kunieda", body_region: "lower_back", injury_type: "other", diagnosis: "脊髄腫瘍（9歳）", severity: 10, recovery_months: 0, year_occurred: 1993, description: "9歳で下半身の自由を失う", is_primary: true },
  { id: "inj-017", athlete_id: "kunieda", body_region: "elbow_right", injury_type: "other", diagnosis: "右肘関節鼠（軟骨片）", severity: 7, recovery_months: 12, year_occurred: 2016, description: "軟骨片による激痛でプレーに支障", is_primary: true },
  // Ikee
  { id: "inj-018", athlete_id: "ikee", body_region: "abdomen", injury_type: "other", diagnosis: "急性リンパ性白血病", severity: 10, recovery_months: 20, year_occurred: 2019, description: "2019年発症。10ヶ月の入院・抗がん剤治療", is_primary: true },
  // Woods
  { id: "inj-019", athlete_id: "woods", body_region: "knee_right", injury_type: "fracture", diagnosis: "右脛骨・腓骨開放骨折", severity: 10, recovery_months: 14, year_occurred: 2021, description: "自動車事故。右足粉砕骨折、切断の危機", is_primary: true },
  { id: "inj-020", athlete_id: "woods", body_region: "ankle_right", injury_type: "fracture", diagnosis: "右足首粉砕骨折", severity: 9, recovery_months: 14, year_occurred: 2021, description: "事故による足首の多発骨折", is_primary: true },
  { id: "inj-021", athlete_id: "woods", body_region: "lower_back", injury_type: "other", diagnosis: "腰椎固定術（過去）", severity: 7, recovery_months: 12, year_occurred: 2017, description: "腰の手術歴あり", is_primary: false },
  // Mitoma
  { id: "inj-022", athlete_id: "mitoma", body_region: "lower_back", injury_type: "other", diagnosis: "腰椎負傷", severity: 7, recovery_months: 6, year_occurred: 2024, description: "プレミアリーグでの蓄積ダメージによる腰椎の負傷", is_primary: true },
  // Abe
  { id: "inj-023", athlete_id: "abe", body_region: "hand_right", injury_type: "other", diagnosis: "指の変形・負傷", severity: 5, recovery_months: 3, year_occurred: 2022, description: "度重なる稽古による指の変形と握力低下", is_primary: true },
  // Kimura
  { id: "inj-024", athlete_id: "kimura", body_region: "head", injury_type: "other", diagnosis: "先天性疾患による全盲", severity: 10, recovery_months: 0, year_occurred: 1992, description: "2歳で失明。パラ水泳の道へ", is_primary: true },
  // Sanibrawn
  { id: "inj-025", athlete_id: "sanibrawn", body_region: "lower_back", injury_type: "fracture", diagnosis: "腰椎分離症", severity: 7, recovery_months: 8, year_occurred: 2020, description: "スプリンターにとって致命的な腰の故障", is_primary: true },
  { id: "inj-026", athlete_id: "sanibrawn", body_region: "thigh_right", injury_type: "tear", diagnosis: "ハムストリング負傷", severity: 6, recovery_months: 4, year_occurred: 2021, description: "腰椎分離症に追い打ちをかけた太もも裏の負傷", is_primary: true },
  // Ito
  { id: "inj-027", athlete_id: "ito", body_region: "lower_back", injury_type: "other", diagnosis: "腰痛", severity: 5, recovery_months: 3, year_occurred: 2024, description: "慢性的な腰痛。パリ五輪選考に影響", is_primary: true },
  // Toratani
  { id: "inj-028", athlete_id: "toratani", body_region: "lower_back", injury_type: "other", diagnosis: "脊髄損傷", severity: 10, recovery_months: 0, year_occurred: 0, description: "事故により脊髄損傷。下半身の自由を失う", is_primary: true },
];

// ===== Quiz Questions =====
export const quizQuestions: QuizQuestion[] = [
  // コーヒーブレイク（全般）
  {
    id: "quiz-001",
    athlete_id: null,
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "トミー・ジョン手術（肘の靭帯再建手術）を乗り越えた多くのプロ野球選手が、リハビリ期間中に「最も苦しかったこと」として共通して挙げるのは、次のうちどれでしょう？",
    choices: [
      "手術の痛みそのもの",
      "「自分がいなくても、チームは普通に試合が進んでいく」という疎外感",
      "病院の食事が口に合わないこと",
      "筋トレのメニューが単調なこと",
    ],
    correct_index: 1,
    rationale: "「自分の居場所がなくなる」という恐怖（精神的負債）は、身体的な痛みよりもアスリートを苦しめます。しかし、この期間に自分を客観視し「今の自分にしかできないこと」を見つけた選手が、後に大復活を遂げています。",
    encouragement: "あなたも「自分がいなくても回る世界」を経験したことはありますか？ その孤独の中にこそ、新しい自分を発見するチャンスがあるのかもしれません。",
  },
  // 本格分析（平野）
  {
    id: "quiz-002",
    athlete_id: "hirano",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "平野歩夢選手が、2026年の骨盤骨折という致命的な状況でも、なぜ「強行出場」という判断ができたのでしょうか？ 彼の「強み（資産）」から考えてください。",
    choices: [
      "単に若さゆえの無謀な判断だったから",
      "スポンサーからの圧力が強かったから",
      "過去の「死にかけた大怪我」を乗り越えた経験が、痛みの先にある自分の限界値を正確に「計算」させてくれたから",
      "痛みを感じない体質だったから",
    ],
    correct_index: 2,
    rationale: "過去の肝臓損傷という絶望（負債）を乗り越えた経験が、彼にとって最大の「経験資産」となっていました。彼は感情で動いたのではなく、「この痛みなら、こう滑れば制御できる」という精密な計算に基づいて復活を選んだのです。",
    encouragement: "過去の辛い経験は、未来の自分を助ける「資産」になります。あなたが乗り越えたことも、きっと同じです。",
  },
  // McMorris
  {
    id: "quiz-003",
    athlete_id: "mcmorris",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "マーク・マクモリスが事故後のリハビリで自分自身をどのように捉えていたか、最も正確なのはどれ？",
    choices: [
      "悲劇のヒーローとして同情を集めようとした",
      "企業の再生案件のように、日々の回復を「資産の増加」として捉えた",
      "怪我を忘れるために別の趣味に没頭した",
      "早く復帰するために医師の指示を無視してトレーニングした",
    ],
    correct_index: 1,
    rationale: "マクモリスは「今日の僕の資産は昨日より増えたか？」と自問しながらリハビリに取り組みました。膝が少し曲がるようになれば、それは大きな「利益」。この思考法が、絶望の中でも前に進む力になったのです。",
    encouragement: "「今日の自分は昨日より少しだけ成長したか？」——この問いかけは、誰にでも使える最強の回復メソッドかもしれません。",
  },
  // Okamoto
  {
    id: "quiz-004",
    athlete_id: "okamoto",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "岡本圭司選手が脊髄損傷を負った後、パラスノーボードに出会ったときの心境として最も近いものは？",
    choices: [
      "仕方なく、残された選択肢として受け入れた",
      "失ったものへの怒りで、何でもいいからやりたかった",
      "新しい冒険が始まるワクワク感を感じた",
      "パラリンピックの賞金目当てだった",
    ],
    correct_index: 2,
    rationale: "岡本選手は「新しい冒険が始まるワクワク感があった」と語っています。かつて雪山で未知のラインを探していた冒険心と同じ感覚で、パラスノーボードという新世界に飛び込んだのです。",
    encouragement: "人生には「終わり」ではなく「新しい始まり」がある。岡本選手の姿勢は、すべての人に勇気を与えてくれます。",
  },
  // Coffee break
  {
    id: "quiz-005",
    athlete_id: "mcmorris",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "マーク・マクモリスが2017年の大事故で骨折した箇所の数は？",
    choices: ["7箇所", "12箇所", "17箇所", "23箇所"],
    correct_index: 2,
    rationale: "全身17箇所の骨折。肺と脾臓の破裂も伴う壮絶な事故でしたが、わずか11ヶ月後に五輪のメダルを獲得しました。",
    encouragement: "17箇所の骨折から五輪メダリストに。人間の回復力は、私たちが思っている以上にすごいんです。",
  },
  {
    id: "quiz-006",
    athlete_id: "hirano",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "平野歩夢選手の名前「歩夢」の由来は？",
    choices: ["夢を歩む", "歩いて夢を叶える", "夢の中を歩く", "一歩ずつ夢に近づく"],
    correct_index: 0,
    rationale: "母がつけた「夢を歩む」という意味の名前。その名の通り、彼は何度倒れても夢に向かって歩き続けています。",
    encouragement: "あなたの名前にも、きっと素敵な意味が込められているはず。",
  },
  // Ohtani
  {
    id: "quiz-007",
    athlete_id: "ohtani",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "大谷翔平選手が2度のトミー・ジョン手術後も二刀流を諦めなかった最大の理由として、最も本質的なものは？",
    choices: [
      "スポンサー契約の条件だったから",
      "リハビリ期間を『アップデートの時間』と捉え、投げられない間に打者として進化できることを知っていたから",
      "医師が問題ないと太鼓判を押したから",
      "チームメイトからの圧力",
    ],
    correct_index: 1,
    rationale: "大谷選手は怪我を「自分をアップデートする時間」として捉えました。投げられない期間を打者としての進化に費やし、結果としてMLB史上初の50-50を達成。ネガティブをポジティブに変換する思考こそが、二刀流を貫く原動力でした。",
    encouragement: "「できないこと」ではなく「今だからこそできること」に目を向ける。大谷選手の思考法は、日常生活にも活かせるヒントです。",
  },
  {
    id: "quiz-008",
    athlete_id: "ohtani",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "大谷翔平選手が中学時代に活用していた目標管理ツールは？",
    choices: ["マンダラチャート", "ガントチャート", "フローチャート", "マインドマップ"],
    correct_index: 0,
    rationale: "9×9のマスに目標を書き込むマンダラチャートで、花巻東高校時代に「ドラ1、8球団」という目標を具体化しました。",
    encouragement: "目標を「見える化」すると、叶う確率がグッと上がるかもしれません。",
  },
  // Murray
  {
    id: "quiz-009",
    athlete_id: "murray",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "アンディ・マレーが人工股関節置換手術を選んだ理由として、彼の「資産」の観点から最も正確なものは？",
    choices: [
      "日常生活の改善だけが目的だった",
      "引退を受け入れるための手術だった",
      "「まだ終わっていない」という不屈の精神と、母から受け継いだ粘り強さが、前例のない挑戦を選ばせた",
      "他に選択肢がなかった",
    ],
    correct_index: 2,
    rationale: "マレーの最大の「資産」は、スコットランドで母に鍛えられた粘り強い精神力でした。金属の股関節でプロ復帰した前例はなかったのに、彼は「まだ終わっていない」と信じ続けた。その不屈の精神こそが、不可能を可能にした源泉です。",
    encouragement: "「前例がない」は「不可能」ではありません。あなたが最初の「前例」になれるかもしれません。",
  },
  {
    id: "quiz-010",
    athlete_id: "murray",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "アンディ・マレーの股関節症で、日常生活で最も困難だったことは？",
    choices: ["靴下を履くこと", "階段を上ること", "寝返りを打つこと", "食事をすること"],
    correct_index: 0,
    rationale: "変形性股関節症の痛みで、靴下を履くという何気ない動作すら地獄のように辛かったと本人が語っています。",
    encouragement: "当たり前にできることの有り難さに気づくのも、大切なことかもしれません。",
  },
  // Kunieda
  {
    id: "quiz-011",
    athlete_id: "kunieda",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "国枝慎吾選手がリオ五輪後のスランプから復活するためにとった最も革新的な行動は？",
    choices: [
      "練習量を2倍に増やした",
      "車いすの漕ぎ方をバイオメカニクスの研究から根本的に変えた",
      "コーチを海外から招聘した",
      "競技を一時引退した",
    ],
    correct_index: 1,
    rationale: "国枝選手は長年の経験に頼るのではなく、バイオメカニクスの科学的研究に基づいて車いすの漕ぎ方を根本から変えました。「自分をアップデートし続ける天才」と呼ばれる所以です。",
    encouragement: "「今までのやり方」を捨てる勇気が、新しい自分を連れてきてくれることがあります。",
  },
  {
    id: "quiz-012",
    athlete_id: "kunieda",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "国枝慎吾選手のトレードマークのセリフは？",
    choices: ["俺は最強だ！", "俺に不可能はない！", "俺はまだ終わっていない！", "俺を止められる者はいない！"],
    correct_index: 0,
    rationale: "「俺は最強だ！（I am the strongest!）」は自己暗示であり、信念。この言葉が彼の車いすテニスの原動力でした。",
    encouragement: "自分を信じる言葉を持つことは、とても大きな力になるんです。",
  },
  // Ikee
  {
    id: "quiz-013",
    athlete_id: "ikee",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "池江璃花子選手が白血病からの復帰後、最初にプールで行ったことは？",
    choices: [
      "タイムを計測した",
      "100mを全力で泳いだ",
      "水に浮く練習をした",
      "飛び込みの練習をした",
    ],
    correct_index: 2,
    rationale: "日本記録保持者が「水に浮く」ところからの再スタート。抗がん剤治療で筋肉が失われ、浮くことすら一からのスタートでした。この「ゼロからの再構築」が、後の劇的な復活の土台となりました。",
    encouragement: "どんなに遠い道のりでも、最初の一歩は「浮く」ことから。焦らず、自分のペースで前に進むことが大切です。",
  },
  {
    id: "quiz-014",
    athlete_id: "ikee",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "池江璃花子選手が2018年アジア大会で獲得した金メダルの数は？",
    choices: ["6個", "4個", "3個", "8個"],
    correct_index: 0,
    rationale: "2018年ジャカルタ・アジア大会でMVPに選ばれ、6つの金メダルを獲得しました。",
    encouragement: "彼女の才能は白血病を経験した後も輝き続けています。",
  },
  // Woods
  {
    id: "quiz-015",
    athlete_id: "woods",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "タイガー・ウッズが自動車事故後のリハビリで、最大の原動力となったものは？",
    choices: [
      "メジャー16勝目への執念",
      "スポンサーとの契約義務",
      "息子チャーリーともう一度一緒にプレーしたいという願い",
      "医師からの「必ず歩ける」という言葉",
    ],
    correct_index: 2,
    rationale: "「もう一度、息子と一緒にプレーしたい」——タイガーを立ち上がらせたのは、タイトルでも名誉でもなく、父親としてのシンプルな願いでした。彼の復活は、家族愛が生んだ奇跡です。",
    encouragement: "あなたにとっての「もう一度」は何ですか？ その願いが、きっと力をくれます。",
  },
  {
    id: "quiz-016",
    athlete_id: "woods",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "タイガー・ウッズのメジャー通算勝利数は？",
    choices: ["15勝", "18勝", "12勝", "20勝"],
    correct_index: 0,
    rationale: "メジャー通算15勝は、ジャック・ニクラウスの18勝に次ぐ歴代2位の記録です。",
    encouragement: "まだ挑戦を続けるタイガー。「終わり」は自分で決めるものなんですね。",
  },
  // Mitoma
  {
    id: "quiz-017",
    athlete_id: "mitoma",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "三笘薫選手が怪我のリハビリ中に活かした、彼ならではの「資産」は？",
    choices: [
      "筋力トレーニングのノウハウ",
      "大学時代にドリブルを科学的に研究した分析力",
      "海外での人脈",
      "チームメイトとの絆",
    ],
    correct_index: 1,
    rationale: "三笘選手は筑波大学時代にドリブルの有効性を科学的に分析する卒論を書いた「理論派」。怪我の期間もこの分析力を活かし、腰に負担のない動作を科学的に再構築。復帰後、以前より鋭いドリブルを手に入れました。",
    encouragement: "「学び」は裏切らない。あなたが積み重ねた知識も、いつか必ず自分を助けてくれます。",
  },
  {
    id: "quiz-018",
    athlete_id: "mitoma",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "「三笘の1ミリ」が生まれた試合の相手国は？",
    choices: ["スペイン", "ドイツ", "ブラジル", "フランス"],
    correct_index: 0,
    rationale: "2022年カタールW杯のスペイン戦で、ゴールラインギリギリのアシストが「三笘の1ミリ」として日本サッカー史に刻まれました。",
    encouragement: "1ミリの差が歴史を変える。小さな努力の積み重ねが大切なんですね。",
  },
  // Abe
  {
    id: "quiz-019",
    athlete_id: "abe",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "阿部一二三選手が指の負傷で投げ込みができない期間に行ったことは？",
    choices: [
      "完全に休養して指の回復に専念した",
      "投げられない時間を「投げられない体幹を作る」基礎訓練の黄金期に変えた",
      "スポーツ心理学の勉強に費やした",
      "他の格闘技のトレーニングに切り替えた",
    ],
    correct_index: 1,
    rationale: "「一歩引く勇気が、次に二歩進むための力を生んでくれる」。投げ込みができない期間を基礎体力の強化に充て、結果として以前以上の爆発的な投げを可能にしました。",
    encouragement: "「できないこと」の中にこそ、「今しかできないこと」が隠れています。",
  },
  {
    id: "quiz-020",
    athlete_id: "abe",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "阿部一二三選手と同じ日に東京五輪で金メダルを獲得した家族は？",
    choices: ["妹・阿部詩", "兄", "父", "従兄弟"],
    correct_index: 0,
    rationale: "2021年東京五輪で、兄の一二三（66kg級）と妹の詩（52kg級）が同じ日に金メダルを獲得。五輪史上に残る快挙でした。",
    encouragement: "家族と切磋琢磨できる環境って素晴らしいですね！",
  },
  // Kimura
  {
    id: "quiz-021",
    athlete_id: "kimura",
    quiz_type: "serious",
    difficulty: 3,
    question_text: "木村敬一選手がリオ五輪後の挫折から復活するために選んだ行動は？",
    choices: [
      "日本国内で練習環境を変えた",
      "単身アメリカへ渡り、言葉も通じない環境でゼロから自分を再構築した",
      "一度引退して復帰した",
      "メンタルトレーニングに集中した",
    ],
    correct_index: 1,
    rationale: "全盲で単身アメリカへ渡るという決断は、想像を絶する勇気が必要です。しかし木村選手は「弱い自分から逃げない」と決め、言葉も通じない異国の地で自分を作り直しました。その結果、東京とパリで金メダルを連覇。",
    encouragement: "弱さから目を逸らさない強さ。それが本当の勇気なのかもしれません。",
  },
  {
    id: "quiz-022",
    athlete_id: "kimura",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "木村敬一選手が東京パラリンピックで金メダルを獲得した時、結果を教えてくれたのは？",
    choices: ["隣のレーンの富田宇宙選手", "コーチ", "観客の歓声で", "電光掲示板を読んでもらった"],
    correct_index: 0,
    rationale: "全盲の木村選手はゴールタッチ後、隣のレーンで泳いでいたライバル・富田選手に結果を聞き、「金だよ！」の声に水中で崩れ落ちました。",
    encouragement: "ライバルが教えてくれた金メダル。スポーツの美しさが詰まったエピソードですね。",
  },
  // Sanibrawn
  {
    id: "quiz-023",
    athlete_id: "sanibrawn",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "サニブラウン選手が怪我で走れない期間に行った、独自のリハビリ方法は？",
    choices: [
      "水中トレーニングに専念した",
      "バイオメカニクスのビデオ分析で「究極の走り」を脳内に構築した",
      "上半身のトレーニングに集中した",
      "自転車トレーニングに切り替えた",
    ],
    correct_index: 1,
    rationale: "走れなくても、頭の中では何千回も走っていた。科学的なビデオ分析で走りのメカニズムを解析し、怪我の原因を根本から排除する「究極の走り」を脳内で構築しました。",
    encouragement: "身体が動かなくても、頭は動く。イメージトレーニングは誰でもどこでもできる強力なツールです。",
  },
  {
    id: "quiz-024",
    athlete_id: "sanibrawn",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "サニブラウン選手が大学時代を過ごしたアメリカの大学は？",
    choices: ["フロリダ大学", "UCLA", "スタンフォード大学", "テキサス大学"],
    correct_index: 0,
    rationale: "世界トップレベルの陸上プログラムを持つフロリダ大学で、コーチ陣と共にスプリンターとしての基盤を築きました。",
    encouragement: "自分を磨く環境を自ら選ぶこと。それも大切な才能ですね。",
  },
  // Ito
  {
    id: "quiz-025",
    athlete_id: "ito",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "伊藤美誠選手がパリ五輪代表選考落ち後、復活のきっかけとなったものは？",
    choices: [
      "すぐに練習量を増やして次の大会に備えた",
      "卓球と距離を置き、自分の「卓球愛」を再確認した",
      "海外リーグに移籍した",
      "コーチを変更した",
    ],
    correct_index: 1,
    rationale: "一度卓球から離れることで、自分がどれほど卓球を愛しているかを再確認しました。「勝つための卓球」から「楽しむための卓球」へ——原点に戻ることが、最大の復活のきっかけでした。",
    encouragement: "「離れること」は「諦めること」ではありません。距離を置いてこそ見えるものがあります。",
  },
  {
    id: "quiz-026",
    athlete_id: "ito",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "伊藤美誠選手が東京五輪で金メダルを獲得した種目は？",
    choices: ["混合ダブルス", "女子シングルス", "女子ダブルス", "女子団体"],
    correct_index: 0,
    rationale: "2021年東京五輪で水谷隼選手とのペアで混合ダブルス金メダルを獲得。日本卓球界初の五輪金メダルでした。",
    encouragement: "最高のパートナーとの出会いが、最高の結果を生むこともあるんですね。",
  },
  // Toratani
  {
    id: "quiz-027",
    athlete_id: "toratani",
    quiz_type: "serious",
    difficulty: 2,
    question_text: "虎谷真央選手が車いすフェンシングに出会った時、最も大きな「資産」となったものは？",
    choices: [
      "車いす操作の技術",
      "健常者時代に剣道・フェンシングで培った反射神経と剣技",
      "リハビリで鍛えた上半身の筋力",
      "パラスポーツの知識",
    ],
    correct_index: 1,
    rationale: "車いすフェンシングは上半身のみで戦う競技。健常者時代に磨いた剣道とフェンシングの技術がそのまま「資産」として活きました。失ったものの中にも、残ったものがある。それが復活の鍵でした。",
    encouragement: "あなたがこれまでに積み重ねてきたことは、決して無駄にはなりません。",
  },
  {
    id: "quiz-028",
    athlete_id: "toratani",
    quiz_type: "coffee_break",
    difficulty: 1,
    question_text: "車いすフェンシングの特徴として正しいものは？",
    choices: ["車いすを固定して上半身のみで戦う", "車いすを自由に動かして戦う", "立った状態で戦うこともある", "車いすの速さも得点に関わる"],
    correct_index: 0,
    rationale: "車いすフェンシングでは、車いすを「ピスト」と呼ばれる装置に固定した状態で、上半身のみで剣を交えます。",
    encouragement: "パラスポーツの世界には、まだ知らない魅力がたくさんあります！",
  },
];

// ===== Body Region Coordinates =====
export const bodyRegionCoordinates: BodyCoord[] = [
  { region: "head", x: 0, y: 1.7, z: 0, label_ja: "頭部" },
  { region: "neck", x: 0, y: 1.55, z: 0, label_ja: "首" },
  { region: "shoulder_left", x: -0.25, y: 1.4, z: 0, label_ja: "左肩" },
  { region: "shoulder_right", x: 0.25, y: 1.4, z: 0, label_ja: "右肩" },
  { region: "upper_arm_left", x: -0.35, y: 1.25, z: 0, label_ja: "左上腕" },
  { region: "upper_arm_right", x: 0.35, y: 1.25, z: 0, label_ja: "右上腕" },
  { region: "elbow_left", x: -0.4, y: 1.1, z: 0, label_ja: "左肘" },
  { region: "elbow_right", x: 0.4, y: 1.1, z: 0, label_ja: "右肘" },
  { region: "forearm_left", x: -0.4, y: 0.95, z: 0, label_ja: "左前腕" },
  { region: "forearm_right", x: 0.4, y: 0.95, z: 0, label_ja: "右前腕" },
  { region: "chest", x: 0, y: 1.3, z: 0.1, label_ja: "胸部" },
  { region: "upper_back", x: 0, y: 1.3, z: -0.1, label_ja: "上背部" },
  { region: "lower_back", x: 0, y: 1.05, z: -0.1, label_ja: "腰部" },
  { region: "abdomen", x: 0, y: 1.1, z: 0.1, label_ja: "腹部" },
  { region: "hip_left", x: -0.15, y: 0.9, z: 0, label_ja: "左股関節" },
  { region: "hip_right", x: 0.15, y: 0.9, z: 0, label_ja: "右股関節" },
  { region: "thigh_left", x: -0.15, y: 0.7, z: 0, label_ja: "左太もも" },
  { region: "thigh_right", x: 0.15, y: 0.7, z: 0, label_ja: "右太もも" },
  { region: "knee_left", x: -0.15, y: 0.5, z: 0, label_ja: "左膝" },
  { region: "knee_right", x: 0.15, y: 0.5, z: 0, label_ja: "右膝" },
  { region: "ankle_left", x: -0.15, y: 0.15, z: 0, label_ja: "左足首" },
  { region: "ankle_right", x: 0.15, y: 0.15, z: 0, label_ja: "右足首" },
  { region: "foot_left", x: -0.15, y: 0.05, z: 0.05, label_ja: "左足" },
  { region: "foot_right", x: 0.15, y: 0.05, z: 0.05, label_ja: "右足" },
];

// ===== Helper Functions =====
export function getAthleteById(id: string) {
  return athletes.find((a) => a.id === id) ?? null;
}

export function getQuotesByAthleteId(id: string) {
  return goldenQuotes.filter((q) => q.athlete_id === id);
}

export function getTestimoniesByAthleteId(id: string) {
  return testimonies.filter((t) => t.athlete_id === id);
}

export function getStoryByAthleteId(id: string) {
  return storyChapters.filter((s) => s.athlete_id === id).sort((a, b) => a.order - b.order);
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
