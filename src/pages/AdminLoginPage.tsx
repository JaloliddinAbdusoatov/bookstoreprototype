import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowLeft, AlertCircle } from 'lucide-react';
import { authApi } from '../services/api';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) return;

    try {
      setLoading(true);
      setError(null);
      await authApi.login(username.trim(), password);
      navigate('/admin');
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Login yoki parol noto\'g\'ri kiritildi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A3263] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background glow using gold and steel blue */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FAB95B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#547792]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#E8E2DB]/80 hover:text-[#FAB95B] mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>

        <div className="text-center">
          <div className="w-14 h-14 bg-[#FAB95B] rounded-2xl flex items-center justify-center text-[#1A3263] mx-auto shadow-lg shadow-[#FAB95B]/30 mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Admin Boshqaruv Tizimi
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#E8E2DB]/80">
            Buyurtmalar va kitob ma'lumotlarini boshqarish uchun tizimga kiring
          </p>
        </div>

        <div className="mt-8 bg-[#102042]/90 backdrop-blur-md border border-[#547792]/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#E8E2DB] uppercase tracking-wider mb-1.5">
                Admin Foydalanuvchi nomi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#547792]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[#1A3263]/90 border border-[#547792]/50 text-white placeholder-[#547792] focus:outline-none focus:ring-2 focus:ring-[#FAB95B]/30 focus:border-[#FAB95B] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#E8E2DB] uppercase tracking-wider mb-1.5">
                Parol
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#547792]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl bg-[#1A3263]/90 border border-[#547792]/50 text-white placeholder-[#547792] focus:outline-none focus:ring-2 focus:ring-[#FAB95B]/30 focus:border-[#FAB95B] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#FAB95B] hover:bg-[#F3A93B] active:scale-[0.99] text-[#1A3263] font-bold rounded-xl shadow-lg shadow-[#FAB95B]/25 transition disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#1A3263]/30 border-t-[#1A3263] rounded-full animate-spin" />
              ) : (
                'Tizimga kirish'
              )}
            </button>
          </form>

          {/* Quick Helper for Dev / Testing */}
          <div className="mt-6 pt-5 border-t border-[#547792]/30 text-[11px] text-[#E8E2DB]/70 text-center">
            Standart login: <span className="font-mono text-[#FAB95B]">admin</span> / Parol:{' '}
            <span className="font-mono text-[#FAB95B]">Admin123!</span>
          </div>
        </div>

      </div>
    </div>
  );
};
