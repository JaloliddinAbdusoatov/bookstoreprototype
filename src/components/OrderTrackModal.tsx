import React, { useState } from 'react';
import { X, Search, Package, Clock, CheckCircle2, Truck, AlertCircle, XCircle } from 'lucide-react';
import { OrderResponse, OrderStatus } from '../types';
import { orderApi } from '../services/api';

interface OrderTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_LABELS: Record<OrderStatus, { label: string; color: string; desc: string }> = {
  NEW: {
    label: 'Yangi qabul qilindi',
    color: 'bg-[#547792]/15 text-[#1A3263] border-[#547792]/30',
    desc: 'Buyurtmangiz tizimga kiritildi. Operator tez orada aloqaga chiqadi.',
  },
  CONFIRMED: {
    label: 'Tasdiqlandi',
    color: 'bg-[#FAB95B]/20 text-[#1A3263] border-[#FAB95B]/50',
    desc: 'Buyurtma tasdiqlandi va kitob yetkazib berish uchun qadoqlanmoqda.',
  },
  SHIPPED: {
    label: 'Yo\'lda (Yetkazilmoqda)',
    color: 'bg-[#547792]/20 text-[#1A3263] border-[#547792]/40',
    desc: 'Kitob kuryer xizmatiga topshirildi va manzilingiz sari yo\'l oldi.',
  },
  DELIVERED: {
    label: 'Yetkazib berildi',
    color: 'bg-[#E8E2DB] text-[#1A3263] border-[#DDD7CE]',
    desc: 'Buyurtma muvaffaqiyatli yetkazildi. Yoqimli mutolaa tilaymiz!',
  },
  CANCELLED: {
    label: 'Bekor qilingan',
    color: 'bg-rose-50 text-rose-800 border-rose-200',
    desc: 'Ushbu buyurtma bekor qilingan.',
  },
};

export const OrderTrackModal: React.FC<OrderTrackModalProps> = ({ isOpen, onClose }) => {
  const [reference, setReference] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanRef = reference.trim();
    if (!cleanRef) return;

    try {
      setLoading(true);
      setError(null);
      const data = await orderApi.trackOrder(cleanRef);
      setOrder(data);
    } catch (err: any) {
      console.error('Order tracking failed:', err);
      setOrder(null);
      setError('Buyurtma topilmadi. Iltimos, buyurtma kodini tekshirib qayta kiriting.');
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (step: OrderStatus, current: OrderStatus) => {
    const orderFlow: OrderStatus[] = ['NEW', 'CONFIRMED', 'SHIPPED', 'DELIVERED'];
    const currentIndex = orderFlow.indexOf(current);
    const stepIndex = orderFlow.indexOf(step);

    if (current === 'CANCELLED') return 'cancelled';
    if (stepIndex <= currentIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A3263]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E8E2DB] overflow-hidden transform transition-all">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2DB] bg-[#F7F5F2]">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#1A3263]" />
            <h3 className="font-serif text-lg font-bold text-[#1A3263]">
              Buyurtma holatini tekshirish
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#547792] hover:text-[#1A3263] hover:bg-[#E8E2DB]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Masalan: BK-A1B2C3D4"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-[#E8E2DB] bg-white text-[#1A3263] placeholder-[#547792]/60 focus:outline-none focus:ring-2 focus:ring-[#547792]/30 focus:border-[#547792] font-mono"
            />
            <button
              type="submit"
              disabled={loading || !reference.trim()}
              className="px-5 py-2.5 bg-[#FAB95B] hover:bg-[#F3A93B] active:scale-95 text-[#1A3263] font-bold rounded-xl text-sm transition shadow-sm disabled:opacity-60 cursor-pointer flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#1A3263]/30 border-t-[#1A3263] rounded-full animate-spin" />
              ) : (
                'Qidirish'
              )}
            </button>
          </form>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Result Card */}
          {order && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Status Header Badge */}
              <div className={`p-4 rounded-xl border ${STATUS_LABELS[order.status].color}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">Holati:</span>
                  <span className="text-sm font-bold">{STATUS_LABELS[order.status].label}</span>
                </div>
                <p className="text-xs mt-1 font-medium opacity-90">
                  {STATUS_LABELS[order.status].desc}
                </p>
              </div>

              {/* Step Flow (if not cancelled) */}
              {order.status !== 'CANCELLED' ? (
                <div className="py-2">
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#E8E2DB] -translate-y-1/2 z-0" />
                    {[
                      { step: 'NEW', label: 'Yangi', icon: Clock },
                      { step: 'CONFIRMED', label: 'Tasdiqlandi', icon: Package },
                      { step: 'SHIPPED', label: 'Yo\'lda', icon: Truck },
                      { step: 'DELIVERED', label: 'Yetkazildi', icon: CheckCircle2 },
                    ].map(({ step, label, icon: Icon }) => {
                      const state = getStepStatus(step as OrderStatus, order.status);
                      const isCompleted = state === 'completed';
                      return (
                        <div key={step} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isCompleted
                                ? 'bg-[#1A3263] text-[#FAB95B] shadow-md shadow-[#1A3263]/25'
                                : 'bg-[#E8E2DB] text-[#547792]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`text-[11px] mt-1.5 font-bold ${
                              isCompleted ? 'text-[#1A3263]' : 'text-[#547792]/70'
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  <span>Buyurtma bekor qilingan</span>
                </div>
              )}

              {/* Order Info Summary */}
              <div className="bg-[#F7F5F2] rounded-xl p-4 text-xs space-y-2 border border-[#E8E2DB]">
                <div className="flex justify-between">
                  <span className="text-[#547792]">Buyurtma raqami:</span>
                  <span className="font-mono font-bold text-[#1A3263]">{order.orderReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#547792]">Mijoz:</span>
                  <span className="font-semibold text-[#1A3263]">{order.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#547792]">Manzil:</span>
                  <span className="font-semibold text-[#1A3263] max-w-[65%] text-right truncate">
                    {order.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#547792]">Buyurtma sanasi:</span>
                  <span className="text-[#1A3263]">
                    {new Date(order.createdAt).toLocaleDateString('uz-UZ', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="border-t border-[#E8E2DB] pt-2 flex justify-between font-bold text-sm text-[#1A3263]">
                  <span>Jami summa:</span>
                  <span className="font-mono font-extrabold text-[#1A3263]">
                    {order.totalAmount.toLocaleString()} so'm
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
