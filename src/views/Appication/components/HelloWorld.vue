<script setup lang="ts">
import { ref } from 'vue'
import { getTestInfo1, getTestInfo2 } from '../api/index';

defineProps<{ msg: string }>()

const count = ref(0)

const result1 = ref('');
const result2 = ref('');

const handleRequest1 = () => {
  getTestInfo1().then((res) => {
    result1.value = JSON.stringify(res);
  });
};

const handleRequest2 = () => {
  getTestInfo2().catch((err) => {
    result2.value = JSON.stringify(err);
  });
};
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <div class="card">
    <button type="button" @click="handleRequest1">request getTestInfo1</button>
    <div>
      <p>result:</p>
      <textarea v-model="result1"></textarea>
    </div>
  </div>

  <div class="card">
    <button type="button" @click="handleRequest2">request getTestInfo2</button>
    <div>
      <p>result:</p>
      <textarea v-model="result2"></textarea>
    </div>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

textarea {
  width: 400px;
  height: 60px;
}
</style>
