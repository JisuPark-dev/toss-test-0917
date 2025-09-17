import TossPayment from './toss-payment.js';

// API 키 설정 (실제 사용시 환경변수나 별도 설정 파일에서 관리하세요)
const API_KEY = 'test_ck_jExPeJWYVQxODXenMQ5j349R5gvN';

const tossPayment = new TossPayment(API_KEY);

// 사용 예제
async function runExample() {
  try {
    // 1. 결제 승인 예제
    console.log('=== 결제 승인 ===');
    const confirmResult = await tossPayment.confirmPayment(
      'PAYMENT_KEY_HERE',
      'XfnYLuUYTJZ542bPrQ7Do',
      15000
    );
    console.log('결제 승인 성공:', confirmResult);

    // 2. 결제 조회 예제
    console.log('\n=== 결제 조회 ===');
    const paymentInfo = await tossPayment.getPayment('PAYMENT_KEY_HERE');
    console.log('결제 정보:', paymentInfo);

    // 3. 결제 취소 예제
    console.log('\n=== 결제 취소 ===');
    const cancelResult = await tossPayment.cancelPayment('PAYMENT_KEY_HERE', {
      cancelReason: '고객 요청으로 취소',
      cancelAmount: 5000  // 부분 취소 금액 (전체 취소시 생략 가능)
    });
    console.log('결제 취소 성공:', cancelResult);

  } catch (error) {
    console.error('오류 발생:', error.message);
  }
}

// 예제 실행
runExample();