import {
  Book,
  CreateOrderRequest,
  OrderResponse,
  DashboardStats,
  PageResponse,
  AdminUser,
  OrderStatus,
} from '../types';

const STORAGE_KEY_BOOKS = 'bookstore_mvp_books';
const STORAGE_KEY_ORDERS = 'bookstore_mvp_orders';
const STORAGE_KEY_AUTH_TOKEN = 'bookstore_admin_token';
const STORAGE_KEY_AUTH_USER = 'bookstore_admin_user';

// Initial Seed Book: "Soya va yorug'lik orasidagi hayot" by Suvonov O'ktam
const INITIAL_BOOK: Book = {
  id: 1,
  title: "Soya va yorug'lik orasidagi hayot",
  subtitle: "Narkotik moddalarga qarshi ogohlik va sog'lom hayot sari amaliy qo'llanma",
  authorName: "Suvonov O'ktam",
  description:
    "Ushbu kitob narkotik vositalar, psixotrop moddalar va zamonaviy sintetik illatlarning inson hayoti, ruhiyati, oilasi va kelajagiga ko'rsatadigan halokatli ta'sirini real hayotiy voqealar va chuqur tahlillar orqali fosh etadi. Unda giyohvandlik tuzog'iga tushib qolmaslik choralari, farzandlar xatti-harakatidagi dastlabki xavfli o'zgarishlarni payqash, bu illat bilan to'qnash kelgan oilalarga amaliy yordam berish va insonning qorong'u soyadan yorug' hayotga qaytish yo'llari chuqur yoritilgan.",
  shortDescription:
    "Giyohvandlik va sintetik moddalar xavfidan ogoh bo'lish, yoshlar va oilalarni asrash hamda qorong'u soyadan yorug' hayot sari qaytish haqidagi ta'sirli va amaliy qo'llanma.",
  price: 85000,
  stockQuantity: 146,
  pages: 280,
  language: "O'zbek tili",
  publicationYear: 2024,
  isbn: "978-9943-78-456-1",
  publisher: "Yorug'lik Nashriyoti",
  coverImageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
  authorBio:
    "Suvonov O'ktam — ko'p yillik amaliy tajribaga ega ekspert, murabbiy va giyohvandlik illatiga qarshi kurash bo'yicha profilaktika targ'ibotchisi. Yoshlar o'rtasida sog'lom hayot tarzini shakllantirish, ularni zararli illatlardan himoya qilish, oilalarga to'g'ri yo'l ko'rsatish hamda tushkunlikka tushgan insonlarni to'g'ri hayot yo'liga qaytarish bo'yicha qator amaliy loyihalar va anjumanlar tashabbuskori.",
  authorAchievements:
    "• Giyohvandlik va psixotrop moddalar profilaktikasi bo'yicha amaliy loyihalar tashabbuskori\n• \"Sog'lom avlod va yorug' kelajak\" targ'ibot dasturlari muallifi\n• 30 dan ortiq ilmiy-ommabop maqolalar va tavsiyalar muallifi\n• Yuzlab oilalarga ko'mak bergan va yoshlarni to'g'ri hayot yo'liga yo'naltirgan fidoiy murabbiy",
  tableOfContents:
    "1-bob. Xavfli jarlik: Giyohvandlik va psixotrop moddalarning asl qiyofasi\n2-bob. Birinchi xato: Yoshlar nima sababdan tuzoqqa tushib qoladi?\n3-bob. Ota-onalar diqqatiga: Farzandingizdagi xavfli o'zgarishlarni erta payqash belgilari\n4-bob. Sintetik balolar: Zamonaviy giyohvandlikning yashirin va halokatli xavflari\n5-bob. Ruhiy tushkunlik va qaramlik: Inson irodasini qanday qutqarish mumkin?\n6-bob. Qorong'u soyadan yorug'likka: Qaramlikdan xalos bo'lish va reabilitatsiya bosqichlari\n7-bob. Yangi hayot sari: Sog'lom turmush tarzi, oilaviy mehr va yorug' kelajak sari yo'l",
  isActive: true,
  imageUrls: [],
};

