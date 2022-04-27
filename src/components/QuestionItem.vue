<script setup lang="ts">
import { ComputedRef, computed, ref, onUpdated } from "vue";
import { store } from "../store/store";
import { Question } from "../utils/score-board-util";

const props = defineProps({
  sectionIndex: { type: String },
  index: { type: Number, default: null },
  question: { type: Object },
  onInputChanged: { type: Function },
});

const internalGuess = ref();
const internalFacit = ref();

onUpdated(() => {
  if (internalGuess.value != props.question?.guess) {
    internalGuess.value = props.question?.guess;
  }
  if (internalFacit.value !== props.question?.facit) {
    internalFacit.value = props.question?.facit;
  }
});

const onInputChanged = () => {
  const question: Question = {
    id: props.question?.id,
    guess: internalGuess.value,
    facit: internalFacit.value,
    points: calculatedPoints.value,
  };

  switch (props.sectionIndex) {
    case "s1":
      store.game.s1[props.index] = question;
      break;
    case "s2":
      store.game.s2[props.index] = question;
      break;
    case "s3":
      store.game.s3[props.index] = question;
      break;
    default:
      break;
  }
  const gameStateString = JSON.stringify(store.game);
  localStorage.setItem("gameState", gameStateString);
};

// computed
const questionNumber: ComputedRef<number> = computed((): number => {
  const { sectionIndex, index } = props;
  switch (sectionIndex) {
    case "s1":
      return index + 1;
    case "s2":
      return index + 1 + 7;
    case "s3":
      return index + 1 + 14;
    default:
      return 0;
  }
});

const calculatedPoints: ComputedRef<number> = computed((): number => {
  if (!internalGuess.value || !internalFacit.value) {
    return 0;
  }
  return internalGuess.value === internalFacit.value
    ? -10
    : Math.abs(internalFacit.value - internalGuess.value);
});

const isValidGuess: ComputedRef<boolean> = computed((): boolean => {
  return props.question?.guess === undefined || props.question?.guess <= 100;
});
</script>

<template>
  <div class="question-number">
    <small
      ><i>{{ questionNumber }}.</i></small
    >
  </div>
  <div class="input-pair-wrapper">
    <VanCellGroup>
      <VanField
        clearable
        :error="!isValidGuess"
        placeholder="Gissning"
        v-model="internalGuess"
        @blur="onInputChanged"
        type="digit"
        maxlength="3"
      ></VanField>
    </VanCellGroup>
    <VanCellGroup>
      <VanField
        clearable
        class="input-box"
        placeholder="Facit"
        v-model="internalFacit"
        @blur="onInputChanged"
        type="digit"
      ></VanField>
    </VanCellGroup>
  </div>
</template>
<style>
.question-number {
  font-size: 18px;
}
.VanCellGroup {
  flex: 50%;
}
.van-cell {
  padding-left: 0;
  font-size: 18px;
}

.van-field__body {
  min-height: 50px;
}
.input-pair-wrapper {
  display: flex;
  width: 100%;
}
</style>
