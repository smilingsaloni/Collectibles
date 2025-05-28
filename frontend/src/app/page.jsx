"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowRight, Star, TrendingUp, Shield, Zap, Users, Award } from "lucide-react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const categories = [
  { name: "Trading Cards", icon: "/images/categories/cards.svg", color: "from-blue-400 to-blue-600", items: "12.5k+" },
  { name: "Coins", icon: "/images/categories/coins.svg", color: "from-amber-400 to-amber-600", items: "8.2k+" },
  { name: "Vinyl Records", icon: "/images/categories/vinyl.svg", color: "from-rose-400 to-rose-600", items: "15.7k+" },
  { name: "Comics", icon: "/images/categories/comics.svg", color: "from-emerald-400 to-emerald-600", items: "9.8k+" },
  { name: "Stamps", icon: "/images/categories/stamps.svg", color: "from-purple-400 to-purple-600", items: "6.3k+" },
  { name: "Toys", icon: "/images/categories/toys.svg", color: "from-orange-400 to-orange-600", items: "11.1k+" },
]

const featuredItems = [
  {
    id: 1,
    title: "First Edition Charizard Card",
    image: "/placeholder.svg?height=300&width=300",
    price: "$12,500",
    originalPrice: "$15,000",
    seller: "PremiumCollector",
    category: "Trading Cards",
    rating: 4.9,
    verified: true,
    trending: true,
  },
  {
    id: 2,
    title: "1794 Flowing Hair Silver Dollar",
    image: "/placeholder.svg?height=300&width=300",
    price: "$4,750",
    originalPrice: "$5,200",
    seller: "RareTreasures",
    category: "Coins",
    rating: 4.8,
    verified: true,
    trending: false,
  },
  {
    id: 3,
    title: "The Beatles - Abbey Road (1969)",
    image: "/placeholder.svg?height=300&width=300",
    price: "$895",
    originalPrice: "$1,100",
    seller: "VinylVault",
    category: "Vinyl Records",
    rating: 4.7,
    verified: true,
    trending: true,
  },
]

const stats = [
  { icon: Users, value: "50k+", label: "Active Collectors" },
  { icon: Award, value: "100k+", label: "Items Sold" },
  { icon: Shield, value: "99.9%", label: "Secure Transactions" },
  { icon: TrendingUp, value: "$2M+", label: "Total Volume" },
]

const page = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <motion.div
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm font-medium">Trusted by 50,000+ collectors</span>
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Discover
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                    Rare Treasures
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Join the world's most trusted marketplace for collectibles. Buy, sell, and trade unique items from
                  trading cards to vinyl records with confidence.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    variants={fadeIn}
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Explore Collection</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>

                  <motion.button
                    variants={fadeIn}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Selling
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  className="grid grid-cols-2 lg:grid-cols-4 gap-6"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {stats.map((stat, index) => (
                    <motion.div key={index} variants={fadeIn} className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                        <stat.icon className="w-5 h-5 text-purple-400" />
                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right Content - Search */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Find Your Next Treasure</h3>

                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for collectibles..."
                        className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                      />
                      <motion.button
                        className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Search className="h-5 w-5" />
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {["Cards", "Coins", "Vinyl"].map((category, index) => (
                        <motion.button
                          key={category}
                          className="py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-medium hover:bg-white/20 transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center"
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Star className="w-6 h-6 text-white" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive into our extensive collection of rare and unique items across multiple categories
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={fadeIn}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden cursor-pointer"
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div
                  className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                >
                  <Image
                    src={category.icon || "/placeholder.svg"}
                    alt={category.name}
                    width={32}
                    height={32}
                    className="object-contain filter brightness-0 invert"
                  />
                </div>

                {/* Content */}
                <div className="text-center relative z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.items} items available</p>

                  <motion.div
                    className="inline-flex items-center gap-2 text-purple-600 font-medium group-hover:gap-3 transition-all duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Featured Collectibles
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl">
                Handpicked rare and valuable items from our trusted community of collectors
              </p>
            </div>

            <Link
              href="/marketplace"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                variants={fadeIn}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                whileHover={{ y: -12 }}
                custom={index}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
                      {item.category}
                    </span>
                    {item.trending && (
                      <span className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </span>
                    )}
                  </div>

                  {/* Verified Badge */}
                  {item.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white p-2 rounded-full">
                      <Shield className="w-4 h-4" />
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 flex-1">{item.title}</h3>
                    <div className="flex items-center gap-1 ml-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">by {item.seller}</p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{item.price}</span>
                      <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-semibold">
                      20% OFF
                    </span>
                  </div>

                  <motion.button
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to start your collecting journey on our trusted platform
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 transform -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-purple-300 to-pink-300 transform -translate-y-1/2"></div>

            {[
              {
                step: "01",
                title: "Create Account",
                description: "Sign up and verify your identity to join our trusted community of collectors.",
                icon: Users,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Browse & List",
                description: "Explore thousands of items or list your own treasures with detailed descriptions.",
                icon: Search,
                color: "from-purple-500 to-pink-500",
              },
              {
                step: "03",
                title: "Secure Trade",
                description: "Complete transactions safely with our escrow service and buyer protection.",
                icon: Shield,
                color: "from-green-500 to-emerald-500",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeIn} className="relative text-center group" whileHover={{ y: -8 }}>
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg z-10">
                  {item.step}
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  ></div>

                  {/* Icon */}
                  <motion.div
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg relative z-10`}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed relative z-10">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to Start
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Collecting?
              </span>
            </motion.h2>

            <motion.p
              className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Join thousands of passionate collectors and discover your next treasure today. Start your journey with us!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              <motion.button
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default page
