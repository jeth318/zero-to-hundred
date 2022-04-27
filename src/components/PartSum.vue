<script setup lang="ts">
import { computed, ComputedRef, watch, ref } from "vue";
import { Question } from "../utils/score-board-util";
const props = defineProps({
  section: { type: Object, default: {} },
});

let previousSectionSum = ref(0);

const sectionSum: ComputedRef<number> = computed((): number => {
  return props.section.reduce((a: any, b: Question) => a + b.points, 0);
});

watch(
  () => sectionSum.value,
  (sectionSum, pSectionSum) => {
    previousSectionSum.value = pSectionSum;
  }
);
</script>

<template>
  <div class="part-sum-wrapper">
    <div class="part-sum-text">
      Delsumma:
      <strong>
        <Vue3Autocounter
          ref="counter"
          :startAmount="previousSectionSum"
          :endAmount="sectionSum"
          :duration="1"
        ></Vue3Autocounter>
      </strong>
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
