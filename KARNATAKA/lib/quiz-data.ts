import type { Lang } from './languages'

export type QuizDifficulty = 'easy' | 'medium' | 'hard'
export type QuizLanguage = 'en' | 'kn' | 'ta' | 'te' | 'ml'
export type QuizText = Record<QuizLanguage, string>

export type QuizQuestion = {
  id: string
  category: string
  subcategories: string[]
  difficulty: QuizDifficulty
  prompt: QuizText
  options: [QuizText, QuizText, QuizText, QuizText]
  correctIndex: number
  explanation: QuizText
}

const copy = (en: string, kn: string, ta: string, te: string, ml: string): QuizText => ({
  en,
  kn,
  ta,
  te,
  ml,
})

const option = (en: string) => copy(en, en, en, en, en)

const q = (
  id: string,
  category: string,
  subcategories: string[],
  difficulty: QuizDifficulty,
  prompt: QuizText,
  options: [string, string, string, string],
  correctIndex: number,
  explanation: QuizText,
): QuizQuestion => ({
  id,
  category,
  subcategories,
  difficulty,
  prompt,
  options: options.map(option) as QuizQuestion['options'],
  correctIndex,
  explanation,
})

export const quizQuestions: QuizQuestion[] = [
  // Art
  q(
    'art-mysore-painting', 'art', ['painting'], 'easy',
    copy('Which Karnataka painting style is known for raised gesso work and real gold leaf?', 'ಎತ್ತರದ ಗesso ಕೆಲಸ ಮತ್ತು ನಿಜವಾದ ಚಿನ್ನದ ಹಾಳೆಗೆ ಪ್ರಸಿದ್ಧವಾದ ಕರ್ನಾಟಕದ ಚಿತ್ರಕಲೆ ಯಾವುದು?', 'உயர்த்தப்பட்ட கெஸ்ஸோ வேலை மற்றும் உண்மையான தங்கத் தகட்டுக்குப் புகழ்பெற்ற கர்நாடக ஓவியம் எது?', 'ఎత్తైన గెస్సో పని, నిజమైన బంగారు రేకుకు ప్రసిద్ధమైన కర్ణాటక చిత్రకళ ఏది?', 'ഉയർത്തിയ ജെസ്സോ പണിക്കും യഥാർത്ഥ സ്വർണ്ണത്താളിനും പ്രസിദ്ധമായ കർണാടക ചിത്രകല ഏത്?'),
    ['Mysore painting', 'Chittara', 'Ganjifa', 'Bidriware'], 0,
    copy('Mysore painting uses raised gesso, gold leaf and soft colours, often for devotional or royal scenes.', 'ಮೈಸೂರು ಚಿತ್ರಕಲೆಯಲ್ಲಿ ಎತ್ತರದ gesso, ಚಿನ್ನದ ಹಾಳೆ ಮತ್ತು ಮೃದುವಾದ ಬಣ್ಣಗಳನ್ನು ಬಳಸುತ್ತಾರೆ.', 'மைசூர் ஓவியத்தில் உயர்த்தப்பட்ட கெஸ்ஸோ, தங்கத் தகடு மற்றும் மென்மையான நிறங்கள் பயன்படுகின்றன.', 'మైసూరు చిత్రకళలో ఎత్తైన గెస్సో, బంగారు రేకు, మృదువైన రంగులు వాడతారు.', 'മൈസൂർ ചിത്രകലയിൽ ഉയർത്തിയ ജെസ്സോ, സ്വർണ്ണത്താൾ, മൃദുവായ നിറങ്ങൾ ഉപയോഗിക്കുന്നു.'),
  ),
  q(
    'art-bidri-metal', 'art', ['craft'], 'easy',
    copy('Bidriware is traditionally made from which darkened metal alloy?', 'ಬಿದರಿ ಕಲೆ ಯಾವ ಕಪ್ಪಾಗಿಸಿದ ಲೋಹದ ಮಿಶ್ರಲೋಹದಿಂದ ತಯಾರಿಸಲಾಗುತ್ತದೆ?', 'பித்ரி வேலை எந்த கருமையாக்கப்பட்ட உலோகக் கலவையால் செய்யப்படுகிறது?', 'బిద్రీవేర్ ఏ నల్లగా చేసిన లోహ మిశ్రమంతో తయారవుతుంది?', 'ബിദ്രിവെയർ ഏത് കറുപ്പിച്ച ലോഹമിശ്രിതത്തിലാണ് ഉണ്ടാക്കുന്നത്?'),
    ['Zinc and copper', 'Gold and silver', 'Iron and tin', 'Brass and lead'], 0,
    copy('Bidriware uses a zinc-copper alloy, with silver inlay that shines against the black surface.', 'ಬಿದರಿ ಕಲೆ ಜಿಂಕ್-ತಾಮ್ರ ಮಿಶ್ರಲೋಹದಲ್ಲಿ ಬೆಳ್ಳಿ ಜಡಿತದಿಂದ ಮಾಡಲಾಗುತ್ತದೆ.', 'பித்ரி வேலை துத்தநாகம்-செம்புக் கலவையில் வெள்ளி பதிப்புடன் செய்யப்படுகிறது.', 'బిద్రీవేర్ జింక్-రాగి మిశ్రమంలో వెండి పొదుగుతో తయారవుతుంది.', 'ബിദ്രിവെയർ സിങ്ക്-ചെമ്പ് മിശ്രിതത്തിൽ വെള്ളി പതിപ്പോടെയാണ് നിർമ്മിക്കുന്നത്.'),
  ),
  q(
    'art-chittara-community', 'art', ['painting'], 'medium',
    copy('Chittara wall art is traditionally associated with which community in the Malnad region?', 'ಮಲೆನಾಡಿನಲ್ಲಿ ಚಿತ್ತಾರ ಗೋಡೆ ಕಲೆಯನ್ನು ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ಯಾವ ಸಮುದಾಯ ಮಾಡುತ್ತದೆ?', 'மல்நாடு பகுதியில் சித்தாரா சுவர் ஓவியம் எந்த சமூகத்துடன் தொடர்புடையது?', 'మల్నాడ్ ప్రాంతంలో చిత్తార గోడచిత్రం సంప్రదాయంగా ఏ సమాజానికి చెందింది?', 'മലനാട് പ്രദേശത്തെ ചിത്താര ചുമർചിത്രം പരമ്പരാഗതമായി ഏത് സമൂഹവുമായി ബന്ധപ്പെട്ടതാണ്?'),
    ['Deewaru', 'Kodava', 'Kuruba', 'Thigala'], 0,
    copy('Women of the Deewaru community make geometric Chittara designs with rice paste, earth, seeds and soot.', 'ದೀವಾರು ಸಮುದಾಯದ ಮಹಿಳೆಯರು ಅಕ್ಕಿ ಪೇಸ್ಟ್, ಮಣ್ಣು, ಬೀಜ ಮತ್ತು ಮಸಿಯಿಂದ ಚಿತ್ತಾರ ಬಿಡಿಸುತ್ತಾರೆ.', 'தீவாரு சமூகப் பெண்கள் அரிசிப் பசை, மண், விதைகள், கரி கொண்டு சித்தாரா வரைகின்றனர்.', 'దీవారు సమాజ మహిళలు బియ్యం పేస్ట్, మట్టి, విత్తనాలు, మసితో చిత్తార గీయుతారు.', 'ദീവാരു സമൂഹത്തിലെ സ്ത്രീകൾ അരിപേസ്റ്റ്, മണ്ണ്, വിത്ത്, കരി എന്നിവകൊണ്ട് ചിത്താര വരയ്ക്കുന്നു.'),
  ),
  q(
    'art-channapatna-toys', 'art', ['traditional-toys'], 'medium',
    copy('What gives Channapatna toys their glossy traditional finish?', 'ಚನ್ನಪಟ್ಟಣದ ಆಟಿಕೆಗಳಿಗೆ ಹೊಳೆಯುವ ಸಾಂಪ್ರದಾಯಿಕ ಮೆರುಗು ಯಾವುದು ನೀಡುತ್ತದೆ?', 'சன்னப்பட்டண பொம்மைகளுக்கு பாரம்பரிய பளபளப்பை எது தருகிறது?', 'చన్నಪಟ್ಟణ బొమ్మలకు మెరిసే సంప్రదాయ ముగింపు ఏది ఇస్తుంది?', 'ചന്നപ്പട്ടണ കളിപ്പാട്ടങ്ങൾക്ക് പരമ്പരാഗത തിളക്കം നൽകുന്നത് എന്താണ്?'),
    ['Lac mixed with natural dyes', 'Glass powder', 'Silver foil', 'Wax polish'], 0,
    copy('Artisans turn soft wood on a lathe and apply coloured lac, a natural resin, for the bright finish.', 'ಕುಶಲಕರ್ಮಿಗಳು ಮೃದುವಾದ ಮರವನ್ನು ಕಡೆದು ನೈಸರ್ಗಿಕ ರಾಳವಾದ ಲ್ಯಾಕ್‌ನಿಂದ ಮೆರುಗು ನೀಡುತ್ತಾರೆ.', 'கைவினைஞர்கள் மென்மையான மரத்தைத் திருப்பி இயற்கை பிசின் லாக்கால் பூசுகின்றனர்.', 'కళాకారులు మృదువైన చెక్కను లాత్‌పై తిప్పి సహజ రెసిన్ లాక్‌తో మెరుగు ఇస్తారు.', 'ശില്പികൾ മൃദുവായ മരം ലാത്തിൽ തിരിച്ച് പ്രകൃതിദത്ത റെസിൻ ലാക്ക് കൊണ്ട് മിനുക്കുന്നു.'),
  ),
  q(
    'art-kasuti-reversible', 'art', ['craft'], 'hard',
    copy('What is distinctive about traditional Kasuti embroidery?', 'ಸಾಂಪ್ರದಾಯಿಕ ಕಸೂತಿ ಕಸೂತಿಯ ವಿಶೇಷತೆ ಏನು?', 'பாரம்பரிய கசூதி எம்பிராய்டரியின் தனிச்சிறப்பு என்ன?', 'సంప్రదాయ కసూతి ఎంబ్రాయిడరీ ప్రత్యేకత ఏమిటి?', 'പരമ്പരാഗത കസൂതി എംബ്രോയ്ഡറിയുടെ പ്രത്യേകത എന്താണ്?'),
    ['The design looks the same on both sides', 'It uses only metal thread', 'It is painted, not stitched', 'It is made only on leather'], 0,
    copy('Kasuti counts the threads of the fabric, so the carefully stitched design can look nearly identical on both sides.', 'ಕಸೂತಿಯಲ್ಲಿ ಬಟ್ಟೆಯ ದಾರಗಳನ್ನು ಎಣಿಸಿ ಹೊಲಿಯುವುದರಿಂದ ಎರಡೂ ಬದಿಗಳಲ್ಲೂ ವಿನ್ಯಾಸ ಒಂದೇ ರೀತಿ ಕಾಣುತ್ತದೆ.', 'கசூதியில் துணியின் நூல்களை எண்ணி தைப்பதால் இருபுறமும் வடிவம் ஒரேபோல் தெரியும்.', 'కసూతిలో వస్త్రపు దారాలను లెక్కించి కుట్టడం వల్ల రెండు వైపులా నమూనా ఒకేలా కనిపిస్తుంది.', 'കസൂതിയിൽ തുണിയുടെ നൂലുകൾ എണ്ണി തയ്ക്കുന്നതിനാൽ ഇരുവശത്തും രൂപം ഒരുപോലെ കാണാം.'),
  ),

  // Dance
  q(
    'dance-yakshagana-coast', 'dance', ['folk'], 'easy',
    copy('Yakshagana is best described as a traditional form of what?', 'ಯಕ್ಷಗಾನವನ್ನು ಯಾವ ಸಾಂಪ್ರದಾಯಿಕ ಕಲಾರೂಪವೆಂದು ಹೇಳಬಹುದು?', 'யக்ஷகானா எந்த பாரம்பரிய கலை வடிவமாகும்?', 'యక్షగానం ఏ సంప్రదాయ కళారూపంగా చెప్పవచ్చు?', 'യക്ഷഗാനം ഏത് പരമ്പരാഗത കലാരൂപമാണ്?'),
    ['Dance-drama theatre', 'Stone carving', 'Court painting', 'Puppet-only show'], 0,
    copy('Yakshagana combines dance, music, dialogue, elaborate costumes and stories from the epics.', 'ಯಕ್ಷಗಾನವು ನೃತ್ಯ, ಸಂಗೀತ, ಸಂಭಾಷಣೆ, ಅಲಂಕೃತ ವೇಷಭೂಷಣ ಮತ್ತು ಪುರಾಣ ಕಥೆಗಳನ್ನು ಸೇರಿಸುತ್ತದೆ.', 'யக்ஷகானா நடனம், இசை, உரையாடல், ஆடை அலங்காரம், இதிகாசக் கதைகளை இணைக்கிறது.', 'యక్షగానం నృత్యం, సంగీతం, సంభాషణ, అలంకార వేషధారణ, ఇతిహాస కథలను కలుపుతుంది.', 'യക്ഷഗാനം നൃത്തം, സംഗീതം, സംഭാഷണം, വേഷഭൂഷണം, ഇതിഹാസകഥകൾ എന്നിവ ചേർക്കുന്നു.'),
  ),
  q(
    'dance-dollu-drum', 'dance', ['folk'], 'easy',
    copy('Which instrument gives Dollu Kunitha its powerful rhythm?', 'ಡೊಳ್ಳು ಕುಣಿತಕ್ಕೆ ಬಲವಾದ ಲಯ ನೀಡುವ ವಾದ್ಯ ಯಾವುದು?', 'டொல்லு குனிதாவிற்கு வலிமையான தாளத்தை வழங்கும் கருவி எது?', 'డొల్లു కునితాకు బలమైన లయను ఇచ్చే వాద్యం ఏది?', 'ഡൊല്ലു കുനിതയ്ക്ക് ശക്തമായ താളം നൽകുന്ന വാദ്യം ഏത്?'),
    ['Dollu drum', 'Veena', 'Nadaswara', 'Flute'], 0,
    copy('Dancers wear large dollu drums around the waist and beat them while leaping and forming patterns.', 'ನರ್ತಕರು ದೊಡ್ಡ ಡೊಳ್ಳುಗಳನ್ನು ಸೊಂಟಕ್ಕೆ ಕಟ್ಟಿಕೊಂಡು ಜಿಗಿದು ವಿನ್ಯಾಸಗಳನ್ನು ರೂಪಿಸುತ್ತಾರೆ.', 'நடனக் கலைஞர்கள் பெரிய டொல்லு மேளங்களை இடுப்பில் கட்டி குதித்து வடிவங்கள் உருவாக்குகின்றனர்.', 'నర్తకులు పెద్ద డొల్లులను నడుముకు కట్టి దూకుతూ ఆకృతులు చేస్తారు.', 'നർത്തകർ വലിയ ഡൊല്ലു മൃദംഗങ്ങൾ അരയിൽ കെട്ടി ചാടി രൂപങ്ങൾ തീർക്കുന്നു.'),
  ),
  q(
    'dance-kamsale-devotion', 'dance', ['folk'], 'medium',
    copy('Kamsale is traditionally performed by devotees of which Karnataka deity?', 'ಕಂಸಾಳೆ ಕರ್ನಾಟಕದ ಯಾವ ದೇವರ ಭಕ್ತರು ಮಾಡುವ ನೃತ್ಯ?', 'கம்சாலே கர்நாடகத்தின் எந்த தெய்வ பக்தர்களால் ஆடப்படுகிறது?', 'కంసాలే కర్ణాటకలో ఏ దేవుని భక్తులు చేసే నృత్యం?', 'കംസാലെ കർണാടകത്തിലെ ഏത് ദേവതയുടെ ഭക്തർ അവതരിപ്പിക്കുന്നു?'),
    ['Male Mahadeshwara', 'Chamundeshwari', 'Virupaksha', 'Ganesha'], 0,
    copy('Kamsale honours Male Mahadeshwara and uses a pair of bronze cymbals in complex rhythms.', 'ಕಂಸಾಳೆ ಮಲೆ ಮಹದೇಶ್ವರನನ್ನು ಗೌರವಿಸುವ ನೃತ್ಯವಾಗಿದ್ದು ಕಂಚಿನ ತಾಳಗಳನ್ನು ಬಳಸುತ್ತದೆ.', 'கம்சாலே மாலே மகாதேஸ்வரரைப் போற்றி வெண்கலத் தாளங்களைப் பயன்படுத்துகிறது.', 'కంసాలే మాలే మహాదేశ్వరుడిని గౌరవిస్తూ కంచు తాళాలను వాడుతుంది.', 'കംസാലെ മാലെ മഹാദേശ്വരനെ ആദരിച്ച് വെങ്കല താളങ്ങൾ ഉപയോഗിക്കുന്നു.'),
  ),
  q(
    'dance-karaga-balance', 'dance', ['ritual'], 'medium',
    copy('What does the Karaga bearer traditionally balance during the Bengaluru procession?', 'ಬೆಂಗಳೂರು ಮೆರವಣಿಗೆಯಲ್ಲಿ ಕರಗ ಹೊರುವವರು ಏನನ್ನು ತಲೆಯ ಮೇಲೆ ಸಮತೋಲನಗೊಳಿಸುತ್ತಾರೆ?', 'பெங்களூரு கரக ஊர்வலத்தில் கரகத்தைச் சுமப்பவர் எதை சமநிலைப்படுத்துகிறார்?', 'బెంగళూరు కరగ ఊరేగింపులో కరగదారుడు దేనిని తలపై సమతుల్యం చేస్తాడు?', 'ബെംഗളൂരു കരഗ ഘോഷയാത്രയിൽ കരഗ വഹിക്കുന്നയാൾ എന്താണ് തലയിൽ തുലനം ചെയ്യുന്നത്?'),
    ['A sacred flower pyramid', 'A stone chariot', 'A brass lamp', 'A silk umbrella'], 0,
    copy('The Karaga is a tall sacred flower pyramid carried through the streets without being touched.', 'ಕರಗವು ಎತ್ತರದ ಪವಿತ್ರ ಹೂವಿನ ಗೋಪುರವಾಗಿದ್ದು ಅದನ್ನು ಮುಟ್ಟದೆ ಬೀದಿಗಳಲ್ಲಿ ಹೊರುತ್ತಾರೆ.', 'கரகம் உயரமான புனித மலர் பிரமிடாகும்; அதைத் தொடாமல் தெருக்களில் சுமக்கப்படுகிறது.', 'కరగ ఒక ఎత్తైన పవిత్ర పూల గోపురం; దాన్ని తాకకుండా వీధుల్లో తీసుకెళ్తారు.', 'കരഗ ഉയർന്ന വിശുദ്ധ പുഷ്പപിരമിഡാണ്; തൊടാതെ തെരുവുകളിലൂടെ വഹിക്കുന്നു.'),
  ),
  q(
    'dance-bhootha-daiva', 'dance', ['ritual'], 'hard',
    copy('In Bhootha Aradhane, the performer is understood as the voice of what?', 'ಭೂತಾರಾಧನೆಯಲ್ಲಿ ಕಲಾವಿದನು ಯಾವುದರ ಧ್ವನಿಯಾಗಿ ಕಾಣಲ್ಪಡುತ್ತಾನೆ?', 'பூதாராதனையில் கலைஞர் எதன் குரலாகக் கருதப்படுகிறார்?', 'భూతారాధనలో కళాకారుడిని దేనికి స్వరంగా భావిస్తారు?', 'ഭൂതാരാധനയിൽ കലാകാരൻ എന്തിന്റെ ശബ്ദമായാണ് കണക്കാക്കപ്പെടുന്നത്?'),
    ['A local daiva or spirit deity', 'A royal messenger', 'A harvest instrument', 'A temple architect'], 0,
    copy('The performer embodies a local daiva and offers blessings or guidance to the community.', 'ಕಲಾವಿದನು ಸ್ಥಳೀಯ ದೈವವನ್ನು ಆವಾಹಿಸಿಕೊಂಡು ಸಮುದಾಯಕ್ಕೆ ಆಶೀರ್ವಾದ ಅಥವಾ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತಾನೆ.', 'கலைஞர் உள்ளூர் தெய்வத்தை ஏற்று சமூகத்திற்கு ஆசீர்வாதம் அல்லது வழிகாட்டுதல் வழங்குகிறார்.', 'కళాకారుడు స్థానిక దైవాన్ని ఆవహించి సమాజానికి ఆశీర్వాదం లేదా మార్గదర్శనం ఇస్తాడు.', 'കലാകാരൻ പ്രാദേശിക ദൈവത്തെ ആവാഹിച്ച് സമൂഹത്തിന് അനുഗ്രഹമോ മാർഗ്ഗനിർദേശമോ നൽകുന്നു.'),
  ),

  // Monuments
  q(
    'monuments-hampi-unesco', 'monuments', ['heritage-sites'], 'easy',
    copy('Hampi was the capital of which empire?', 'ಹಂಪಿ ಯಾವ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿತ್ತು?', 'ஹம்பி எந்த பேரரசின் தலைநகரமாக இருந்தது?', 'హంపి ఏ సామ్రాజ్యానికి రాజధాని?', 'ഹംപി ഏത് സാമ്രാജ്യത്തിന്റെ തലസ്ഥാനമായിരുന്നു?'),
    ['Vijayanagara Empire', 'Maurya Empire', 'Mughal Empire', 'Chola Empire'], 0,
    copy('Hampi preserves the monumental capital of the Vijayanagara Empire and is a UNESCO World Heritage Site.', 'ಹಂಪಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಭವ್ಯ ರಾಜಧಾನಿಯ ಅವಶೇಷಗಳನ್ನು ಹೊಂದಿರುವ ಯುನೆಸ್ಕೋ ತಾಣವಾಗಿದೆ.', 'விஜயநகர பேரரசின் பிரம்மாண்ட தலைநகரை பாதுகாக்கும் ஹம்பி யுனெஸ்கோ தளம்.', 'విజయనగర సామ్రాజ్యపు మహా రాజధాని అవశేషాలను కాపాడే హంపి యునెస్కో ప్రదేశం.', 'വിജയനഗര സാമ്രാജ്യത്തിന്റെ മഹത്തായ തലസ്ഥാനാവശിഷ്ടങ്ങൾ സംരക്ഷിക്കുന്ന ഹംപി യുനെസ്കോ പൈതൃകസ്ഥലമാണ്.'),
  ),
  q(
    'monuments-vittala-chariot', 'monuments', ['temples'], 'easy',
    copy('Which Hampi monument is famous for its stone chariot and musical pillars?', 'ಕಲ್ಲಿನ ರಥ ಮತ್ತು ಸಂಗೀತ ಸ್ತಂಭಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾದ ಹಂಪಿಯ ಸ್ಮಾರಕ ಯಾವುದು?', 'கல் தேர் மற்றும் இசைத் தூண்களுக்கு புகழ்பெற்ற ஹம்பி நினைவுச்சின்னம் எது?', 'రాతి రథం, సంగీత స్తంభాలకు ప్రసిద్ధమైన హంపి స్మారకం ఏది?', 'കൽരഥത്തിനും സംഗീതസ്തംഭങ്ങൾക്കും പ്രശസ്തമായ ഹംപി സ്മാരകം ഏത്?'),
    ['Vittala Temple', 'Virupaksha Temple', 'Lotus Mahal', 'Queen’s Bath'], 0,
    copy('The Vittala Temple complex is known for its stone chariot and resonant carved pillars.', 'ವಿಠ್ಠಲ ದೇವಾಲಯದ ಸಮುಚ್ಚಯವು ಕಲ್ಲಿನ ರಥ ಮತ್ತು ನಾದ ನೀಡುವ ಕೆತ್ತಿದ ಸ್ತಂಭಗಳಿಗೆ ಪ್ರಸಿದ್ಧ.', 'விட்டலர் கோவில் வளாகம் கல் தேர் மற்றும் ஒலி தரும் செதுக்கிய தூண்களுக்கு புகழ்பெற்றது.', 'విట్టల ఆలయ సముదాయం రాతి రథం, నాదమిచ్చే చెక్కిన స్తంభాలకు ప్రసిద్ధి.', 'വിഠ്ഠല ക്ഷേത്രസമുച്ചയം കൽരഥത്തിനും ശബ്ദമുള്ള കൊത്തുപണിസ്ഥംഭങ്ങൾക്കും പ്രശസ്തമാണ്.'),
  ),
  q(
    'monuments-pattadakal-styles', 'monuments', ['heritage-sites', 'temples'], 'medium',
    copy('Why is Pattadakal especially important in Indian temple architecture?', 'ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದಲ್ಲಿ ಪಟ್ಟದಕಲ್ಲು ಏಕೆ ವಿಶೇಷವಾಗಿದೆ?', 'இந்திய கோவில் கட்டிடக்கலையில் பட்டடக்கல் ஏன் முக்கியமானது?', 'భారతీయ ఆలయ వాస్తుశిల్పంలో పట్టదకల్లు ఎందుకు ప్రత్యేకం?', 'ഇന്ത്യൻ ക്ഷേത്രവാസ്തുശില്പത്തിൽ പട്ടടക്കൽ പ്രത്യേകമായി പ്രധാനപ്പെട്ടത് എന്തുകൊണ്ട്?'),
    ['Nagara and Dravida styles stand together', 'It has only wooden temples', 'It was built by the Wodeyars', 'It has India’s tallest gopuram'], 0,
    copy('Pattadakal shows northern Nagara and southern Dravida forms together in Chalukyan temples.', 'ಪಟ್ಟದಕಲ್ಲಿನಲ್ಲಿ ಚಾಲುಕ್ಯ ದೇವಾಲಯಗಳಲ್ಲಿ ನಾಗರ ಮತ್ತು ದ್ರಾವಿಡ ಶೈಲಿಗಳು ಜೊತೆಯಾಗಿ ಕಾಣುತ್ತವೆ.', 'பட்டடக்கலில் சாளுக்கிய கோவில்களில் நாகர மற்றும் திராவிட பாணிகள் ஒன்றாகத் தெரிகின்றன.', 'పట్టదకల్లులో చాళుక్య ఆలయాల్లో నాగర, ద్రావిడ శైలులు పక్కపక్కనే కనిపిస్తాయి.', 'പട്ടടക്കലിൽ ചാലൂക്യ ക്ഷേത്രങ്ങളിൽ നാഗര-ദ്രാവിഡ ശൈലികൾ ഒരുമിച്ച് കാണാം.'),
  ),
  q(
    'monuments-gol-gumbaz-whisper', 'monuments', ['heritage-sites'], 'medium',
    copy('What acoustic feature makes Gol Gumbaz famous?', 'ಗೋಳ ಗುಮ್ಮಟವನ್ನು ಪ್ರಸಿದ್ಧಗೊಳಿಸುವ ಧ್ವನಿ ವೈಶಿಷ್ಟ್ಯ ಯಾವುದು?', 'கோல் கும்பஸை புகழ்பெறச் செய்யும் ஒலி அம்சம் என்ன?', 'గోల్ గుంబజ్‌ను ప్రసిద్ధం చేసిన ధ్వని లక్షణం ఏమిటి?', 'ഗോൾ ഗുംബസിനെ പ്രശസ്തമാക്കുന്ന ശബ്ദസവിശേഷത എന്താണ്?'),
    ['Its whispering gallery', 'A singing stone chariot', 'A talking statue', 'A drum tower'], 0,
    copy('A whisper in the gallery can travel across the dome and echo several times.', 'ಗುಮ್ಮಟದ whispering galleryಯಲ್ಲಿ ಪಿಸುಮಾತು ದೂರಕ್ಕೆ ಹೋಗಿ ಹಲವು ಬಾರಿ ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ.', 'குவிமாடத்தின் கிசுகிசு அரங்கில் குரல் தூரம் சென்று பலமுறை எதிரொலிக்கும்.', 'గుమ్మటం యొక్క గుసగుసల గ్యాలరీలో మాట దూరం వెళ్లి పలుమార్లు ప్రతిధ్వనిస్తుంది.', 'ഗുംബദത്തിലെ വിസ്പറിംഗ് ഗാലറിയിൽ ചൂണ്ടുവിളി ദൂരെയെത്തി പലതവണ പ്രതിധ്വനിക്കും.'),
  ),
  q(
    'monuments-hoysala-belur', 'monuments', ['temples'], 'hard',
    copy('Which stone is strongly associated with the fine carvings of Belur and Halebidu?', 'ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡಿನ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಕಲ್ಲು ಯಾವುದು?', 'பேலூர் மற்றும் ஹளேபீடுவின் நுணுக்கச் சிற்பங்களுடன் தொடர்புடைய கல் எது?', 'బేలూరు, హళేబీడు సూక్ష్మ శిల్పాలతో బలంగా అనుసంధానమైన రాయి ఏది?', 'ബേലൂരിലെയും ഹളേബീഡുവിലെയും സൂക്ഷ്മകൊത്തുപണികളുമായി ബന്ധപ്പെട്ട കല്ല് ഏത്?'),
    ['Soapstone', 'Granite', 'Marble', 'Laterite'], 0,
    copy('The soft, workable soapstone enabled Hoysala sculptors to carve exceptionally fine details.', 'ಮೃದುವಾದ ಸೋಪ್‌ಸ್ಟೋನ್ ಹೊಯ್ಸಳ ಶಿಲ್ಪಿಗಳಿಗೆ ಅತಿ ಸೂಕ್ಷ್ಮ ವಿವರಗಳನ್ನು ಕೆತ್ತಲು ನೆರವಾಯಿತು.', 'மென்மையான சோப்புக்கல் ஹொய்சள சிற்பிகளுக்கு மிக நுணுக்கமாக செதுக்க உதவியது.', 'మెత్తని సబ్బురాయి హొయ్సళ శిల్పులకు అత్యంత సూక్ష్మ వివరాలు చెక్కడానికి తోడ్పడింది.', 'മൃദുവായ സോപ്പുകല്ല് ഹൊയ്സള ശില്പികൾക്ക് അതിസൂക്ഷ്മ വിശദാംശങ്ങൾ കൊത്താൻ സഹായിച്ചു.'),
  ),

  // Music
  q(
    'music-purandara-dasa', 'music', ['music-forms'], 'easy',
    copy('Who is widely called the father of Carnatic music?', 'ಕರ್ನಾಟಕ ಸಂಗೀತದ ಪಿತಾಮಹರೆಂದು ಯಾರನ್ನು ಕರೆಯುತ್ತಾರೆ?', 'கர்நாடக இசையின் தந்தை என்று பரவலாக அழைக்கப்படுபவர் யார்?', 'కర్ణాటక సంగీత పితామహుడిగా ఎవరిని పిలుస్తారు?', 'കർണാടക സംഗീതത്തിന്റെ പിതാവെന്ന് വ്യാപകമായി വിളിക്കപ്പെടുന്നത് ആര്?'),
    ['Purandara Dasa', 'Bhimsen Joshi', 'Tyagaraja', 'Mysore Ananthaswamy'], 0,
    copy('Purandara Dasa organised foundational lessons that remain central to Carnatic music teaching.', 'ಪುರಂದರ ದಾಸರು ಕರ್ನಾಟಕ ಸಂಗೀತದ ಮೂಲ ಪಾಠಗಳನ್ನು ರೂಪಿಸಿದರು.', 'புரந்தர தாசர் கர்நாடக இசையின் அடிப்படைப் பாடங்களை அமைத்தார்.', 'పురందర దాసు కర్ణాటక సంగీతపు ప్రాథమిక పాఠాలను క్రమబద్ధం చేశారు.', 'പുരന്ദര ദാസർ കർണാടക സംഗീതത്തിന്റെ അടിസ്ഥാനപാഠങ്ങൾ ക്രമപ്പെടുത്തി.'),
  ),
  q(
    'music-dollu-instrument', 'music', ['instruments', 'folk-music'], 'easy',
    copy('Dollu is what type of instrument?', 'ಡೊಳ್ಳು ಯಾವ ರೀತಿಯ ವಾದ್ಯ?', 'டொல்லு எந்த வகை இசைக்கருவி?', 'డొల్లూ ఏ రకమైన వాద్యం?', 'ഡൊല്ലു ഏത് തരത്തിലുള്ള വാദ്യമാണ്?'),
    ['A large barrel drum', 'A bowed string instrument', 'A flute', 'A cymbal pair'], 0,
    copy('Dollu is a large two-sided drum played with sticks, central to Dollu Kunitha.', 'ಡೊಳ್ಳು ಎರಡು ಬದಿಯ ದೊಡ್ಡ ಚರ್ಮದ ವಾದ್ಯವಾಗಿದ್ದು ಕಡ್ಡಿಗಳಿಂದ ಬಾರಿಸಲಾಗುತ್ತದೆ.', 'டொல்லு இருபுறமும் உள்ள பெரிய மேளம்; குச்சிகளால் வாசிக்கப்படுகிறது.', 'డొల్లూ రెండు వైపుల పెద్ద డ్రమ్; కర్రలతో వాయిస్తారు.', 'ഡൊല്ലു ഇരുവശമുള്ള വലിയ മൃദംഗമാണ്; കോലുകളാൽ വായിക്കുന്നു.'),
  ),
  q(
    'music-yakshagana-bhagavata', 'music', ['music-forms'], 'medium',
    copy('What is the role of the bhagavata in Yakshagana?', 'ಯಕ್ಷಗಾನದಲ್ಲಿ ಭಾಗವತನ ಪಾತ್ರವೇನು?', 'யக்ஷகானாவில் பாகவதரின் பங்கு என்ன?', 'యక్షగానంలో భాగవతుడి పాత్ర ఏమిటి?', 'യക്ഷഗാനത്തിലെ ഭാഗവതന്റെ പങ്ക് എന്താണ്?'),
    ['Lead singer and narrator', 'Costume maker', 'Temple architect', 'Drum maker'], 0,
    copy('The bhagavata leads the singing and narrates the story while the actors perform.', 'ಭಾಗವತನು ಹಾಡಿಗೆ ನಾಯಕತ್ವ ನೀಡಿ ಕಥೆಯನ್ನು ನಿರೂಪಿಸುತ್ತಾನೆ.', 'பாகவதர் பாடலை வழிநடத்தி கதையை விவரிக்கிறார்.', 'భాగవతుడు గానానికి నాయకత్వం వహిస్తూ కథను వివరిస్తాడు.', 'ഭാഗവതൻ പാട്ടിന് നേതൃത്വം നൽകി കഥ വിവരിക്കുന്നു.'),
  ),
  q(
    'music-nadaswara-auspicious', 'music', ['instruments'], 'medium',
    copy('Why is the nadaswara often heard at weddings and temple rituals?', 'ನಾದಸ್ವರವನ್ನು ಮದುವೆ ಮತ್ತು ದೇವಾಲಯದ ಆಚರಣೆಗಳಲ್ಲಿ ಏಕೆ ಕೇಳಬಹುದು?', 'திருமணங்கள் மற்றும் கோவில் சடங்குகளில் நாதஸ்வரம் ஏன் ஒலிக்கிறது?', 'వివాహాలు, ఆలయ ఆచారాల్లో నాదస్వరం ఎందుకు వినిపిస్తుంది?', 'വിവാഹങ്ങളിലും ക്ഷേത്രചടങ്ങുകളിലും നാദസ്വരം എന്തുകൊണ്ട് കേൾക്കുന്നു?'),
    ['It is considered auspicious', 'It is silent indoors', 'It is used only for games', 'It is made of silver'], 0,
    copy('Its powerful sound and ceremonial history make the nadaswara an auspicious wind instrument.', 'ನಾದಸ್ವರದ ಘನ ಧ್ವನಿ ಮತ್ತು ಆಚರಣೆಯ ಪರಂಪರೆಯಿಂದ ಅದು ಶುಭವಾದ ವಾದ್ಯವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.', 'நாதஸ்வரத்தின் வலிமையான ஒலி மற்றும் சடங்கு மரபால் அது மங்களகரமான கருவியாகக் கருதப்படுகிறது.', 'నాదస్వరం శక్తివంతమైన శబ్దం, ఆచార సంప్రదాయం వల్ల శుభ వాయిద్యంగా భావిస్తారు.', 'നാദസ്വരത്തിന്റെ ശക്തമായ ശബ്ദവും ആചാരപരമ്പരയും അതിനെ മംഗളവാദ്യമാക്കുന്നു.'),
  ),
  q(
    'music-carnatic-hindustani', 'music', ['music-forms', 'folk-music'], 'hard',
    copy('What is distinctive about Karnataka’s classical music landscape?', 'ಕರ್ನಾಟಕದ ಶಾಸ್ತ್ರೀಯ ಸಂಗೀತ ಕ್ಷೇತ್ರದ ವಿಶೇಷತೆ ಏನು?', 'கர்நாடகத்தின் செவ்வியல் இசை நிலப்பரப்பின் தனிச்சிறப்பு என்ன?', 'కర్ణాటక శాస్త్రీయ సంగీత ప్రపంచం ప్రత్యేకత ఏమిటి?', 'കർണാടകത്തിന്റെ ശാസ്ത്രീയ സംഗീതലോകത്തിന്റെ പ്രത്യേകത എന്താണ്?'),
    ['Carnatic and Hindustani traditions both flourish', 'Only Western classical music is practised', 'It has no devotional music', 'Only temple drums are used'], 0,
    copy('Southern Karnataka is a major Carnatic centre, while northern Karnataka has a strong Hindustani tradition.', 'ದಕ್ಷಿಣ ಕರ್ನಾಟಕದಲ್ಲಿ ಕರ್ನಾಟಕ ಸಂಗೀತವೂ ಉತ್ತರ ಕರ್ನಾಟಕದಲ್ಲಿ ಹಿಂದೂಸ್ತಾನಿ ಪರಂಪರೆಯೂ ಅರಳಿವೆ.', 'தெற்கு கர்நாடகத்தில் கர்நாடக இசையும் வடக்கில் இந்துஸ்தானி மரபும் செழிக்கின்றன.', 'దక్షిణ కర్ణాటకలో కర్ణాటక సంగీతం, ఉత్తరంలో హిందుస్తానీ సంప్రదాయం వికసించాయి.', 'തെക്കൻ കർണാടകയിൽ കർണാടക സംഗീതവും വടക്കൻ കർണാടകയിൽ ഹിന്ദുസ്ഥാനി പാരമ്പര്യവും വളർന്നു.'),
  ),

  // Festivals
  q(
    'festivals-dasara-state', 'festivals', ['festivals'], 'easy',
    copy('Mysuru Dasara is also known as Karnataka’s what?', 'ಮೈಸೂರು ದಸರಾವನ್ನು ಕರ್ನಾಟಕದ ಯಾವುದೆಂದು ಕರೆಯುತ್ತಾರೆ?', 'மைசூர் தசரா கர்நாடகத்தின் எதென அழைக்கப்படுகிறது?', 'మైసూరు దసరాను కర్ణాటకకు ఏమని పిలుస్తారు?', 'മൈസൂർ ദസറ കർണാടകത്തിന്റെ എന്തെന്നറിയപ്പെടുന്നു?'),
    ['Nada Habba (state festival)', 'Boat festival', 'Winter carnival', 'Harvest market'], 0,
    copy('Mysuru Dasara is Karnataka’s Nada Habba, celebrated with palace lights, processions and cultural programmes.', 'ಮೈಸೂರು ದಸರಾ ಕರ್ನಾಟಕದ ನಾಡಹಬ್ಬವಾಗಿದ್ದು ಅರಮನೆ ದೀಪಗಳು ಮತ್ತು ಮೆರವಣಿಗೆಯಿಂದ ಆಚರಿಸಲಾಗುತ್ತದೆ.', 'மைசூர் தசரா கர்நாடகத்தின் நாட ஹಬ್ಬா; அரண்மனை விளக்குகள், ஊர்வலங்கள் நடக்கின்றன.', 'మైసూరు దసరా కర్ణాటక నాడ హబ్బ; ప్యాలెస్ దీపాలు, ఊరేగింపులతో జరుపుతారు.', 'മൈസൂർ ദസറ കർണാടകത്തിന്റെ നാടഹബ്ബാണ്; കൊട്ടാരവെളിച്ചവും ഘോഷയാത്രകളും നടക്കുന്നു.'),
  ),
  q(
    'festivals-ugadi-bevu-bella', 'festivals', ['festivals'], 'easy',
    copy('What does the Ugadi mixture of neem and jaggery symbolise?', 'ಯುಗಾದಿಯ ಬೇವು-ಬೆಲ್ಲದ ಮಿಶ್ರಣ ಏನನ್ನು ಸೂಚಿಸುತ್ತದೆ?', 'உகாதியின் வேம்பு-வெல்லக் கலவை எதை குறிக்கிறது?', 'ఉగాది వేప-బెల్లం మిశ్రమం దేనిని సూచిస్తుంది?', 'ഉഗാദിയിലെ വേപ്പും ശർക്കരയും ചേർന്ന മിശ്രിതം എന്തിനെ പ്രതിനിധീകരിക്കുന്നു?'),
    ['Life has both bitter and sweet moments', 'Only a sweet harvest', 'The arrival of monsoon', 'A royal victory'], 0,
    copy('Bevu-bella reminds people to accept both difficult and joyful experiences in the new year.', 'ಬೇವು-ಬೆಲ್ಲವು ಜೀವನದ ಕಹಿ ಮತ್ತು ಸಿಹಿ ಕ್ಷಣಗಳನ್ನು ಸ್ವೀಕರಿಸುವುದನ್ನು ನೆನಪಿಸುತ್ತದೆ.', 'வேம்பு-வெல்லம் வாழ்க்கையின் கசப்பும் இனிப்பும் இரண்டையும் ஏற்க நினைவூட்டுகிறது.', 'వేప-బెల్లం జీవితం యొక్క చేదు, తీపి అనుభవాలను అంగీకరించమని గుర్తుచేస్తుంది.', 'വേപ്പും ശർക്കരയും ജീവിതത്തിലെ കയ്പും മധുരവും സ്വീകരിക്കണമെന്ന് ഓർമ്മിപ്പിക്കുന്നു.'),
  ),
  q(
    'festivals-makar-sankranti-ellu', 'festivals', ['festivals'], 'medium',
    copy('Which mixture is exchanged during Makar Sankranti in Karnataka?', 'ಕರ್ನಾಟಕದಲ್ಲಿ ಮಕರ ಸಂಕ್ರಾಂತಿಯಂದು ಯಾವ ಮಿಶ್ರಣ ಹಂಚಿಕೊಳ್ಳುತ್ತಾರೆ?', 'கர்நாடகத்தில் மகர சங்கராந்தியில் எந்தக் கலவை பரிமாறப்படுகிறது?', 'కర్ణాటకలో మకర సంక్రాంతికి ఏ మిశ్రమాన్ని పంచుకుంటారు?', 'കർണാടകയിൽ മകരസംക്രാന്തിക്ക് ഏത് മിശ്രിതമാണ് കൈമാറുന്നത്?'),
    ['Ellu-bella', 'Bevu-bella', 'Holige', 'Kosambari'], 0,
    copy('Ellu-bella combines sesame and jaggery with coconut and peanuts, and is shared with kind words.', 'ಎಳ್ಳು-ಬೆಲ್ಲದಲ್ಲಿ ಎಳ್ಳು, ಬೆಲ್ಲ, ತೆಂಗಿನಕಾಯಿ ಮತ್ತು ಕಡಲೆಕಾಯಿ ಇರುತ್ತವೆ.', 'எள்ளு-வெல்லத்தில் எள், வெல்லம், தேங்காய், கடலை ஆகியவை சேரும்.', 'ఎಳ್ಳు-బెల్లంలో నువ్వులు, బెల్లం, కొబ్బరి, వేరుశెనగ ఉంటాయి.', 'എള്ളു-ബെല്ലയിൽ എള്ള്, ശർക്കര, തേങ്ങ, നിലക്കടല എന്നിവ ചേരുന്നു.'),
  ),
  q(
    'festivals-karaga-community', 'festivals', ['culture-rituals'], 'medium',
    copy('Bengaluru Karaga is closely associated with which community?', 'ಬೆಂಗಳೂರು ಕರಗ ಯಾವ ಸಮುದಾಯದೊಂದಿಗೆ ಹೆಚ್ಚು ಸಂಬಂಧಿಸಿದೆ?', 'பெங்களூரு கரகா எந்த சமூகத்துடன் நெருக்கமாக தொடர்புடையது?', 'బెంగళూరు కరగ ఏ సమాజంతో సన్నిహితంగా అనుబంధం కలిగి ఉంది?', 'ബെംഗളൂരു കരഗ ഏത് സമൂഹവുമായി അടുത്ത് ബന്ധപ്പെട്ടിരിക്കുന്നു?'),
    ['Thigala community', 'Kodava community', 'Deewaru community', 'Kuruba community'], 0,
    copy('The Karaga is an important ritual of the Thigala community at the Dharmaraya Swamy temple.', 'ಧರ್ಮರಾಯ ಸ್ವಾಮಿ ದೇವಾಲಯದ ಕರಗ ಥಿಗಲ ಸಮುದಾಯದ ಪ್ರಮುಖ ಆಚರಣೆಯಾಗಿದೆ.', 'தர்மராய சுவாமி கோவிலின் கரகா திகலா சமூகத்தின் முக்கிய சடங்காகும்.', 'ధర్మరాయ స్వామి ఆలయ కరగ తిగల సమాజపు ముఖ్య ఆచారం.', 'ധർമരായ സ്വാമി ക്ഷേത്രത്തിലെ കരഗ തിഗള സമൂഹത്തിന്റെ പ്രധാന ആചാരമാണ്.'),
  ),
  q(
    'festivals-vairamudi-melukote', 'festivals', ['festivals', 'culture-rituals'], 'hard',
    copy('The Vairamudi festival is held at which temple town?', 'ವೈರಮುಡಿ ಹಬ್ಬ ಯಾವ ದೇವಾಲಯದ ಪಟ್ಟಣದಲ್ಲಿ ನಡೆಯುತ್ತದೆ?', 'வைரமுடி திருவிழா எந்த கோவில் நகரத்தில் நடைபெறுகிறது?', 'వైరముడి పండుగ ఏ ఆలయ పట్టణంలో జరుగుతుంది?', 'വൈരമുടി ഉത്സവം ഏത് ക്ഷേത്രനഗരത്തിലാണ് നടക്കുന്നത്?'),
    ['Melukote', 'Badami', 'Aihole', 'Gokak'], 0,
    copy('Vairamudi is the annual night procession at Cheluvanarayana Swamy Temple in Melukote.', 'ವೈರಮುಡಿ ಮೇಳುಕೋಟೆಯ ಚೆಲುವನಾರಾಯಣ ಸ್ವಾಮಿ ದೇವಾಲಯದ ವಾರ್ಷಿಕ ರಾತ್ರಿ ಮೆರವಣಿಗೆಯಾಗಿದೆ.', 'வைரமுடி மேல்கோட்டே செல்வநாராயண சுவாமி கோவிலின் ஆண்டு இரவு ஊர்வலமாகும்.', 'వైరముడి మేలుకోటె చెలువనారాయణ స్వామి ఆలయ వార్షిక రాత్రి ఊరేగింపు.', 'വൈരമുടി മേലുകോട്ടെ ചെലുവനാരായണ സ്വാമി ക്ഷേത്രത്തിലെ വാർഷിക രാത്രിഘോഷയാത്രയാണ്.'),
  ),

  // Food
  q(
    'food-mysore-pak-origin', 'food', ['sweets'], 'easy',
    copy('Where did Mysore Pak originate?', 'ಮೈಸೂರು ಪಾಕ್ ಎಲ್ಲಿ ಹುಟ್ಟಿತು?', 'மைசூர் பாக் எங்கு தோன்றியது?', 'మైసూరు పాక్ ఎక్కడ పుట్టింది?', 'മൈസൂർ പാക് എവിടെയാണ് ഉത്ഭവിച്ചത്?'),
    ['Mysore Palace kitchen', 'Hampi market', 'Udupi temple kitchen', 'Bidar Fort'], 0,
    copy('Palace cook Kakasura Madappa created Mysore Pak for Krishnaraja Wodeyar IV.', 'ಅರಮನೆಯ ಅಡುಗೆಗಾರ ಕಾಕಾಸುರ ಮಡಪ್ಪರು ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ ನಾಲ್ಕನೆಯವರಿಗಾಗಿ ಇದನ್ನು ಮಾಡಿದರು.', 'அரண்மனை சமையல்காரர் காகாசுர மதப்பா கிருஷ்ணராஜ உடையார் IV-க்காக இதை செய்தார்.', 'అరమನೆ వంటవాడు కాకాసుర మడప్ప నాలుగో కృష్ణరాజ వడియార్ కోసం దీనిని చేశాడు.', 'കൊട്ടാരം പാചകക്കാരൻ കാകാസുര മടപ്പ കൃഷ്ണരാജ വൊഡെയർ നാലാമനുവേണ്ടി ഇത് ഉണ്ടാക്കി.'),
  ),
  q(
    'food-bisi-bele-meaning', 'food', ['meals'], 'easy',
    copy('What does “Bisi Bele Bath” roughly mean?', '“ಬಿಸಿಬೇಳೆ ಬಾತ್” ಎಂಬ ಹೆಸರಿನ ಅರ್ಥವೇನು?', '“பிசி பேளே பாத்” என்பதன் பொருள் என்ன?', '“బిసిబెలె బాత్” అంటే ఏమిటి?', '“ബിസി ബെലെ ബാത്ത്” എന്നതിന്റെ അർത്ഥമെന്ത്?'),
    ['Hot lentil rice', 'Sweet rice cake', 'Cold coconut curry', 'Spiced millet bread'], 0,
    copy('Bisi Bele Bath means hot lentil rice and combines rice, toor dal, vegetables, tamarind and spices.', 'ಬಿಸಿಬೇಳೆ ಬಾತ್ ಎಂದರೆ ಬಿಸಿ ಬೇಳೆ ಅನ್ನ; ಅಕ್ಕಿ, ತೊಗರಿಬೇಳೆ, ತರಕಾರಿ ಮತ್ತು ಹುಣಸೆ ಸೇರಿರುತ್ತದೆ.', 'பிசி பேளே பாத் என்பது சூடான பருப்பு சாதம்; அரிசி, துவரம் பருப்பு, காய்கறி, புளி சேரும்.', 'బిసిబెలె బాత్ అంటే వేడి పప్పు అన్నం; బియ్యం, కందిపప్పు, కూరగాయలు, చింతపండు ఉంటాయి.', 'ബിസി ബെലെ ബാത്ത് ചൂടുള്ള പരിപ്പുചോറാണ്; അരി, തുവരപ്പരിപ്പ്, പച്ചക്കറി, പുളി എന്നിവ ചേരും.'),
  ),
  q(
    'food-neer-dosa-water', 'food', ['breakfast'], 'medium',
    copy('Why is the coastal dosa called neer dosa?', 'ಕರಾವಳಿಯ ದೋಸೆಯನ್ನು ನೀರ್ ದೋಸೆ ಎಂದು ಏಕೆ ಕರೆಯುತ್ತಾರೆ?', 'கடற்கரை தோசை ஏன் நீர் தோசை என்று அழைக்கப்படுகிறது?', 'తీర ప్రాంత దోసెను నీర్ దోసె అని ఎందుకు అంటారు?', 'തീരദേശ ദോശയെ നീർ ദോശ എന്ന് വിളിക്കുന്നത് എന്തുകൊണ്ട്?'),
    ['“Neer” means water and the batter is thin', 'It is cooked in a river', 'It contains only coconut water', 'It is served cold'], 0,
    copy('Neer means water in Tulu; the rice batter is watery and does not need fermentation.', 'ನೀರ್ ಎಂದರೆ ತುಳುವಿನಲ್ಲಿ ನೀರು; ಹಿಟ್ಟನ್ನು ನೀರಾಗಿ ಮಾಡಿ ಹುರಿಯುವುದಿಲ್ಲ.', 'துளுவில் நீர் என்பது தண்ணீர்; அரிசி மாவு நீர்த்ததாகவும் புளிக்காததாகவும் இருக்கும்.', 'తుళులో నీర్ అంటే నీరు; బియ్యపు పిండి పలుచగా, పులియనిదిగా ఉంటుంది.', 'തുളുവിൽ നീർ എന്നത് വെള്ളം; അരിമാവ് വെള്ളംപോലെ നേർത്തതും പുളിപ്പിക്കാത്തതുമാണ്.'),
  ),
  q(
    'food-jolada-rotti-grain', 'food', ['meals'], 'medium',
    copy('Jolada rotti is made primarily from which grain?', 'ಜೋಳದ ರೊಟ್ಟಿ ಮುಖ್ಯವಾಗಿ ಯಾವ ಧಾನ್ಯದಿಂದ ತಯಾರಿಸಲಾಗುತ್ತದೆ?', 'ஜோளத ரொட்டி எந்த தானியத்தால் செய்யப்படுகிறது?', 'జోలದ రొట్టె ప్రధానంగా ఏ ధాన్యంతో తయారవుతుంది?', 'ജോലദ റൊട്ടി പ്രധാനമായും ഏത് ധാന്യത്തിൽ നിന്നാണ്?'),
    ['Jowar (sorghum)', 'Rice', 'Finger millet', 'Wheat'], 0,
    copy('Jolada means jowar, or sorghum, a staple grain in North Karnataka.', 'ಜೋಳ ಎಂದರೆ ಉತ್ತರ ಕರ್ನಾಟಕದ ಪ್ರಮುಖ ಧಾನ್ಯವಾದ ಸೊರ್ಗಮ್.', 'ஜோளம் என்பது வட கர்நாடகத்தின் முக்கிய தானியமான சோளம்.', 'జొళ అంటే ఉత్తర కర్ణాటకలో ప్రధానమైన జొన్న ధాన్యం.', 'ജോല എന്നത് വടക്കൻ കർണാടകയിലെ പ്രധാന ധാന്യമായ ചോളം ആണ്.'),
  ),
  q(
    'food-kosambari-ingredient', 'food', ['meals'], 'hard',
    copy('Which ingredient is commonly soaked and used in Kosambari?', 'ಕೋಸಂಬರಿಯಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಯಾವ ಪದಾರ್ಥವನ್ನು ನೆನೆಸಿ ಬಳಸುತ್ತಾರೆ?', 'கோசம்பரியில் பொதுவாக எந்தப் பொருள் ஊறவைக்கப்படுகிறது?', 'కోసంబరిలో సాధారణంగా ఏ పదార్థాన్ని నానబెట్టి వాడతారు?', 'കോസമ്പരിയിൽ സാധാരണയായി ഏത് ചേരുവയാണ് നനച്ച് ഉപയോഗിക്കുന്നത്?'),
    ['Moong dal', 'Wheat', 'Black pepper', 'Rice noodles'], 0,
    copy('Kosambari commonly combines soaked moong dal with cucumber, carrot, coconut, lemon and tempering.', 'ಕೋಸಂಬರಿಯಲ್ಲಿ ನೆನೆಸಿದ ಹೆಸರುಬೇಳೆ, ಸೌತೆಕಾಯಿ, ಕ್ಯಾರೆಟ್, ತೆಂಗಿನಕಾಯಿ ಮತ್ತು ನಿಂಬೆ ಸೇರಿರುತ್ತವೆ.', 'கோசம்பரியில் ஊறவைத்த பாசிப்பருப்பு, வெள்ளரி, கேரட், தேங்காய், எலுமிச்சை சேரும்.', 'కోసంబరిలో నానబెట్టిన పెసరపప్పు, దోసకాయ, క్యారెట్, కొబ్బరి, నిమ్మ ఉంటాయి.', 'കോസമ്പരിയിൽ നനച്ച ചെറുപയർ, വെള്ളരി, കാരറ്റ്, തേങ്ങ, നാരങ്ങ എന്നിവ ചേരും.'),
  ),

  // Attire
  q(
    'attire-mysore-silk', 'attire', ['textiles'], 'easy',
    copy('Which textile is especially associated with the royal city of Mysuru?', 'ಮೈಸೂರು ರಾಜನಗರದೊಂದಿಗೆ ವಿಶೇಷವಾಗಿ ಸಂಬಂಧಿಸಿದ ಜವಳಿ ಯಾವುದು?', 'மைசூர் அரச நகரத்துடன் நெருக்கமாக தொடர்புடைய துணி எது?', 'మైసూరు రాజనగరంతో ప్రత్యేకంగా అనుబంధమైన వస్త్రం ఏది?', 'മൈസൂർ രാജനഗരവുമായി പ്രത്യേകമായി ബന്ധപ്പെട്ട വസ്ത്രം ഏത്?'),
    ['Mysore silk', 'Ilkal cotton only', 'Navalgund durrie', 'Kinnal wood'], 0,
    copy('Mysore silk sarees are known for their sheen, silk yarn and gold zari, and have a GI tag.', 'ಮೈಸೂರು ರೇಷ್ಮೆ ಸೀರೆಗಳು ಹೊಳಪು, ರೇಷ್ಮೆ ದಾರ ಮತ್ತು ಚಿನ್ನದ ಜರಿಗಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿವೆ.', 'மைசூர் பட்டு சேலைகள் பளபளப்பு, பட்டு நூல், தங்க ஜரிக்குப் புகழ்பெற்றவை.', 'మైసూరు పట్టు చీరలు మెరుపు, పట్టు దారం, బంగారు జరీకి ప్రసిద్ధి.', 'മൈസൂർ സിൽക്ക് സാരികൾ തിളക്കത്തിനും സിൽക്ക് നൂലിനും സ്വർണ്ണജരിക്കും പ്രശസ്തമാണ്.'),
  ),
  q(
    'attire-kodava-kupya', 'attire', ['regional-costumes'], 'easy',
    copy('The Kodava kupya is traditionally worn by whom?', 'ಕೊಡವ ಕುಪ್ಯವನ್ನು ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ಯಾರು ಧರಿಸುತ್ತಾರೆ?', 'கொடவ குப்யாவை பாரம்பரியமாக அணிபவர் யார்?', 'కొడవ కుప్యను సంప్రదాయంగా ఎవరు ధరిస్తారు?', 'കൊഡവ കുപ്യ പരമ്പരാഗതമായി ധരിക്കുന്നത് ആര്?'),
    ['Kodava men', 'Coastal fishermen only', 'Mysore palace dancers', 'Temple elephants'], 0,
    copy('The kupya is a dark, knee-length Kodava men’s coat, worn with a sash and often a dagger.', 'ಕುಪ್ಯವು ಕೊಡವ ಪುರುಷರ ಕಪ್ಪು, ಮೊಣಕಾಲಿನವರೆಗಿನ ಅಂಗಿಯಾಗಿದ್ದು ಕಚ್ಚೆ ಮತ್ತು ಕತ್ತಿಯೊಂದಿಗೆ ಧರಿಸಲಾಗುತ್ತದೆ.', 'குப்யா கொடவ ஆண்களின் கருமையான முழங்கால் நீள மேலங்கி; இடுப்புப்பட்டை, கத்தி அணிவர்.', 'కుప్య కొడవ పురుషుల నలుపు మోకాలి పొడవు కోటు; నడుము పట్టా, కత్తితో ధరిస్తారు.', 'കുപ്യ കൊഡവ പുരുഷന്മാരുടെ ഇരുണ്ട മുട്ടുനീളമുള്ള മേലങ്കിയാണ്; അരപ്പട്ടയും കത്തിയും കൂടെ ധരിക്കും.'),
  ),
  q(
    'attire-ilkal-tope-teni', 'attire', ['textiles'], 'medium',
    copy('What is the name of the technique joining the body and pallu of an Ilkal saree?', 'ಇಳಕಲ್ ಸೀರೆಯ ಮೈ ಮತ್ತು ಸೆರಗನ್ನು ಜೋಡಿಸುವ ತಂತ್ರದ ಹೆಸರು ಏನು?', 'இள்கல் சேலையின் உடலையும் பல்லுவையும் இணைக்கும் நுட்பம் என்ன?', 'ఇల్కల్ చీర శరీరం, పల్లును కలిపే పద్ధతి పేరు ఏమిటి?', 'ഇൽകൽ സാരിയുടെ ശരീരവും പല്ലുവും ചേർക്കുന്ന സാങ്കേതികതയുടെ പേര് എന്താണ്?'),
    ['Tope teni', 'Kasuti', 'Gavanti', 'Kondi dye'], 0,
    copy('Tope teni joins the body and pallu and is one of the identifying features of an Ilkal saree.', 'ಟೋಪೆ ತೆಣಿ ಇಳಕಲ್ ಸೀರೆಯ ಮೈ ಮತ್ತು ಸೆರಗನ್ನು ಜೋಡಿಸುವ ವಿಶಿಷ್ಟ ತಂತ್ರವಾಗಿದೆ.', 'டோபே தேனி இள்கல் சேலையின் உடலையும் பல்லுவையும் இணைக்கும் தனிச்சிறப்பு.', 'టోపె టెని ఇల్కల్ చీర శరీరం, పల్లును కలిపే ప్రత్యేక పద్ధతి.', 'ടോപെ ടെനി ഇൽകൽ സാരിയുടെ ശരീരവും പല്ലുവും ചേർക്കുന്ന പ്രത്യേക രീതിയാണ്.'),
  ),
  q(
    'attire-mysore-peta-honour', 'attire', ['accessories'], 'medium',
    copy('The Mysore peta is often presented as a symbol of what?', 'ಮೈಸೂರು ಪೇಟವನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಯಾವುದರ ಸಂಕೇತವಾಗಿ ನೀಡುತ್ತಾರೆ?', 'மைசூர் பேட்டா எதன் அடையாளமாக வழங்கப்படுகிறது?', 'మైసూరు పేటను సాధారణంగా దేనికి చిహ్నంగా ఇస్తారు?', 'മൈസൂർ പേട്ട സാധാരണയായി എന്തിന്റെ പ്രതീകമായി നൽകുന്നു?'),
    ['Honour and respect', 'Mourning', 'A farmer’s harvest', 'A dance step'], 0,
    copy('The royal-style turban is presented to honour guests, scholars and achievers.', 'ರಾಜಶೈಲಿಯ ಪೇಟವನ್ನು ಅತಿಥಿಗಳು, ವಿದ್ವಾಂಸರು ಮತ್ತು ಸಾಧಕರನ್ನು ಗೌರವಿಸಲು ನೀಡುತ್ತಾರೆ.', 'அரச பாணி தலைப்பாகை விருந்தினர்கள், அறிஞர்கள், சாதனையாளர்களை கௌரவிக்க வழங்கப்படுகிறது.', 'రాజశైలి తలపాగా అతిథులు, పండితులు, సాధకులను గౌరవించేందుకు ఇస్తారు.', 'രാജശൈലിയിലുള്ള തലപ്പാവ് അതിഥികളെയും പണ്ഡിതരെയും നേട്ടക്കാരെയും ആദരിക്കാൻ നൽകുന്നു.'),
  ),
  q(
    'attire-kasuti-stitches', 'attire', ['textiles', 'accessories'], 'hard',
    copy('How many traditional stitches are named in the common description of Kasuti?', 'ಕಸೂತಿಯ ಸಾಮಾನ್ಯ ವಿವರಣೆಯಲ್ಲಿ ಎಷ್ಟು ಸಾಂಪ್ರದಾಯಿಕ ಹೊಲಿಗೆಗಳನ್ನು ಹೇಳುತ್ತಾರೆ?', 'கசூதியின் பொதுவான விளக்கத்தில் எத்தனை பாரம்பரிய தையல்கள் குறிப்பிடப்படுகின்றன?', 'కసూతి సాధారణ వివరణలో ఎన్ని సంప్రదాయ కుట్టు విధానాలు ఉన్నాయి?', 'കസൂതിയുടെ സാധാരണ വിവരണത്തിൽ എത്ര പരമ്പരാഗത തുന്നലുകൾ പറയപ്പെടുന്നു?'),
    ['Four', 'Two', 'Six', 'Ten'], 0,
    copy('The four named stitches are gavanti, murgi, negi and menthe.', 'ನಾಲ್ಕು ಹೊಲಿಗೆಗಳು ಗವಂತಿ, ಮುರ್ಗಿ, ನೇಗಿ ಮತ್ತು ಮೆಂತೆ.', 'நான்கு தையல்கள் கவந்தி, முர்கி, நேகி, மெந்தே.', 'నాలుగు కుట్టు విధానాలు గవంటి, ముర్గి, నేగి, మెంతె.', 'നാല് തുന്നലുകൾ ഗവന്തി, മുർഗി, നേഗി, മെന്തെ എന്നിവയാണ്.'),
  ),

  // Traditional games
  q(
    'games-aadu-huli', 'games', ['board-games'], 'easy',
    copy('In Aadu Huli Aata, what do the tigers try to do?', 'ಆಡು ಹುಲಿ ಆಟದಲ್ಲಿ ಹುಲಿಗಳು ಏನು ಮಾಡಲು ಪ್ರಯತ್ನಿಸುತ್ತವೆ?', 'ஆடு புலி ஆட்டத்தில் புலிகள் என்ன செய்ய முயல்கின்றன?', 'ఆడు హులి ఆటలో పులులు ఏమి చేయడానికి ప్రయత్నిస్తాయి?', 'ആട് ഹുലി ആട്ടത്തിൽ കടുവകൾ എന്താണ് ചെയ്യാൻ ശ്രമിക്കുന്നത്?'),
    ['Capture goats by jumping over them', 'Build a stone chariot', 'Sow seeds in pits', 'Reach a palace centre'], 0,
    copy('The tigers capture goats by jumping over them, while the goats try to surround and trap the tigers.', 'ಹುಲಿಗಳು ಮೇಕೆಗಳ ಮೇಲೆ ಹಾರಿ ಅವುಗಳನ್ನು ಹಿಡಿಯುತ್ತವೆ; ಮೇಕೆಗಳು ಹುಲಿಗಳನ್ನು ಸುತ್ತುವರಿಯುತ್ತವೆ.', 'புலிகள் ஆடுகளைத் தாண்டி குதித்து பிடிக்கும்; ஆடுகள் புலிகளைச் சூழ்கின்றன.', 'పులులు మేకలపైకి దూకి పట్టుకుంటాయి; మేకలు పులులను చుట్టుముట్టి బంధిస్తాయి.', 'കടുവകൾ ആടുകൾക്ക് മുകളിലൂടെ ചാടി പിടിക്കും; ആടുകൾ കടുവകളെ വളയും.'),
  ),
  q(
    'games-ali-guli-pits', 'games', ['board-games'], 'easy',
    copy('How many pits are on the traditional Ali Guli Mane board?', 'ಸಾಂಪ್ರದಾಯಿಕ ಅಳಗುಳಿ ಮನೆ ಫಲಕದಲ್ಲಿ ಎಷ್ಟು ಮನೆಗಳಿರುತ್ತವೆ?', 'பாரம்பரிய அலி குளி மேடை பலகையில் எத்தனை குழிகள் உள்ளன?', 'సంప్రదాయ అలి గులి మనె బోర్డులో ఎన్ని గుంతలు ఉంటాయి?', 'പരമ്പരാഗത അലി ഗുളി മാനെ ബോർഡിൽ എത്ര കുഴികളുണ്ട്?'),
    ['Fourteen', 'Nine', 'Twelve', 'Twenty-one'], 0,
    copy('Ali Guli Mane is a two-row mancala-style game with fourteen pits for seeds or cowrie shells.', 'ಅಳಗುಳಿ ಮನೆ ಎರಡು ಸಾಲಿನ ಮಂಕಲ ಶೈಲಿಯ ಆಟವಾಗಿದ್ದು ಹದಿನಾಲ್ಕು ಮನೆಗಳಿವೆ.', 'அலி குளி மேனை இரண்டு வரிசை மங்கலா பாணி ஆட்டம்; பதினான்கு குழிகள் உள்ளன.', 'అలి గులి మనె రెండు వరుసల మంకాలా తరహా ఆట; పద్నాలుగు గుంతలు ఉంటాయి.', 'അലി ഗുളി മാനെ രണ്ട് നിരകളുള്ള മങ്കല രീതിയിലുള്ള കളിയാണ്; പതിനാലു കുഴികളുണ്ട്.'),
  ),
  q(
    'games-chowka-bara-cowries', 'games', ['board-games'], 'medium',
    copy('What is commonly used as dice in Chowka Bara?', 'ಚೌಕಾ ಬಾರ ಆಟದಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಯಾವುದನ್ನು ದಾಳವಾಗಿ ಬಳಸುತ್ತಾರೆ?', 'சௌகா பாராவில் பொதுவாக எதை பகடையாக பயன்படுத்துகின்றனர்?', 'చౌక బారాలో సాధారణంగా దేనిని పాచికగా వాడుతారు?', 'ചൗക ബാരയിൽ സാധാരണയായി എന്താണ് പാശയായി ഉപയോഗിക്കുന്നത്?'),
    ['Cowrie shells', 'Palm leaves', 'Metal rings', 'Painted cards'], 0,
    copy('Players throw cowrie shells to determine movement around the cross-shaped board.', 'ಚೌಕಾಕಾರದ ಫಲಕದಲ್ಲಿ ಚಲನೆ ನಿರ್ಧರಿಸಲು ಕವಡೆಗಳನ್ನು ಎಸೆಯುತ್ತಾರೆ.', 'சிலுவை வடிவ பலகையில் நகர கௌரி சிப்பிகளை வீசுகின்றனர்.', 'క్రాస్ ఆకారపు బోర్డులో కదలికకు కౌరీ గవ్వలను వేస్తారు.', 'ക്രോസ് ആകൃതിയിലുള്ള ബോർഡിൽ നീക്കത്തിനായി കൗരി ചിപ്പികൾ എറിയുന്നു.'),
  ),
  q(
    'games-navakankari-mill', 'games', ['board-games'], 'medium',
    copy('What is a “mill” in Navakankari?', 'ನವಕಂಕರಿಯಲ್ಲಿ “ಮಿಲ್” ಎಂದರೆ ಏನು?', 'நவகங்கரியில் “மில்” என்பது என்ன?', 'నవకంకరిలో “మిల్” అంటే ఏమిటి?', 'നവകങ്കരിയിൽ “മിൽ” എന്നത് എന്താണ്?'),
    ['A line of three pieces', 'A dice throw', 'A captured tiger', 'A wooden board'], 0,
    copy('A mill is three pieces in a line; making one lets a player remove an opponent’s piece.', 'ಮೂರು ಗಟ್ಟಿಗಳನ್ನು ಒಂದೇ ಸಾಲಿನಲ್ಲಿ ಇಡುವುದೇ ಮಿಲ್; ಇದರಿಂದ ಎದುರಾಳಿಯ ಗಟ್ಟಿಯನ್ನು ತೆಗೆಯಬಹುದು.', 'மூன்று காய்களை ஒரே வரிசையில் அமைப்பதே மில்; எதிராளியின் காயை அகற்றலாம்.', 'మూడు గుళికలను ఒక వరుసలో పెట్టడమే మిల్; ప్రత్యర్థి గుళికను తొలగించవచ్చు.', 'മൂന്ന് കല്ലുകൾ ഒരു വരിയിലാക്കുന്നതാണ് മിൽ; എതിരാളിയുടെ കല്ല് നീക്കാം.'),
  ),
  q(
    'games-kabaddi-breath', 'games', ['outdoor-games'], 'hard',
    copy('What traditional rule gives kabaddi its famous rhythm?', 'ಕಬಡ್ಡಿಗೆ ಪ್ರಸಿದ್ಧ ಲಯ ನೀಡುವ ಸಾಂಪ್ರದಾಯಿಕ ನಿಯಮ ಯಾವುದು?', 'கபடிக்கு புகழ்பெற்ற தாளத்தை தரும் பாரம்பரிய விதி என்ன?', 'కబడ్డీకి ప్రసిద్ధ లయను ఇచ్చే సంప్రదాయ నియమం ఏమిటి?', 'കബഡിക്ക് പ്രസിദ്ധമായ താളം നൽകുന്ന പരമ്പരാഗത നിയമം എന്താണ്?'),
    ['The raider traditionally chants while holding one breath', 'Players must carry a drum', 'The ball must be bounced seven times', 'Only seated play is allowed'], 0,
    copy('A raider enters the other half, tags defenders and tries to return while maintaining the chant on one breath.', 'ರೈಡರ್ ಎದುರಾಳಿ ಭಾಗಕ್ಕೆ ಹೋಗಿ ರಕ್ಷಕರನ್ನು ಮುಟ್ಟಿ ಒಂದೇ ಉಸಿರಿನಲ್ಲಿ ಜಪಿಸುತ್ತಾ ಹಿಂದಿರುಗಲು ಪ್ರಯತ್ನಿಸುತ್ತಾನೆ.', 'ரெய்டர் எதிர்புறம் சென்று பாதுகாப்பாளர்களைத் தொட்டு ஒரே மூச்சில் முழக்கத்துடன் திரும்ப வேண்டும்.', 'రైడర్ ప్రత్యర్థి భాగంలోకి వెళ్లి రక్షకులను తాకి ఒకే ఊపిరితో నినదిస్తూ తిరిగి రావాలి.', 'റെയ്ഡർ എതിരാളികളുടെ ഭാഗത്ത് കടന്ന് പ്രതിരോധക്കാരെ തൊട്ട് ഒരേ ശ്വാസത്തിൽ വിളിച്ചുകൊണ്ട് മടങ്ങണം.'),
  ),
]

