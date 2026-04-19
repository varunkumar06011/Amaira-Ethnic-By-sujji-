import React, { useContext } from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import BrandStory from '../components/BrandStory';
import BestSellersCarousel from '../components/BestSellersCarousel';
import { ShopContext } from '../context/ShopContext';
import styles from './Home.module.css';

const Home = () => {
  const { products } = useContext(ShopContext);
  
  // Get 4 featured products
  const featuredProducts = products.slice(0, 4);

  return (
    <div className={styles.home}>
      <Marquee />
      <Hero />
      
      <BestSellersCarousel />
      <BrandStory />

      <section className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <h2>Join the Circle</h2>
          <p>Be the first to experience our new collections and artisan stories.</p>
          <form className={styles.form}>
            <input type="email" placeholder="EMAIL ADDRESS" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
