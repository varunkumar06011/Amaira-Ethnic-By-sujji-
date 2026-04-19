import React, { useContext, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from './ProductCard';
import styles from './BestSellersCarousel.module.css';
import { motion } from 'framer-motion';

const BestSellersCarousel = () => {
  const { products } = useContext(ShopContext);
  const bestSellers = products.filter(p => p.isBestSeller);
  const scrollRef = useRef(null);

  // Triple the items for seamless infinite scroll
  const displayProducts = [...bestSellers, ...bestSellers, ...bestSellers];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.sectionHeader}>
        <h2>Best Sellers</h2>
        <p>Most loved pieces by our community</p>
      </div>
      
      <div className={styles.scrollWrapper}>
        <motion.div 
          className={styles.scrollContent}
          animate={{ x: [0, -1200] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {displayProducts.map((product, index) => (
            <div key={`${product.id}-${index}`} className={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BestSellersCarousel;
