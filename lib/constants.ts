import type {
  Category,
  Collection,
  HowItWorksStep,
  MarketplaceStat,
  NavLink,
  Product,
  SellerVideo,
  VerifiedStore,
  WhyAIFeature,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Videos", href: "/videos" },
  { label: "Men", href: "#men" },
  { label: "Women", href: "#women" },
  { label: "Kids", href: "#kids" },
  { label: "Sports", href: "#sports" },
  { label: "Stores", href: "#stores" },
];

export const POPULAR_SEARCHES = [
  "Running",
  "Office",
  "Luxury",
  "Sneakers",
  "Boots",
  "Gym",
  "Travel",
];

export const SEARCH_EXAMPLES = [
  "Running shoes under $80",
  "Wedding shoes",
  "Comfortable office shoes",
  "White sneakers",
];

export const AI_SUGGESTIONS = [
  "Running shoes under $80",
  "Wedding shoes",
  "Comfortable office shoes",
  "Hiking boots for $120",
  "White sneakers",
  "Luxury formal shoes",
];

export const MARKETPLACE_STATS: MarketplaceStat[] = [
  { value: "15", suffix: "+", label: "Brands" },
  { value: "5000", suffix: "+", label: "Products" },
  { value: "250", suffix: "+", label: "Stores" },
  { value: "98", suffix: "%", label: "AI Accuracy" },
];

export const WHY_TITAN_AI: WhyAIFeature[] = [
  {
    id: "ai-search",
    title: "AI Search",
    description: "Natural language discovery that understands intent, style, and budget.",
    icon: "sparkles",
    span: "lg",
  },
  {
    id: "visual",
    title: "Visual Search",
    description: "Upload a photo and find matching shoes instantly.",
    icon: "image",
    span: "md",
  },
  {
    id: "voice",
    title: "Voice Search",
    description: "Speak your request — Titan AI listens and recommends.",
    icon: "mic",
    span: "md",
  },
  {
    id: "recommend",
    title: "Smart Recommendation",
    description: "Personalized picks with confidence scores and clear reasoning.",
    icon: "brain",
    span: "md",
  },
  {
    id: "price",
    title: "Price Comparison",
    description: "Compare verified sellers and get the best deal automatically.",
    icon: "git-compare",
    span: "md",
  },
  {
    id: "verified",
    title: "Verified Sellers",
    description: "Every store is vetted for authenticity and quality.",
    icon: "shield-check",
    span: "sm",
  },
  {
    id: "delivery",
    title: "Fast Delivery",
    description: "Trusted logistics with verified stock confirmation.",
    icon: "truck",
    span: "sm",
  },
  {
    id: "wishlist",
    title: "Wishlist",
    description: "Save favorites and get AI alerts on price drops.",
    icon: "heart",
    span: "sm",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "running",
    name: "Running",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    productCount: 890,
    icon: "zap",
  },
  {
    id: "sneakers",
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    productCount: 1240,
    icon: "footprints",
  },
  {
    id: "luxury",
    name: "Luxury",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    productCount: 210,
    icon: "gem",
  },
  {
    id: "sports",
    name: "Sports",
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80",
    productCount: 780,
    icon: "trophy",
  },
  {
    id: "boots",
    name: "Boots",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    productCount: 430,
    icon: "mountain",
  },
  {
    id: "formal",
    name: "Formal",
    image: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHNob2VzfGVufDB8fDB8fHww",
    productCount: 560,
    icon: "briefcase",
  },
  {
    id: "casual",
    name: "Casual",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    productCount: 920,
    icon: "smile",
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    productCount: 640,
    icon: "sparkles",
  },
  {
    id: "outdoor",
    name: "Outdoor",
    image: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=800&q=80",
    productCount: 380,
    icon: "trees",
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    productCount: 295,
    icon: "circle",
  },
];

