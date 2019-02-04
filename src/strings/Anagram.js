/**
 * Anagram
 * Write a function that takes two words as an argument and returns true if they are
 * anagrams (contain the exact same letters) and false otherwise.
 */

// eslint-disable-next-line import/no-unresolved
import Logger from '#/Logger/WinstonChalkLogger';

export function isAnagramComplex(word1, word2) {
  if (word1.length !== word2.length) {
    return false;
  }
  const keysWord1 = word1.split('');
  const keysWord2 = word2.split('').reduce((accumulator, letter) => {
    if (accumulator[letter]) {
      accumulator[letter] += 1;
    } else {
      accumulator[letter] = 1;
    }
    return accumulator;
  }, {});

  const reducedWord = keysWord1.reduce((accumulator, currentValue) => {
    if (accumulator[currentValue] !== undefined) {
      accumulator[currentValue] -= 1;
      if (accumulator[currentValue] <= 0) {
        const { [currentValue]: omit, ...rest } = accumulator;
        return rest;
      }
    }
    return accumulator;
  }, keysWord2);
  return Object.keys(reducedWord).length === 0;
}

export function isAnagramSimple(word1, word2) {
  if (word1.length !== word2.length) {
    return false;
  }
  const word1Sorted = word1
    .split('')
    .sort()
    .join('');
  const word2Sorted = word2
    .split('')
    .sort()
    .join('');
  return word1Sorted === word2Sorted;
}

export default function runExamples() {
  // :/ https://github.com/winstonjs/winston/issues/1427
  Logger.info('Is anagram?: ', { result: isAnagramComplex('lagerregal', 'regallager') });
  Logger.info('Is anagram?: ', { result: isAnagramSimple('lagerregal', 'regallager') });

  Logger.info('Is anagram?: ', { result: isAnagramComplex('eeeeeeeeer', 'eeeeereeee') });
  Logger.info('Is anagram?: ', { result: isAnagramSimple('eeeeeeeeer', 'eeeeereeee') });

  Logger.info('Is anagram?: ', { result: isAnagramComplex('aaabbbcccd', 'aaabbbccdd') });
  Logger.info('Is anagram?: ', { result: isAnagramSimple('aaabbbcccd', 'aaabbbccdd') });
}
