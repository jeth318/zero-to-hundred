import { reactive } from 'vue'
import { defaultScoreBoard } from '../utils/score-board-util'

export const store = reactive({
    game: defaultScoreBoard
})