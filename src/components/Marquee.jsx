import React from 'react';
import styles from './Marquee.module.css';

const Marquee = () => {
  const items = [
    "COMPLIMENTARY SHIPPING ON ALL INDIAN ORDERS",
    "ESTIMATED DELIVERY: 5-7 BUSINESS DAYS",
    "NEW COLLECTION: THE HARVEST MOON",
    "CUSTOM SIZING AVAILABLE ON REQUEST",
  ];

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {[...items, ...items].map((text, i) => (
          <span key={i} className={styles.item}>{text}</span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
