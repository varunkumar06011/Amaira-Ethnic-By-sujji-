import React from 'react';
import BrandStory from '../components/BrandStory';
import { motion } from 'framer-motion';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.hero}>
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>About Amaira</h1>
          <p>Elegance refined, tradition preserved.</p>
        </motion.div>
      </div>
      
      <BrandStory />
      
      <section className={styles.values}>
        <div className={styles.container}>
          <div className={styles.valueGrid}>
            <div className={styles.valueItem}>
              <h3>Quality First</h3>
              <p>We source only the finest fabrics and work with skilled artisans to ensure every stitch meets our boutique standards.</p>
            </div>
            <div className={styles.valueItem}>
              <h3>Ethical Sourcing</h3>
              <p>We believe in fair trade and supporting the artisans who keep our traditional crafts alive.</p>
            </div>
            <div className={styles.valueItem}>
              <h3>Modern Utility</h3>
              <p>Our designs are curated for the modern woman who values both tradition and functional style.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
