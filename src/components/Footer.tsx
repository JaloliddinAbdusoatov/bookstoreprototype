import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Phone, MapPin, Send, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A3263] text-[#E8E2DB] pt-16 pb-12 border-t border-[#547792]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAB95B] flex items-center justify-center text-[#1A3263] shadow-md shadow-[#FAB95B]/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Suvonov O'ktam
              </span>
            </div>
            <p className="text-sm text-[#E8E2DB]/80 max-w-md leading-relaxed">
              "Soya va yorug'lik orasidagi hayot" — narkotik vositalar va giyohvandlik xavfidan ogoh bo'lish, yoshlar va oilalarni bu og'ir darddan asrash hamda qorong'u soyadan yorug' hayot sari qaytish haqidagi ta'sirli va amaliy qo'llanma.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102042] border border-[#547792]/40 text-[#FAB95B] font-medium">
                <Sparkles className="w-3.5 h-3.5" /> 1-nashr (2024)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102042] border border-[#547792]/40 text-[#E8E2DB] font-medium">
                ✓ Rasmiy mualliflik huquqi
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Bo'limlar
            </h4>
            <ul className="space-y-2 text-sm text-[#E8E2DB]/75">
              <li>
                <a href="#about" className="hover:text-[#FAB95B] transition-colors">
                  Kitob haqida
                </a>
              </li>
              <li>
                <a href="#contents" className="hover:text-[#FAB95B] transition-colors">
                  Mundarija va boblar
                </a>
              </li>
              <li>
                <a href="#author" className="hover:text-[#FAB95B] transition-colors">
                  Muallif biografiyasi
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FAB95B] transition-colors">
                  Kitobxonlar fikri
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#FAB95B] transition-colors">
                  Savollar va yetkazib berish
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Delivery info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">
              Bog'lanish
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E8E2DB]/75">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FAB95B] shrink-0" />
                <a href="tel:+998901234567" className="hover:text-[#FAB95B] font-mono">
                  +998 (90) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Send className="w-4 h-4 text-[#FAB95B] shrink-0" />
                <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-[#FAB95B]">
                  @suvonov_oktam_bot
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#FAB95B] shrink-0 mt-0.5" />
                <span>Toshkent shahri va butun O'zbekiston bo'ylab yetkazib beriladi</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#547792]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8E2DB]/60">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Suvonov O'ktam. Barcha huquqlar himoyalangan.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-[#E8E2DB]/70 hover:text-[#FAB95B] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin tizimi</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
