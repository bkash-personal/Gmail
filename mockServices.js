export const INITIAL_SERVICES = [
  {
    id: 101,
    category: "Facebook",
    name: "Facebook Profile / Page Followers [Real & Active]",
    nameBn: "ফেসবুক প্রোফাইল / পেজ ফলোয়ার [রিয়েল ও একটিভ]",
    ratePer1000: 120,
    min: 100,
    max: 50000,
    avgTime: "15 - 30 Minutes",
    guarantee: "30 Days Auto-Refill",
    description: "⚡ High quality real profiles with avatar and posts. Safe for all profiles."
  },
  {
    id: 102,
    category: "Facebook",
    name: "Facebook Post Likes / Reactions (Love, Wow, Care)",
    nameBn: "ফেসবুক পোস্ট লাইক / রিয়েকশন (লাভ, ওয়াও, কেয়ার)",
    ratePer1000: 45,
    min: 50,
    max: 100000,
    avgTime: "Instant (1-5 Mins)",
    guarantee: "Lifetime Drop-Safe",
    description: "❤️ Express post reactions. Choose custom emotion."
  },
  {
    id: 201,
    category: "Instagram",
    name: "Instagram Followers [Non-Drop - 365 Days Refill]",
    nameBn: "ইনস্টাগ্রাম ফলোয়ার [নন-ড্রপ - ৩৬৫ দিন রিফিল]",
    ratePer1000: 95,
    min: 100,
    max: 100000,
    avgTime: "10 - 20 Minutes",
    guarantee: "365 Days Refill",
    description: "📸 Premium Instagram followers with bio and active story status."
  },
  {
    id: 301,
    category: "YouTube",
    name: "YouTube Subscribers [Non-Drop - Monetization Quality]",
    nameBn: "ইউটিউব সাবস্ক্রাইবার [নন-ড্রপ - মনিটাইজেশন ফ্রেন্ডলি]",
    ratePer1000: 850,
    min: 50,
    max: 10000,
    avgTime: "1 - 3 Hours",
    guarantee: "Lifetime Non-Drop",
    description: "🔴 Safe subscribers for YouTube Channel Monetization."
  },
  {
    id: 403,
    category: "TikTok",
    name: "TikTok Video Views [Ultra Fast - 1M/Day Speed]",
    nameBn: "টিকটক ভিডিও ভিউজ [আল্ট্রা ফাস্ট]",
    ratePer1000: 8,
    min: 1000,
    max: 10000000,
    avgTime: "Instant",
    guarantee: "Lifetime",
    description: "⚡ Cheapest & fastest TikTok video view booster."
  }
];

export const CATEGORIES = [
  "All Categories",
  "Facebook",
  "Instagram",
  "YouTube",
  "TikTok",
  "Telegram",
  "Twitter (X)"
];

export const INITIAL_ORDERS = [
  {
    id: 98014,
    serviceId: 101,
    serviceName: "Facebook Profile / Page Followers [Real & Active]",
    link: "https://facebook.com/bdclick.official",
    quantity: 1000,
    charge: 120,
    status: "Completed",
    startCount: 4520,
    remains: 0,
    date: "2026-07-24 10:15 AM"
  }
];

export const INITIAL_TICKETS = [
  {
    id: "TCK-4029",
    subject: "Order #98015 speed inquiry",
    orderId: "98015",
    category: "Order",
    status: "Answered",
    date: "2026-07-24 02:50 PM",
    messages: [
      { sender: "User", text: "Hello, when will my order finish?", time: "02:50 PM" },
      { sender: "Admin", text: "Hi! Your order is processing smoothly and will complete shortly.", time: "03:05 PM" }
    ]
  }
];

export const PAYMENT_METHODS = [
  {
    id: "bkash",
    name: "bKash (বিকাশ)",
    type: "Send Money",
    number: "01700-000000",
    accountType: "Personal",
    logo: "📱",
    instructions: "১. *247# অথবা অ্যাপ থেকে সেন্ড মানি করুন।\n২. নিচে TrxID লিখে ভেরিফাই চাপুন।"
  },
  {
    id: "nagad",
    name: "Nagad (নগদ)",
    type: "Send Money",
    number: "01800-000000",
    accountType: "Personal",
    logo: "💸",
    instructions: "১. নগদ অ্যাপ থেকে সেন্ড মানি করুন।\n২. TrxID ইনপুট দিয়ে সাবমিট দিন।"
  }
];
