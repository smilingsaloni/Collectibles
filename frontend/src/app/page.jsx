'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const categories = [
  { name: 'Trading Cards', icon: '/images/categories/cards.svg', color: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'Coins', icon: '/images/categories/coins.svg', color: 'bg-amber-100 dark:bg-amber-900/30' },
  { name: 'Vinyl Records', icon: '/images/categories/vinyl.svg', color: 'bg-rose-100 dark:bg-rose-900/30' },
  { name: 'Comics', icon: '/images/categories/comics.svg', color: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { name: 'Stamps', icon: '/images/categories/stamps.svg', color: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'Toys', icon: '/images/categories/toys.svg', color: 'bg-orange-100 dark:bg-orange-900/30' },
];

const featuredItems = [
  {
    id: 1,
    title: 'First Edition Charizard Card',
    image: '/images/featured/charizard.svg',
    price: '$12,500',
    seller: 'PremiumCollector',
    category: 'Trading Cards'
  },
  {
    id: 2,
    title: '1794 Flowing Hair Silver Dollar',
    image: '/images/featured/silver-dollar.svg',
    price: '$4,750',
    seller: 'RareTreasures',
    category: 'Coins'
  },
  {
    id: 3,
    title: 'The Beatles - Abbey Road (1969)',
    image: '/images/featured/abbey-road.svg',
    price: '$895',
    seller: 'VinylVault',
    category: 'Vinyl Records'
  },
];

const page = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--secondary)] to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
        <div className="absolute inset-0 hero-pattern opacity-40"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 text-gradient"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Discover Rare Treasures in the World of Collectibles
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Buy, sell, and trade unique items from trading cards to vinyl records in our trusted marketplace.
            </motion.p>

            <motion.div
              className="max-w-2xl mx-auto mb-12 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div
                className="absolute -right-10 -top-10 w-20 h-20 text-[var(--primary)] animate-float"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-20">
                  <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
                </svg>
              </motion.div>

              <motion.div
                className="absolute -left-5 bottom-0 w-16 h-16 text-[var(--accent)] animate-float"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                style={{ animationDelay: '1s' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-20">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.547 4.505a8.25 8.25 0 1011.672 8.214l-.46-.46a2.252 2.252 0 01-.422-.586l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A8.23 8.23 0 0012 3.25a8.23 8.23 0 00-7.238 4.434 2.25 2.25 0 00.448 2.673l.232.18-.213.181a2.25 2.25 0 00-.438 2.725" clipRule="evenodd" />
                </svg>
              </motion.div>

              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search for collectibles..."
                  className="w-full px-6 py-4 rounded-full shadow-md border-0 focus:ring-2 focus:ring-[var(--primary)]"
                />
                <motion.button
                  className="absolute right-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white p-2 rounded-full transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search className="h-5 w-5" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.button
                variants={fadeIn}
                className="btn-primary font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collection
              </motion.button>
              <motion.button
                variants={fadeIn}
                className="px-6 py-3 bg-white text-[var(--primary)] border border-[var(--primary)] rounded-lg transition-all duration-300 hover:bg-gray-50 transform hover:-translate-y-1 hover:shadow-lg dark:bg-transparent dark:border-white dark:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sell an Item
              </motion.button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute -bottom-6 left-0 w-full h-12 bg-white dark:bg-neutral-950 rounded-t-[50%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Categories</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dive into our extensive collection of rare and unique items across multiple categories
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={fadeIn}
                className={`${category.color} rounded-xl p-6 text-center card-hover category-card cursor-pointer`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 relative category-icon">
                  <div className="absolute inset-0 bg-white/80 dark:bg-black/30 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{category.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="flex justify-between items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Collectibles</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Handpicked rare and valuable items from our community
              </p>
            </div>
            <Link
              href="/marketplace"
              className="hidden md:flex items-center text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
            >
              View all <ArrowRight className="h-4 w-4 ml-1" />
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
                className="bg-white dark:bg-neutral-800 rounded-xl overflow-hidden shadow-md card-hover"
                whileHover={{ y: -8 }}
                custom={index}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white dark:bg-neutral-900 px-2 py-1 rounded-md text-xs font-medium">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Seller: {item.seller}</p>
                    <p className="text-[var(--accent)] font-bold">{item.price}</p>
                  </div>
                  <motion.button
                    className="w-full py-3 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-all duration-300 font-medium"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/marketplace"
              className="inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
            >
              View all collectibles <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235e3bee' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Simple steps to start buying and selling collectibles on our platform
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                title: 'Create an Account',
                description: 'Sign up and set up your profile to start your collecting journey.',
                icon: '/images/icons/account.svg',
                color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
              },
              {
                title: 'Browse or List Items',
                description: 'Explore our marketplace or list your own treasures for sale.',
                icon: '/images/icons/browse.svg',
                color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200'
              },
              {
                title: 'Secure Transactions',
                description: 'Buy or sell with confidence through our secure payment system.',
                icon: '/images/icons/secure.svg',
                color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex flex-col items-center text-center p-6 rounded-xl border border-gray-100 dark:border-gray-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm card-hover"
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className={`w-16 h-16 flex items-center justify-center rounded-full mb-5 ${item.color} animate-float`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={32}
                    height={32}
                  />
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[var(--accent)] opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join Our Community of Collectors
            </motion.h2>
            <motion.p
              className="text-xl mb-8 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Start your collecting journey today and connect with passionate collectors from around the world.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                className="px-8 py-4 bg-white text-[var(--primary)] rounded-lg transition-all duration-300 hover:bg-gray-50 transform hover:-translate-y-1 hover:shadow-lg font-medium"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up Now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default page;