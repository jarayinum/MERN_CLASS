import { conceptDeck } from '../data/concepts.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listConcepts = asyncHandler((_req, res) => {
  res.json({ concepts: conceptDeck });
});

export const conceptById = asyncHandler((req, res) => {
  const match = conceptDeck.find((concept) => concept.id === req.params.id);

  if (!match) {
    res.status(404);
    throw new Error('Concept not found');
  }

  res.json({ concept: match });
});

