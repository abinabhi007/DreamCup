import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Login.module.scss';
import { loginUser } from '../../src/services/authService';
import { toast } from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const cardRef = useRef(null);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

  // Card Perspective Mousemove Tilt Effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20; // max 10 degrees left/right
      const y = (clientY / window.innerHeight - 0.5) * 20; // max 10 degrees up/down
      
      card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    };

    // window.addEventListener('mousemove', handleMouseMove);
    // card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (card) {
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitStatus !== 'idle') return;

    setSubmitStatus('loading');

    try {
      const data = await loginUser({ email, password });
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      setSubmitStatus('success');
      
      setTimeout(() => {
        toast.success(`Welcome back ${data.user.name}`);
        router.push('/');
      }, 1500);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
      setSubmitStatus('idle');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Background Atmospheric Elements */}
      <div className={styles.backgroundContainer}>
        <div className={styles.fieldPattern} />
        <div className={styles.heroGradient} />
        <div className={styles.pitchLineCircle} />
        <div className={styles.pitchLineCenter} />
      </div>

      {/* Main Content Canvas */}
      <main className={styles.cardContainer}>
        <div 
          ref={cardRef} 
          className={styles.glassPanel}
          style={{ transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)' }}
        >
          {/* Branding Header */}
          <header className={styles.header}>
            <Link href="/" className={styles.logoContainer} title="DreamCup Home">
              <img 
                alt="DreamCup Premium Logo" 
                className={styles.logoImage} 
                src="/premium_logo.png" 
              />
            </Link>
            <h1 className={styles.title}>
              DreamCup
            </h1>
            <p className={styles.subtitle}>
              Elite Performance Fantasy
            </p>
          </header>

          {/* Login Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            
            {/* Email Field */}
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">Email Address</label>
              <div className={styles.inputWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`} style={{ fontSize: 20 }}>
                  mail
                </span>
                <input 
                  className={styles.inputField} 
                  id="email" 
                  type="email" 
                  placeholder="coach@performance.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitStatus !== 'idle'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="password">Password</label>
              <div className={styles.inputWrapper}>
                <span className={`material-symbols-outlined ${styles.inputIcon}`} style={{ fontSize: 20 }}>
                  lock
                </span>
                <input 
                  className={styles.inputFieldWithAction} 
                  id="password" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitStatus !== 'idle'}
                />
                <button 
                  type="button" 
                  className={styles.toggleButton} 
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? "Hide password" : "Show password"}
                  disabled={submitStatus !== 'idle'}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className={styles.actionsRow}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  className={styles.checkbox}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={submitStatus !== 'idle'}
                />
                <span className={styles.checkboxText}>Remember Me</span>
              </label>
              <a className={styles.forgotLink} href="#" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
            </div>

            {/* Submit Button */}
            <button 
              className={`${styles.submitButton} ${styles.goldGradient}`} 
              type="submit"
              disabled={submitStatus !== 'idle'}
            >
              <span className={styles.btnContent}>
                {submitStatus === 'idle' && (
                  <>
                    Sign In
                    <span className="material-symbols-outlined" style={{ fontSize: 20, fontWeight: 'bold' }}>arrow_forward</span>
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
              </span>
              <div className={styles.buttonOverlay} />
            </button>
          </form>

        

          {/* Footer Call to Action */}
          <footer className={styles.footerText}>
            Don&apos;t have an account? 
            <Link href="/register" className={styles.registerLink}>
              Register
            </Link>
          </footer>
        </div>
      </main>
    </div>
  );
}
