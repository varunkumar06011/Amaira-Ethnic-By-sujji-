import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MessageSquare } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandCol}>
          <h3>AMAIRA ETHNIC</h3>
          <p>Style that speaks. Ethnic wear redefined for the bold and the beautiful.</p>
          <div className={styles.socials}>
            <Globe size={20} />
            <MessageSquare size={20} />
            <Mail size={20} />
          </div>
        </div>

        <div className={styles.linksCol}>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop?category=Kurtas">Kurtas</Link></li>
            <li><Link to="/shop?category=Co-ords">Co-ords</Link></li>
            <li><Link to="/shop?category=Festive Wear">Festive Wear</Link></li>
            <li><Link to="/shop?category=Accessories">Accessories</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/care">Craftsmanship & Care</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <h4>Contact</h4>
          <p><Mail size={16} /> srinivassujatha51@gmail.com</p>
          <p><Phone size={16} /> +91 70136 17464</p>
          <div className={styles.newsletter}>
            <input type="email" placeholder="JOIN THE LIST" />
            <button>→</button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Amaira Ethnic. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
