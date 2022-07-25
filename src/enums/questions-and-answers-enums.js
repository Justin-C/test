/**
 * List of Questions. Question will be asked in the order they are in this array
 * QUESTION_TEXT: string - the question string to display
 * QUESTION_OPTIONS: string array - answer options, rendered as radio or checkbox
 * ANSWER_INDEX: number array - list all indexes of QUESTION_OPTIONS that are valid answers
 *      all indexes must be within range 0-QUESTION_OPTIONS.length-1
 * IS_MULTI: boolean - whether there are multiple answers or only one. TRUE if ANSWER_INDEX
 *      has length greater than one.
 */
const QUESTION_LIST = [
  {
    QUESTION_TEXT:
      'If you have 10 mangos and another person gives you 12 more, how‌ ‌many‌ ‌mangos‌ ‌will‌ ‌you‌ ‌have‌ ‌in‌ ‌total?‌',
    QUESTION_OPTIONS: ['1 mango', '2 mangos', '10 mangos', '22 mangos'],
    ANSWER_INDEX: [3],
    IS_MULTI: false
  },
  {
    QUESTION_TEXT:
      'If‌ ‌a‌ ‌train‌ ‌is‌ ‌supposed‌ ‌to‌ ‌reach‌ ‌the‌ ‌station‌ ‌at‌ ‌4:10‌ ‌am‌. but‌ ‌it‌ ‌is ‌35‌ ‌minutes‌ late,‌ ‌at‌ ‌what‌ ‌time‌ ‌will ‌the‌ ‌train‌ ‌reach‌ ‌the‌ ‌station?‌',
    QUESTION_OPTIONS: ['4:45 am', '3:00 am', '4:45 pm', '6:00 pm'],
    ANSWER_INDEX: [0],
    IS_MULTI: false
  },
  {
    QUESTION_TEXT: 'Which of these animals can fly?',
    QUESTION_OPTIONS: ['Cats', 'Bats', 'Birds', 'Worms'],
    ANSWER_INDEX: [1, 2],
    IS_MULTI: true
  },
  {
    QUESTION_TEXT: 'Which of the following is a list of colors?',
    QUESTION_OPTIONS: [
      'Dog, cat, fish',
      'Earth, Mars, Venus, Saturn, Mercury, Jupiter, Neptune, Uranus',
      'Guitar, drums, piano, harmonica, tambourine, trumpet',
      'Red, orange, yellow, green, blue, indigo, violet'
    ],
    ANSWER_INDEX: [3],
    IS_MULTI: false
  },
  {
    QUESTION_TEXT:
      'If you are reading a book and are on page 374, what will the number of the next page be?',
    QUESTION_OPTIONS: ['375', '373', '474', '400'],
    ANSWER_INDEX: [0],
    IS_MULTI: false
  }
];

export default QUESTION_LIST;
