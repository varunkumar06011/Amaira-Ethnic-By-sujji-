import React from 'react';
import styles from './WhatsAppButton.module.css';

const WHATSAPP_NUMBER = '917013617464';
const MESSAGE = 'Hi, I want to purchase a Kurta from your side';
// wa.me opens the native WhatsApp app on mobile; web.whatsapp.com on desktop
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Chat on WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="white"
        width="26"
        height="26"
        aria-hidden="true"
      >
        <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.476 2.027 7.785L0 32l8.418-2.004A15.942 15.942 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.29 13.29 0 0 1-6.776-1.848l-.486-.289-5.001 1.191 1.22-4.874-.317-.502A13.27 13.27 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.29-9.961c-.4-.2-2.366-1.165-2.733-1.299-.366-.133-.633-.2-.9.2-.267.4-1.032 1.299-1.266 1.565-.233.267-.466.3-.866.1-.4-.2-1.688-.623-3.215-1.98-1.188-1.059-1.99-2.366-2.223-2.766-.233-.4-.025-.616.175-.815.18-.179.4-.466.6-.7.2-.233.267-.4.4-.666.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.778-.655-.673-.9-.686l-.766-.013c-.267 0-.7.1-1.067.5-.366.4-1.4 1.366-1.4 3.332s1.433 3.866 1.633 4.132c.2.267 2.82 4.308 6.832 6.04.956.413 1.701.66 2.283.845.959.305 1.832.262 2.522.159.769-.115 2.366-.967 2.7-1.9.333-.934.333-1.733.233-1.9-.1-.167-.366-.267-.766-.467z"/>
      </svg>
      <span className={styles.tooltip}>Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
