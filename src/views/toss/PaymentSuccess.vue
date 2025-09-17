<template>
  <div class="result-container">
    <div class="icon success">✓</div>
    <h1>결제 성공!</h1>
    <p>결제가 성공적으로 완료되었습니다.</p>
    <div class="payment-info" v-if="paymentKey">
      <p><strong>결제 키:</strong> {{ paymentKey }}</p>
      <p><strong>주문 ID:</strong> {{ orderId }}</p>
      <p><strong>금액:</strong> {{ amount }}원</p>
    </div>
    <router-link to="/toss/test" class="button">다시 결제하기</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const paymentKey = ref('')
const orderId = ref('')
const amount = ref('')

// 쿼리 파라미터의 amount 값과 결제 요청 시 보낸 amount 값이 같은지 반드시 확인하세요
// 쿼리 파라미터의 amount 값과 requestPayment()의 amount 파라미터 값이 같은지 반드시 확인하세요.
// 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다. 만약 값이 다르다면 결제를 취소하고 구매자에게 알려주세요.
// 서버에 paymentKey, amount, orderId 값을 저장하세요
// 서버에 paymentKey, amount, orderId 값을 저장하세요. paymentKey는 토스페이먼츠에서 각 주문에 발급하는 고유 키값이에요. 결제 승인, 취소, 조회 등에 사용되기 때문에 꼭 저장해주세요.

//Toss Payments 결제 프로세스:
// 1. 결제창에서 카드 정보 입력 → 결제 "인증"만 완료 (돈은 아직 안 빠짐)
// 2. 승인 API 호출 → 실제 결제 처리 (돈이 빠짐)
// 3. 승인 API 미호출 → 일정 시간 후 자동 취소
//
// 자동 취소 조건:
// - 기본적으로 30분 내에 승인 API를 호출하지 않으면 자동 취소
// - 고객에게는 결제 취소 문자 발송
// - 결제 상태가 EXPIRED로 변경
onMounted(async () => {
  // URL 쿼리 파라미터에서 결제 정보 추출
  paymentKey.value = route.query.paymentKey || ''
  orderId.value = route.query.orderId || ''
  amount.value = route.query.amount || ''

  // 결제 승인 TEST API 호출
  if (paymentKey.value && orderId.value && amount.value) {
    try {
      const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
        method: 'POST',
        headers: {
          'Authorization': 'Basic dGVzdF9za180eUtlcTViZ3JweTFNMkJiZ3BNSjhHWDBselc2Og==',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          paymentKey: paymentKey.value,
          amount: parseInt(amount.value),
          orderId: orderId.value
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        console.log('결제 승인 성공:', result)
      } else {
        console.error('결제 승인 실패:', result)
      }
    } catch (error) {
      console.error('결제 승인 API 호출 중 오류:', error)
    }
  }
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

.icon.success {
  background: #28a745;
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

.payment-info {
  background: white;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: left;
}

.payment-info p {
  margin: 10px 0;
  word-break: break-all;
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