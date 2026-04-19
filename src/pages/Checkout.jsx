import React, { useContext, useState } from 'react';
import { 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  ArrowLeft, 
  CheckCircle2, 
  Smartphone, 
  Lock,
  MapPin,
  Check,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ShopContext } from '../context/ShopContext';
import styles from './Checkout.module.css';

const STEPS = {
  IDENTITY: 'identity',
  OTP: 'otp',
  SHIPPING: 'shipping',
  PAYMENT: 'payment',
  SUCCESS: 'success'
};

const Checkout = () => {
  const { cartItems, products, formatPrice, getCartSubtotal, clearCart } = useContext(ShopContext);
  const [currentStep, setCurrentStep] = useState(STEPS.IDENTITY);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    pin: ''
  });
  const [agreedToTC, setAgreedToTC] = useState(false);
  const [agreedToPP, setAgreedToPP] = useState(false);
  const [showTCModal, setShowTCModal] = useState(false);
  const [showPPModal, setShowPPModal] = useState(false);

  // Filter out items that are in context but might not exist in products data
  const cartArray = Object.entries(cartItems).map(([id, qty]) => {
    const product = products.find(p => p.id === parseInt(id));
    if (!product) return null;
    return { ...product, quantity: qty };
  }).filter(Boolean);

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 999 ? 0 : 60;
  const total = subtotal + shipping;

  const validatePhone = () => {
    if (phone.length !== 10) {
      setErrors({ phone: 'Please enter a valid 10-digit mobile number' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateOTP = () => {
    if (otp.join('').length !== 4) {
      setErrors({ otp: 'Please enter a 4-digit OTP' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!address.firstName) newErrors.firstName = 'Required';
    if (!address.street) newErrors.street = 'Required';
    if (!address.city) newErrors.city = 'Required';
    if (!address.pin || address.pin.length !== 6) newErrors.pin = 'Enter 6-digit PIN';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === STEPS.IDENTITY) {
      if (validatePhone()) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setCurrentStep(STEPS.OTP);
        }, 1000);
      }
    } else if (currentStep === STEPS.OTP) {
      if (validateOTP()) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setCurrentStep(STEPS.SHIPPING);
        }, 800);
      }
    } else if (currentStep === STEPS.SHIPPING) {
      if (validateShipping()) setCurrentStep(STEPS.PAYMENT);
    } else if (currentStep === STEPS.PAYMENT) {
      if (agreedToTC && agreedToPP) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setCurrentStep(STEPS.SUCCESS);
          confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#D4AF37', '#1A1A1A', '#FFFFFF']
          });
          clearCart();
        }, 1500);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === STEPS.OTP) setCurrentStep(STEPS.IDENTITY);
    else if (currentStep === STEPS.SHIPPING) setCurrentStep(STEPS.OTP);
    else if (currentStep === STEPS.PAYMENT) setCurrentStep(STEPS.SHIPPING);
  };

  const stepVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  if (currentStep === STEPS.SUCCESS) {
    return (
      <div className={styles.successContainer}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={styles.successCard}
        >
          <div className={styles.successIconWrapper}>
            <CheckCircle2 size={100} className={styles.successIcon} strokeWidth={1} />
            <motion.div 
              className={styles.successRing} 
              initial={{ scale: 0 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <h1>Payment Received!</h1>
          <p className={styles.refNum}>Order Reference #AE-{Math.floor(Math.random() * 100000)}</p>
          <p className={styles.successMsg}>Thank you for shopping with Amaira Ethnic. Your budget-friendly elegance is on its way!</p>
          <div className={styles.successDetails}>
            <div><span>Status:</span> <strong className={styles.confirmed}>Confirmed</strong></div>
            <div><span>ETA:</span> <strong>5-7 Business Days</strong></div>
          </div>
          <button onClick={() => window.location.href = '/'} className={styles.homeBtn}>
            BACK TO HOMEPAGE
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        {/* Progress Bar Redesign */}
        <div className={styles.progressHeader}>
          {[
            { id: STEPS.IDENTITY, icon: <Smartphone size={16} />, label: 'Login' },
            { id: STEPS.OTP, icon: <Lock size={16} />, label: 'Verify' },
            { id: STEPS.SHIPPING, icon: <MapPin size={16} />, label: 'Address' },
            { id: STEPS.PAYMENT, icon: <CreditCard size={16} />, label: 'Secure Pay' }
          ].map((step, idx) => {
            const stepOrder = [STEPS.IDENTITY, STEPS.OTP, STEPS.SHIPPING, STEPS.PAYMENT];
            const currentIdx = stepOrder.indexOf(currentStep);
            const isCompleted = idx < currentIdx;
            const isActive = idx === currentIdx;

            return (
              <div key={step.id} className={`${styles.progressStep} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}>
                <div className={styles.stepCircle}>
                  {isCompleted ? <Check size={18} /> : step.icon}
                </div>
                <span className={styles.stepLabel}>{step.label}</span>
                {idx < 3 && <div className={styles.stepConnector} />}
              </div>
            );
          })}
        </div>

        <div className={styles.grid}>
          <div className={styles.formSide}>
            <AnimatePresence mode="wait">
              {currentStep === STEPS.IDENTITY && (
                <motion.div key="id" {...stepVariants} className={styles.stepContent}>
                  <div className={styles.stepHeader}>
                    <h2>Ready to Checkout?</h2>
                    <p>Enter your mobile number to get started with your secure order.</p>
                  </div>
                  <div className={styles.phoneInputBox}>
                    <div className={styles.countryCode}>+91</div>
                    <input 
                      type="tel" 
                      placeholder="Enter 10 digit number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className={errors.phone ? styles.errorInput : ''}
                      autoFocus
                    />
                  </div>
                  {errors.phone && <p className={styles.errorMsg}>{errors.phone}</p>}
                  <button onClick={handleNext} disabled={isLoading} className={styles.primaryBtn}>
                    {isLoading ? 'SENDING OTP...' : 'GET SECURE OTP'} <ChevronRight size={18} />
                  </button>
                  <p className={styles.trustBadge}>
                    <ShieldCheck size={14} /> 100% Encrypted & Secure
                  </p>
                </motion.div>
              )}

              {currentStep === STEPS.OTP && (
                <motion.div key="otp" {...stepVariants} className={styles.stepContent}>
                  <button onClick={handleBack} className={styles.backBtn}><ArrowLeft size={16} /> CHANGE NUMBER</button>
                  <div className={styles.stepHeader}>
                    <h2>Verification Required</h2>
                    <p>Enter the 4-digit code sent to <strong>+91 {phone}</strong></p>
                  </div>
                  <div className={styles.otpInputGrid}>
                    {otp.map((digit, idx) => (
                      <input 
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        className={errors.otp ? styles.errorInput : ''}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const newOtp = [...otp];
                          newOtp[idx] = val;
                          setOtp(newOtp);
                          if (val && idx < 3) document.getElementById(`otp-${idx + 1}`).focus();
                        }}
                      />
                    ))}
                  </div>
                  {errors.otp && <p className={styles.errorMsg}>{errors.otp}</p>}
                  <button onClick={handleNext} disabled={isLoading} className={styles.primaryBtn}>
                    {isLoading ? 'VERIFYING...' : 'VERIFY & PROCEED'}
                  </button>
                  <button className={styles.resendBtn}>Resend OTP in 29s</button>
                </motion.div>
              )}

              {currentStep === STEPS.SHIPPING && (
                <motion.div key="ship" {...stepVariants} className={styles.stepContent}>
                  <button onClick={handleBack} className={styles.backBtn}><ArrowLeft size={16} /> Back</button>
                  <div className={styles.stepHeader}>
                    <h2>Delivery Destination</h2>
                    <p>Where should we send your Amaira Ethnic treasures?</p>
                  </div>
                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label>First Name</label>
                      <input 
                        type="text" 
                        value={address.firstName}
                        onChange={(e) => setAddress({...address, firstName: e.target.value})}
                        className={errors.firstName ? styles.errorInput : ''}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Last Name</label>
                      <input 
                        type="text"
                        value={address.lastName}
                        onChange={(e) => setAddress({...address, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Street Address / Apartment</label>
                    <input 
                      type="text"
                      className={errors.street ? styles.errorInput : ''}
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                    />
                  </div>
                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label>City</label>
                      <input 
                        type="text"
                        className={errors.city ? styles.errorInput : ''}
                        value={address.city}
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>PIN Code</label>
                      <input 
                        type="text"
                        maxLength="6"
                        className={errors.pin ? styles.errorInput : ''}
                        value={address.pin}
                        onChange={(e) => setAddress({...address, pin: e.target.value.replace(/\D/g, '')})}
                      />
                    </div>
                  </div>
                  <button onClick={handleNext} className={styles.primaryBtn}>
                    DELIVER TO THIS ADDRESS
                  </button>
                </motion.div>
              )}

              {currentStep === STEPS.PAYMENT && (
                <motion.div key="pay" {...stepVariants} className={styles.stepContent}>
                  <button onClick={handleBack} className={styles.backBtn}><ArrowLeft size={16} /> Back</button>
                  <div className={styles.stepHeader}>
                    <h2>Payment Selection</h2>
                    <p>Choose your preferred way to pay securely.</p>
                  </div>
                  <div className={styles.paymentMethods}>
                    <label className={styles.methodCard}>
                      <input type="radio" name="pay" defaultChecked />
                      <div className={styles.methodInfo}>
                        <div className={styles.methodHeader}>
                          <Truck size={20} />
                          <span>Cash on Delivery</span>
                        </div>
                        <p>Pay upon receiving your package.</p>
                      </div>
                    </label>
                    <label className={styles.methodCard}>
                      <input type="radio" name="pay" />
                      <div className={styles.methodInfo}>
                        <div className={styles.methodHeader}>
                          <CreditCard size={20} />
                          <span>Prepaid Online</span>
                        </div>
                        <p>UPI, Cards, Wallet (-5% Instant Discount)</p>
                      </div>
                    </label>
                  </div>

                  <div className={styles.legalCheckboxes}>
                    <label className={styles.customCheck}>
                      <input type="checkbox" checked={agreedToTC} onChange={(e) => setAgreedToTC(e.target.checked)} />
                      <span className={styles.checkmark}></span>
                      <p>Agree to <button onClick={() => setShowTCModal(true)} className={styles.link}>Terms & Conditions</button></p>
                    </label>
                    <label className={styles.customCheck}>
                      <input type="checkbox" checked={agreedToPP} onChange={(e) => setAgreedToPP(e.target.checked)} />
                      <span className={styles.checkmark}></span>
                      <p>Agree to <button onClick={() => setShowPPModal(true)} className={styles.link}>Privacy Policy</button></p>
                    </label>
                  </div>

                  <button 
                    onClick={handleNext} 
                    className={styles.primaryBtn}
                    disabled={!agreedToTC || !agreedToPP || isLoading}
                  >
                    {isLoading ? 'PROCESSING...' : `PLACE ORDER • ${formatPrice(total)}`}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.summarySide}>
            <div className={styles.checkoutSummary}>
              <h3>Your Selection</h3>
              <div className={styles.summaryList}>
                {cartArray.map(item => (
                  <div key={item.id} className={styles.summaryProduct}>
                    <div className={styles.productImg}>
                      <img src={item.images[0]} alt={item.name} />
                      <span className={styles.qtyBadge}>{item.quantity}</span>
                    </div>
                    <div className={styles.productDetails}>
                      <h4>{item.name}</h4>
                      <p>One Size | Premium Fabric</p>
                      <span className={styles.itemTot}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.priceBreakdown}>
                <div className={styles.breakdownRow}>
                  <span>Item Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>Estimated Shipping</span>
                  {shipping === 0 ? <span className={styles.freeText}>FREE</span> : <span>{formatPrice(shipping)}</span>}
                </div>
                <div className={`${styles.breakdownRow} ${styles.totalFinal}`}>
                  <span>Grand Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <div className={styles.safetyGrid}>
                <div className={styles.safetyInfo}>
                  <ShieldCheck size={16} />
                  <span>Secure Checkout</span>
                </div>
                <div className={styles.safetyInfo}>
                  <Truck size={16} />
                  <span>Doorstep Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Redesign */}
      <AnimatePresence>
        {(showTCModal || showPPModal) && (
          <div className={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) { setShowTCModal(false); setShowPPModal(false); } }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={styles.premiumModal} 
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.modalClose} onClick={() => { setShowTCModal(false); setShowPPModal(false); }}><X size={24} /></button>
              <h2>{showTCModal ? 'Terms & Conditions' : 'Privacy Policy'}</h2>
              <div className={styles.modalScrollBody}>
                {showTCModal ? (
                  <>
                    <p>By purchasing from Amaira Ethnic, you agree to:</p>
                    <ul>
                      <li>Delivery within 5-7 working days across India.</li>
                      <li>Returns accepted only for manufacturing defects (video requirement).</li>
                      <li>Color variations may occur due to screen settings.</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>We respect your privacy. Amaira Ethnic uses your data only for:</p>
                    <ul>
                      <li>Order fulfillment and shipping updates.</li>
                      <li>Improving your shopping experience.</li>
                      <li>Secure payment processing via trusted partners.</li>
                    </ul>
                  </>
                )}
              </div>
              <button onClick={() => { setShowTCModal(false); setShowPPModal(false); }} className={styles.modalBtn}>ACKNOWLEDGE</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
