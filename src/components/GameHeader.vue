<script setup lang="ts">
import { defineProps, watch, onMounted, ref } from "vue";
import { Dialog } from "vant";
import { resetGameDialog } from "../utils/dialog.util";
import Vue3Autocounter from "vue3-autocounter";

const props = defineProps({
  sum: { type: Number },
});

const counter = ref(null);
let previosSum = ref(0);

watch(
  () => props.sum,
  (sum, prevSum) => {
    console.log("WATCH");
    console.log({ sum, prevSum });
    if (prevSum) {
      previosSum.value = prevSum;
    }
  }
);

const emit = defineEmits(["reset"]);

function onConfirm() {
  localStorage.removeItem("gameState");
  emit("reset");
}
async function showDialog() {
  try {
    await Dialog.confirm(resetGameDialog);
    onConfirm();
  } catch (error) {
    return null;
  }
}
</script>
<template>
  <div class="sticky-score-header">
    <div class="top-sum-wrapper">
      <div class="top-sum-inner-wrapper">
        <div>Total</div>
        <div>
          <b>
            <Vue3Autocounter
              ref="counter"
              :startAmount="previosSum"
              :endAmount="props.sum"
              :duration="1"
            ></Vue3Autocounter>
          </b>
        </div>
      </div>
    </div>
    <div class="image-wrapper">
      <img src="../assets/0-100.jpg" />
    </div>
    <div class="restart-top-wrapper">
      <VanButton type="primary" class="reset-button" @click="showDialog"
        >Börja om</VanButton
      >
    </div>
  </div>
</template>
<style scoped>
.total-sum-wrapper {
  display: flex;
  flex-direction: row;
  background-color: #7244cc;
  color: white;
  padding: 10px;
  margin-bottom: 25px;
}
.top-sum-inner-wrapper {
  display: flex;
  flex-direction: column;
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
  font-size: 22px;
  color: white;
  position: sticky;
  padding: 5px;
  top: 0;
  z-index: 100;
  box-shadow: 0px 1px 10px 4px grey;
}
.top-sum-wrapper {
  display: flex;
  flex: 30%;
}

.image-wrapper {
  flex: 30%;
}

.restart-top-wrapper {
  flex: 30%;
  text-align: right;
}

.reset-button {
  font-size: 20px;
}
img {
  height: 70px;
  border-radius: 10px;
}
</style>
