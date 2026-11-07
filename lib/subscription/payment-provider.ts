import {
  BillingCycle,
  BillingInvoice,
  PaymentMethodType,
  PaymentStatus,
  PaymentTransaction,
  PlanTier,
  UserSubscription,
} from '@/types';
import { getPlanByTier } from './plans';

export interface CheckoutSessionRequest {
  userId: string;
  tier: PlanTier;
  billingCycle: BillingCycle;
  method: PaymentMethodType;
}

export interface CheckoutSessionResponse {
  transactionId: string;
  orderId: string;
  amount: number;
  currency: '₹';
  status: PaymentStatus;
  availableMethods: PaymentMethodType[];
}

export interface PaymentProvider {
  createCheckoutSession(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse>;
  verifyPayment(transactionId: string): Promise<{
    success: boolean;
    subscription: UserSubscription;
    invoice: BillingInvoice;
  }>;
}

class RazorpayIndiaPaymentProvider implements PaymentProvider {
  name = 'Razorpay India Payment Gateway';

  async createCheckoutSession(request: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
    const plan = getPlanByTier(request.tier);
    const amount = request.billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

    const transactionId = 'txn_' + Date.now();
    const orderId = 'order_rzp_' + Math.random().toString(36).substring(2, 10);

    return {
      transactionId,
      orderId,
      amount,
      currency: '₹',
      status: 'pending',
      availableMethods: ['UPI', 'Card', 'NetBanking', 'Wallet'],
    };
  }

  async verifyPayment(transactionId: string): Promise<{
    success: boolean;
    subscription: UserSubscription;
    invoice: BillingInvoice;
  }> {
    // In production, this verifies webhook signatures with Razorpay / Stripe
    // Here we simulate the authoritative server-side fulfillment
    const now = new Date();
    const oneMonthLater = new Date(now.getTime() + 30 * 86400000);

    const subscription: UserSubscription = {
      id: 'sub_' + Math.random().toString(36).substring(2, 9),
      userId: 'usr_astronex_demo',
      tier: 'basic', // populated by caller
      billingCycle: 'monthly',
      status: 'active',
      startDate: now.toISOString().split('T')[0],
      renewalDate: oneMonthLater.toISOString().split('T')[0],
      autoRenew: true,
      currency: '₹',
      amount: 199,
      paymentMethod: 'UPI (Google Pay / PhonePe)',
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const invoice: BillingInvoice = {
      id: 'inv_' + Date.now(),
      transactionId,
      date: now.toISOString().split('T')[0],
      planName: 'AstroNex Basic',
      amount: 199,
      currency: '₹',
      status: 'Paid',
      invoiceNumber: 'INV-ANX-' + Math.floor(100000 + Math.random() * 900000),
    };

    return {
      success: true,
      subscription,
      invoice,
    };
  }

  async openRazorpayCheckout(options: {
    amountInRupees: number;
    name: string;
    description: string;
    userEmail?: string;
    userPhone?: string;
    notes?: Record<string, any>;
  }): Promise<{ razorpay_payment_id: string }> {
    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_TnJRQr8BQWUmh7';
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      return new Promise((resolve, reject) => {
        const rzp = new (window as any).Razorpay({
          key,
          amount: options.amountInRupees * 100,
          currency: 'INR',
          name: 'AstroNex',
          description: options.description,
          prefill: {
            email: options.userEmail,
            contact: options.userPhone,
          },
          theme: {
            color: '#F59E0B',
          },
          handler: (response: any) => {
            resolve(response);
          },
          modal: {
            ondismiss: () => {
              reject(new Error('Payment cancelled by user'));
            },
          },
        });
        rzp.open();
      });
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ razorpay_payment_id: 'pay_sim_' + Date.now() });
      }, 500);
    });
  }
}

export const paymentProvider = new RazorpayIndiaPaymentProvider();
