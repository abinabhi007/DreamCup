import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './SideNav.module.scss';
import toast from 'react-hot-toast';

export default function SideNav() {
  const router = useRouter();
  const currentPath = router.pathname;

  const menuItems = [
    { name: 'Profile', path: '/profile', icon: 'person' },
    { name: 'My Team', path: '/my-team', icon: 'shield' },
    { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { name: 'Marketplace', path: '/marketplace', icon: 'storefront' },
    { name: 'Matches', path: '/matches', icon: 'sports_soccer' },
    { name: 'Leaderboard', path: '/leaderboard', icon: 'leaderboard' },
    
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logout successfully");
    router.push("/");
  }

  return (
    <aside className={styles.sidebar}>
      {/* Brand Header */}
      <div className={styles.brandArea}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 className={styles.brandTitle}>DreamCup Elite</h1>
        </Link>
        
        {/* Manager Card */}
        <div className={styles.managerPanel}>
          <p className={styles.managerLabel}>Manager Room</p>
          <p className={styles.managerTier}>Pro League Tier</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={styles.navContainer}>
        {menuItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={isActive ? styles.navLinkActive : styles.navLink}
            >
              <span 
                className="material-symbols-outlined" 
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1, 'wght' 700" : "'FILL' 0, 'wght' 400"
                }}
              >
                {item.icon}
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* SideNav Footer */}
      <div className={styles.footerArea}>
        <button className={styles.goldButton} onClick={() => alert('Upgraded to premium Gold tier!')}>
          Upgrade to Gold
        </button>
        
        <Link href="/rules" className={styles.navLink}>
          <span className="material-symbols-outlined">menu_book</span>
          <span>Rules</span>
        </Link>
        <div className={styles.navLink} onClick={handleLogout} style={{cursor:"pointer"}}>
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}
