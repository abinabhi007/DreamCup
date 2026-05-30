import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Register.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

export default function Register() {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('invalid-email@example'); // Prefilled per prototype demo
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  // Validation States
  const [emailTouched, setEmailTouched] = useState(true); // touched initially since it's prefilled
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordLengthValid, setIsPasswordLengthValid] = useState(false);

  // Email regex validation
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, [email]);

  // Password length validation
  useEffect(() => {
    setIsPasswordLengthValid(password.length >= 8);
  }, [password]);

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitStatus !== 'idle') return;
    
    // Simple checks before simulation
    if (!isEmailValid) {
      setEmailTouched(true);
      return;
    }
    if (!isPasswordLengthValid) return;
    if (!agreeTerms) return;

    setSubmitStatus('loading');

    // Simulate premium account creation
    setTimeout(() => {
      setSubmitStatus('success');
      
      // Redirect to home dashboard after visual confirmation
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }, 1800);
  };

  return (
    <div className={styles.registerWrapper}>
      {/* Top Navigation Header */}
      <Header/>

      {/* Main Registration Area */}
      <main className={styles.mainContent}>
        {/* Background Decorative Gradients */}
        <div className={styles.pitchOverlay} />
        <div className={styles.glowTopRight} />
        <div className={styles.glowBottomLeft} />

        {/* Register Card */}
        <div className={styles.glassCard}>
          <div className={styles.titleArea}>
            <h1 className={styles.cardTitle}>Join the Elite</h1>
            <p className={styles.cardSubtitle}>Register now to build your dream performance team.</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="fullName">Full Name</label>
              <div className={styles.inputWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`} style={{ fontSize: 20 }}>
                  person
                </span>
                <input 
                  className={styles.inputField} 
                  id="fullName" 
                  type="text" 
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={submitStatus !== 'idle'}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">Email Address</label>
              <div className={styles.inputWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`} style={{ fontSize: 20 }}>
                  mail
                </span>
                <input 
                  className={emailTouched && !isEmailValid ? styles.inputFieldError : styles.inputField} 
                  id="email" 
                  type="email" 
                  placeholder="coach@performance.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailTouched(true);
                  }}
                  disabled={submitStatus !== 'idle'}
                  required
                />
              </div>
              {emailTouched && !isEmailValid && (
                <p className={styles.errorText}>
                  <span className={`material-symbols-outlined ${styles.errorIcon}`}>error</span>
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Password Row */}
            <div className={styles.passwordRow}>
              {/* Password */}
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="password">Password</label>
                <div className={styles.inputWrapper}>
                  <span className={`material-symbols-outlined ${styles.inputIcon}`} style={{ fontSize: 20 }}>
                    lock
                  </span>
                  <input 
                    className={styles.inputField} 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={submitStatus !== 'idle'}
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="confirmPassword">Confirm</label>
                <div className={styles.inputWrapper}>
                  <span className={`material-symbols-outlined ${styles.inputIcon}`} style={{ fontSize: 20 }}>
                    shield
                  </span>
                  <input 
                    className={styles.inputField} 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={submitStatus !== 'idle'}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Hint */}
            <div className={styles.hintRow}>
              <div className={`${styles.hintText} ${isPasswordLengthValid ? styles.hintValid : styles.hintInvalid}`}>
                <span className={`material-symbols-outlined ${styles.hintIcon}`}>
                  check_circle
                </span>
                Password must be 8+ characters
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className={styles.termsRow}>
              <input 
                className={styles.checkbox} 
                id="terms" 
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                disabled={submitStatus !== 'idle'}
                required
              />
              <label className={styles.termsLabel} htmlFor="terms">
                I agree to the <a className={styles.termsLink} href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a> and <a className={styles.termsLink} href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              className={`${styles.submitBtn} ${styles.goldGradient} ${styles.goldGlow}`} 
              type="submit"
              disabled={submitStatus !== 'idle' || !agreeTerms || !isPasswordLengthValid || (emailTouched && !isEmailValid)}
            >
              {submitStatus === 'idle' && (
                <>
                  Create Account
                  <span className={`material-symbols-outlined ${styles.btnArrow}`} style={{ fontSize: 20 }}>
                    trending_flat
                  </span>
                </>
              )}
              {submitStatus === 'loading' && (
                <span className={`material-symbols-outlined ${styles.spinner}`} style={{ fontSize: 24 }}>
                  progress_activity
                </span>
              )}
              {submitStatus === 'success' && (
                <span className="material-symbols-outlined text-green-400 animate-bounce" style={{ fontSize: 24 }}>
                  check_circle
                </span>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className={styles.socialDivider}>
            <div className={styles.dividerLine} />
            <div className={styles.dividerText}>Or sign up with</div>
          </div>

          {/* Social Logins */}
          <div className={styles.socialGrid}>
            <button className={styles.socialBtn} type="button" title="Sign up with Google" disabled={submitStatus !== 'idle'}>
              <img 
                alt="Google" 
                className={styles.socialIconGoogle} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2PbO9923PuemyLSbEswbpG9enZ9Ld-nqe07Mrc-Je7ieQvh8wD6GQjV31kXwWo6EN97MFTvrzLd-GTlgxVEvvJZUH7I-QQG0cOaC4Bohqkki-JTIz8GoixCmgyZ92ZHmWdty7FMW0NN9XiSOk4QTe8Ppi6P1jDyWGs0AqFUS4_m6oeWyZ4YY565byf42UjO51DK5-smOrKP8SwMMvNEWm6X4ik1dHVwxl-GuvRipPTcOAEi3ITKnLeQNAZ6m5CtBbo0_kUaS-yzU" 
              />
            </button>
            <button className={styles.socialBtn} type="button" title="Sign up with Leaderboard" disabled={submitStatus !== 'idle'}>
              <span className={`material-symbols-outlined ${styles.socialIconSvg}`} style={{ fontSize: 20 }}>
                social_leaderboard
              </span>
            </button>
            <button className={styles.socialBtn} type="button" title="Sign up with Apple" disabled={submitStatus !== 'idle'}>
              <span className={`material-symbols-outlined ${styles.socialIconSvg}`} style={{ fontSize: 20 }}>
                ios
              </span>
            </button>
          </div>

          {/* Prompt Login redirect */}
          <div className={styles.loginPromptArea}>
            <p className={styles.loginPrompt}>
              Already have an account?{' '}
              <Link href="/login" className={styles.loginLink}>
                Login
              </Link>
            </p>
          </div>
        </div>

        
      </main>

      {/* Brand Footer */}
      <Footer/>
    </div>
  );
}
