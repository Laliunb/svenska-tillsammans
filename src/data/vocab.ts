// Beginner (CEFR A1) Swedish vocabulary, ordered roughly by frequency and
// grouped into themed units. Each card carries a real example sentence so words
// are learned in context (comprehensible input) rather than in isolation.
//
// Content is original/common-knowledge beginner material. Example sentences are
// simple and hand-written to stay at A1 level. When we later import Tatoeba
// (CC-BY) sentences, attribution belongs in CREDITS.md.

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
  /** Optional literal note, e.g. gender article or pronunciation hint. */
  note?: string
}

export interface Unit {
  id: string
  title: string
  titleSv: string
  emoji: string
  blurb: string
}

export const UNITS: Unit[] = [
  { id: 'greetings', title: 'Greetings & basics', titleSv: 'Hälsningar', emoji: '👋', blurb: 'The first words you need to be friendly.' },
  { id: 'people', title: 'People & family', titleSv: 'Människor & familj', emoji: '👪', blurb: 'Talk about who is in your life.' },
  { id: 'verbs', title: 'Everyday verbs', titleSv: 'Vardagsverb', emoji: '🏃', blurb: 'The actions you use every single day.' },
  { id: 'food', title: 'Food & drink', titleSv: 'Mat & dryck', emoji: '🍽️', blurb: 'Order, cook, and shop in Swedish.' },
  { id: 'numbers', title: 'Numbers & time', titleSv: 'Tal & tid', emoji: '🕐', blurb: 'Count, tell the time, and make plans.' },
  { id: 'everyday', title: 'Everyday words', titleSv: 'Vardagsord', emoji: '🏠', blurb: 'Small words that hold sentences together.' },
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

  // ── Numbers & time ────────────────────────────────────────────────
  { id: 'n1', sv: 'en', en: 'one', exampleSv: 'Jag vill ha en kopp te.', exampleEn: 'I want one cup of tea.', unit: 'numbers', pos: 'number' },
  { id: 'n2', sv: 'två', en: 'two', exampleSv: 'Vi är två personer.', exampleEn: 'We are two people.', unit: 'numbers', pos: 'number' },
  { id: 'n3', sv: 'tre', en: 'three', exampleSv: 'Klockan är tre.', exampleEn: 'It is three o’clock.', unit: 'numbers', pos: 'number' },
  { id: 'n4', sv: 'fyra', en: 'four', exampleSv: 'Vi har fyra stolar.', exampleEn: 'We have four chairs.', unit: 'numbers', pos: 'number' },
  { id: 'n5', sv: 'fem', en: 'five', exampleSv: 'Fem minuter kvar.', exampleEn: 'Five minutes left.', unit: 'numbers', pos: 'number' },
  { id: 'n6', sv: 'tio', en: 'ten', exampleSv: 'Jag räknar till tio.', exampleEn: 'I count to ten.', unit: 'numbers', pos: 'number' },
  { id: 'n7', sv: 'idag', en: 'today', exampleSv: 'Idag är det soligt.', exampleEn: 'Today it is sunny.', unit: 'numbers', pos: 'adverb' },
  { id: 'n8', sv: 'imorgon', en: 'tomorrow', exampleSv: 'Vi ses imorgon.', exampleEn: 'See you tomorrow.', unit: 'numbers', pos: 'adverb' },
  { id: 'n9', sv: 'nu', en: 'now', exampleSv: 'Vi måste gå nu.', exampleEn: 'We have to go now.', unit: 'numbers', pos: 'adverb' },
  { id: 'n10', sv: 'en dag', en: 'a day', exampleSv: 'Ha en fin dag!', exampleEn: 'Have a nice day!', unit: 'numbers', pos: 'noun', note: 'en-word' },
  { id: 'n11', sv: 'vad är klockan?', en: 'what time is it?', exampleSv: 'Ursäkta, vad är klockan?', exampleEn: 'Excuse me, what time is it?', unit: 'numbers', pos: 'phrase' },
  { id: 'n12', sv: 'en vecka', en: 'a week', exampleSv: 'Vi reser om en vecka.', exampleEn: 'We travel in one week.', unit: 'numbers', pos: 'noun', note: 'en-word' },

  // ── Everyday words ────────────────────────────────────────────────
  { id: 'e1', sv: 'och', en: 'and', exampleSv: 'Jag och du.', exampleEn: 'You and I.', unit: 'everyday', pos: 'adverb' },
  { id: 'e2', sv: 'men', en: 'but', exampleSv: 'Det är kallt men soligt.', exampleEn: 'It is cold but sunny.', unit: 'everyday', pos: 'adverb' },
  { id: 'e3', sv: 'inte', en: 'not', exampleSv: 'Jag vet inte.', exampleEn: 'I do not know.', unit: 'everyday', pos: 'adverb' },
  { id: 'e4', sv: 'här', en: 'here', exampleSv: 'Kom hit, jag är här.', exampleEn: 'Come here, I am here.', unit: 'everyday', pos: 'adverb' },
  { id: 'e5', sv: 'där', en: 'there', exampleSv: 'Boken ligger där.', exampleEn: 'The book is over there.', unit: 'everyday', pos: 'adverb' },
  { id: 'e6', sv: 'stor', en: 'big', exampleSv: 'Vi bor i en stor stad.', exampleEn: 'We live in a big city.', unit: 'everyday', pos: 'adjective' },
  { id: 'e7', sv: 'liten', en: 'small', exampleSv: 'Vi har en liten lägenhet.', exampleEn: 'We have a small apartment.', unit: 'everyday', pos: 'adjective' },
  { id: 'e8', sv: 'ett hus', en: 'a house', exampleSv: 'Huset är gult.', exampleEn: 'The house is yellow.', unit: 'everyday', pos: 'noun', note: 'ett-word' },
  { id: 'e9', sv: 'en bil', en: 'a car', exampleSv: 'Bilen är röd.', exampleEn: 'The car is red.', unit: 'everyday', pos: 'noun', note: 'en-word' },
  { id: 'e10', sv: 'fin', en: 'nice / pretty', exampleSv: 'Vilken fin dag!', exampleEn: 'What a nice day!', unit: 'everyday', pos: 'adjective' },
  { id: 'e11', sv: 'tillsammans', en: 'together', exampleSv: 'Vi lär oss svenska tillsammans.', exampleEn: 'We are learning Swedish together.', unit: 'everyday', pos: 'adverb' },
  { id: 'e12', sv: 'mycket', en: 'a lot / very', exampleSv: 'Jag gillar dig mycket.', exampleEn: 'I like you a lot.', unit: 'everyday', pos: 'adverb' },
]

export const vocabByUnit = (unitId: string): VocabCard[] =>
  VOCAB.filter((c) => c.unit === unitId)

export const cardById = (id: string): VocabCard | undefined =>
  VOCAB.find((c) => c.id === id)
