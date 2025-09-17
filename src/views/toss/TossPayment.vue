<template>
  <div class="payment-container">
    <h1>Toss Payments 결제 테스트</h1>
    <button class="button" @click="requestPayment">결제하기</button>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

let tossPayments = null
let payment = null

onMounted(() => {
  // TossPayments SDK 로드 확인
  if (window.TossPayments) {
    // 사업자가 Toss Payments에서 발급받는 공개 키입니다. 프론트엔드에서 사용하며 노출되어도 안전합니다.
    const clientKey = "test_ck_jExPeJWYVQxODXenMQ5j349R5gvN"

    // - 형식: 영문, 숫자, 특수문자(-_=.,) 허용, 최대 100자
    // - 회원 결제: 각 회원마다 고유한 ID (예: 회원번호, UUID)
    // - 비회원 결제: TossPayments.ANONYMOUS 사용
    // "고객을 식별하는 고유 ID"로, 사업자가 직접 생성하고 관리하는 값입니다.
    const customerKey = "Tl3zUowJA7eW-qdFFQ2a_"
    
    tossPayments = window.TossPayments(clientKey)
    payment = tossPayments.payment({ customerKey }) // 결제 창 인스턴스 생성
  } else {
    console.error('TossPayments SDK가 로드되지 않았습니다.')
  }
})

async function requestPayment() {
  if (!payment) {
    alert('결제 시스템이 준비되지 않았습니다.')
    return
  }

  try {
    await payment.requestPayment({
      method: "CARD",
      amount: {
        currency: "KRW",
        value: 100,
      },
    // orderId: 주문(결제) 식별 값
    // - 결제할 때마다 새로 생성하는 고유 값
    // - 예: "ORD_2024_0001_a8f3d2"
    // - DB에 저장하는 것은 이 값
    orderId: "XfnYLuUYTJZ542bPrQ7Do12",
      orderName: "토스 티셔츠 외 2건",
      successUrl: window.location.origin + "/success",
      failUrl: window.location.origin + "/fail",
      customerEmail: "customer123@gmail.com",
      customerName: "김토스",
      customerMobilePhone: "01012341234",
      card: {
        useEscrow: false,
        flowMode: "DEFAULT",
        useCardPoint: false,
        useAppCardOnly: false,
      },
    })
  } catch (error) {
    console.error('결제 요청 실패:', error)
    alert('결제 요청 중 오류가 발생했습니다.')
  }
}
</script>

<style scoped>
.payment-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 30px;
  color: #333;
}

.button {
  background-color: #0064ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button:hover {
  background-color: #0051cc;
}

.button:active {
  background-color: #0043a8;
}
</style>