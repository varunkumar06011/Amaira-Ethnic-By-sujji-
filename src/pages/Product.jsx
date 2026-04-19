import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ChevronRight, 
  Heart, 
  Share2, 
  Info, 
  Copy, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import styles from './Product.module.css';

const Product = () => {
  const { id } = useParams();
  const { products, addToCart, formatPrice, toggleWishlist, wishlist } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState('shipping');

  useEffect(() => {
    const p = products.find(prod => prod.id === parseInt(id));
    if (p) {
      setProduct(p);
      setActiveImage(0);
    }
  }, [id, products]);

  if (!product) return <div className={styles.loading}>Loading...</div>;

  const isInWishlist = wishlist.includes(product.id);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('AEV20');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const sizes = ['S', 'M', 'L', 'XL', '2XL'];

  return (
    <div className={styles.productPage}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Gallery */}
          <div className={styles.gallery}>
            <div className={styles.thumbs}>
              {product.images.map((img, i) => (
                <div 
                  key={i} 
                  className={`${styles.thumb} ${activeImage === i ? styles.active : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </div>
              ))}
            </div>
            <div className={styles.mainImage}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  src={product.images[activeImage]} 
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right Details Panel */}
          <div className={styles.details}>
            <div className={styles.branding}>
              <img src="/LOGO.jpeg" alt="Amaira Ethnic" className={styles.brandLogo} />
              <div className={styles.breadcrumb}>
                <Link to="/">Home</Link> <ChevronRight size={12} /> 
                <Link to="/shop">Shop</Link> <ChevronRight size={12} /> 
                <span>{product.name}</span>
              </div>
            </div>

            <div className={styles.header}>
              <span className={styles.categoryBadge}>{product.category}</span>
              <h1>{product.name}</h1>
              <div className={styles.priceRating}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                <div className={styles.rating}>
                  <span>★★★★★</span>
                  <span className={styles.reviewCount}>(4.8/5)</span>
                </div>
              </div>
            </div>

            {/* Promo Banner */}
            <div className={styles.promoBanner} onClick={handleCopyCode}>
              <div className={styles.promoText}>
                <span>FLAT 20% OFF with code: </span>
                <strong>AEV20</strong>
              </div>
              <button className={styles.copyBtn}>
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* Size Selector */}
            <div className={styles.sizeSection}>
              <div className={styles.sizeHeader}>
                <span>SELECT SIZE</span>
                <button className={styles.sizeChartBtn}>SIZE CHART</button>
              </div>
              <div className={styles.sizeGrid}>
                {sizes.map(size => (
                  <button 
                    key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.selectedSize : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Fit */}
            <div className={styles.utilityRow}>
              <div className={styles.quantityPicker}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <div className={styles.fitGuide}>
                <span>Regular Fit</span>
                <div className={styles.fitSlider}>
                  <div className={styles.fitDot} style={{ left: '50%' }} />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button 
                className={styles.wishlistActionBtn}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart size={20} fill={isInWishlist ? "white" : "none"} />
                {isInWishlist ? "SAVED TO WISHLIST" : "ADD TO WISHLIST"}
              </button>
              
              <div className={styles.primaryActions}>
                <button 
                  className={styles.cartBtn}
                  onClick={() => addToCart(product.id, quantity)}
                >
                  <ShoppingBag size={20} /> ADD TO CART
                </button>
                <button 
                  className={styles.buyNowBtn}
                  onClick={() => {
                    addToCart(product.id, quantity);
                    // navigate to checkout if I wanted to skip
                  }}
                >
                  BUY NOW
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className={styles.trustBadges}>
              <div className={styles.badge}>
                <Truck size={20} />
                <span>Fast Delivery</span>
              </div>
              <div className={styles.badge}>
                <RotateCcw size={20} />
                <span>7 Days Return</span>
              </div>
              <div className={styles.badge}>
                <ShieldCheck size={20} />
                <span>Secure Payment</span>
              </div>
            </div>

            {/* Accordions */}
            <div className={styles.accordions}>
              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader}
                  onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' : 'details')}
                >
                  <span>PRODUCT DETAILS</span>
                  {activeAccordion === 'details' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'details' && (
                    <motion.div 
                      className={styles.accordionContent}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>{product.description}</p>
                      <p>{product.details}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.accordionItem}>
                <button 
                  className={styles.accordionHeader}
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                >
                  <span>SHIPPING & RETURNS</span>
                  {activeAccordion === 'shipping' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                <AnimatePresence>
                  {activeAccordion === 'shipping' && (
                    <motion.div 
                      className={styles.accordionContent}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <p>Free standard shipping on all orders above ₹999. Usually dispatched within 2-3 business days.</p>
                      <p>Easy 7-day returns if the product is unworn and tags are intact.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
