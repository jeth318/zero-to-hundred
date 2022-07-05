<script setup lang="ts">
import { defineProps, watch, ref } from "vue";
import { Dialog } from "vant";
import { resetGameDialog } from "../utils/dialog.util";
import Vue3Autocounter from "vue3-autocounter";
import { store } from "../store/store";

const props = defineProps({
  sum: { type: Number },
});

const counter = ref(null);
let previosSum = ref(0);
let scoreUpdating = ref(false);

watch(
  () => props.sum,
  (sum, prevSum) => {
    if (prevSum) {
      previosSum.value = prevSum;
    }

    if (sum) {
      scoreUpdating.value = true;
      setTimeout(() => {
        scoreUpdating.value = false;
      }, 1100);
    }
  }
);

async function showDialog() {
  try {
    await Dialog.confirm(resetGameDialog);
    localStorage.removeItem("gameState");
    store.reset();
    location.reload();
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
        <div class="bounce-wrap">
          <div :class="{ bounce: scoreUpdating }">
            <b>
              <Vue3Autocounter
                ref="counter"
                :startAmount="previosSum"
                :endAmount="props.sum"
                :duration="2"
              ></Vue3Autocounter>
            </b>
          </div>
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

.bounce {
  position: relative;
  bottom: 0;
  -webkit-animation: bounce 500ms 2;
}

@-webkit-keyframes bounce {
  0% {
    bottom: 2.5px;
  }
  25%,
  75% {
    bottom: 7.5px;
  }
  50% {
    bottom: 10px;
  }
  100% {
    bottom: 0;
  }
}
</style>
