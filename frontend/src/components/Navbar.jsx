"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, ShoppingBag, User, LogOut, Settings, UserCircle } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { isAuthenticated, isAdmin, isUser, user, logout } = useAuth()

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 w-[100%] z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div className="font-bold text-2xl text-gradient" whileHover={{ scale: 1.05 }}>
              Collectibles
            </motion.div>
          </Link>{" "}
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/browse-products">Browse</NavLink>
            {isAuthenticated() && isUser() && (
              <>
                <NavLink href="/user/cart">Cart</NavLink>
                {/* <NavLink href="/user/profile">Profile</NavLink> */}
                <NavLink href="/user/orders">Orders</NavLink>
              </>
            )}
            {isAuthenticated() && isAdmin() && (
              <>
                <NavLink href="/admin/profile">Dashboard</NavLink>
                <NavLink href="/admin/add-products">Add Products</NavLink>
                <NavLink href="/admin/manage-products">Manage Products</NavLink>
                <NavLink href="/admin/manage-users">Manage Users</NavLink>
              </>
            )}
          </nav>{" "}
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated() && isUser() && (
              <Link href="/user/cart">
                <motion.button
                  className="p-2 rounded-full text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingBag size={20} />
                </motion.button>
              </Link>
            )}

            {!isAuthenticated() ? (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <motion.button
                    className="flex items-center gap-2 py-2 px-4 bg-[var(--primary)] text-white rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User size={16} />
                    <span>Sign In</span>
                  </motion.button>
                </Link>
                <Link href="/signup">
                  <motion.button
                    className="flex items-center gap-2 py-2 px-4 border border-[var(--primary)] text-[var(--primary)] rounded-lg transition-all duration-300 hover:bg-[var(--primary)] hover:text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Sign Up</span>
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="relative">
                <motion.button
                  className="flex items-center gap-2 py-2 px-4 bg-[var(--primary)] text-white rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <UserCircle size={16} />
                  <span>{user?.email?.split("@")[0] || "User"}</span>
                </motion.button>

                {showUserMenu && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {isUser() && (
                      <Link
                        href="/user/profile"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                      >
                        <Settings size={16} />
                        Profile
                      </Link>
                    )}
                    {isAdmin() && (
                      <Link
                        href="/admin/profile"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                      >
                        <Settings size={16} />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-neutral-700 w-full text-left"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 bg-white dark:bg-neutral-900 z-40 pt-20 px-4 ${isMobileMenuOpen ? "block" : "hidden"} md:hidden`}
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col gap-4">
          <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/browse-products" onClick={() => setIsMobileMenuOpen(false)}>
            Browse
          </MobileNavLink>

          {isAuthenticated() && isUser() && (
            <>
              <MobileNavLink href="/user/cart" onClick={() => setIsMobileMenuOpen(false)}>
                Cart
              </MobileNavLink>
              <MobileNavLink href="/user/profile" onClick={() => setIsMobileMenuOpen(false)}>
                Profile
              </MobileNavLink>
            </>
          )}

          {isAuthenticated() && isAdmin() && (
            <>
              <MobileNavLink href="/admin/add-products" onClick={() => setIsMobileMenuOpen(false)}>
                Add Products
              </MobileNavLink>
              <MobileNavLink href="/admin/manage-products" onClick={() => setIsMobileMenuOpen(false)}>
                Manage Products
              </MobileNavLink>
              <MobileNavLink href="/admin/manage-users" onClick={() => setIsMobileMenuOpen(false)}>
                Manage Users
              </MobileNavLink>
              <MobileNavLink href="/admin/profile" onClick={() => setIsMobileMenuOpen(false)}>
                Admin Profile
              </MobileNavLink>
            </>
          )}

          <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
            {!isAuthenticated() ? (
              <div className="flex gap-2">
                <Link href="/login">
                  <button className="flex items-center gap-2 py-2 px-4 bg-[var(--primary)] text-white rounded-lg">
                    <User size={16} />
                    <span>Sign In</span>
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="flex items-center gap-2 py-2 px-4 border border-[var(--primary)] text-[var(--primary)] rounded-lg">
                    <span>Sign Up</span>
                  </button>
                </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  logout()
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center gap-2 py-2 px-4 bg-red-600 text-white rounded-lg"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </nav>
      </motion.div>
    </motion.header>
  )
}

// Desktop Nav Link component
const NavLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="relative text-gray-700 hover:text-[var(--primary)] dark:text-gray-300 dark:hover:text-[var(--primary)] transition-colors duration-200 font-medium"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

// Mobile Nav Link component
const MobileNavLink = ({ href, children, onClick }) => {
  return (
    <Link
      href={href}
      className="py-3 text-lg text-gray-700 hover:text-[var(--primary)] dark:text-gray-300 dark:hover:text-[var(--primary)] transition-colors border-b border-gray-100 dark:border-gray-800 flex justify-between items-center"
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

export default Navbar
