/* eslint-disable no-console */
<template>
  <div>
      <md-dialog-confirm
      :md-active.sync="confirmActive"
      md-title="Starta om spelet"
      md-content="Hupp! På en skala mellan 0 - 100, hur säker är du på att du verkligen vill starta om spelet?"
      md-confirm-text="Helt 100"
      md-cancel-text="Avbryt"
      @md-cancel="confirmActive = false"
      @md-confirm="onConfirm" />
    <div class="card sticky-score-header">
      <div class="top-sum-wrapper">
        <div class="md-headline">Totalsumma</div>
        <div class="md-headline white">{{ sum }}</div>
      </div>
      <div class="restart-top-wrapper">
        <md-button class="md-raised md-primary" @click="confirmActive = true">Börja om</md-button>
      </div>
    </div>

    <md-content class="game-wrapper">
      <md-card class="card score-facit-section">
        <div v-for="(question, i) in game.partOne" :key="i" class="guess-facit-pair">
          <div class="question-number">{{ question.index+'.' }}</div>
          <md-field>
            <label>Gissning</label>
            <md-input
              class="input-box"
              v-model="question.guess"
              @blur="onInputChanged"
              pattern="[0-9]*"
              min="0"
              max="100"
            ></md-input>
          </md-field>
          <md-field>
            <label>Facit</label>
            <md-input
              class="input-box"
              v-model="question.facit"
              @blur="onInputChanged"
              pattern="[0-9]*"
              min="0"
              max="100"
            ></md-input>
          </md-field>
        </div>
        <div class="part-sum-wrapper">
          <div class="part-sum-text">
            Delsumma:
            <strong>{{ partOneSum }}</strong>
          </div>
          <div class="part-sum-value"></div>
        </div>
      </md-card>
      <md-card class="card score-facit-section">
        <div v-for="(question, i) in game.partTwo" :key="i" class="guess-facit-pair">
          <div class="question-number">{{ question.index+'.' }}</div>
          <md-field>
            <label>Gissning</label>
            <md-input
              class="input-box"
              v-model="question.guess"
              @blur="onInputChanged"
              pattern="[0-9]*"
              min="0"
              max="100"
            ></md-input>
          </md-field>
          <md-field>
            <label>Facit</label>
            <md-input
              v-model="question.facit"
              @blur="onInputChanged"
              pattern="[0-9]*"
              min="0"
              max="100"
            ></md-input>
          </md-field>
        </div>
        <div class="part-sum-wrapper">
          <div class="part-sum-text">
            Delsumma:
            <strong>{{ partTwoSum }}</strong>
          </div>
        </div>
      </md-card>

      <md-card class="card score-facit-section">
        <div v-for="(question, i) in game.partThree" :key="i" class="guess-facit-pair">
          <div class="question-number">{{ question.index+'.' }}</div>
          <md-field>
            <label>Gissning</label>
            <md-input
              class="input-box"
              v-model="question.guess"
              @blur="onInputChanged"
              pattern="[0-9]*"
              min="0"
              max="100"
            ></md-input>
          </md-field>
          <md-field>
            <label>Facit</label>
            <md-input
              v-model="question.facit"
              @blur="onInputChanged"
              pattern="[0-9]*"
              min="0"
              max="100"
            ></md-input>
          </md-field>
        </div>
        <div class="part-sum-wrapper">
          <div class="part-sum-text">
            Delsumma:
            <strong>{{ partThreeSum }}</strong>
          </div>
        </div>
      </md-card>
    </md-content>
  </div>
</template>

<script>
import { isNull } from 'util';
export default {
  mounted() {
    this.defaultGameState = this.game;
    const gameState = localStorage.getItem("gameState");
    if (gameState) {
      this.game = JSON.parse(gameState);
    }
  },
  data: () => ({
    confirmActive: false,
    defaultGameState: {},
    game: {
      partOne: [
        { index: 1, guess: null, facit: null },
        { index: 2, guess: null, facit: null },
        { index: 3, guess: null, facit: null },
        { index: 4, guess: null, facit: null },
        { index: 5, guess: null, facit: null },
        { index: 6, guess: null, facit: null },
        { index: 7, guess: null, facit: null }
      ],
      partTwo: [
        { index: 8, guess: null, facit: null },
        { index: 9, guess: null, facit: null },
        { index: 10, guess: null, facit: null },
        { index: 11, guess: null, facit: null },
        { index: 12, guess: null, facit: null },
        { index: 13, guess: null, facit: null },
        { index: 14, guess: null, facit: null }
      ],
      partThree: [
        { index: 15, guess: null, facit: null },
        { index: 16, guess: null, facit: null },
        { index: 17, guess: null, facit: null },
        { index: 18, guess: null, facit: null },
        { index: 19, guess: null, facit: null },
        { index: 20, guess: null, facit: null },
        { index: 21, guess: null, facit: null }
      ]
    }
  }),
  methods: {
    onInputChanged() {
      const gameStateString = JSON.stringify(this.game);
      localStorage.setItem("gameState", gameStateString);
    },
    onConfirm() {
        this.confirmActive = false;
        this.game = JSON.parse(JSON.stringify(this.defaultGameState));
        localStorage.removeItem("gameState");
    },
    calculateScore(question) {
      const { guess, facit } = question;
      // eslint-disable-next-line no-console
      console.log(guess === null, facit);
    
      if (isNull(guess) || isNull(facit)) {
        return 0;
      }
      return guess === facit ? -10 : Math.abs(facit - guess);
    }
  },
  computed: {
    partOneSum() {
      if (!this.game.partOne) {
        return 0;
      }
      return this.game.partOne.map(this.calculateScore).reduce((a, b) => a + b);
    },
    partTwoSum() {
      if (!this.game.partTwo) {
        return 0;
      }

      return this.game.partTwo.map(this.calculateScore).reduce((a, b) => a + b);
    },
    partThreeSum() {
      if (!this.game.partThree) {
        return 0;
      }
      return this.game.partThree.map(this.calculateScore).reduce((a, b) => a + b);
    },
    sum() {
      return this.partOneSum + this.partTwoSum + this.partThreeSum;
    }
  }
};
</script>

<style>
.game-wrapper {
  background-color: #ededed !important;
  width: 100%;
  padding-bottom: 30px;
}
.score-facit-section {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100vw;
  margin-bottom: 15px;
}

.guess-facit-pair {
  display: flex;
  flex-direction: row;
}

.part-sum-wrapper {
  background-color: #e2deff;
  font-size: 1.2rem;
  padding: 10px;
  border-radius: 5px;
}
.input-box {
  width: 100%;
}
.question-number {
  align-self: flex-start;
  place-self: center;
  margin-right: 20px;
  font-weight: 100;
}

.total-sum-wrapper {
  background-color: #7244cc;
  color: white;
  font-size: 1.2rem;
  padding: 10px;
  margin-bottom: 25px;
}

.white {
  color: white !important;
}

.sticky-score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: #7244cc;
  color: white;
  position: sticky;
  padding: 5px;
  top: 0;
  z-index: 100;
  margin-bottom: 20px;
}

</style>