import React, { useState } from 'react';
import { X, CheckCircle, Copy, Check, ShoppingBag, Truck, ShieldAlert, Sparkles } from 'lucide-react';
import { Book, CreateOrderRequest, OrderResponse } from '../types';
import { orderApi } from '../services/api';

interface OrderModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ book, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+998 ');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [withAutograph, setWithAutograph] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdOrder, setCreatedOrder] = useState<OrderResponse | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const unitPrice = book ? book.price : 85000;
  const totalAmount = unitPrice * quantity;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setPhoneNumber(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;

    if (!customerName.trim()) {
      setError('Iltimos, ism va familiyangizni kiriting');
      return;
    }

    const cleanPhone = phoneNumber.replace(/\s+/g, '');
    if (cleanPhone.length < 13) {
      setError('Iltimos, telefon raqamingizni to\'liq kiriting (masalan: +998 90 123 45 67)');
      return;
    }

    if (!deliveryAddress.trim()) {
      setError('Iltimos, yetkazib berish manzilini kiriting');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const combinedNotes = withAutograph
        ? `[Muallif dastxati bilan] ${notes}`.trim()
        : notes.trim();

      const payload: CreateOrderRequest = {
        customerName: customerName.trim(),
        phoneNumber: cleanPhone,
        deliveryAddress: deliveryAddress.trim(),
        notes: combinedNotes,
        items: [
          {
            bookId: book.id,
            quantity: quantity,
          },
        ],
      };

      const result = await orderApi.createOrder(payload);
      setCreatedOrder(result);
    } catch (err: any) {
      console.error('Order creation failed:', err);
      const msg = err.response?.data?.message || 'Buyurtma yaratishda xatolik yuz berdi. Qayta urinib ko\'ring.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRef = () => {
    if (!createdOrder) return;
    navigator.clipboard.writeText(createdOrder.orderReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseModal = () => {
    setCreatedOrder(null);
    setError(null);
    setQuantity(1);
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A3263]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E8E2DB] overflow-hidden transform transition-all">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E2DB] bg-[#F7F5F2]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1A3263]" />
            <h3 className="font-serif text-lg font-bold text-[#1A3263]">
              {createdOrder ? 'Buyurtma qabul qilindi!' : 'Kitobga buyurtma berish'}
            </h3>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-1.5 rounded-lg text-[#547792] hover:text-[#1A3263] hover:bg-[#E8E2DB]/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {createdOrder ? (
            /* Success State */
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 bg-[#E8E2DB] text-[#1A3263] rounded-full flex items-center justify-center mx-auto shadow-inner border border-[#DDD7CE]">
                <CheckCircle className="w-10 h-10 text-[#1A3263]" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#1A3263] font-serif">
                  Tashakkur, buyurtmangiz muvaffaqiyatli qabul qilindi!
                </h4>
                <p className="text-sm text-[#547792] mt-2">
                  Tez orada operatorimiz <b className="text-[#1A3263]">{createdOrder.phoneNumber}</b> raqamingizga bog'lanib, yetkazib berish vaqtini aniqlashtiradi.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="bg-[#F7F5F2] border border-[#E8E2DB] rounded-xl p-4 text-left">
                <div className="text-xs font-bold text-[#547792] uppercase tracking-wider mb-1">
                  Buyurtma kodi (Kuzatish uchun):
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xl font-bold text-[#1A3263]">
                    {createdOrder.orderReference}
                  </span>
                  <button
                    onClick={handleCopyRef}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1A3263] bg-[#FAB95B] hover:bg-[#F3A93B] rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#1A3263]" /> : <Copy className="w-3.5 h-3.5 text-[#1A3263]" />}
                    <span>{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
                  </button>
                </div>
              </div>

              {/* Order Summary Details */}
              <div className="bg-[#F7F5F2] rounded-xl p-4 text-left space-y-2 text-sm border border-[#E8E2DB]">
                <div className="flex justify-between text-[#547792]">
                  <span>Qabul qiluvchi:</span>
                  <span className="font-semibold text-[#1A3263]">{createdOrder.customerName}</span>
                </div>
                <div className="flex justify-between text-[#547792]">
                  <span>Yetkazish manzili:</span>
                  <span className="font-semibold text-[#1A3263] text-right max-w-[60%] truncate">{createdOrder.deliveryAddress}</span>
                </div>
                <div className="flex justify-between text-[#547792]">
                  <span>Nusxalar soni:</span>
                  <span className="font-semibold text-[#1A3263]">{quantity} dona</span>
                </div>
                <div className="border-t border-[#E8E2DB] pt-2 flex justify-between font-bold text-base text-[#1A3263]">
                  <span>Jami to'lov:</span>
                  <span className="text-[#1A3263] font-mono font-extrabold">
                    {createdOrder.totalAmount.toLocaleString()} so'm
                  </span>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="w-full py-3.5 px-4 bg-[#1A3263] hover:bg-[#254483] text-white font-bold rounded-xl transition-colors cursor-pointer shadow-md shadow-[#1A3263]/25"
              >
                Tushunarli, oynani yopish
              </button>
            </div>
          ) : (
            /* Order Form State */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Book Summary Card */}
              <div className="flex items-center gap-4 p-3 bg-[#F7F5F2] rounded-xl border border-[#E8E2DB]">
                <img
                  src={book?.coverImageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80'}
                  alt={book?.title}
                  className="w-14 h-18 object-cover rounded shadow-sm border border-[#DDD7CE] shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif font-bold text-[#1A3263] text-sm truncate">
                    {book?.title || "Soya va yorug'lik orasidagi hayot"}
                  </h4>
                  <p className="text-xs text-[#547792] truncate">
                    {book?.authorName || "Suvonov O'ktam"}
                  </p>
                  <p className="text-sm font-extrabold text-[#1A3263] mt-1 font-mono">
                    {unitPrice.toLocaleString()} so'm
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-[#E8E2DB] bg-white rounded-lg overflow-hidden shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-[#1A3263] hover:bg-[#E8E2DB] transition font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-bold text-[#1A3263] text-sm">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-[#1A3263] hover:bg-[#E8E2DB] transition font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Customer Inputs */}
              <div>
                <label className="block text-xs font-bold text-[#1A3263] uppercase tracking-wider mb-1">
                  Ism va Familiyangiz *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Aziza Karimova"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E8E2DB] bg-white text-[#1A3263] placeholder-[#547792]/60 focus:outline-none focus:ring-2 focus:ring-[#547792]/30 focus:border-[#547792] transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A3263] uppercase tracking-wider mb-1">
                  Telefon raqamingiz *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E8E2DB] bg-white text-[#1A3263] placeholder-[#547792]/60 focus:outline-none focus:ring-2 focus:ring-[#547792]/30 focus:border-[#547792] font-mono transition"
                />
                <span className="text-[11px] text-[#547792] mt-0.5 block">
                  Buyurtmani tasdiqlash uchun ushbu raqamga qo'ng'iroq qilinadi
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1A3263] uppercase tracking-wider mb-1">
                  Yetkazib berish manzili *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Viloyat, shahar/tuman, ko'cha, uy/xonadon raqami"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E8E2DB] bg-white text-[#1A3263] placeholder-[#547792]/60 focus:outline-none focus:ring-2 focus:ring-[#547792]/30 focus:border-[#547792] transition"
                />
              </div>

              {/* Autograph Option */}
              <label className="flex items-center gap-3 p-3 bg-[#FAB95B]/15 rounded-xl border border-[#FAB95B]/50 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={withAutograph}
                  onChange={(e) => setWithAutograph(e.target.checked)}
                  className="w-4 h-4 text-[#1A3263] rounded focus:ring-[#1A3263] border-[#547792]"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-[#1A3263] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#1A3263]" />
                    Muallifdan maxsus dastxat (esdalik yozuvi) bilan olish
                  </div>
                  <div className="text-[#547792] font-medium">
                    Ustoz kitob titul varag'iga shaxsan siz uchun dil so'zlarini yozib beradi
                  </div>
                </div>
              </label>

              <div>
                <label className="block text-xs font-bold text-[#1A3263] uppercase tracking-wider mb-1">
                  Qo'shimcha izoh yoki dastxat uchun ism
                </label>
                <input
                  type="text"
                  placeholder="Masalan: 'Hamkasbim Dilafruz uchun' yoki yetkazish vaqti"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-[#E8E2DB] bg-white text-[#1A3263] placeholder-[#547792]/60 focus:outline-none focus:ring-2 focus:ring-[#547792]/30 focus:border-[#547792] transition"
                />
              </div>

              {/* Total Summary */}
              <div className="pt-2 border-t border-[#E8E2DB] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#547792] font-medium block">Jami to'lov miqdori:</span>
                  <span className="text-2xl font-extrabold text-[#1A3263] font-mono">
                    {totalAmount.toLocaleString()} so'm
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#1A3263] bg-[#E8E2DB] px-3 py-1.5 rounded-full border border-[#DDD7CE] font-bold">
                  <Truck className="w-3.5 h-3.5 text-[#547792]" />
                  <span>To'lov qabul qilinganda</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#FAB95B] hover:bg-[#F3A93B] active:scale-[0.99] text-[#1A3263] font-bold rounded-xl shadow-lg shadow-[#FAB95B]/30 transition-all disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#1A3263]/30 border-t-[#1A3263] rounded-full animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#1A3263]" />
                    Buyurtmani tasdiqlash
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
