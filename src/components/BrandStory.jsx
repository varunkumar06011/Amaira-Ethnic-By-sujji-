import React from 'react';
import { motion } from 'framer-motion';
import styles from './BrandStory.module.css';

const BrandStory = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageCol}>
          <motion.div 
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img src="/founder image.jpeg" alt="Amaira Founder" />
          </motion.div>
        </div>
        <div className={styles.contentCol}>
          <motion.div 
            className={styles.content}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className={styles.tagline}>THE STORY BEHIND AMAIRA</span>
            <h2>A Passion for Tradition.</h2>
            <p>
              I am a brave girl who completed my MBA and chose to work for my passion. 
              My journey with Amaira Ethnic focuses on bringing budget-friendly, 
              high-quality Kurthis to modern women across India.
            </p>
            <p>
              Successfully completed 1+ year serving happy customers, 
              sells and counting. Every piece is curated with the same passion 
              that started this journey.
            </p>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span>1+</span>
                <p>Year Successfully</p>
              </div>
              <div className={styles.stat}>
                <span>1000s</span>
                <p>Happy Customers</p>
              </div>
              <div className={styles.stat}>
                <span>₹499+</span>
                <p>Budget Friendly</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* New Image Gallery Section */}
      <div className={styles.gallery}>
        <motion.div 
          className={styles.galleryGrid}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <img src="/about_gallery_1.png" alt="Behind the scenes 1" />
          <img src="/about_gallery_2.png" alt="Behind the scenes 2" />
          <img src="/about_gallery_3.png" alt="Behind the scenes 3" />
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStory;
