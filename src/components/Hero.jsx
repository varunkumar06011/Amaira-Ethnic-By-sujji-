import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.ghostText}>AMAIRA</div>
      
      <div className={styles.container}>
        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className={styles.imageBox}>
            <img src="/LOGO.jpeg" alt="Amaira Ethnic Logo" className={styles.heroImg} />
            
            <div className={styles.overlay}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className={styles.textContent}
              >
                <div className={styles.highlightWrapper}>
                  <span className={styles.label}>PREMIUM QUALITY</span>
                  <h1>Looks <mark>luxurious</mark>. Feels effortless. Costs less.</h1>
                  <p>BUDGET FRIENDLY ELEGANCE FOR MODERN WOMEN.</p>
                </div>
                <Link to="/shop" className={styles.shopBtn}>EXPLORE THE COLLECTION</Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
