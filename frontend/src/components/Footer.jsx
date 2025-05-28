"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { MessageSquare, Share2, Heart, Globe, ArrowRight } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-neutral-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold text-gradient">Collectibles</h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your trusted marketplace for rare and unique collectibles from around the world.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://facebook.com" icon={<MessageSquare size={18} />} />
              <SocialLink href="https://twitter.com" icon={<Share2 size={18} />} />
              <SocialLink href="https://instagram.com" icon={<Heart size={18} />} />
              <SocialLink href="https://youtube.com" icon={<Globe size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="/marketplace">Marketplace</FooterLink>
              <FooterLink href="/categories">Categories</FooterLink>
              <FooterLink href="/sell">Sell an Item</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Help & Support</h4>
            <ul className="space-y-2">
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/shipping">Shipping Policy</FooterLink>
              <FooterLink href="/returns">Returns & Refunds</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Subscribe</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Stay updated with our latest collections and offers.
            </p>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-[var(--primary)] flex-grow"
              />
              <motion.button
                className="bg-[var(--primary)] text-white p-2 rounded-r-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Collectibles. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-gray-500 hover:text-[var(--primary)] text-sm">
              Contact
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/careers" className="text-gray-500 hover:text-[var(--primary)] text-sm">
              Careers
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/help" className="text-gray-500 hover:text-[var(--primary)] text-sm">
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Footer Link Component
const FooterLink = ({ href, children }) => {
  return (
    <li>
      <Link
        href={href}
        className="text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)] transition-colors duration-200"
      >
        {children}
      </Link>
    </li>
  )
}

// Social Link Component
const SocialLink = ({ href, icon }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[var(--primary)] hover:text-white transition-colors duration-200"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  )
}

export default Footer
