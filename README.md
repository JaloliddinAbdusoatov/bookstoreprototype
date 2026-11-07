# 📚 Kitob Do'koni — Standalone MVP Versiyasi

https://bookstoreprototype.netlify.app

> **Soya va yorug'lik orasidagi hayot** — Narkotik moddalarga qarshi ogohlik, yoshlar va oilalarni asrash bo'yicha mualliflik kitobi ko'rgazmasi, onlayn buyurtma va administrator boshqaruv paneli.  
> Ushbu versiya loyihaning **Mustaqil (Standalone) Frontend MVP** talqini bo'lib, Docker, Java yoki PostgreSQL talab qilmaydi. Barcha ma'lumotlar brauzer xotirasida (**localStorage**) xavfsiz va real vaqtda saqlanadi.

---

## 🎨 Dizayn va Foydalanuvchi Tajribasi
Dizayn va vizual ko'rinish 100% asosiy loyiha bilan bir xil saqlab qolingan:
- **Ranglar palitrasi:** Navy (`#1A3263`), Steel Blue (`#547792`), Yellow/Gold (`#FAB95B`), Linen (`#E8E2DB`).
- **3D Muqova:** Kitobning 3D burchakli realistik animatsiyasi va muqova effekti.
- **Tipografika:** *Playfair Display* (sarlavhalar) va *Plus Jakarta Sans* (matnlar).
- **Moslashuvchanlik:** Mobil, planshet va kompyuter ekranlariga to'liq moslashgan (Responsive).

---

## ⚡ Asosiy Imkoniyatlar (Features)

### 1. Kitobxonlar uchun (Asosiy Sahifa)
- **3D Kitob Ko'rgazmasi:** Jonli narx, sahifalar soni (280 bet), qattiq muqova va ombordagi mavjud qoldiq.
- **Interaktiv Mundarija:** 7 ta bob bo'yicha batafsil ogohlik mundarijasini ochib ko'rish.
- **Muallif bilan tanishuv:** Suvonov O'ktamning amaliy tajribasi, maqsadlari va yutuqlari.
- **Onlayn Buyurtma Berish:**
  - Nusxalar sonini tanlash va jami summani avtomatik hisoblash.
  - O'zbekiston raqamlari uchun avtomatik `+998` formati.
  - Muallifdan shaxsiy esdalik dastxati (avtograf) so'rash imkoniyati.
  - Buyurtma yaratilganda unikal kuzatuv kodi beriladi (masalan: `ORD-784920`).
- **Buyurtmani Kod orqali Kuzatish:**
  - Kodni kiritib, buyurtma bosqichlarini (Yangi ➔ Tasdiqlandi ➔ Yo'lda ➔ Yetkazildi) jonli ko'rish.

### 2. Administrator uchun (Admin Portal — `/admin`)
- **Xavfsiz Kirish:** `/admin/login` sahifasi orqali.
  - **Login:** `admin`
  - **Parol:** `Admin123!`
- **Statistika Ko'rsatkichlari (KPI):**
  - Jami buyurtmalar soni
  - Kutilayotgan buyurtmalar (Yangi, Tasdiqlangan, Yo'lda)
  - Yetkazilgan buyurtmalar
  - Umumiy tushum (so'mda)
  - Ombordagi joriy qoldiq
- **Buyurtmalar Jadvali:**
  - Holatlar bo'yicha saralash (Barchasi, Yangi, Tasdiqlangan, Yo'lda, Yetkazilgan, Bekor qilingan).
  - Mijoz ismi, telefoni yoki buyurtma kodi bo'yicha jonli qidiruv.
  - Buyurtma holatini yangilash va admin izohi yozish.
  - Buyurtma bekor qilinganda kitob nusxasi ombor qoldig'iga avtomatik qaytariladi.
- **Kitob Ma'lumotlarini Tahrirlash:**
  - Kitob narxi, ombor qoldig'i, sarlavha, tavsif va mundarijani tahrirlash.
  - Saqlangan o'zgarishlar darhol saytda va keyingi buyurtmalarda aks etadi.

---

## 🚀 Ishga Tushirish (Quick Start)

### Talablar:
- Faqat [Node.js](https://nodejs.org/) (v18 yoki undan yuqori)

### 1-qadam: MVP papkasiga kiring
```bash
cd c:\Users\user\Desktop\book\mvp
```

### 2-qadam: Bog'liqliklarni o'rnating
```bash
npm install
```

### 3-qadam: Dev-serverni ishga tushiring
```bash
npm run dev
```

Sayt avtomatik ravishda ochiladi:
- **Asosiy Ko'rgazma Sahifasi:** [http://localhost:5174](http://localhost:5174)
- **Admin Boshqaruv Paneli:** [http://localhost:5174/admin](http://localhost:5174/admin)
- **Admin Login Sahifasi:** [http://localhost:5174/admin/login](http://localhost:5174/admin/login)

---

## 🔐 Standart Kirish Ma'lumotlari

| Foydalanuvchi | Login | Parol |
|---|---|---|
| **Bosh Administrator** | `admin` | `Admin123!` |

---

## 🧪 Testlash uchun Dastlabki Ma'lumotlar
Tizim ishga tushganda avtomatik ravishda test ma'lumotlari yuklanadi:
- **Mavjud buyurtmalar:**
  - `ORD-784920` (Yetkazilgan — Dilshod Karimov)
  - `ORD-652190` (Yo'lda — Malika Sobirova)
  - `ORD-492104` (Tasdiqlangan — Alisher Usmonov)
  - `ORD-318952` (Yangi — Zilola Toirova)
- "Buyurtmani tekshirish" oynasida yuqoridagi kodlarni kiritib statuslar dinamikasini ko'rishingiz mumkin.
