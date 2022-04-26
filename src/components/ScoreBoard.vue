<script setup lang="ts">
import { onMounted, computed, ComputedRef } from "vue";
import { store } from "../store/store";
import { Dialog } from "vant";
import { defaultScoreBoard, Question } from "../utils/score-board-util";
import { resetGameDialog } from "../utils/dialog.util";
import QuestionItem from "./QuestionItem.vue";
import GameHeader from "./GameHeader.vue";

function calculateScore(question: Question) {
  const { guess, facit } = question;

  if (!guess || !facit) {
    return 0;
  }
  return guess === facit ? -10 : Math.abs(facit - guess);
}

// lifecycle hooks
onMounted(() => {
  const gameState = localStorage.getItem("gameState");
  if (gameState) {
    store.game = JSON.parse(gameState);
  }
});

// methods
function onInputChanged(internalGuess: number, internalFacit: number) {
  console.log("input changed");
  console.log({ internalGuess, internalFacit });
}

const getPartSum = (sectionId: String) => {
  if (sectionId === "s1") {
    return s1Sum;
  }
  if (sectionId === "s2") {
    return s2Sum;
  }
  if (sectionId === "s3") {
    return s3Sum;
  }
};
// computed
const s1Sum: ComputedRef<number> = computed((): number => {
  if (!store.game.s1) {
    return 0;
  }
  return store.game.s1.map(calculateScore).reduce((a, b) => a + b);
});

const s2Sum: ComputedRef<number> = computed((): number => {
  if (!store.game.s2) {
    return 0;
  }
  return store.game.s2.map(calculateScore).reduce((a, b) => a + b);
});

const s3Sum: ComputedRef<number> = computed((): number => {
  if (!store.game.s3) {
    return 0;
  }
  return store.game.s3.map(calculateScore).reduce((a, b) => a + b);
});

const sum: ComputedRef<number> = computed((): number => {
  return s1Sum.value + s2Sum.value + s3Sum.value;
});
</script>

<template>
  <div>
    <GameHeader :sum="sum"></GameHeader>
    <div class="game-wrapper">
      <div v-for="(section, si) in store.game">
        <div class="score-facit-section">
          <div
            v-for="(question, qi) in section"
            :key="qi"
            class="guess-facit-pair"
          >
            <QuestionItem
              :sectionIndex="si"
              :index="qi"
              :question="question"
              :onInputChanged="onInputChanged"
            ></QuestionItem>
          </div>
          <div class="part-sum-wrapper">
            <div class="part-sum-text">
              Delsumma:
              <strong>{{ getPartSum(si) }}</strong>
            </div>
            <div class="part-sum-value"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.van-cell {
  padding-left: 0;
}

.van-cell-group {
  width: 50%;
}
.input-pair-wrapper {
  display: flex;
}
.game-wrapper {
  width: 100%;
}
.score-facit-section {
  display: flex;
  flex-direction: column;
}

.guess-facit-pair {
  display: flex;
  flex-direction: row;
  background-color: white;
  padding-left: 5px;
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
  width: 20px;
  margin-right: 10px;
  font-weight: 100;
}
</style>
