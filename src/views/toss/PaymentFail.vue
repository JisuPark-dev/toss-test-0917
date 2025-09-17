<template>
  <div class="result-container">
    <div class="icon fail">✕</div>
    <h1>결제 실패</h1>
    <p>결제 처리 중 문제가 발생했습니다.</p>
    <div class="error-info" v-if="errorCode || errorMessage">
      <p v-if="errorCode"><strong>오류 코드:</strong> {{ errorCode }}</p>
      <p v-if="errorMessage"><strong>오류 메시지:</strong> {{ errorMessage }}</p>
    </div>
    <router-link to="/toss/test" class="button">다시 시도하기</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const errorCode = ref('')
const errorMessage = ref('')

onMounted(() => {
  // URL 쿼리 파라미터에서 오류 정보 추출
  errorCode.value = route.query.code || ''
  errorMessage.value = route.query.message || ''
})
</script>

<style scoped>
.result-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  text-align: center;
  background: #f8f9fa;
  border-radius: 12px;
}

.icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
}

.icon.fail {
  background: #dc3545;
  color: white;
}

h1 {
  margin-bottom: 10px;
  color: #333;
}

p {
  color: #666;
  margin-bottom: 20px;
}

.error-info {
  background: #fff5f5;
  border: 1px solid #feb2b2;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: left;
}

.error-info p {
  margin: 10px 0;
  color: #c53030;
}

.button {
  display: inline-block;
  background-color: #0064ff;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.2s;
  margin-top: 20px;
}

.button:hover {
  background-color: #0051cc;
}
</style>