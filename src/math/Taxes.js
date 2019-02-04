/**
 * 1. Taxes
 * Write a function that takes two arguments, an amount in dollars and a tax percentage.
 * Return an array with the tax amount in cents.
 *
 * -> we should here "why an array?????"
 */
// eslint-disable-next-line import/no-unresolved
import Logger from '#/Logger/WinstonChalkLogger';

export function doSomeTaxes(amountInDollars, taxPercentage) {
  Logger.info(amountInDollars);
  Logger.info(taxPercentage);
  return new Array(2);
}

export default function runExamples() {
  doSomeTaxes(50, 19);
}
