// Beginner (CEFR A1) Swedish vocabulary, ordered roughly by frequency and
// grouped into themed units. Each card carries a real example sentence so words
// are learned in context (comprehensible input) rather than in isolation.
//
// Content is original A1-level material. Where a word has a native-speaker
// recording on Wikimedia Commons it is matched by headword in src/data/audio.json
// (see scripts/fetch-audio.mjs), so "en bil" resolves to the recording of "bil".

import type { IconName } from '../components/Icon'

export type PartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'phrase'
  | 'adverb'
  | 'number'
  | 'pronoun'

export interface VocabCard {
  id: string
  sv: string
  en: string
  exampleSv: string
  exampleEn: string
  unit: string
  pos: PartOfSpeech
  /** Optional literal note, e.g. gender article or a usage hint. */
  note?: string
}

export interface Unit {
  id: string
  title: string
  titleSv: string
  icon: IconName
  blurb: string
}

export const UNITS: Unit[] = [
  { id: 'greetings', title: 'Greetings & basics', titleSv: 'Hälsningar', icon: 'sparkle', blurb: 'The first words you need to be friendly.' },
  { id: 'people', title: 'People & family', titleSv: 'Människor & familj', icon: 'users', blurb: 'Talk about who is in your life.' },
  { id: 'verbs', title: 'Everyday verbs', titleSv: 'Vardagsverb', icon: 'arrowRight', blurb: 'The actions you use every single day.' },
  { id: 'questions', title: 'Question words', titleSv: 'Frågeord', icon: 'target', blurb: 'How to actually ask for things.' },
  { id: 'food', title: 'Food & drink', titleSv: 'Mat & dryck', icon: 'utensils', blurb: 'Order, cook, and shop in Swedish.' },
  { id: 'numbers', title: 'Numbers & time', titleSv: 'Tal & tid', icon: 'clock', blurb: 'Count, tell the time, and make plans.' },
  { id: 'days', title: 'Days & seasons', titleSv: 'Dagar & årstider', icon: 'sun', blurb: 'Weekdays, months, and the year.' },
  { id: 'home', title: 'At home', titleSv: 'Hemma', icon: 'house', blurb: 'The things around you indoors.' },
  { id: 'places', title: 'Out & about', titleSv: 'Ute & omkring', icon: 'target', blurb: 'Shops, towns, travel, directions.' },
  { id: 'colours', title: 'Colours & describing', titleSv: 'Färger', icon: 'sparkle', blurb: 'Describe what you can see.' },
  { id: 'weather', title: 'Weather & nature', titleSv: 'Väder & natur', icon: 'sun', blurb: 'The national conversation topic.' },
  { id: 'body', title: 'Body & health', titleSv: 'Kropp & hälsa', icon: 'heart', blurb: 'Say how you feel and get help.' },
  { id: 'everyday', title: 'Everyday words', titleSv: 'Vardagsord', icon: 'cards', blurb: 'Small words that hold sentences together.' },
]