export const TRENDING_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Air Max Pulse",
    brand: "Nike",
    price: 150,
    oldPrice: 180,
    rating: 4.8,
    reviewCount: 2341,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    category: "sneakers",
    aiRecommended: true,
    aiMatch: 98,
    discount: "17% OFF",
    comfortScore: 94,
    popularityScore: 98,
    verifiedStore: "Nike Official",
    seller: "Nike Official",
    badge: "Top Pick",
  },
  {
    id: "2",
    name: "Ultraboost 24",
    brand: "Adidas",
    price: 190,
    oldPrice: 220,
    rating: 4.9,
    reviewCount: 1876,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    category: "running",
    aiRecommended: true,
    aiMatch: 96,
    discount: "14% OFF",
    comfortScore: 97,
    popularityScore: 95,
    verifiedStore: "Adidas Store",
    seller: "Adidas Store",
    badge: "Trending",
  },
  {
    id: "3",
    name: "Classic Leather",
    brand: "Reebok",
    price: 85,
    oldPrice: 100,
    rating: 4.6,
    reviewCount: 943,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    category: "sneakers",
    aiMatch: 91,
    discount: "15% OFF",
    comfortScore: 88,
    popularityScore: 91,
    verifiedStore: "Reebok Hub",
    seller: "Reebok Hub",
  },
  {
    id: "4",
    name: "Oxford Elite",
    brand: "Cole Haan",
    price: 220,
    oldPrice: 260,
    rating: 4.7,
    reviewCount: 512,
    image: "https://images.unsplash.com/photo-1550399865-ec7d23b18e8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNob2VzfGVufDB8fDB8fHww",
    category: "formal",
    aiRecommended: true,
    aiMatch: 94,
    discount: "15% OFF",
    comfortScore: 92,
    popularityScore: 87,
    verifiedStore: "Cole Haan",
    seller: "Cole Haan",
  },
  {
    id: "5",
    name: "Cloud 5",
    brand: "On Running",
    price: 140,
    oldPrice: 160,
    rating: 4.8,
    reviewCount: 1203,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    category: "running",
    aiMatch: 95,
    discount: "13% OFF",
    comfortScore: 96,
    popularityScore: 93,
    verifiedStore: "On Running",
    seller: "On Running",
    badge: "New",
  },
  {
    id: "6",
    name: "Timberland Pro",
    brand: "Timberland",
    price: 175,
    oldPrice: 200,
    rating: 4.5,
    reviewCount: 678,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    category: "boots",
    aiMatch: 89,
    discount: "12% OFF",
    comfortScore: 90,
    popularityScore: 85,
    verifiedStore: "Timberland Co.",
    seller: "Timberland Co.",
  },
];

export const VERIFIED_STORES: VerifiedStore[] = [
  {
    id: "1",
    name: "Nike Official",
    logo: "N",
    rating: 4.9,
    products: 342,
    followers: "12.4K",
    location: "Portland, OR",
    verified: true,
  },
  {
    id: "2",
    name: "Adidas Store",
    logo: "A",
    rating: 4.8,
    products: 289,
    followers: "9.8K",
    location: "Herzogenaurach",
    verified: true,
  },
  {
    id: "3",
    name: "Premium Soles Co.",
    logo: "P",
    rating: 4.9,
    products: 156,
    followers: "6.2K",
    location: "New York, NY",
    verified: true,
  },
  {
    id: "4",
    name: "Urban Kicks",
    logo: "U",
    rating: 4.7,
    products: 198,
    followers: "4.5K",
    location: "Los Angeles, CA",
    verified: true,
  },
];

export const COLLECTIONS: Collection[] = [
  {
    id: "summer",
    name: "Summer Edit",
    image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvZXMlMjBzbmVha2VyfGVufDB8fDB8fHww",
    itemCount: 420,
    season: "2026",
    tall: true,
  },
  {
    id: "winter",
    name: "Winter",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=600&q=80",
    itemCount: 310,
    season: "2026",
  },
  {
    id: "running",
    name: "Running Lab",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    itemCount: 580,
    tall: true,
  },
  {
    id: "luxury",
    name: "Luxury",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    itemCount: 145,
  },
  {
    id: "formal",
    name: "Formal",
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXMlMjBzbmVha2VyfGVufDB8fDB8fHww",
    itemCount: 230,
  },
  {
    id: "sneakers",
    name: "Sneaker Culture",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
    itemCount: 890,
    tall: true,
  },
];

export const HOW_IT_WORKS: HowItWorksStep[] = [
  {
    step: 1,
    title: "Search",
    description:
      "Describe your needs using text, voice, or an image — Titan listens instantly.",
    icon: "search",
    time: "3 Seconds",
  },
  {
    step: 2,
    title: "AI Analysis",
    description:
      "Titan AI understands style, fit, budget, and occasion with precision.",
    icon: "sparkles",
    time: "1 Second",
  },
  {
    step: 3,
    title: "Compare Stores",
    description:
      "We compare verified sellers for price, stock, authenticity, and quality.",
    icon: "git-compare",
    time: "2 Seconds",
  },
  {
    step: 4,
    title: "Best Match",
    description:
      "Get ranked recommendations with confidence scores tailored to you.",
    icon: "target",
    time: "Instant",
  },
  {
    step: 5,
    title: "Purchase",
    description:
      "Request the order — Titan verifies the seller and delivers with care.",
    icon: "shopping-bag",
    time: "Secure",
  },
];

