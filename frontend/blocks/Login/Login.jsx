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

          {/* Divider */}
          <div className={styles.dividerRow}>
            <span className={styles.dividerLine}></span>
            <div className={styles.dividerText}>Secure Entry</div>
          </div>

          {/* Social Logins */}
          <div className={styles.socialGrid}>
            <button 
              className={styles.socialButton} 
              title="Sign in with Google" 
              type="button"
              disabled={submitStatus !== 'idle'}
            >
              <img 
                alt="Google" 
                className={styles.socialIconGoogle} 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-YqAr4lCRwsj-Gm2GjSYxhLN0gCOykLWplswhQ5xkz9waXukQh7nl0e4hzfNMyqj5SA-9mQoeB3-X6SimDbBrgBbG2ccpGiDQWlVQ2byVc-3nb6FUIeb9jcCA_eLNRvLhaJ6CiyJ9APcQNnYJY0Rp6XJw9z0s9aHndc85fE9lFSoaGW-XxfllaeKSl1XLGy9liEr1nV81lbdzp8zSyuLbRHQJvF-O3giMGxc0pePx_zbxpShYrjz7h5CakfY8gH7z_VwysXMRrbE" 
              />
            </button>
            <button 
              className={styles.socialButton} 
              title="Sign in with Facebook" 
              type="button"
              disabled={submitStatus !== 'idle'}
            >
              <svg className={`${styles.socialIconSvg} ${styles.socialIconFacebook}`} viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
            </button>
            <button 
              className={styles.socialButton} 
              title="Sign in with Apple" 
              type="button"
              disabled={submitStatus !== 'idle'}
            >
              <svg className={`${styles.socialIconSvg} ${styles.socialIconApple}`} viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.702z"></path>
              </svg>
            </button>
          </div>

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
