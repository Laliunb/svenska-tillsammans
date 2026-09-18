// Short grammar lessons for absolute beginners. Each lesson is a few bite-sized
// "points" (title + explanation + examples) followed by a tiny multiple-choice
// quiz. Kept intentionally small — the research favours tiny, high-ability
// sessions (Fogg B=MAP) over long ones.

export interface Example {
  sv: string
  en: string
}

export interface LessonPoint {
  heading: string
  body: string
  examples: Example[]
}

export interface QuizQuestion {
  prompt: string
  choices: string[]
  answerIndex: number
  explain: string
}

import type { IconName } from '../components/Icon'

export interface Lesson {
  id: string
  title: string
  icon: IconName
  summary: string
  minutes: number
  points: LessonPoint[]
  quiz: QuizQuestion[]
}

export const LESSONS: Lesson[] = [
  {
    id: 'en-ett',
    title: 'en & ett — the two genders',
    icon: 'scale',
    summary: 'Every Swedish noun is either an "en" word or an "ett" word.',
    minutes: 3,
    points: [
      {
        heading: 'Two words for "a / an"',
        body: 'Swedish nouns come in two genders. About 75% are "en" words; the rest are "ett" words. There is no perfect rule — you learn the gender together with the noun, which is why our flashcards tag it for you.',
        examples: [
          { sv: 'en bil', en: 'a car' },
          { sv: 'ett hus', en: 'a house' },
          { sv: 'en kvinna', en: 'a woman' },
          { sv: 'ett barn', en: 'a child' },
        ],
      },
      {
        heading: '"The" is stuck on the end',
        body: 'To say "the", you don’t add a word in front — you add an ending. "en" words take -en, "ett" words take -et.',
        examples: [
          { sv: 'bil → bilen', en: 'car → the car' },
          { sv: 'hus → huset', en: 'house → the house' },
        ],
      },
    ],
    quiz: [
      {
        prompt: 'Which is correct for "a house"?',
        choices: ['en hus', 'ett hus'],
        answerIndex: 1,
        explain: '"hus" is an ett-word: ett hus.',
      },
      {
        prompt: 'How do you say "the car" (bil)?',
        choices: ['bilen', 'bilet', 'den bil'],
        answerIndex: 0,
        explain: '"bil" is an en-word, so "the car" is bilen.',
      },
    ],
  },
  {
    id: 'verbs-present',
    title: 'Verbs are easy in the present',
    icon: 'sparkle',
    summary: 'One verb form for everybody — no "I am / he is" changes.',
    minutes: 3,
    points: [
      {
        heading: 'The verb never changes by person',
        body: 'Unlike English ("I speak / she speaks"), the Swedish present-tense verb is the same for jag, du, han, hon, vi, ni, de. Learn one form and you can use it with everyone.',
        examples: [
          { sv: 'jag talar', en: 'I speak' },
          { sv: 'du talar', en: 'you speak' },
          { sv: 'hon talar', en: 'she speaks' },
          { sv: 'vi talar', en: 'we speak' },
        ],
      },
      {
        heading: 'To be = är, to have = har',
        body: 'The two most common verbs are irregular but still have just one form each in the present.',
        examples: [
          { sv: 'jag är trött', en: 'I am tired' },
          { sv: 'de är hemma', en: 'they are home' },
          { sv: 'vi har en hund', en: 'we have a dog' },
        ],
      },
    ],
    quiz: [
      {
        prompt: 'Choose the correct form: "She speaks Swedish."',
        choices: ['Hon talar svenska.', 'Hon talars svenska.', 'Hon tala svenska.'],
        answerIndex: 0,
        explain: 'The present form "talar" is used for every person — no extra -s.',
      },
      {
        prompt: '"We are home."',
        choices: ['Vi är hemma.', 'Vi äro hemma.', 'Vi har hemma.'],
        answerIndex: 0,
        explain: '"är" is the present of "att vara" (to be) for everyone.',
      },
    ],
  },
  {
    id: 'word-order',
    title: 'The verb likes second place',
    icon: 'medal',
    summary: 'In a statement, the verb is almost always the 2nd idea.',
    minutes: 4,
    points: [
      {
        heading: 'Verb-second (V2)',
        body: 'In a normal statement the main verb comes in the second position. If you start with something else (like a time word), the subject jumps to after the verb.',
        examples: [
          { sv: 'Jag dricker kaffe på morgonen.', en: 'I drink coffee in the morning.' },
          { sv: 'På morgonen dricker jag kaffe.', en: 'In the morning I drink coffee.' },
        ],
      },
      {
        heading: 'Yes/no questions flip it',
        body: 'To ask a yes/no question, put the verb first.',
        examples: [
          { sv: 'Du talar svenska.', en: 'You speak Swedish.' },
          { sv: 'Talar du svenska?', en: 'Do you speak Swedish?' },
        ],
      },
    ],
    quiz: [
      {
        prompt: 'Reorder: "Imorgon ___ vi till Stockholm." (we travel)',
        choices: ['reser', 'vi reser', 'reser vi'],
        answerIndex: 0,
        explain: 'Starting with "Imorgon", the verb "reser" must be 2nd, then the subject: Imorgon reser vi…',
      },
      {
        prompt: 'Make it a question: "Ni bor här."',
        choices: ['Bor ni här?', 'Ni bor här?', 'Här ni bor?'],
        answerIndex: 0,
        explain: 'Yes/no questions put the verb first: Bor ni här?',
      },
    ],
  },
  {
    id: 'negation',
    title: 'Saying "not" with inte',
    icon: 'ban',
    summary: 'Put "inte" right after the verb.',
    minutes: 2,
    points: [
      {
        heading: 'inte comes after the verb',
        body: 'To make a sentence negative, drop "inte" in just after the main verb.',
        examples: [
          { sv: 'Jag förstår inte.', en: 'I do not understand.' },
          { sv: 'Vi bor inte i Malmö.', en: 'We do not live in Malmö.' },
          { sv: 'Hon dricker inte kaffe.', en: 'She does not drink coffee.' },
        ],
      },
    ],
    quiz: [
      {
        prompt: '"I do not know." (jag vet = I know)',
        choices: ['Jag inte vet.', 'Jag vet inte.', 'Inte jag vet.'],
        answerIndex: 1,
        explain: '"inte" goes right after the verb: Jag vet inte.',
      },
    ],
  },
]

export const lessonById = (id: string): Lesson | undefined =>
  LESSONS.find((l) => l.id === id)
