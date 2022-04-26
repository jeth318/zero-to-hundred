import { reactive } from 'vue'
import { defaultScoreBoard, ScoreBoard } from '../utils/score-board-util'

export const store = reactive({
    reset() {
        this.game = { ...defaultScoreBoard } 
    },
    game: {
        s1: [
            { id: 's1q1', guess: undefined, facit: undefined },
            { id: 's1q2', guess: undefined, facit: undefined },
            { id: 's1q3', guess: undefined, facit: undefined },
            { id: 's1q4', guess: undefined, facit: undefined },
            { id: 's1q5', guess: undefined, facit: undefined },
            { id: 's1q6', guess: undefined, facit: undefined },
            { id: 's1q7', guess: undefined, facit: undefined },
        ],
        s2: [
            { id: 's2q1', guess: undefined, facit: undefined },
            { id: 's2q2', guess: undefined, facit: undefined },
            { id: 's2q3', guess: undefined, facit: undefined },
            { id: 's2q4', guess: undefined, facit: undefined },
            { id: 's2q5', guess: undefined, facit: undefined },
            { id: 's2q6', guess: undefined, facit: undefined },
            { id: 's2q7', guess: undefined, facit: undefined },
        ],
        s3: [
            { id: 's3q1', guess: undefined, facit: undefined },
            { id: 's3q2', guess: undefined, facit: undefined },
            { id: 's3q3', guess: undefined, facit: undefined },
            { id: 's3q4', guess: undefined, facit: undefined },
            { id: 's3q5', guess: undefined, facit: undefined },
            { id: 's3q6', guess: undefined, facit: undefined },
            { id: 's3q7', guess: undefined, facit: undefined },
        ],
      } as ScoreBoard,
})