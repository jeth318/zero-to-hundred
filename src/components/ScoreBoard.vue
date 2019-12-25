/* eslint-disable no-console */
<template>
  <md-content class="game-wrapper">
    <md-card class="card score-diff-section">
      <div v-for="(question, i) in game.partOne" :key="i" class="guess-diff-pair">
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
          <label>Diff</label>
          <md-input
            class="input-box"
            v-model="question.diff"
            @blur="onInputChanged"
            pattern="[0-9]*"
            min="0"
            max="100"
          ></md-input>
        </md-field>
      </div>
      <div class="part-sum-wrapper">
        <div class="part-sum-text">Delsumma: <strong>{{ partOneSum }}</strong></div>
        <div class="part-sum-value"></div>
      </div>
    </md-card>
    <md-card class="card score-diff-section">
      <div v-for="(question, i) in game.partTwo" :key="i" class="guess-diff-pair">
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
          <label>Diff</label>
          <md-input
            v-model="question.diff"
            @blur="onInputChanged"
            pattern="[0-9]*"
            min="0"
            max="100"
          ></md-input>
        </md-field>
      </div>
      <div class="part-sum-wrapper">
        <div class="part-sum-text">Delsumma: <strong>{{ partTwoSum }}</strong></div>
      </div>
    </md-card>

    <md-card class="card score-diff-section">
      <div v-for="(question, i) in game.partThree" :key="i" class="guess-diff-pair">
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
          <label>Diff</label>
          <md-input
            v-model="question.diff"
            @blur="onInputChanged"
            pattern="[0-9]*"
            min="0"
            max="100"
          ></md-input>
        </md-field>
      </div>
      <div class="part-sum-wrapper">
        <div class="part-sum-text">Delsumma: <strong>{{ partThreeSum }}</strong></div>
      </div>
    </md-card>

    <div class="total-sum-wrapper">
      <div class="total-sum-text">
        <strong>Totalsumma</strong>
      </div>
      <div class="total-sum-value">
        <span  class="md-display-1 white">{{ sum }}</span>
      </div>
    </div>
    <md-button class="md-raised md-primary" @click="onResetClicked">Börja om</md-button>
  </md-content>
</template>

<script>
export default {
  mounted() {
    this.defaultGameState = this.game;
    const gameState = localStorage.getItem("gameState");
    if (gameState) {
      this.game = JSON.parse(gameState);
    }
  },
  data: () => ({
    game: {
      partOne: [
        { index: 1, guess: null, diff: null },
        { index: 2, guess: null, diff: null },
        { index: 3, guess: null, diff: null },
        { index: 4, guess: null, diff: null },
        { index: 5, guess: null, diff: null },
        { index: 6, guess: null, diff: null },
        { index: 7, guess: null, diff: null }
      ],
      partTwo: [
        { index: 8, guess: null, diff: null },
        { index: 9, guess: null, diff: null },
        { index: 10, guess: null, diff: null },
        { index: 11, guess: null, diff: null },
        { index: 12, guess: null, diff: null },
        { index: 13, guess: null, diff: null },
        { index: 14, guess: null, diff: null }
      ],
      partThree: [
        { index: 15, guess: null, diff: null },
        { index: 16, guess: null, diff: null },
        { index: 17, guess: null, diff: null },
        { index: 18, guess: null, diff: null },
        { index: 19, guess: null, diff: null },
        { index: 20, guess: null, diff: null },
        { index: 21, guess: null, diff: null }
      ]
    }
  }),
  methods: {
    onInputChanged() {
      const gameStateString = JSON.stringify(this.game);
      localStorage.setItem("gameState", gameStateString);
    },
    onResetClicked() {
      this.game = JSON.parse(JSON.stringify(this.defaultGameState));
      localStorage.removeItem("gameState");
    }
  },
  computed: {
    partOneSum() {
      if (!this.game.partOne) {
        return 0;
      }
      return this.game.partOne
        .map(q => (q.diff ? parseInt(q.diff) : 0))
        .reduce((a, b) => parseInt(a) + parseInt(b));
    },
    partTwoSum() {
      if (!this.game.partTwo) {
        return 0;
      }

      return this.game.partTwo
        .map(q => (q.diff ? parseInt(q.diff) : 0))
        .reduce((a, b) => parseInt(a) + parseInt(b));
    },
    partThreeSum() {
      if (!this.game.partThree) {
        return 0;
      }
      return this.game.partThree
        .map(q => (q.diff ? parseInt(q.diff) : 0))
        .reduce((a, b) => parseInt(a) + parseInt(b));
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
.score-diff-section {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 100vw;
  margin-bottom: 15px;
}

.guess-diff-pair {
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
</style>