export const PARTNER_BENEFITS = [
  "Reach millions of AI-powered shoppers",
  "Verified seller badge & premium placement",
  "Full analytics dashboard with real-time insights",
  "Low commission, maximum visibility",
  "AI-driven product discovery engine",
];

export const PARTNER_CHECKLIST = [
  "Business verification",
  "Inventory authenticity check",
  "Quality standards review",
  "Dashboard onboarding",
];

export const FOOTER_LINKS = {
  company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
  products: [
    { label: "Sneakers", href: "#" },
    { label: "Running", href: "#" },
    { label: "Formal", href: "#" },
    { label: "Boots", href: "#" },
    { label: "Luxury", href: "#" },
  ],
  solutions: [
    { label: "Titan AI", href: "#ai" },
    { label: "Visual Search", href: "#" },
    { label: "Voice Search", href: "#" },
    { label: "For Stores", href: "/become-seller" },
  ],
  resources: [
    { label: "Help Center", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Community", href: "#" },
  ],
  developers: [
    { label: "API Docs", href: "#" },
    { label: "SDKs", href: "#" },
    { label: "Status", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  support: [
    { label: "Order Status", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Contact Support", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Seller Agreement", href: "#" },
  ],
};

export const AI_RESPONSES: Record<string, string> = {
  default:
    "I'd love to help you find the perfect shoes! Based on your request, I've curated some options from our verified stores.\n\n**1. Nike Air Max Pulse** — $150\nGreat all-around sneaker with excellent cushioning.\n\n**2. Adidas Ultraboost 24** — $190\nPremium running shoe with responsive boost technology.\n\n**3. Reebok Classic Leather** — $85\nTimeless style at an accessible price point.\n\nWould you like me to compare these or find something more specific?",
  running:
    "For running shoes, I recommend focusing on cushioning and support:\n\n**1. Adidas Ultraboost 24** — $190 (Best overall)\n**2. On Cloud 5** — $140 (Lightweight daily trainer)\n**3. Nike Pegasus 41** — $130 (Great value)\n\nWhat's your weekly mileage?",
  wedding:
    "For wedding footwear, elegance meets comfort:\n\n**1. Cole Haan Oxford Elite** — $220\n**2. Allen Edmonds Park Avenue** — $395\n**3. Magnanni Patent Loafer** — $350\n\nWhat's the dress code?",
  office:
    "For office wear, professional style with all-day comfort:\n\n**1. Cole Haan GrandPro** — $150\n**2. Clarks Un Costa** — $120\n**3. Ecco Soft 7** — $160\n\nLace-ups or loafers?",
  budget:
    "Great shoes don't have to break the bank! Under $80:\n\n**1. Reebok Classic Leather** — $85\n**2. Converse Chuck 70** — $75\n**3. Vans Old Skool** — $65\n\nAny specific style preference?",
  hiking:
    "For hiking at $120, here are my top verified picks:\n\n**1. Salomon X Ultra 4** — $120\nExcellent grip and ankle support for trails.\n\n**2. Merrell Moab 3** — $115\nAll-day comfort with Vibram sole.\n\n**3. Columbia Newton Ridge** — $99\nGreat value waterproof option.\n\nWhat terrain will you be hiking on?",
};

export const AI_DEMO_PRODUCTS = TRENDING_PRODUCTS.slice(0, 3);

export const TRUST_BADGES = [
  "Verified Stores",
  "AI Match Guarantee",
  "Human Quality Review",
];

/**
 * TikTok-style seller video feed — footwear only.
 * Sources are Mixkit / Pexels clips of shoes, running, tying sneakers (no unrelated content).
 */
export const SELLER_VIDEOS: SellerVideo[] = [
  {
    id: "v1",
    src: "https://assets.mixkit.co/videos/preview/mixkit-young-man-tying-his-shoes-outdoors-41090-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    caption: "New drop alert 🔥 Air Max Pulse — limited stock at Nike Official",
    likes: "24.8K",
    comments: "1.2K",
    shares: "890",
    brand: "Nike",
    store: "Nike Official",
    category: "Lifestyle",
    trending: true,
    newDrop: true,
    seller: {
      id: "1",
      name: "Nike Official",
      logo: "N",
      verified: true,
      followers: "12.4K",
    },
    product: {
      id: "1",
      name: "Air Max Pulse",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80",
    },
  },
  {
    id: "v2",
    src: "https://assets.mixkit.co/videos/preview/mixkit-woman-running-in-sport-shoes-on-a-track-41195-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    caption: "Street style fit check — Ultraboost vibes from Adidas Store",
    likes: "18.3K",
    comments: "942",
    shares: "610",
    brand: "Adidas",
    store: "Adidas Store",
    category: "Running",
    trending: true,
    seller: {
      id: "2",
      name: "Adidas Store",
      logo: "A",
      verified: true,
      followers: "9.8K",
    },
    product: {
      id: "2",
      name: "Ultraboost Light",
      price: 190,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&q=80",
    },
  },
  {
    id: "v3",
    src: "https://assets.mixkit.co/videos/preview/mixkit-girl-putting-on-shoes-40298-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80",
    caption: "Lacing up in store ✨ Heritage leather loafers, hand-finished",
    likes: "31.1K",
    comments: "2.4K",
    shares: "1.1K",
    brand: "Cole Haan",
    store: "Premium Soles Co.",
    category: "Formal",
    seller: {
      id: "3",
      name: "Premium Soles Co.",
      logo: "P",
      verified: true,
      followers: "6.2K",
    },
    product: {
      id: "3",
      name: "Heritage Loafer",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&q=80",
    },
  },
  {
    id: "v4",
    src: "https://videos.pexels.com/video-files/3121459/3121459-sd_640_360_24fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&q=80",
    caption: "Urban night run 🌃 Lightweight kicks built for the city",
    likes: "12.6K",
    comments: "580",
    shares: "340",
    brand: "Nike",
    store: "Urban Kicks",
    category: "Running",
    trending: true,
    seller: {
      id: "4",
      name: "Urban Kicks",
      logo: "U",
      verified: true,
      followers: "4.5K",
    },
    product: {
      id: "4",
      name: "City Runner Pro",
      price: 125,
      image:
        "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=200&q=80",
    },
  },
  {
    id: "v5",
    src: "https://videos.pexels.com/video-files/4859266/4859266-sd_640_360_30fps.mp4",
    poster:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    caption: "Unboxing the cleanest white sneakers of the season 👟",
    likes: "45.2K",
    comments: "3.1K",
    shares: "2.0K",
    brand: "Adidas",
    store: "Adidas Store",
    category: "Lifestyle",
    newDrop: true,
    trending: true,
    seller: {
      id: "2",
      name: "Adidas Store",
      logo: "A",
      verified: true,
      followers: "9.8K",
    },
    product: {
      id: "5",
      name: "Samba OG",
      price: 100,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&q=80",
    },
  },
  {
    id: "v6",
    src: "https://assets.mixkit.co/videos/preview/mixkit-person-walking-on-a-road-with-sneakers-41079-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
    caption: "990v5 daily rotation — New Balance made for the city",
    likes: "9.4K",
    comments: "412",
    shares: "210",
    brand: "New Balance",
    store: "JD Sports",
    category: "Lifestyle",
    seller: {
      id: "5",
      name: "JD Sports",
      logo: "J",
      verified: true,
      followers: "8.1K",
    },
    product: {
      id: "6",
      name: "990v5",
      price: 185,
      image:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&q=80",
    },
  },
  {
    id: "v7",
    src: "https://assets.mixkit.co/videos/preview/mixkit-young-man-tying-his-shoes-outdoors-41090-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80",
    caption: "Court ready 🏀 Jordan heat just dropped at Stadium Goods",
    likes: "22.0K",
    comments: "1.8K",
    shares: "940",
    brand: "Nike",
    store: "Stadium Goods",
    category: "Basketball",
    newDrop: true,
    seller: {
      id: "6",
      name: "Stadium Goods",
      logo: "S",
      verified: true,
      followers: "15.2K",
    },
    product: {
      id: "7",
      name: "Air Jordan 1",
      price: 170,
      image:
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&q=80",
    },
  },
  {
    id: "v8",
    src: "https://assets.mixkit.co/videos/preview/mixkit-girl-putting-on-shoes-40298-large.mp4",
    poster:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
    caption: "Vans Old Skool classics — skate energy, everyday wear",
    likes: "7.8K",
    comments: "290",
    shares: "160",
    brand: "Vans",
    store: "Foot Locker",
    category: "Casual",
    seller: {
      id: "7",
      name: "Foot Locker",
      logo: "F",
      verified: true,
      followers: "11.0K",
    },
    product: {
      id: "8",
      name: "Old Skool",
      price: 75,
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=200&q=80",
    },
  },
];
