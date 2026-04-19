// Triggering Vite HMR
import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, User, ShoppingBag, Heart, ChevronDown, Menu, X } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { getCartCount, setIsCartOpen } = useContext(ShopContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Mobile menu toggle */}
        <button 
          className={`${styles.iconBtn} ${styles.mobileMenuBtn}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={styles.logo}>
          <Link to="/">
            <img src="/LOGO.jpeg" alt="Amaira" className={styles.logoImg} />
          </Link>
        </div>

        <nav className={`${styles.navMain} ${isMobileMenuOpen ? styles.navMainOpen : ''}`}>
          <div className={styles.dropdown}>
            <span className={styles.navLink}>Shop By Collection <ChevronDown size={14} /></span>
            <div className={styles.dropdownContent}>
              <Link to="/shop?category=Kurtas" onClick={() => setIsMobileMenuOpen(false)}>Kurtas</Link>
              <Link to="/shop?category=Co-ords" onClick={() => setIsMobileMenuOpen(false)}>Co-ords</Link>
              <Link to="/shop?category=Festive Wear" onClick={() => setIsMobileMenuOpen(false)}>Festive Wear</Link>
              <Link to="/shop?category=Accessories" onClick={() => setIsMobileMenuOpen(false)}>Accessories</Link>
            </div>
          </div>
          <Link to="/shop?new=true" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>New Launch</Link>
          <Link to="/shop?filter=best-seller" className={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>Best Sellers</Link>
        </nav>

        <div className={styles.navRight}>
          <button className={styles.iconBtn}><Search size={20} /></button>
          <button className={`${styles.iconBtn} ${styles.hideOnMobile}`}><User size={20} /></button>
          <button className={`${styles.iconBtn} ${styles.hideOnMobile}`}><Heart size={20} /></button>
          <button className={styles.iconBtn} onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={20} />
            {getCartCount() > 0 && <span className={styles.cartCount}>{getCartCount()}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
