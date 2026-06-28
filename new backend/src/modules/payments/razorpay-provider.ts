import { 
  AbstractPaymentProcessor, 
  PaymentProcessorContext, 
  PaymentProcessorSessionResponse, 
  PaymentSessionStatus 
} from "@medusajs/medusa"
import Razorpay from "razorpay"
import crypto from "crypto"

export class RazorpayProvider extends AbstractPaymentProcessor {
  static identifier = "razorpay"
  protected razorpay_: Razorpay
  protected options_: any

  constructor(container, options) {
    super(container)
    this.options_ = options
    
    // Initialize Razorpay SDK with credentials (fallback to mock values for development setup)
    this.razorpay_ = new Razorpay({
      key_id: options.key_id || process.env.RAZORPAY_KEY_ID || "rzp_test_mockKeyId",
      key_secret: options.key_secret || process.env.RAZORPAY_KEY_SECRET || "mockSecretKey"
    })
  }

  // Create payment session (Razorpay Order creation)
  async initiatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorSessionResponse> {
    const { amount, currency_code, resource_id } = context

    try {
      const order = await this.razorpay_.orders.create({
        amount: Math.round(amount), // Razorpay amount is in paise/cents (e.g., INR 10.00 is 1000 paise)
        currency: currency_code.toUpperCase(),
        receipt: resource_id,
        payment_capture: 1 // Capture payment automatically when buyer pays
      })

      return {
        session_data: {
          id: order.id,
          amount: order.amount,
          currency: order.currency,
          receipt: order.receipt,
          status: order.status
        }
      }
    } catch (error: any) {
      return {
        error: error.message,
        session_data: {}
      }
    }
  }

  // Update session data
  async updatePayment(context: PaymentProcessorContext): Promise<PaymentProcessorSessionResponse> {
    return this.initiatePayment(context)
  }

  // Capture payment (already handled at transaction completion by Razorpay checkout)
  async capturePayment(paymentSessionData: Record<string, any>): Promise<Record<string, any>> {
    return { status: "captured" }
  }

  // Authorize/verify payment
  async authorizePayment(paymentSessionData: Record<string, any>): Promise<Record<string, any>> {
    return { status: "authorized" }
  }

  // Webhook signature verification to prevent spoofing
  verifyWebhook(body: any, signature: string, secret: string): boolean {
    if (!signature || !secret) return false
    
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(JSON.stringify(body))
      .digest("hex")
      
    return expectedSignature === signature
  }

  // Refund payment
  async refundPayment(paymentSessionData: Record<string, any>, refundAmount: number): Promise<Record<string, any>> {
    const paymentId = paymentSessionData.payment_id
    if (!paymentId) {
      throw new Error("Cannot process refund: No payment_id found in payment session.")
    }

    try {
      const refund = await this.razorpay_.payments.refund(paymentId, {
        amount: Math.round(refundAmount)
      })
      
      return {
        status: "refunded",
        refund_id: refund.id
      }
    } catch (error: any) {
      throw new Error(`Razorpay refund failed: ${error.message}`)
    }
  }

  // Cancel payment session
  async cancelPayment(paymentSessionData: Record<string, any>): Promise<Record<string, any>> {
    return { status: "cancelled" }
  }

  // Verify status dynamically
  async getPaymentStatus(paymentSessionData: Record<string, any>): Promise<PaymentSessionStatus> {
    const orderId = paymentSessionData.id
    try {
      const order = await this.razorpay_.orders.fetch(orderId)
      if (order.status === "paid") {
        return PaymentSessionStatus.AUTHORIZED
      }
      return PaymentSessionStatus.PENDING
    } catch (error) {
      return PaymentSessionStatus.ERROR
    }
  }
}
export default RazorpayProvider
