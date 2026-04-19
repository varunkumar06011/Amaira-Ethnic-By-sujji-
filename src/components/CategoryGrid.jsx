import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './CategoryGrid.module.css';

const categories = [
  { id: 1, name: 'Dresses', image: '/src/assets/category_dresses.png', slug: 'dresses' },
  { id: 2, name: 'Co-ords', image: '/src/assets/category_coords.png', slug: 'coords' },
  { id: 3, name: 'Sarees', image: '/src/assets/hero_main.png', slug: 'sarees' },
  { id: 4, name: 'Accessories', image: '/src/assets/brand_detail.png', slug: 'accessories' },
];

const CategoryGrid = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Curated Collections</h2>
        <p>Explore our signature styles for every occasion.</p>
      </div>
      <div className={styles.grid}>
        {categories.map((cat, i) => (
          <motion.div 
            key={cat.id}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Link to={`/shop?cat=${cat.slug}`}>
              <div className={styles.imageWrapper}>
                <img src={cat.image} alt={cat.name} />
                <div className={styles.info}>
                  <h3>{cat.name}</h3>
                  <span>Shop Now</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
