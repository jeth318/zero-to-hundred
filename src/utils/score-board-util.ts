export interface ScoreBoard {
  s1: Question[];
  s2: Question[];
  s3: Question[];
}

export interface Question {
  id: string,
  guess: number | undefined
  facit: number | undefined
  points: number
}

export const defaultScoreBoard: ScoreBoard = {
  s1: [
      { id: 's1q1', guess: undefined, facit: undefined, points: 0 },
      { id: 's1q2', guess: undefined, facit: undefined, points: 0 },
      { id: 's1q3', guess: undefined, facit: undefined, points: 0 },
      { id: 's1q4', guess: undefined, facit: undefined, points: 0 },
      { id: 's1q5', guess: undefined, facit: undefined, points: 0 },
      { id: 's1q6', guess: undefined, facit: undefined, points: 0 },
      { id: 's1q7', guess: undefined, facit: undefined, points: 0 },
  ],
  s2: [
      { id: 's2q1', guess: undefined, facit: undefined, points: 0 },
      { id: 's2q2', guess: undefined, facit: undefined, points: 0 },
      { id: 's2q3', guess: undefined, facit: undefined, points: 0 },
      { id: 's2q4', guess: undefined, facit: undefined, points: 0 },
      { id: 's2q5', guess: undefined, facit: undefined, points: 0 },
      { id: 's2q6', guess: undefined, facit: undefined, points: 0 },
      { id: 's2q7', guess: undefined, facit: undefined, points: 0 },
  ],
  s3: [
      { id: 's3q1', guess: undefined, facit: undefined, points: 0 },
      { id: 's3q2', guess: undefined, facit: undefined, points: 0 },
      { id: 's3q3', guess: undefined, facit: undefined, points: 0 },
      { id: 's3q4', guess: undefined, facit: undefined, points: 0 },
      { id: 's3q5', guess: undefined, facit: undefined, points: 0 },
      { id: 's3q6', guess: undefined, facit: undefined, points: 0 },
      { id: 's3q7', guess: undefined, facit: undefined, points: 0 },
  ],
}
