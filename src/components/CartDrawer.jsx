import React, { useContext, useState, useEffect } from 'react';
import { 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Gift, 
  CreditCard, 
  ShieldCheck, 
  Zap,
  Ticket,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import styles from './CartDrawer.module.css';

const CartDrawer = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    products, 
    updateQuantity, 
    removeFromCart, 
    getCartTotal, 
    formatPrice,
    addToCart,
    isCartOpen,
    setIsCartOpen
  } = useContext(ShopContext);

  const [couponCode, setCouponCode] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  const total = getCartTotal();
  const freeShippingThreshold = 999;
  const progress = Math.min((total / freeShippingThreshold) * 100, 100);
  const remainingForFree = Math.max(0, freeShippingThreshold - total);

  useEffect(() => {
    if (progress === 100 && !showCelebration && total > 0) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#EDE9FF', '#FFB30E']
      });
      setShowCelebration(true);
    } else if (progress < 100) {
      setShowCelebration(false);
    }
  }, [progress, total]);

  // Upsell: Products not in cart
  const cartIds = cart.map(item => item.id);
  const upsellProducts = products.filter(p => !cartIds.includes(p.id)).slice(0, 3);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          />
          <motion.div 
            className={styles.sidebar}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <ShoppingBag size={20} />
                <span>YOUR BAG ({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}><X size={24} /></button>
            </div>

            <div className={styles.content}>
              {/* Free Shipping Progress */}
              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  {progress === 100 ? (
                    <span className={styles.congrats}><Zap size={16} /> YOU'VE UNLOCKED FREE SHIPPING!</span>
                  ) : (
                    <span>Add <strong>{formatPrice(remainingForFree)}</strong> more for free shipping</span>
                  )}
                </div>
                <div className={styles.progressBar}>
                  <motion.div 
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                  <div className={styles.giftIcon} style={{ left: '100%' }}>
                    <Gift size={16} />
                  </div>
                </div>
              </div>

              {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                  <ShoppingBag size={64} strokeWidth={1} />
                  <h3>Your bag is empty</h3>
                  <p>Looks like you haven't added anything to your cart yet.</p>
                  <button className={styles.shopBtn} onClick={() => setIsCartOpen(false)}>START SHOPPING</button>
                </div>
              ) : (
                <>
                  <div className={styles.cartItems}>
                    {cart.map(item => {
                      const product = products.find(p => p.id === item.id);
                      if (!product) return null;
                      return (
                        <div key={item.id} className={styles.cartItem}>
                          <img src={product.images[0]} alt={product.name} />
                          <div className={styles.itemInfo}>
                            <div className={styles.itemHeader}>
                              <h4>{product.name}</h4>
                              <button onClick={() => removeFromCart(item.id)}><Trash2 size={16} /></button>
                            </div>
                            <p className={styles.itemVariant}>Size: M | Cotton</p>
                            <div className={styles.itemPriceRow}>
                              <div className={styles.quantity}>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                              </div>
                              <span className={styles.itemPrice}>{formatPrice(product.price * item.quantity)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Upsell Section */}
                  {upsellProducts.length > 0 && (
                    <div className={styles.upsell}>
                      <h5>YOU MAY ALSO LIKE</h5>
                      <div className={styles.upsellGrid}>
                        {upsellProducts.map(p => (
                          <div key={p.id} className={styles.upsellItem}>
                            <img src={p.images[0]} alt={p.name} />
                            <div className={styles.upsellInfo}>
                              <h6>{p.name}</h6>
                              <span>{formatPrice(p.price)}</span>
                              <button onClick={() => addToCart(p.id)}>+ ADD</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.savingBanner}>
                  <Zap size={14} />
                  <span>YOU ARE SAVING ₹299 ON THIS ORDER</span>
                </div>
                
                <div className={styles.couponSection}>
                  <div className={styles.couponInput}>
                    <Ticket size={18} />
                    <input 
                      type="text" 
                      placeholder="ENTER COUPON CODE" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    />
                    <button>APPLY</button>
                  </div>
                </div>

                <div className={styles.totals}>
                  <div className={styles.totalRow}>
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Shipping</span>
                    <span className={styles.freeText}>{progress === 100 ? 'FREE' : formatPrice(60)}</span>
                  </div>
                  <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                    <span>Total Amount</span>
                    <span>{formatPrice(total + (progress === 100 ? 0 : 60))}</span>
                  </div>
                </div>

                <button 
                  className={styles.checkoutBtn}
                  onClick={() => {
                    navigate('/checkout');
                    setIsCartOpen(false);
                  }}
                >
                  PROCEED TO BUY NOW <ArrowRight size={20} />
                </button>
                
                <div className={styles.trustRow}>
                  <div className={styles.shiprocket}>
                    <Truck size={14} /> Registered with Shiprocket
                  </div>
                  <div className={styles.secure}>
                    <ShieldCheck size={14} /> 100% SECURE
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
