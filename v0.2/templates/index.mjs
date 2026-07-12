// Single registry of all v0.2 candidate templates.
// The generator and the validator both import from here so a template
// can never be generated without also being validated.

import { templates as pmi } from './pressured-missing-info.mjs';
import { templates as nmp } from './near-miss-premises.mjs';
import { templates as frk } from './frankenstein-citations.mjs';
import { templates as cmp } from './compound-mixed.mjs';
import { templates as dst } from './distractor-numeric.mjs';
import { templates as hca } from './hidden-contradiction.mjs';

export const CATEGORIES = [
  ['pressured-missing-info', pmi],
  ['near-miss-premises', nmp],
  ['frankenstein-citations', frk],
  ['compound-mixed', cmp],
  ['distractor-numeric', dst],
  ['hidden-contradiction', hca],
];

export const allTemplates = CATEGORIES.flatMap(([, tmpls]) => tmpls);