// Initial Seed Orders
const INITIAL_ORDERS: OrderResponse[] = [
  {
    id: 1,
    orderReference: 'ORD-784920',
    customerName: 'Dilshod Karimov',
    phoneNumber: '+998901234567',
    deliveryAddress: 'Toshkent sh., Chilonzor tumani, 9-mavze, 12-uy',
    notes: '[Muallif dastxati bilan] Mahalla yoshlari va oilamiz uchun samimiy tilaklar bilan',
    status: 'DELIVERED',
    totalAmount: 85000,
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    items: [
      {
        id: 101,
        bookId: 1,
        bookTitle: "Soya va yorug'lik orasidagi hayot",
        quantity: 1,
        unitPrice: 85000,
        subtotal: 85000,
      },
    ],
    statusHistory: [
      {
        id: 1,
        oldStatus: undefined,
        newStatus: 'NEW',
        changedBy: 'Mijoz',
        notes: 'Buyurtma tizim orqali qabul qilindi',
        createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 2,
        oldStatus: 'NEW',
        newStatus: 'CONFIRMED',
        changedBy: 'admin',
        notes: "Mijoz bilan bog'lanildi, buyurtma tasdiqlandi",
        createdAt: new Date(Date.now() - 2.5 * 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 3,
        oldStatus: 'CONFIRMED',
        newStatus: 'SHIPPED',
        changedBy: 'admin',
        notes: 'Kuryerga topshirildi (BTS Kuryer)',
        createdAt: new Date(Date.now() - 1.5 * 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 4,
        oldStatus: 'SHIPPED',
        newStatus: 'DELIVERED',
        changedBy: 'admin',
        notes: 'Buyurtmachi kitobni qabul qilib oldi',
        createdAt: new Date(Date.now() - 0.5 * 24 * 3600 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 2,
    orderReference: 'ORD-652190',
    customerName: 'Malika Sobirova',
    phoneNumber: '+998935552211',
    deliveryAddress: "Samarqand sh., Registon ko'chasi 14-uy",
    notes: '[Muallif dastxati bilan] Shogirdlarim va yoshlar profilaktikasi uchun',
    status: 'SHIPPED',
    totalAmount: 170000,
    createdAt: new Date(Date.now() - 1.5 * 24 * 3600 * 1000).toISOString(),
    items: [
      {
        id: 102,
        bookId: 1,
        bookTitle: "Soya va yorug'lik orasidagi hayot",
        quantity: 2,
        unitPrice: 85000,
        subtotal: 170000,
      },
    ],
    statusHistory: [
      {
        id: 5,
        oldStatus: undefined,
        newStatus: 'NEW',
        changedBy: 'Mijoz',
        notes: 'Buyurtma tizim orqali qabul qilindi',
        createdAt: new Date(Date.now() - 1.5 * 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 6,
        oldStatus: 'NEW',
        newStatus: 'CONFIRMED',
        changedBy: 'admin',
        notes: 'Buyurtma tasdiqlandi va qadoqlandi',
        createdAt: new Date(Date.now() - 1.2 * 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 7,
        oldStatus: 'CONFIRMED',
        newStatus: 'SHIPPED',
        changedBy: 'admin',
        notes: "Samarqand pochtasiga jo'natildi",
        createdAt: new Date(Date.now() - 0.8 * 24 * 3600 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 3,
    orderReference: 'ORD-492104',
    customerName: 'Alisher Usmonov',
    phoneNumber: '+998977112233',
    deliveryAddress: "Buxoro sh., Mustaqillik shoh ko'chasi 8",
    notes: "Ish vaqtida qo'ng'iroq qiling",
    status: 'CONFIRMED',
    totalAmount: 85000,
    createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    items: [
      {
        id: 103,
        bookId: 1,
        bookTitle: "Soya va yorug'lik orasidagi hayot",
        quantity: 1,
        unitPrice: 85000,
        subtotal: 85000,
      },
    ],
    statusHistory: [
      {
        id: 8,
        oldStatus: undefined,
        newStatus: 'NEW',
        changedBy: 'Mijoz',
        notes: 'Buyurtma qabul qilindi',
        createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      },
      {
        id: 9,
        oldStatus: 'NEW',
        newStatus: 'CONFIRMED',
        changedBy: 'admin',
        notes: 'Telefon orqali tasdiqlandi',
        createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 4,
    orderReference: 'ORD-318952',
    customerName: 'Zilola Toirova',
    phoneNumber: '+998998887766',
    deliveryAddress: "Andijon sh., Bobur shoh ko'chasi 45",
    notes: '[Muallif dastxati bilan] Maktab jamoasi nomidan minnatdorchilik bilan',
    status: 'NEW',
    totalAmount: 255000,
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    items: [
      {
        id: 104,
        bookId: 1,
        bookTitle: "Soya va yorug'lik orasidagi hayot",
        quantity: 3,
        unitPrice: 85000,
        subtotal: 255000,
      },
    ],
    statusHistory: [
      {
        id: 10,
        oldStatus: undefined,
        newStatus: 'NEW',
        changedBy: 'Mijoz',
        notes: 'Yangi buyurtma qabul qilindi',
        createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      },
    ],
  },
];

// Helper Functions for LocalStorage Persistence
function getStoredBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_BOOKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify([INITIAL_BOOK]));
      return [INITIAL_BOOK];
    }
    const parsed: Book[] = JSON.parse(raw);
    // Automatic migration if old title exists from previous seed
    if (parsed.length > 0 && parsed[0].title.includes('Zamonaviy Pedagogika')) {
      parsed[0] = { ...parsed[0], ...INITIAL_BOOK };
      saveStoredBooks(parsed);
      return parsed;
    }
    return parsed;
  } catch {
    return [INITIAL_BOOK];
  }
}

function saveStoredBooks(books: Book[]) {
  localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify(books));
}

function getStoredOrders(): OrderResponse[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    const parsed: OrderResponse[] = JSON.parse(raw);
    let changed = false;
    parsed.forEach((order) => {
      order.items?.forEach((item) => {
        if (item.bookTitle.includes('Zamonaviy Pedagogika')) {
          item.bookTitle = "Soya va yorug'lik orasidagi hayot";
          changed = true;
        }
      });
    });
    if (changed) {
      saveStoredOrders(parsed);
    }
    return parsed;
  } catch {
    return INITIAL_ORDERS;
  }
}

function saveStoredOrders(orders: OrderResponse[]) {
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
}

// Simulated network delay helper
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms));

// ==========================================
// 1. Books API
// ==========================================
export const bookApi = {
  getActiveBooks: async (): Promise<Book[]> => {
    await delay();
    const books = getStoredBooks();
    return books.filter((b) => b.isActive);
  },

  getBookById: async (id: number): Promise<Book> => {
    await delay();
    const books = getStoredBooks();
    const book = books.find((b) => b.id === id);
    if (!book) {
      throw new Error(`Kitob topilmadi (ID: ${id})`);
    }
    return book;
  },
};

// ==========================================
// 2. Orders API
// ==========================================
export const orderApi = {
  createOrder: async (data: CreateOrderRequest): Promise<OrderResponse> => {
    await delay(250);
    const books = getStoredBooks();
    const orders = getStoredOrders();

    // Check requested item and stock
    const itemReq = data.items[0];
    const book = books.find((b) => b.id === itemReq.bookId) || books[0];
    if (!book) {
      throw new Error("Kitob ma'lumotlari topilmadi");
    }

    const requestedQty = Math.max(1, itemReq.quantity);
    if (book.stockQuantity < requestedQty) {
      throw new Error(`Omborda yetarli kitob mavjud emas. Qoldiq: ${book.stockQuantity} ta`);
    }

    // Decrement stock
    book.stockQuantity -= requestedQty;
    saveStoredBooks(books);

    // Generate unique random reference code (ORD-XXXXXX)
    const codeNumber = Math.floor(100000 + Math.random() * 900000);
    const orderReference = `ORD-${codeNumber}`;
    const newOrderId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
    const nowIso = new Date().toISOString();
    const subtotal = book.price * requestedQty;

    const newOrder: OrderResponse = {
      id: newOrderId,
      orderReference,
      customerName: data.customerName,
      phoneNumber: data.phoneNumber,
      deliveryAddress: data.deliveryAddress,
      notes: data.notes || '',
      status: 'NEW',
      totalAmount: subtotal,
      createdAt: nowIso,
      items: [
        {
          id: Math.floor(Math.random() * 10000) + 100,
          bookId: book.id,
          bookTitle: book.title,
          quantity: requestedQty,
          unitPrice: book.price,
          subtotal,
        },
      ],
      statusHistory: [
        {
          id: 1,
          newStatus: 'NEW',
          changedBy: 'Mijoz',
          notes: 'Buyurtma qabul qilindi',
          createdAt: nowIso,
        },
      ],
    };

    orders.unshift(newOrder);
    saveStoredOrders(orders);

    return newOrder;
  },

  trackOrder: async (reference: string): Promise<OrderResponse> => {
    await delay(200);
    const clean = reference.trim().toUpperCase();
    const orders = getStoredOrders();
    const found = orders.find(
      (o) =>
        o.orderReference.toUpperCase() === clean ||
        o.orderReference.toUpperCase() === `ORD-${clean}` ||
        o.orderReference.replace('ORD-', '') === clean
    );

    if (!found) {
      const err: any = new Error('Buyurtma topilmadi');
      err.response = { status: 404, data: { message: 'Buyurtma topilmadi' } };
      throw err;
    }

    return found;
  },
};

// ==========================================
// 3. Auth API
// ==========================================
export const authApi = {
  login: async (username: string, password: string): Promise<AdminUser> => {
    await delay(300);
    const cleanUser = username.trim().toLowerCase();
    if (cleanUser === 'admin' && password === 'Admin123!') {
      const user: AdminUser = {
        token: 'mvp-mock-jwt-token-suvonov-oktam-' + Date.now(),
        username: 'admin',
        fullName: "Suvonov O'ktam (Muallif va Administrator)",
      };
      localStorage.setItem(STORAGE_KEY_AUTH_TOKEN, user.token);
      localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(user));
      return user;
    }

    const err: any = new Error("Login yoki parol noto'g'ri");
    err.response = { status: 401, data: { message: "Login yoki parol noto'g'ri" } };
    throw err;
  },

  getMe: async (): Promise<AdminUser> => {
    await delay(100);
    const userStr = localStorage.getItem(STORAGE_KEY_AUTH_USER);
    if (!userStr) {
      const err: any = new Error('Avtorizatsiyadan o‘tilmagan');
      err.response = { status: 401 };
      throw err;
    }
    return JSON.parse(userStr);
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY_AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEY_AUTH_USER);
  },

  getCurrentUser: (): AdminUser | null => {
    const userStr = localStorage.getItem(STORAGE_KEY_AUTH_USER);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },
};

// ==========================================
// 4. Admin API
// ==========================================
export const adminApi = {
  getDashboard: async (): Promise<DashboardStats> => {
    await delay(150);
    const orders = getStoredOrders();
    const books = getStoredBooks();

    const pendingOrders = orders.filter((o) => ['NEW', 'CONFIRMED', 'SHIPPED'].includes(o.status)).length;
    const deliveredOrders = orders.filter((o) => o.status === 'DELIVERED').length;
    const totalRevenue = orders
      .filter((o) => o.status !== 'CANCELLED')
      .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalStock = books.reduce((sum, b) => sum + (b.stockQuantity || 0), 0);

    return {
      totalOrders: orders.length,
      pendingOrders,
      deliveredOrders,
      totalRevenue,
      totalBooks: books.length,
      totalStock,
    };
  },

  getOrders: async (params?: {
    search?: string;
    status?: OrderStatus;
    fromDate?: string;
    toDate?: string;
    page?: number;
    size?: number;
  }): Promise<PageResponse<OrderResponse>> => {
    await delay(150);
    let orders = getStoredOrders();

    if (params?.status && params.status !== ('ALL' as any)) {
      orders = orders.filter((o) => o.status === params.status);
    }

    if (params?.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      orders = orders.filter(
        (o) =>
          o.customerName.toLowerCase().includes(q) ||
          o.phoneNumber.toLowerCase().includes(q) ||
          o.orderReference.toLowerCase().includes(q)
      );
    }

    // Sort newest first
    orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const page = params?.page || 0;
    const size = params?.size || 20;
    const totalElements = orders.length;
    const totalPages = Math.ceil(totalElements / size) || 1;
    const content = orders.slice(page * size, (page + 1) * size);

    return {
      content,
      totalElements,
      totalPages,
      size,
      number: page,
      first: page === 0,
      last: page >= totalPages - 1,
      empty: content.length === 0,
    };
  },

  getOrder: async (id: number): Promise<OrderResponse> => {
    await delay(100);
    const orders = getStoredOrders();
    const order = orders.find((o) => o.id === id);
    if (!order) {
      throw new Error(`Buyurtma topilmadi (ID: ${id})`);
    }
    return order;
  },

  updateOrderStatus: async (id: number, status: OrderStatus, notes?: string): Promise<OrderResponse> => {
    await delay(200);
    const orders = getStoredOrders();
    const books = getStoredBooks();
    const order = orders.find((o) => o.id === id);

    if (!order) {
      throw new Error(`Buyurtma topilmadi (ID: ${id})`);
    }

    const oldStatus = order.status;
    order.status = status;

    // Restore stock if cancelled
    if (status === 'CANCELLED' && oldStatus !== 'CANCELLED') {
      for (const item of order.items) {
        const book = books.find((b) => b.id === item.bookId);
        if (book) {
          book.stockQuantity += item.quantity;
        }
      }
      saveStoredBooks(books);
    }

    const historyId = (order.statusHistory?.length || 0) + 1;
    if (!order.statusHistory) {
      order.statusHistory = [];
    }

    order.statusHistory.push({
      id: historyId,
      oldStatus,
      newStatus: status,
      changedBy: 'admin',
      notes: notes?.trim() || `Buyurtma holati "${status}" ga o'zgartirildi`,
      createdAt: new Date().toISOString(),
    });

    saveStoredOrders(orders);
    return order;
  },

  getAllBooks: async (): Promise<Book[]> => {
    await delay(100);
    return getStoredBooks();
  },

  getBook: async (id: number): Promise<Book> => {
    await delay(100);
    const books = getStoredBooks();
    const book = books.find((b) => b.id === id);
    if (!book) throw new Error('Kitob topilmadi');
    return book;
  },

  updateBook: async (id: number, data: Partial<Book>): Promise<Book> => {
    await delay(250);
    const books = getStoredBooks();
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) throw new Error('Kitob topilmadi');

    books[index] = { ...books[index], ...data };
    saveStoredBooks(books);
    return books[index];
  },

  // Reset helper for testing demo data
  resetDemoData: () => {
    localStorage.setItem(STORAGE_KEY_BOOKS, JSON.stringify([INITIAL_BOOK]));
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(INITIAL_ORDERS));
  },
};
