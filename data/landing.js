import {
    BarChart3,
    Receipt,
    PieChart,
    CreditCard,
    Globe,
    Zap,
  } from "lucide-react";
  
  // 📊 Stats Data
  export const statsData = [
    { value: "120,000+", label: "Active Users Worldwide" },
    { value: "$5.1B+", label: "Total Transactions Managed" },
    { value: "24/7", label: "Real-Time Support" },
    { value: "4.8/5", label: "Average User Rating" },
  ];
  
  // 🚀 Features Data
  export const featuresData = [
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "AI-Powered Budgeting",
      description:
        "Automatically create and adjust budgets based on your spending habits and income trends.",
    },
    {
      icon: <Receipt className="h-8 w-8 text-green-600" />,
      title: "Instant Bill Tracking",
      description:
        "Track, categorize, and get reminders for upcoming bills to avoid late fees.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-green-600" />,
      title: "Investment Monitoring",
      description:
        "Analyze stocks, crypto, and real estate investments in a single dashboard.",
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      title: "Smart Expense Alerts",
      description:
        "Receive real-time notifications when your spending crosses a set limit.",
    },
    {
      icon: <Globe className="h-8 w-8 text-green-600" />,
      title: "Cross-Border Transactions",
      description:
        "Seamlessly send and receive money internationally with real-time exchange rates.",
    },
    {
      icon: <Zap className="h-8 w-8 text-green-600" />,
      title: "Subscription Management",
      description:
        "Detect and manage all your recurring subscriptions in one place to cut unwanted costs.",
    },
  ];
  
  // ⚙️ How It Works Data
  export const howItWorksData = [
    {
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      title: "1. Sign Up for Free",
      description:
        "Join in less than 60 seconds with a secure and easy registration process.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-green-600" />,
      title: "2. Link Your Accounts",
      description:
        "Connect your bank, credit cards, and digital wallets for real-time tracking.",
    },
    {
      icon: <PieChart className="h-8 w-8 text-green-600" />,
      title: "3. Gain Financial Insights",
      description:
        "Receive personalized reports and AI-driven insights to optimize your financial health.",
    },
  ];
  
  // 💬 Testimonials Data
  export const testimonialsData = [
    {
      name: "David Thompson",
      role: "Entrepreneur",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      quote:
        "This app has revolutionized how I track my expenses. The budgeting AI helped me reduce unnecessary spending by 20% in just a month!",
    },
    {
      name: "Sophia Martinez",
      role: "Freelance Designer",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      quote:
        "The subscription management feature saved me over $300 last year by canceling unused services. A must-have tool!",
    },
    {
      name: "Jonathan Lee",
      role: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/48.jpg",
      quote:
        "Tracking multiple accounts and investments in one place is a game-changer. I can finally see where my money is going effortlessly.",
    },
  ];
  