export const quizCategories = ['art', 'dance', 'monuments', 'music', 'festivals', 'food', 'attire', 'games'] as const
export type QuizCategory = (typeof quizCategories)[number]

export function getQuizText(text: QuizText, lang: Lang) {
  return text[lang as QuizLanguage] ?? text.en
}

export function getQuizQuestions(category: string, subcategory?: string, difficulty: QuizDifficulty = 'easy') {
  const categoryQuestions = quizQuestions.filter((question) => question.category === category)
  const subcategoryQuestions = subcategory
    ? categoryQuestions.filter((question) => question.subcategories.includes(subcategory))
    : categoryQuestions
  // Every playable quiz stays at five questions. A subcategory can have a
  // smaller tagged slice, so use the category pool when it cannot fill a full
  // quiz rather than returning a short round.
  const pool = subcategoryQuestions.length >= 5 ? subcategoryQuestions : categoryQuestions
  const preferred = pool.filter((question) => question.difficulty === difficulty)
  return [...preferred, ...pool.filter((question) => !preferred.includes(question))].slice(0, 5)
}

export function calculateQuizScore(correctAnswers: number, totalQuestions: number, difficulty: QuizDifficulty, seconds: number) {
  const base = difficulty === 'hard' ? 150 : difficulty === 'medium' ? 125 : 100
  const accuracy = totalQuestions ? correctAnswers / totalQuestions : 0
  const timeBonus = Math.max(0, 60 - seconds) * (difficulty === 'hard' ? 2 : 1)
  return Math.round(correctAnswers * base + accuracy * 100 + timeBonus)
}

export function calculateQuizXp(correctAnswers: number, difficulty: QuizDifficulty) {
  const perAnswer = difficulty === 'hard' ? 18 : difficulty === 'medium' ? 14 : 10
  return correctAnswers * perAnswer + (difficulty === 'hard' ? 20 : difficulty === 'medium' ? 10 : 5)
}

export function formatQuizTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}