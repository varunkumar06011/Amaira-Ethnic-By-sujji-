import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist, formatPrice } = useContext(ShopContext);

  const isInWishlist = wishlist.includes(product.id);

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, rotateY: 5, perspective: 1000 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className={styles.imageArea}>
        <Link to={`/product/${product.id}`}>
          <img src={product.images[0]} alt={product.name} className={styles.image} />
        </Link>
        
        {product.isBestSeller && (
          <div className={styles.bestSellerBadge}>
            Best Seller
          </div>
        )}

        <div className={styles.overlay}>
          <button 
            className={styles.wishlistBtn}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id);
            }}
            title="Add to Bag"
          >
            <Heart size={20} color="#000000" fill="#000000" />
          </button>
          <button 
            className={styles.quickAdd} 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const message = `Hi, I want to purchase ${product.name} for ${formatPrice(product.price)} from your side`;
              window.open(`https://wa.me/917013617464?text=${encodeURIComponent(message)}`, '_blank');
            }}
          >
            <ShoppingBag size={18} /> Buy Now
          </button>
        </div>
      </div>
      <div className={styles.info}>
        <Link to={`/product/${product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>{formatPrice(product.price)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
