const axios = require('axios');

class TossPayment {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.tosspayments.com/v1';
    this.headers = {
      'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
      'Content-Type': 'application/json'
    };
  }

  // 결제 요청
  async requestPayment(paymentData) {
    try {
      const response = await axios.post(`${this.baseURL}/payments/confirm`, paymentData, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      throw new Error(`결제 요청 실패: ${error.response?.data?.message || error.message}`);
    }
  }

  // 결제 승인
  async confirmPayment(paymentKey, orderId, amount) {
    try {
      const response = await axios.post(`${this.baseURL}/payments/confirm`, {
        paymentKey,
        orderId,
        amount
      }, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      throw new Error(`결제 승인 실패: ${error.response?.data?.message || error.message}`);
    }
  }

  // 결제 조회
  async getPayment(paymentKey) {
    try {
      const response = await axios.get(`${this.baseURL}/payments/${paymentKey}`, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      throw new Error(`결제 조회 실패: ${error.response?.data?.message || error.message}`);
    }
  }

  // 결제 취소
  async cancelPayment(paymentKey, cancelData) {
    try {
      const response = await axios.post(`${this.baseURL}/payments/${paymentKey}/cancel`, cancelData, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      throw new Error(`결제 취소 실패: ${error.response?.data?.message || error.message}`);
    }
  }

  // 환불
  async refundPayment(paymentKey, refundData) {
    try {
      const response = await axios.post(`${this.baseURL}/payments/${paymentKey}/refund`, refundData, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      throw new Error(`환불 실패: ${error.response?.data?.message || error.message}`);
    }
  }
}

module.exports = TossPayment;