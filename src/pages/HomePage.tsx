import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  ShoppingBag,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Layers,
  HeartHandshake,
  GraduationCap,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Book } from '../types';
import { bookApi } from '../services/api';

interface HomePageProps {
  onOpenOrderModal: () => void;
  onOpenTrackModal: () => void;
  book: Book | null;
  setBook: (b: Book) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenOrderModal,
  onOpenTrackModal,
  book,
  setBook,
}) => {
  const [, setLoading] = useState(false);
  const [openChapter, setOpenChapter] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const books = await bookApi.getActiveBooks();
        if (books && books.length > 0) {
          setBook(books[0]);
        }
      } catch (err) {
        console.error('Failed to load book info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [setBook]);

  // Default fallback values
  const title = book?.title || "Soya va yorug'lik orasidagi hayot";
  const subtitle =
    book?.subtitle ||
    "Narkotik moddalarga qarshi ogohlik va sog'lom hayot sari amaliy qo'llanma";
  const authorName = book?.authorName || "Suvonov O'ktam";
  const price = book?.price || 85000;
  const pages = book?.pages || 280;
  const stock = book?.stockQuantity !== undefined ? book.stockQuantity : 146;
  const coverImage =
    book?.coverImageUrl ||
    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80";
  const authorBio =
    book?.authorBio ||
    "Suvonov O'ktam — ko'p yillik amaliy tajribaga ega ekspert, murabbiy va giyohvandlik illatiga qarshi kurash bo'yicha profilaktika targ'ibotchisi. Yoshlar o'rtasida sog'lom hayot tarzini shakllantirish, ularni zararli illatlardan himoya qilish, oilalarga to'g'ri yo'l ko'rsatish hamda tushkunlikka tushgan insonlarni to'g'ri hayot yo'liga qaytarish bo'yicha qator amaliy loyihalar va anjumanlar tashabbuskori.";

  // Parsed chapters
  const chapters = book?.tableOfContents
    ? book.tableOfContents.split('\n').filter(Boolean)
    : [
        "1-bob. Xavfli jarlik: Giyohvandlik va psixotrop moddalarning asl qiyofasi",
        "2-bob. Birinchi xato: Yoshlar nima sababdan tuzoqqa tushib qoladi?",
        "3-bob. Ota-onalar diqqatiga: Farzandingizdagi xavfli o'zgarishlarni erta payqash belgilari",
        "4-bob. Sintetik balolar: Zamonaviy giyohvandlikning yashirin va halokatli xavflari",
        "5-bob. Ruhiy tushkunlik va qaramlik: Inson irodasini qanday qutqarish mumkin?",
        "6-bob. Qorong'u soyadan yorug'likka: Qaramlikdan xalos bo'lish va reabilitatsiya bosqichlari",
        "7-bob. Yangi hayot sari: Sog'lom turmush tarzi, oilaviy mehr va yorug' kelajak sari yo'l",
      ];

  const faqs = [
    {
      q: "Yetkazib berish qanday amalga oshiriladi?",
      a: "Toshkent shahri ichida buyurtmangiz 24 soat ichida, barcha viloyatlarga esa BTS kuryerlik yoki O'zbekiston Pochtasi orqali 2-3 ish kuni mobaynida yetkaziladi.",
    },
    {
      q: "To'lovni qachon va qanday to'layman?",
      a: "To'lov kitob qo'lingizga yetib borganida amalga oshiriladi (Naqd, Payme yoki Click orqali). Oldindan hech qanday to'lov talab qilinmaydi.",
    },
    {
      q: "Muallif dastxati (avtograf) olish mumkinmi?",
      a: "Ha, albatta! Buyurtma berish chog'ida 'Muallif dastxati bilan' bandini belgilasangiz, Suvonov O'ktam kitob sahifasiga shaxsan siz yoki yaqinlaringiz uchun samimiy tilaklarini yozib beradi.",
    },
    {
      q: "Maktab, kollej, oliygoh yoki mahalla uchun ko'p nusxada buyurtma bersa bo'ladimi?",
      a: "Ha, ta'lim muassasalari va profilaktika tadbirlari uchun 5 nusxadan ortiq buyurtmalarga bepul yetkazib berish hamda yoshlar profilaktikasi uchun maxsus tarqatma materiallar sovg'a tariqasida taqdim etiladi.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8E2DB]/50 via-[#F7F5F2] to-white pt-12 pb-20 lg:pt-16 lg:pb-32">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FAB95B]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#547792]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAB95B]/20 border border-[#FAB95B]/60 text-[#1A3263] text-xs font-bold tracking-wide uppercase shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A3263]" />
                <span>Giyohvandlikka Qarshi Ogohlik Qo'llanmasi (2024)</span>
              </div>

              {/* Main Book Title */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A3263] leading-[1.15]">
                {title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-[#547792] font-medium max-w-2xl leading-relaxed">
                {subtitle}
              </p>

              {/* Author Byline */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="w-12 h-12 rounded-xl bg-[#1A3263] border-2 border-[#FAB95B] shadow-sm flex items-center justify-center text-[#FAB95B]">
                  <User className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-[#1A3263] text-base">{authorName}</div>
                  <div className="text-xs text-[#547792] font-semibold">
                    Ekspert-murabbiy • Sog'lom hayot targ'ibotchisi
                  </div>
                </div>
              </div>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 rounded-lg border border-[#E8E2DB] text-xs font-semibold text-[#1A3263] shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-[#547792]" /> {pages} sahifa
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 rounded-lg border border-[#E8E2DB] text-xs font-semibold text-[#1A3263] shadow-xs">
                  <GraduationCap className="w-3.5 h-3.5 text-[#547792]" /> O'zbek tili (Lotin)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 rounded-lg border border-[#E8E2DB] text-xs font-semibold text-[#1A3263] shadow-xs">
                  <Layers className="w-3.5 h-3.5 text-[#547792]" /> Qattiq muqova & Sifatli nashr
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E8E2DB]/80 rounded-lg border border-[#DDD7CE] text-xs font-semibold text-[#1A3263]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#547792]" /> Mavjud: {stock} nusxa
                </span>
              </div>

              {/* Price & Primary CTA */}
              <div className="pt-6 border-t border-[#E8E2DB] flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <div>
                  <div className="text-xs text-[#547792] font-semibold uppercase tracking-wider">
                    Rasmiy nashr narxi:
                  </div>
                  <div className="font-serif text-3xl font-extrabold text-[#1A3263]">
                    {price.toLocaleString()} <span className="text-lg font-normal">so'm</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onOpenOrderModal}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#FAB95B] hover:bg-[#F3A93B] active:scale-[0.98] text-[#1A3263] font-bold rounded-xl shadow-lg shadow-[#FAB95B]/30 transition-all cursor-pointer text-base"
                  >
                    <ShoppingBag className="w-5 h-5 text-[#1A3263]" />
                    <span>Buyurtma berish</span>
                  </button>

                  <button
                    onClick={onOpenTrackModal}
                    className="inline-flex items-center justify-center px-5 py-4 bg-white hover:bg-[#F7F5F2] border border-[#DDD7CE] text-[#1A3263] font-semibold rounded-xl transition cursor-pointer text-sm"
                  >
                    Kuzatish
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Book Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center py-6">
              <div className="relative group">
                {/* Ambient glow behind book */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1A3263]/30 via-[#547792]/20 to-[#FAB95B]/30 blur-2xl rounded-3xl -rotate-6 transform scale-95 pointer-events-none group-hover:scale-105 transition-transform duration-500" />

                {/* 3D Realistic Book Container */}
                <div className="book-cover-3d w-64 sm:w-72 aspect-[1/1.45] rounded-r-xl rounded-l-xs overflow-hidden shadow-2xl border-y border-r border-[#547792]/30 bg-[#1A3263] cursor-pointer">
                  <div className="book-spine-effect" />
                  <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay text on cover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3263]/95 via-[#1A3263]/50 to-black/40 p-6 flex flex-col justify-between text-white z-10">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#1A3263] bg-[#FAB95B] px-2.5 py-0.5 rounded shadow-xs">
                        Ogohlik Qo'llanmasi
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold leading-snug drop-shadow-md text-white">
                        {title}
                      </h3>
                      <p className="text-xs text-[#FAB95B] font-semibold">
                        {authorName}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-[#E8E2DB] rounded-xl p-3 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A3263] text-[#FAB95B] flex items-center justify-center shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A3263]">Muallif dastxati</div>
                    <div className="text-[11px] text-[#547792] font-medium">Buyurtma bilan bepul!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS (Kitobning Afzalliklari) */}
      <section id="about" className="py-20 bg-white border-y border-[#E8E2DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold text-[#547792] uppercase tracking-widest">
              Kitobning ahamiyati
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A3263]">
              Bu kitob oilalar, yoshlar va jamiyatga nima beradi?
            </h3>
            <p className="text-base text-[#547792]">
              Quruq shiorlardan ko'ra, hayotiy voqealar, xavfli illatning asl qiyofasi va sinovdan o'tgan amaliy yechimlar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Erta Ogohlik & Belgilar",
                desc: "Farzandlar yoki yaqinlardagi xavfli xatti-harakatlar, ruhiy o'zgarishlar va dastlabki xavf alomatlarini o'z vaqtida payqash sirlari.",
              },
              {
                icon: Layers,
                title: "Sintetik Balolar Haqiqati",
                desc: "Zamonaviy psixotrop va sintetik moddalarning yashirin xavflari, internetdagi tuzoqlar va ulardan himoyalanish choralari.",
              },
              {
                icon: HeartHandshake,
                title: "Iroda & Qutqarish Yo'li",
                desc: "Qaramlik tuzog'iga tushgan insonni kamsitmasdan, psixologik va tibbiy jihatdan qorong'ulikdan yorug'likka olib chiqish bosqichlari.",
              },
              {
                icon: Clock,
                title: "Sog'lom Oila & Kelajak",
                desc: "Oila a'zolari o'rtasidagi samimiy ishonch, mehr-oqibat va sog'lom turmush tarzini mustahkamlash usullari.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F7F5F2] hover:bg-white rounded-2xl p-7 border border-[#E8E2DB] hover:border-[#547792]/50 transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8E2DB] text-[#1A3263] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-[#1A3263] group-hover:text-[#FAB95B] transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1A3263] mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-[#547792] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TABLE OF CONTENTS (Mundarija) */}
      <section id="contents" className="py-20 bg-[#F7F5F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold text-[#547792] uppercase tracking-widest">
              Kitob tuzilishi
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A3263]">
              Mundarija va boblar tarkibi
            </h3>
            <p className="text-sm text-[#547792]">
              Ushbu asar 7 ta asosiy bo'lim va 280 sahifalik tizimli ogohlik qo'llanmasidan iborat
            </p>
          </div>

          <div className="space-y-3">
            {chapters.map((chapterText, idx) => {
              const isOpen = openChapter === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#E8E2DB] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setOpenChapter(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 flex items-center justify-between text-left hover:bg-[#F7F5F2]/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#1A3263] text-[#FAB95B] text-xs font-bold flex items-center justify-center shrink-0 border border-[#1A3263]">
                        {idx + 1}
                      </span>
                      <span className="font-serif text-base font-semibold text-[#1A3263]">
                        {chapterText}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#547792] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#547792]/70 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-[#547792] border-t border-[#E8E2DB] bg-[#F7F5F2]/60 leading-relaxed">
                      Ushbu bobda real hayotiy voqealar tahlili, profilaktik choralar, ota-onalar va murabbiylar uchun muhim tavsiyalar batafsil yoritilgan.
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Call to action inside contents */}
          <div className="mt-10 p-6 bg-gradient-to-r from-[#1A3263] via-[#24427E] to-[#547792] rounded-2xl text-white text-center sm:flex items-center justify-between shadow-xl">
            <div className="text-left mb-4 sm:mb-0">
              <h4 className="font-serif text-lg font-bold">
                Oilangiz va yaqinlaringizni ushbu xavfdan asrashni xohlaysizmi?
              </h4>
              <p className="text-xs text-[#E8E2DB] mt-0.5">
                Kitob nusxasini bir necha daqiqada buyurtma qiling.
              </p>
            </div>
            <button
              onClick={onOpenOrderModal}
              className="px-6 py-3 bg-[#FAB95B] text-[#1A3263] font-bold rounded-xl text-sm hover:bg-[#F3A93B] transition cursor-pointer shrink-0 shadow-md"
            >
              Buyurtma berish
            </button>
          </div>
        </div>
      </section>

      {/* 4. AUTHOR SECTION (Muallif Haqida) */}
      <section id="author" className="py-20 bg-white border-t border-[#E8E2DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Author Image and Badges */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative">
                <div className="w-72 sm:w-80 aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-[#E8E2DB] bg-gradient-to-br from-[#1A3263] via-[#24427E] to-[#547792] flex flex-col items-center justify-center p-8 text-center text-white relative">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FAB95B]/20 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="w-24 h-24 rounded-2xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center text-[#FAB95B] shadow-lg mb-4">
                    <User className="w-12 h-12" />
                  </div>
                  <div className="font-serif font-bold text-xl text-white">
                    {authorName}
                  </div>
                  <div className="text-xs text-[#FAB95B] font-semibold mt-1">
                    Mualliflik Nashri
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-[#1A3263] text-white p-4 rounded-xl shadow-xl max-w-xs border border-[#547792]/40">
                  <div className="font-serif font-bold text-sm text-[#FAB95B]">Suvonov O'ktam</div>
                  <div className="text-xs text-[#E8E2DB] mt-0.5">Ekspert-murabbiy & profilaktika targ'ibotchisi</div>
                </div>
              </div>
            </div>

            {/* Author Biography & Mission */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-xs font-bold text-[#547792] uppercase tracking-widest mb-1">
                  Muallif bilan tanishing
                </h2>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A3263]">
                  {authorName}
                </h3>
              </div>

              <p className="text-base text-[#547792] leading-relaxed">
                {authorBio}
              </p>

              {/* Achievements Box */}
              <div className="bg-[#F7F5F2] p-6 rounded-2xl border border-[#E8E2DB] space-y-3">
                <h4 className="font-serif font-bold text-[#1A3263] text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FAB95B]" />
                  Yutuqlar va amaliy faoliyat:
                </h4>
                <ul className="space-y-2 text-sm text-[#1A3263]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#547792] shrink-0" />
                    <span>Giyohvandlik va psixotrop moddalar profilaktikasi bo'yicha amaliy loyihalar tashabbuskori</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#547792] shrink-0" />
                    <span>"Sog'lom avlod va yorug' kelajak" targ'ibot dasturlari muallifi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#547792] shrink-0" />
                    <span>30 dan ortiq ilmiy-ommabop maqolalar va tavsiyalar muallifi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#547792] shrink-0" />
                    <span>Yuzlab oilalarga ko'mak bergan va yoshlarni to'g'ri hayot yo'liga yo'naltirgan fidoiy murabbiy</span>
                  </li>
                </ul>
              </div>

              {/* Author Quote */}
              <div className="p-5 border-l-4 border-[#FAB95B] bg-[#E8E2DB]/35 rounded-r-xl italic text-[#1A3263] text-sm leading-relaxed">
                "Giyohvandlik — faqat bitta insonning emas, butun oilaning va jamiyatning dardi. Agar ushbu kitob hatto bitta yoshni xavfli jarlikdan asrab qolsa yoki bitta adashgan insonning yorug' hayotga qaytishiga sabab bo'lsa — o'z maqsadimga yetgan bo'laman."
                <div className="font-bold text-[#1A3263] not-italic mt-2 font-serif">— {authorName}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. READER REVIEWS (Sharhlar) */}
      <section id="reviews" className="py-20 bg-[#F7F5F2] border-t border-[#E8E2DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <h2 className="text-xs font-bold text-[#547792] uppercase tracking-widest">
              Kitobxonlar e'tirofi
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A3263]">
              Mutaxassislar va o'quvchilar fikrlari
            </h3>
            <p className="text-sm text-[#547792]">
              Kitobni o'qib, amaliyotda qo'llagan insonlarning xolis munosabati
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dilshod Rahmatov",
                role: "Shifokor-narkolog (Toshkent)",
                comment:
                  "Ushbu kitobdagi 3-bob — ota-onalar uchun eng muhim ko'zgu. Farzanddagi o'zgarishlarni erta payqash va fojiaga yo'l qo'ymaslik uchun har bir oila o'qishi shart bo'lgan ogohlik qo'llanmasi!",
                stars: 5,
              },
              {
                name: "Rustam Xoliqov",
                role: "Mahalla yoshlar yetakchisi (Samarqand)",
                comment:
                  "Mahallamiz yoshlari va ota-onalari uchun maxsus davra suhbatlarida aynan shu kitobdan foydalandik. Natijasi kutilganidan ham a'lo bo'ldi. Muallifga chuqur minnatdorchilik bildiramiz.",
                stars: 5,
              },
              {
                name: "Aziza Karimova",
                role: "Psixolog-maslahatchi (Farg'ona)",
                comment:
                  "Kitob shunchaki qo'rqitmaydi, balki qorong'u soyadan yorug'likka qanday chiqish yo'lini aniq ko'rsatadi. Juda ta'sirli, ilmiy va hayotiy asar.",
                stars: 5,
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-[#E8E2DB] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#FAB95B] mb-4">
                    {[...Array(review.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FAB95B] text-[#FAB95B]" />
                    ))}
                  </div>
                  <p className="text-[#547792] text-sm leading-relaxed italic mb-6">
                    "{review.comment}"
                  </p>
                </div>

                <div className="border-t border-[#E8E2DB] pt-4">
                  <div className="font-serif font-bold text-[#1A3263] text-base">
                    {review.name}
                  </div>
                  <div className="text-xs text-[#547792] mt-0.5 font-medium">
                    {review.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ (Ko'p Beriladigan Savollar) */}
      <section id="faq" className="py-20 bg-white border-t border-[#E8E2DB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold text-[#547792] uppercase tracking-widest">
              Savol-javoblar
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#1A3263]">
              Ko'p beriladigan savollar
            </h3>
            <p className="text-sm text-[#547792]">
              Buyurtma berish va yetkazib berish jarayoni bo'yicha ma'lumotlar
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-[#E8E2DB] rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left font-serif font-semibold text-[#1A3263] hover:bg-[#F7F5F2] transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#547792] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#547792]/70 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-[#547792] border-t border-[#E8E2DB] pt-3 bg-[#F7F5F2]/50 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM ORDER CTA BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#1A3263] via-[#24427E] to-[#1A3263] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-bold">
            Kitobni bugunoq o'z oilangiz va yaqinlaringiz uchun xarid qiling
          </h3>
          <p className="text-[#E8E2DB] max-w-xl mx-auto text-base">
            Farzandlarimiz va yosh avlod kelajagini bu og'ir illatdan asrash — barchamizning burchimiz. Muallif dastxati va qulay yetkazib berish xizmati bilan.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FAB95B] text-[#1A3263] hover:bg-[#F3A93B] active:scale-95 text-base font-bold rounded-xl shadow-xl shadow-black/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#1A3263]" />
              <span>Hoziroq buyurtma berish ({price.toLocaleString()} so'm)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Floating mobile bottom order bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#F7F5F2]/95 backdrop-blur-md border-t border-[#E8E2DB] px-4 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <div className="text-[10px] text-[#547792] font-semibold uppercase">Kitob narxi:</div>
          <div className="font-mono font-bold text-[#1A3263] text-lg">
            {price.toLocaleString()} so'm
          </div>
        </div>
        <button
          onClick={onOpenOrderModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FAB95B] text-[#1A3263] font-bold text-sm rounded-xl shadow-md"
        >
          <ShoppingBag className="w-4 h-4 text-[#1A3263]" />
          <span>Buyurtma berish</span>
        </button>
      </div>
    </div>
  );
};