export const VOCAB: VocabCard[] = [
  // ── Greetings & basics ────────────────────────────────────────────
  { id: 'g1', sv: 'hej', en: 'hi / hello', exampleSv: 'Hej, hur mår du?', exampleEn: 'Hi, how are you?', unit: 'greetings', pos: 'phrase' },
  { id: 'g2', sv: 'hej då', en: 'goodbye', exampleSv: 'Hej då, vi ses imorgon!', exampleEn: 'Goodbye, see you tomorrow!', unit: 'greetings', pos: 'phrase' },
  { id: 'g3', sv: 'tack', en: 'thank you / please', exampleSv: 'Tack så mycket!', exampleEn: 'Thank you very much!', unit: 'greetings', pos: 'phrase' },
  { id: 'g4', sv: 'ja', en: 'yes', exampleSv: 'Ja, det stämmer.', exampleEn: 'Yes, that is right.', unit: 'greetings', pos: 'adverb' },
  { id: 'g5', sv: 'nej', en: 'no', exampleSv: 'Nej, tack.', exampleEn: 'No, thank you.', unit: 'greetings', pos: 'adverb' },
  { id: 'g6', sv: 'god morgon', en: 'good morning', exampleSv: 'God morgon! Vill du ha kaffe?', exampleEn: 'Good morning! Do you want coffee?', unit: 'greetings', pos: 'phrase' },
  { id: 'g7', sv: 'förlåt', en: 'sorry', exampleSv: 'Förlåt, jag är sen.', exampleEn: 'Sorry, I am late.', unit: 'greetings', pos: 'phrase' },
  { id: 'g8', sv: 'ursäkta', en: 'excuse me', exampleSv: 'Ursäkta, var är toaletten?', exampleEn: 'Excuse me, where is the toilet?', unit: 'greetings', pos: 'phrase' },
  { id: 'g9', sv: 'hur mår du?', en: 'how are you?', exampleSv: 'Hej älskling, hur mår du?', exampleEn: 'Hi darling, how are you?', unit: 'greetings', pos: 'phrase' },
  { id: 'g10', sv: 'bra', en: 'good / fine', exampleSv: 'Jag mår bra, tack.', exampleEn: 'I am fine, thanks.', unit: 'greetings', pos: 'adjective' },
  { id: 'g11', sv: 'välkommen', en: 'welcome', exampleSv: 'Välkommen hem!', exampleEn: 'Welcome home!', unit: 'greetings', pos: 'phrase' },
  { id: 'g12', sv: 'vi ses', en: 'see you', exampleSv: 'Vi ses snart!', exampleEn: 'See you soon!', unit: 'greetings', pos: 'phrase' },
  { id: 'g13', sv: 'god natt', en: 'good night', exampleSv: 'God natt, sov gott.', exampleEn: 'Good night, sleep well.', unit: 'greetings', pos: 'phrase' },
  { id: 'g14', sv: 'varsågod', en: 'here you go / you are welcome', exampleSv: 'Varsågod, det är till dig.', exampleEn: 'Here you go, it is for you.', unit: 'greetings', pos: 'phrase' },
  { id: 'g15', sv: 'kanske', en: 'maybe', exampleSv: 'Kanske imorgon.', exampleEn: 'Maybe tomorrow.', unit: 'greetings', pos: 'adverb' },

  // ── People & family ───────────────────────────────────────────────
  { id: 'p1', sv: 'jag', en: 'I', exampleSv: 'Jag heter Anna.', exampleEn: 'My name is Anna.', unit: 'people', pos: 'pronoun' },
  { id: 'p2', sv: 'du', en: 'you', exampleSv: 'Vad heter du?', exampleEn: 'What is your name?', unit: 'people', pos: 'pronoun' },
  { id: 'p3', sv: 'vi', en: 'we', exampleSv: 'Vi lär oss svenska.', exampleEn: 'We are learning Swedish.', unit: 'people', pos: 'pronoun' },
  { id: 'p4', sv: 'en vän', en: 'a friend', exampleSv: 'Han är min bästa vän.', exampleEn: 'He is my best friend.', unit: 'people', pos: 'noun', note: 'en-word' },
  { id: 'p5', sv: 'en familj', en: 'a family', exampleSv: 'Min familj bor i Sverige.', exampleEn: 'My family lives in Sweden.', unit: 'people', pos: 'noun', note: 'en-word' },
  { id: 'p6', sv: 'en man', en: 'a man / husband', exampleSv: 'Mannen läser en bok.', exampleEn: 'The man is reading a book.', unit: 'people', pos: 'noun', note: 'en-word' },
  { id: 'p7', sv: 'en kvinna', en: 'a woman', exampleSv: 'Kvinnan heter Sara.', exampleEn: 'The woman is called Sara.', unit: 'people', pos: 'noun', note: 'en-word' },
  { id: 'p8', sv: 'ett barn', en: 'a child', exampleSv: 'Barnet sover nu.', exampleEn: 'The child is sleeping now.', unit: 'people', pos: 'noun', note: 'ett-word' },
  { id: 'p9', sv: 'en mamma', en: 'a mum', exampleSv: 'Min mamma lagar mat.', exampleEn: 'My mum is cooking.', unit: 'people', pos: 'noun', note: 'en-word' },
  { id: 'p10', sv: 'en pappa', en: 'a dad', exampleSv: 'Pappa kör bilen.', exampleEn: 'Dad is driving the car.', unit: 'people', pos: 'noun', note: 'en-word' },
  { id: 'p11', sv: 'en fru', en: 'a wife', exampleSv: 'Det här är min fru.', exampleEn: 'This is my wife.', unit: 'people', pos: 'noun', note: 'en-word' },
  { id: 'p12', sv: 'kär', en: 'in love', exampleSv: 'Vi är kära i varandra.', exampleEn: 'We are in love with each other.', unit: 'people', pos: 'adjective' },
  { id: 'p13', sv: 'han', en: 'he', exampleSv: 'Han kommer snart.', exampleEn: 'He is coming soon.', unit: 'people', pos: 'pronoun' },
  { id: 'p14', sv: 'hon', en: 'she', exampleSv: 'Hon bor i Göteborg.', exampleEn: 'She lives in Gothenburg.', unit: 'people', pos: 'pronoun' },
  { id: 'p15', sv: 'de', en: 'they', exampleSv: 'De är våra grannar.', exampleEn: 'They are our neighbours.', unit: 'people', pos: 'pronoun', note: 'said like "dom"' },
  { id: 'p16', sv: 'en syster', en: 'a sister', exampleSv: 'Min syster är läkare.', exampleEn: 'My sister is a doctor.', unit: 'people', pos: 'noun', note: 'en-word' },
  { id: 'p17', sv: 'en bror', en: 'a brother', exampleSv: 'Jag har en bror.', exampleEn: 'I have a brother.', unit: 'people', pos: 'noun', note: 'en-word' },
  { id: 'p18', sv: 'en granne', en: 'a neighbour', exampleSv: 'Grannen är snäll.', exampleEn: 'The neighbour is kind.', unit: 'people', pos: 'noun', note: 'en-word' },

  // ── Everyday verbs ────────────────────────────────────────────────
  { id: 'v1', sv: 'att vara', en: 'to be', exampleSv: 'Jag är trött.', exampleEn: 'I am tired.', unit: 'verbs', pos: 'verb', note: 'är = am/is/are' },
  { id: 'v2', sv: 'att ha', en: 'to have', exampleSv: 'Vi har en hund.', exampleEn: 'We have a dog.', unit: 'verbs', pos: 'verb', note: 'har = have/has' },
  { id: 'v3', sv: 'att heta', en: 'to be called', exampleSv: 'Jag heter Erik.', exampleEn: 'My name is Erik.', unit: 'verbs', pos: 'verb' },
  { id: 'v4', sv: 'att bo', en: 'to live (reside)', exampleSv: 'Vi bor tillsammans.', exampleEn: 'We live together.', unit: 'verbs', pos: 'verb' },
  { id: 'v5', sv: 'att tala', en: 'to speak', exampleSv: 'Talar du svenska?', exampleEn: 'Do you speak Swedish?', unit: 'verbs', pos: 'verb' },
  { id: 'v6', sv: 'att förstå', en: 'to understand', exampleSv: 'Jag förstår inte.', exampleEn: 'I do not understand.', unit: 'verbs', pos: 'verb' },
  { id: 'v7', sv: 'att vilja', en: 'to want', exampleSv: 'Jag vill lära mig svenska.', exampleEn: 'I want to learn Swedish.', unit: 'verbs', pos: 'verb', note: 'vill = want(s)' },
  { id: 'v8', sv: 'att äta', en: 'to eat', exampleSv: 'Vi äter frukost klockan åtta.', exampleEn: 'We eat breakfast at eight.', unit: 'verbs', pos: 'verb' },
  { id: 'v9', sv: 'att gå', en: 'to go / walk', exampleSv: 'Ska vi gå nu?', exampleEn: 'Shall we go now?', unit: 'verbs', pos: 'verb' },
  { id: 'v10', sv: 'att älska', en: 'to love', exampleSv: 'Jag älskar dig.', exampleEn: 'I love you.', unit: 'verbs', pos: 'verb' },
  { id: 'v11', sv: 'att lära sig', en: 'to learn', exampleSv: 'Vi lär oss tillsammans.', exampleEn: 'We learn together.', unit: 'verbs', pos: 'verb' },
  { id: 'v12', sv: 'att jobba', en: 'to work', exampleSv: 'Hon jobbar på ett sjukhus.', exampleEn: 'She works at a hospital.', unit: 'verbs', pos: 'verb' },
  { id: 'v13', sv: 'att komma', en: 'to come', exampleSv: 'Kommer du med oss?', exampleEn: 'Are you coming with us?', unit: 'verbs', pos: 'verb' },
  { id: 'v14', sv: 'att se', en: 'to see', exampleSv: 'Ser du bilen där?', exampleEn: 'Do you see the car there?', unit: 'verbs', pos: 'verb' },
  { id: 'v15', sv: 'att veta', en: 'to know (a fact)', exampleSv: 'Jag vet inte.', exampleEn: 'I do not know.', unit: 'verbs', pos: 'verb' },
  { id: 'v16', sv: 'att tycka', en: 'to think (an opinion)', exampleSv: 'Vad tycker du om maten?', exampleEn: 'What do you think of the food?', unit: 'verbs', pos: 'verb' },
  { id: 'v17', sv: 'att köpa', en: 'to buy', exampleSv: 'Jag ska köpa bröd.', exampleEn: 'I am going to buy bread.', unit: 'verbs', pos: 'verb' },
  { id: 'v18', sv: 'att sova', en: 'to sleep', exampleSv: 'Barnen sover redan.', exampleEn: 'The children are already asleep.', unit: 'verbs', pos: 'verb' },
  { id: 'v19', sv: 'att läsa', en: 'to read', exampleSv: 'Jag läser en bok.', exampleEn: 'I am reading a book.', unit: 'verbs', pos: 'verb' },
  { id: 'v20', sv: 'att skriva', en: 'to write', exampleSv: 'Hon skriver ett brev.', exampleEn: 'She is writing a letter.', unit: 'verbs', pos: 'verb' },
  { id: 'v21', sv: 'att hjälpa', en: 'to help', exampleSv: 'Kan du hjälpa mig?', exampleEn: 'Can you help me?', unit: 'verbs', pos: 'verb' },
  { id: 'v22', sv: 'att åka', en: 'to travel / go by vehicle', exampleSv: 'Vi åker tåg till Malmö.', exampleEn: 'We are taking the train to Malmö.', unit: 'verbs', pos: 'verb' },

  // ── Question words ────────────────────────────────────────────────
  { id: 'q1', sv: 'vad', en: 'what', exampleSv: 'Vad gör du?', exampleEn: 'What are you doing?', unit: 'questions', pos: 'pronoun' },
  { id: 'q2', sv: 'vem', en: 'who', exampleSv: 'Vem är det?', exampleEn: 'Who is that?', unit: 'questions', pos: 'pronoun' },
  { id: 'q3', sv: 'var', en: 'where', exampleSv: 'Var bor du?', exampleEn: 'Where do you live?', unit: 'questions', pos: 'adverb' },
  { id: 'q4', sv: 'när', en: 'when', exampleSv: 'När börjar filmen?', exampleEn: 'When does the film start?', unit: 'questions', pos: 'adverb' },
  { id: 'q5', sv: 'hur', en: 'how', exampleSv: 'Hur säger man det på svenska?', exampleEn: 'How do you say that in Swedish?', unit: 'questions', pos: 'adverb' },
  { id: 'q6', sv: 'varför', en: 'why', exampleSv: 'Varför skrattar du?', exampleEn: 'Why are you laughing?', unit: 'questions', pos: 'adverb' },
  { id: 'q7', sv: 'vilken', en: 'which', exampleSv: 'Vilken buss går till centrum?', exampleEn: 'Which bus goes to the centre?', unit: 'questions', pos: 'pronoun' },
  { id: 'q8', sv: 'hur mycket', en: 'how much', exampleSv: 'Hur mycket kostar det?', exampleEn: 'How much does it cost?', unit: 'questions', pos: 'phrase' },

  // ── Food & drink ──────────────────────────────────────────────────
  { id: 'f1', sv: 'vatten', en: 'water', exampleSv: 'Kan jag få ett glas vatten?', exampleEn: 'Can I have a glass of water?', unit: 'food', pos: 'noun', note: 'ett-word' },
  { id: 'f2', sv: 'kaffe', en: 'coffee', exampleSv: 'Jag dricker kaffe varje morgon.', exampleEn: 'I drink coffee every morning.', unit: 'food', pos: 'noun' },
  { id: 'f3', sv: 'en kaka', en: 'a cookie / cake', exampleSv: 'Vill du ha en kaka till kaffet?', exampleEn: 'Do you want a cookie with the coffee?', unit: 'food', pos: 'noun', note: 'en-word' },
  { id: 'f4', sv: 'bröd', en: 'bread', exampleSv: 'Vi köper bröd i affären.', exampleEn: 'We buy bread at the shop.', unit: 'food', pos: 'noun', note: 'ett-word' },
  { id: 'f5', sv: 'mjölk', en: 'milk', exampleSv: 'Mjölken står i kylen.', exampleEn: 'The milk is in the fridge.', unit: 'food', pos: 'noun', note: 'en-word' },
  { id: 'f6', sv: 'en öl', en: 'a beer', exampleSv: 'Två öl, tack.', exampleEn: 'Two beers, please.', unit: 'food', pos: 'noun', note: 'en-word' },
  { id: 'f7', sv: 'mat', en: 'food', exampleSv: 'Maten är klar!', exampleEn: 'The food is ready!', unit: 'food', pos: 'noun', note: 'en-word' },
  { id: 'f8', sv: 'att dricka', en: 'to drink', exampleSv: 'Vad vill du dricka?', exampleEn: 'What do you want to drink?', unit: 'food', pos: 'verb' },
  { id: 'f9', sv: 'att laga mat', en: 'to cook', exampleSv: 'Ikväll lagar jag mat.', exampleEn: 'Tonight I am cooking.', unit: 'food', pos: 'verb' },
  { id: 'f10', sv: 'gott', en: 'tasty', exampleSv: 'Det var jättegott!', exampleEn: 'That was really tasty!', unit: 'food', pos: 'adjective' },
  { id: 'f11', sv: 'en restaurang', en: 'a restaurant', exampleSv: 'Vi äter på en restaurang ikväll.', exampleEn: 'We are eating at a restaurant tonight.', unit: 'food', pos: 'noun', note: 'en-word' },
  { id: 'f12', sv: 'notan, tack', en: 'the bill, please', exampleSv: 'Kan vi få notan, tack?', exampleEn: 'Can we have the bill, please?', unit: 'food', pos: 'phrase' },
  { id: 'f13', sv: 'en frukost', en: 'a breakfast', exampleSv: 'Frukost serveras klockan sju.', exampleEn: 'Breakfast is served at seven.', unit: 'food', pos: 'noun', note: 'en-word' },
  { id: 'f14', sv: 'ett äpple', en: 'an apple', exampleSv: 'Jag äter ett äpple varje dag.', exampleEn: 'I eat an apple every day.', unit: 'food', pos: 'noun', note: 'ett-word' },
  { id: 'f15', sv: 'en ost', en: 'a cheese', exampleSv: 'Osten smakar gott.', exampleEn: 'The cheese tastes good.', unit: 'food', pos: 'noun', note: 'en-word' },
  { id: 'f16', sv: 'en fisk', en: 'a fish', exampleSv: 'Vi äter fisk på fredag.', exampleEn: 'We eat fish on Friday.', unit: 'food', pos: 'noun', note: 'en-word' },
  { id: 'f17', sv: 'kött', en: 'meat', exampleSv: 'Jag äter inte kött.', exampleEn: 'I do not eat meat.', unit: 'food', pos: 'noun', note: 'ett-word · soft k' },
  { id: 'f18', sv: 'ett te', en: 'a tea', exampleSv: 'Ett te med mjölk, tack.', exampleEn: 'A tea with milk, please.', unit: 'food', pos: 'noun', note: 'ett-word' },

  // ── Numbers & time ────────────────────────────────────────────────
  { id: 'n1', sv: 'en', en: 'one', exampleSv: 'Jag vill ha en kopp te.', exampleEn: 'I want one cup of tea.', unit: 'numbers', pos: 'number' },
  { id: 'n2', sv: 'två', en: 'two', exampleSv: 'Vi är två personer.', exampleEn: 'We are two people.', unit: 'numbers', pos: 'number' },
  { id: 'n3', sv: 'tre', en: 'three', exampleSv: 'Klockan är tre.', exampleEn: 'It is three o’clock.', unit: 'numbers', pos: 'number' },
  { id: 'n4', sv: 'fyra', en: 'four', exampleSv: 'Vi har fyra stolar.', exampleEn: 'We have four chairs.', unit: 'numbers', pos: 'number' },
  { id: 'n5', sv: 'fem', en: 'five', exampleSv: 'Fem minuter kvar.', exampleEn: 'Five minutes left.', unit: 'numbers', pos: 'number' },
  { id: 'n6', sv: 'sex', en: 'six', exampleSv: 'Klockan sex äter vi.', exampleEn: 'At six o’clock we eat.', unit: 'numbers', pos: 'number' },
  { id: 'n7', sv: 'sju', en: 'seven', exampleSv: 'Bussen går klockan sju.', exampleEn: 'The bus leaves at seven.', unit: 'numbers', pos: 'number', note: 'tricky sj-sound' },
  { id: 'n8', sv: 'åtta', en: 'eight', exampleSv: 'Jag börjar jobbet åtta.', exampleEn: 'I start work at eight.', unit: 'numbers', pos: 'number' },
  { id: 'n9', sv: 'nio', en: 'nine', exampleSv: 'Affären öppnar nio.', exampleEn: 'The shop opens at nine.', unit: 'numbers', pos: 'number' },
  { id: 'n10', sv: 'tio', en: 'ten', exampleSv: 'Jag räknar till tio.', exampleEn: 'I count to ten.', unit: 'numbers', pos: 'number' },
  { id: 'n11', sv: 'tjugo', en: 'twenty', exampleSv: 'Det kostar tjugo kronor.', exampleEn: 'It costs twenty kronor.', unit: 'numbers', pos: 'number', note: 'tj = "sh"' },
  { id: 'n12', sv: 'hundra', en: 'hundred', exampleSv: 'Hundra kronor, tack.', exampleEn: 'One hundred kronor, please.', unit: 'numbers', pos: 'number' },
  { id: 'n13', sv: 'idag', en: 'today', exampleSv: 'Idag är det soligt.', exampleEn: 'Today it is sunny.', unit: 'numbers', pos: 'adverb' },
  { id: 'n14', sv: 'imorgon', en: 'tomorrow', exampleSv: 'Vi ses imorgon.', exampleEn: 'See you tomorrow.', unit: 'numbers', pos: 'adverb' },
  { id: 'n15', sv: 'igår', en: 'yesterday', exampleSv: 'Igår regnade det.', exampleEn: 'Yesterday it rained.', unit: 'numbers', pos: 'adverb' },
  { id: 'n16', sv: 'nu', en: 'now', exampleSv: 'Vi måste gå nu.', exampleEn: 'We have to go now.', unit: 'numbers', pos: 'adverb' },
  { id: 'n17', sv: 'en dag', en: 'a day', exampleSv: 'Ha en fin dag!', exampleEn: 'Have a nice day!', unit: 'numbers', pos: 'noun', note: 'en-word' },
  { id: 'n18', sv: 'vad är klockan?', en: 'what time is it?', exampleSv: 'Ursäkta, vad är klockan?', exampleEn: 'Excuse me, what time is it?', unit: 'numbers', pos: 'phrase' },
  { id: 'n19', sv: 'en vecka', en: 'a week', exampleSv: 'Vi reser om en vecka.', exampleEn: 'We travel in one week.', unit: 'numbers', pos: 'noun', note: 'en-word' },
  { id: 'n20', sv: 'en timme', en: 'an hour', exampleSv: 'Det tar en timme.', exampleEn: 'It takes an hour.', unit: 'numbers', pos: 'noun', note: 'en-word' },

  // ── Days & seasons ────────────────────────────────────────────────
  { id: 'd1', sv: 'måndag', en: 'Monday', exampleSv: 'På måndag börjar kursen.', exampleEn: 'The course starts on Monday.', unit: 'days', pos: 'noun' },
  { id: 'd2', sv: 'tisdag', en: 'Tuesday', exampleSv: 'Vi träffas på tisdag.', exampleEn: 'We are meeting on Tuesday.', unit: 'days', pos: 'noun' },
  { id: 'd3', sv: 'onsdag', en: 'Wednesday', exampleSv: 'Onsdag passar bra.', exampleEn: 'Wednesday suits well.', unit: 'days', pos: 'noun' },
  { id: 'd4', sv: 'torsdag', en: 'Thursday', exampleSv: 'På torsdag är jag ledig.', exampleEn: 'On Thursday I am off.', unit: 'days', pos: 'noun' },
  { id: 'd5', sv: 'fredag', en: 'Friday', exampleSv: 'Äntligen fredag!', exampleEn: 'Finally Friday!', unit: 'days', pos: 'noun' },
  { id: 'd6', sv: 'lördag', en: 'Saturday', exampleSv: 'Vi sover länge på lördag.', exampleEn: 'We sleep in on Saturday.', unit: 'days', pos: 'noun' },
  { id: 'd7', sv: 'söndag', en: 'Sunday', exampleSv: 'Söndag är en lugn dag.', exampleEn: 'Sunday is a calm day.', unit: 'days', pos: 'noun' },
  { id: 'd8', sv: 'en helg', en: 'a weekend', exampleSv: 'Trevlig helg!', exampleEn: 'Have a nice weekend!', unit: 'days', pos: 'noun', note: 'en-word' },
  { id: 'd9', sv: 'en månad', en: 'a month', exampleSv: 'Om en månad flyttar vi.', exampleEn: 'In a month we are moving.', unit: 'days', pos: 'noun', note: 'en-word' },
  { id: 'd10', sv: 'ett år', en: 'a year', exampleSv: 'Gott nytt år!', exampleEn: 'Happy new year!', unit: 'days', pos: 'noun', note: 'ett-word' },
  { id: 'd11', sv: 'en sommar', en: 'a summer', exampleSv: 'På sommaren badar vi.', exampleEn: 'In the summer we swim.', unit: 'days', pos: 'noun', note: 'en-word' },
  { id: 'd12', sv: 'en vinter', en: 'a winter', exampleSv: 'Vintern är lång och mörk.', exampleEn: 'The winter is long and dark.', unit: 'days', pos: 'noun', note: 'en-word' },

  // ── At home ───────────────────────────────────────────────────────
  { id: 'h1', sv: 'ett hus', en: 'a house', exampleSv: 'Huset är gult.', exampleEn: 'The house is yellow.', unit: 'home', pos: 'noun', note: 'ett-word' },
  { id: 'h2', sv: 'en lägenhet', en: 'an apartment', exampleSv: 'Vår lägenhet är liten.', exampleEn: 'Our apartment is small.', unit: 'home', pos: 'noun', note: 'en-word' },
  { id: 'h3', sv: 'ett rum', en: 'a room', exampleSv: 'Rummet är ljust.', exampleEn: 'The room is bright.', unit: 'home', pos: 'noun', note: 'ett-word' },
  { id: 'h4', sv: 'ett kök', en: 'a kitchen', exampleSv: 'Vi sitter i köket.', exampleEn: 'We are sitting in the kitchen.', unit: 'home', pos: 'noun', note: 'ett-word · soft k' },
  { id: 'h5', sv: 'ett bord', en: 'a table', exampleSv: 'Boken ligger på bordet.', exampleEn: 'The book is on the table.', unit: 'home', pos: 'noun', note: 'ett-word' },
  { id: 'h6', sv: 'en stol', en: 'a chair', exampleSv: 'Ta en stol!', exampleEn: 'Take a chair!', unit: 'home', pos: 'noun', note: 'en-word' },
  { id: 'h7', sv: 'en säng', en: 'a bed', exampleSv: 'Sängen är mjuk.', exampleEn: 'The bed is soft.', unit: 'home', pos: 'noun', note: 'en-word' },
  { id: 'h8', sv: 'en dörr', en: 'a door', exampleSv: 'Kan du stänga dörren?', exampleEn: 'Can you close the door?', unit: 'home', pos: 'noun', note: 'en-word' },
  { id: 'h9', sv: 'ett fönster', en: 'a window', exampleSv: 'Öppna fönstret, tack.', exampleEn: 'Open the window, please.', unit: 'home', pos: 'noun', note: 'ett-word' },
  { id: 'h10', sv: 'en nyckel', en: 'a key', exampleSv: 'Var är min nyckel?', exampleEn: 'Where is my key?', unit: 'home', pos: 'noun', note: 'en-word' },
  { id: 'h11', sv: 'en bok', en: 'a book', exampleSv: 'Boken är på svenska.', exampleEn: 'The book is in Swedish.', unit: 'home', pos: 'noun', note: 'en-word' },
  { id: 'h12', sv: 'hemma', en: 'at home', exampleSv: 'Jag är hemma ikväll.', exampleEn: 'I am at home tonight.', unit: 'home', pos: 'adverb' },

  // ── Out & about ───────────────────────────────────────────────────
  { id: 'o1', sv: 'en stad', en: 'a city / town', exampleSv: 'Stockholm är en vacker stad.', exampleEn: 'Stockholm is a beautiful city.', unit: 'places', pos: 'noun', note: 'en-word' },
  { id: 'o2', sv: 'en affär', en: 'a shop', exampleSv: 'Affären stänger klockan sex.', exampleEn: 'The shop closes at six.', unit: 'places', pos: 'noun', note: 'en-word' },
  { id: 'o3', sv: 'en bil', en: 'a car', exampleSv: 'Bilen är röd.', exampleEn: 'The car is red.', unit: 'places', pos: 'noun', note: 'en-word' },
  { id: 'o4', sv: 'ett tåg', en: 'a train', exampleSv: 'Tåget är försenat.', exampleEn: 'The train is delayed.', unit: 'places', pos: 'noun', note: 'ett-word' },
  { id: 'o5', sv: 'en buss', en: 'a bus', exampleSv: 'Bussen kommer om fem minuter.', exampleEn: 'The bus comes in five minutes.', unit: 'places', pos: 'noun', note: 'en-word' },
  { id: 'o6', sv: 'en gata', en: 'a street', exampleSv: 'Vi bor på den här gatan.', exampleEn: 'We live on this street.', unit: 'places', pos: 'noun', note: 'en-word' },
  { id: 'o7', sv: 'ett jobb', en: 'a job', exampleSv: 'Jag har ett nytt jobb.', exampleEn: 'I have a new job.', unit: 'places', pos: 'noun', note: 'ett-word' },
  { id: 'o8', sv: 'en skola', en: 'a school', exampleSv: 'Skolan börjar i augusti.', exampleEn: 'School starts in August.', unit: 'places', pos: 'noun', note: 'en-word' },
  { id: 'o9', sv: 'höger', en: 'right (direction)', exampleSv: 'Sväng till höger.', exampleEn: 'Turn right.', unit: 'places', pos: 'adverb' },
  { id: 'o10', sv: 'vänster', en: 'left (direction)', exampleSv: 'Gå till vänster.', exampleEn: 'Go left.', unit: 'places', pos: 'adverb' },
  { id: 'o11', sv: 'nära', en: 'near', exampleSv: 'Affären ligger nära.', exampleEn: 'The shop is nearby.', unit: 'places', pos: 'adverb' },
  { id: 'o12', sv: 'ett land', en: 'a country', exampleSv: 'Sverige är ett stort land.', exampleEn: 'Sweden is a big country.', unit: 'places', pos: 'noun', note: 'ett-word' },

  // ── Colours & describing ──────────────────────────────────────────
  { id: 'c1', sv: 'röd', en: 'red', exampleSv: 'Huset är rött.', exampleEn: 'The house is red.', unit: 'colours', pos: 'adjective' },
  { id: 'c2', sv: 'blå', en: 'blue', exampleSv: 'Himlen är blå.', exampleEn: 'The sky is blue.', unit: 'colours', pos: 'adjective' },
  { id: 'c3', sv: 'gul', en: 'yellow', exampleSv: 'Flaggan är blå och gul.', exampleEn: 'The flag is blue and yellow.', unit: 'colours', pos: 'adjective' },
  { id: 'c4', sv: 'grön', en: 'green', exampleSv: 'Skogen är grön.', exampleEn: 'The forest is green.', unit: 'colours', pos: 'adjective' },
  { id: 'c5', sv: 'svart', en: 'black', exampleSv: 'Jag dricker svart kaffe.', exampleEn: 'I drink black coffee.', unit: 'colours', pos: 'adjective' },
  { id: 'c6', sv: 'vit', en: 'white', exampleSv: 'Snön är vit.', exampleEn: 'The snow is white.', unit: 'colours', pos: 'adjective' },
  { id: 'c7', sv: 'stor', en: 'big', exampleSv: 'Vi bor i en stor stad.', exampleEn: 'We live in a big city.', unit: 'colours', pos: 'adjective' },
  { id: 'c8', sv: 'liten', en: 'small', exampleSv: 'Vi har en liten lägenhet.', exampleEn: 'We have a small apartment.', unit: 'colours', pos: 'adjective' },
  { id: 'c9', sv: 'ny', en: 'new', exampleSv: 'Det är en ny bok.', exampleEn: 'It is a new book.', unit: 'colours', pos: 'adjective' },
  { id: 'c10', sv: 'gammal', en: 'old', exampleSv: 'Huset är gammalt.', exampleEn: 'The house is old.', unit: 'colours', pos: 'adjective' },
  { id: 'c11', sv: 'fin', en: 'nice / pretty', exampleSv: 'Vilken fin dag!', exampleEn: 'What a nice day!', unit: 'colours', pos: 'adjective' },
  { id: 'c12', sv: 'snäll', en: 'kind', exampleSv: 'Du är väldigt snäll.', exampleEn: 'You are very kind.', unit: 'colours', pos: 'adjective' },

  // ── Weather & nature ──────────────────────────────────────────────
  { id: 'w1', sv: 'ett väder', en: 'a weather', exampleSv: 'Vilket fint väder!', exampleEn: 'What lovely weather!', unit: 'weather', pos: 'noun', note: 'ett-word' },
  { id: 'w2', sv: 'en sol', en: 'a sun', exampleSv: 'Solen skiner idag.', exampleEn: 'The sun is shining today.', unit: 'weather', pos: 'noun', note: 'en-word' },
  { id: 'w3', sv: 'ett regn', en: 'a rain', exampleSv: 'Det blir regn imorgon.', exampleEn: 'There will be rain tomorrow.', unit: 'weather', pos: 'noun', note: 'ett-word' },
  { id: 'w4', sv: 'en snö', en: 'a snow', exampleSv: 'Det ligger snö på marken.', exampleEn: 'There is snow on the ground.', unit: 'weather', pos: 'noun', note: 'en-word' },
  { id: 'w5', sv: 'kallt', en: 'cold', exampleSv: 'Det är kallt ute.', exampleEn: 'It is cold outside.', unit: 'weather', pos: 'adjective' },
  { id: 'w6', sv: 'varmt', en: 'warm', exampleSv: 'Det är varmt inne.', exampleEn: 'It is warm inside.', unit: 'weather', pos: 'adjective' },
  { id: 'w7', sv: 'en vind', en: 'a wind', exampleSv: 'Vinden är stark idag.', exampleEn: 'The wind is strong today.', unit: 'weather', pos: 'noun', note: 'en-word' },
  { id: 'w8', sv: 'en skog', en: 'a forest', exampleSv: 'Vi går i skogen.', exampleEn: 'We walk in the forest.', unit: 'weather', pos: 'noun', note: 'en-word' },
  { id: 'w9', sv: 'ett vatten', en: 'a body of water', exampleSv: 'Vattnet är kallt.', exampleEn: 'The water is cold.', unit: 'weather', pos: 'noun', note: 'ett-word' },
  { id: 'w10', sv: 'ute', en: 'outside', exampleSv: 'Barnen leker ute.', exampleEn: 'The children are playing outside.', unit: 'weather', pos: 'adverb' },

  // ── Body & health ─────────────────────────────────────────────────
  { id: 'b1', sv: 'ett huvud', en: 'a head', exampleSv: 'Jag har ont i huvudet.', exampleEn: 'I have a headache.', unit: 'body', pos: 'noun', note: 'ett-word' },
  { id: 'b2', sv: 'en hand', en: 'a hand', exampleSv: 'Ge mig din hand.', exampleEn: 'Give me your hand.', unit: 'body', pos: 'noun', note: 'en-word' },
  { id: 'b3', sv: 'ett öga', en: 'an eye', exampleSv: 'Hon har blå ögon.', exampleEn: 'She has blue eyes.', unit: 'body', pos: 'noun', note: 'ett-word' },
  { id: 'b4', sv: 'sjuk', en: 'ill', exampleSv: 'Jag är sjuk idag.', exampleEn: 'I am ill today.', unit: 'body', pos: 'adjective' },
  { id: 'b5', sv: 'frisk', en: 'healthy', exampleSv: 'Nu är jag frisk igen.', exampleEn: 'Now I am healthy again.', unit: 'body', pos: 'adjective' },
  { id: 'b6', sv: 'en läkare', en: 'a doctor', exampleSv: 'Jag ska till läkaren.', exampleEn: 'I am going to the doctor.', unit: 'body', pos: 'noun', note: 'en-word' },
  { id: 'b7', sv: 'trött', en: 'tired', exampleSv: 'Jag är så trött.', exampleEn: 'I am so tired.', unit: 'body', pos: 'adjective' },
  { id: 'b8', sv: 'hungrig', en: 'hungry', exampleSv: 'Är du hungrig?', exampleEn: 'Are you hungry?', unit: 'body', pos: 'adjective' },
  { id: 'b9', sv: 'glad', en: 'happy', exampleSv: 'Jag är glad idag.', exampleEn: 'I am happy today.', unit: 'body', pos: 'adjective' },
  { id: 'b10', sv: 'hjälp', en: 'help', exampleSv: 'Hjälp, jag har gått vilse!', exampleEn: 'Help, I am lost!', unit: 'body', pos: 'noun' },

  // ── Everyday words ────────────────────────────────────────────────
  { id: 'e1', sv: 'och', en: 'and', exampleSv: 'Jag och du.', exampleEn: 'You and I.', unit: 'everyday', pos: 'adverb' },
  { id: 'e2', sv: 'men', en: 'but', exampleSv: 'Det är kallt men soligt.', exampleEn: 'It is cold but sunny.', unit: 'everyday', pos: 'adverb' },
  { id: 'e3', sv: 'inte', en: 'not', exampleSv: 'Jag vet inte.', exampleEn: 'I do not know.', unit: 'everyday', pos: 'adverb' },
  { id: 'e4', sv: 'här', en: 'here', exampleSv: 'Kom hit, jag är här.', exampleEn: 'Come here, I am here.', unit: 'everyday', pos: 'adverb' },
  { id: 'e5', sv: 'där', en: 'there', exampleSv: 'Boken ligger där.', exampleEn: 'The book is over there.', unit: 'everyday', pos: 'adverb' },
  { id: 'e6', sv: 'tillsammans', en: 'together', exampleSv: 'Vi lär oss svenska tillsammans.', exampleEn: 'We are learning Swedish together.', unit: 'everyday', pos: 'adverb' },
  { id: 'e7', sv: 'mycket', en: 'a lot / very', exampleSv: 'Jag gillar dig mycket.', exampleEn: 'I like you a lot.', unit: 'everyday', pos: 'adverb' },
  { id: 'e8', sv: 'också', en: 'also', exampleSv: 'Jag vill också åka.', exampleEn: 'I want to go too.', unit: 'everyday', pos: 'adverb' },
  { id: 'e9', sv: 'alltid', en: 'always', exampleSv: 'Hon är alltid sen.', exampleEn: 'She is always late.', unit: 'everyday', pos: 'adverb' },
  { id: 'e10', sv: 'aldrig', en: 'never', exampleSv: 'Jag dricker aldrig kaffe.', exampleEn: 'I never drink coffee.', unit: 'everyday', pos: 'adverb' },
  { id: 'e11', sv: 'ofta', en: 'often', exampleSv: 'Vi ses ofta.', exampleEn: 'We see each other often.', unit: 'everyday', pos: 'adverb' },
  { id: 'e12', sv: 'lite', en: 'a little', exampleSv: 'Jag talar lite svenska.', exampleEn: 'I speak a little Swedish.', unit: 'everyday', pos: 'adverb' },
  { id: 'e13', sv: 'snart', en: 'soon', exampleSv: 'Vi kommer snart.', exampleEn: 'We are coming soon.', unit: 'everyday', pos: 'adverb' },
  { id: 'e14', sv: 'igen', en: 'again', exampleSv: 'Säg det igen, tack.', exampleEn: 'Say it again, please.', unit: 'everyday', pos: 'adverb' },
]

export const vocabByUnit = (unitId: string): VocabCard[] =>
  VOCAB.filter((c) => c.unit === unitId)

export const cardById = (id: string): VocabCard | undefined =>
  VOCAB.find((c) => c.id === id)
