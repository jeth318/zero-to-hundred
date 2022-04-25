interface ScoreBoard {
  s1: Question[];
  s2: Question[];
  s3: Question[];
}

export interface Question {
  guess: number | undefined
  facit: number | undefined
}

export const defaultScoreBoard: ScoreBoard = {
  s1: [
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
  ],
  s2: [
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
  ],
  s3: [
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
    { guess: undefined, facit: undefined },
  ],
};
