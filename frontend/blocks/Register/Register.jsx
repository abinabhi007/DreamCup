import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Register.module.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { registerUser, verifyOTP } from '../../src/services/authService';
import toast from 'react-hot-toast';

export default function Register() {
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(''); // Prefilled per prototype demo
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'loading' | 'success'
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpCode, setOtpCode] = useState('');

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitStatus !== 'idle') return;
    
    // Simple checks before simulation
    if (!isEmailValid) {
      setEmailTouched(true);
      return;
    }
    if (!isPasswordLengthValid) return;
    if (!agreeTerms) return;
    if (password !== confirmPassword) return;

    setSubmitStatus('loading');

    try {
      const res = await registerUser({ name: fullName, email, password });
      toast.success(res.message || "Registration successful! Please verify your email.");
      setSubmitStatus('success');
      
      // Transform to OTP screen after visual confirmation
      setTimeout(() => {
        setIsVerifying(true);
        setSubmitStatus('idle');
      }, 1500);
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
      setSubmitStatus('idle');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (submitStatus !== 'idle') return;
    if (otpCode.length !== 6) return;
    setSubmitStatus('loading');
    try {
      const response = await verifyOTP({ email, otp: otpCode });
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        toast.success(response.message || "Email verified successfully!");
      }
      setSubmitStatus('success');
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error(error.response?.data?.message || "OTP verification failed. Please try again.");
      setSubmitStatus('idle');
    }
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
          {!isVerifying ? (
            <>
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
                    className={confirmPassword.length > 0 && password !== confirmPassword ? styles.inputFieldError : styles.inputField} 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={submitStatus !== 'idle'}
                    required
                  />
                </div>
                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <p className={styles.errorText}>
                    <span className={`material-symbols-outlined ${styles.errorIcon}`}>error</span>
                    Passwords do not match
                  </p>
                )}
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
              disabled={submitStatus !== 'idle' || !agreeTerms || !isPasswordLengthValid || (emailTouched && !isEmailValid) || password !== confirmPassword}
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
            </>
          ) : (
            <>
              <div className={styles.titleArea}>
                <h1 className={styles.cardTitle}>Verify Your Email</h1>
                <p className={styles.cardSubtitle}>Enter the 6-digit code sent to {email}.</p>
              </div>
              <form className={styles.form} onSubmit={handleVerify}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="otp">Verification Code</label>
                  <div className={styles.inputWrapper}>
                    <span className={`material-symbols-outlined ${styles.inputIcon}`} style={{ fontSize: 20 }}>
                      vpn_key
                    </span>
                    <input 
                      className={styles.inputField} 
                      id="otp" 
                      type="text" 
                      placeholder="123456"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      disabled={submitStatus !== 'idle'}
                      required
                      maxLength="6"
                      style={{ letterSpacing: '4px', textAlign: 'center', fontWeight: 'bold' }}
                    />
                  </div>
                </div>
                <button 
                  className={`${styles.submitBtn} ${styles.goldGradient} ${styles.goldGlow}`} 
                  type="submit"
                  disabled={submitStatus !== 'idle' || otpCode.length !== 6}
                >
                  {submitStatus === 'idle' && (
                    <>
                      Verify Account
                      <span className={`material-symbols-outlined ${styles.btnArrow}`} style={{ fontSize: 20 }}>
                        verified
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
            </>
          )}
        </div>

        
      </main>

      {/* Brand Footer */}
      <Footer/>
    </div>
  );
}
