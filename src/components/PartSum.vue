<script setup lang="ts">
import { ComputedRef, computed, watch, defineEmits } from "vue";
import { Question } from "../utils/score-board-util";
const props = defineProps({
  partSum: { type: Number },
});

const calculateScore = (question: Question): number => {
  const { guess, facit } = question;
  // eslint-disable-next-line no-console

  if (!guess || !facit) {
    return 0;
  }
  return guess === facit ? -10 : Math.abs(facit - guess);
};
</script>

<template>
  <div class="part-sum-wrapper">
    <div class="part-sum-text">
      Delsumma:
      <strong>{{ props.partSum }}</strong>
    </div>
    <div class="part-sum-value"></div>
  </div>
</template>
<style scoped lang="css">
.part-sum-wrapper {
  background-color: #e2deff;
  font-size: 1.2rem;
  padding: 10px;
  border-radius: 5px;
}
</style>
