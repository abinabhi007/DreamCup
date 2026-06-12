import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './BottomNav.module.scss';

export default function BottomNav() {
  const router = useRouter();
  const currentPath = router.pathname;

  const menuItems = [
    { name: 'Profile', path: '/profile', icon: 'person' },
    { name: 'My Team', path: '/my-team', icon: 'shield' },
    { name: 'Matches', path: '/matches', icon: 'sports_soccer' },
    { name: 'Leaderboard', path: '/leaderboard', icon: 'leaderboard' },
  ];

  return (
    <nav className={styles.bottomNav}>
      {menuItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.name}
            href={item.path}
            className={isActive ? styles.navItemActive : styles.navItem}
          >
            <span 
              className="material-symbols-outlined" 
              style={{
                fontVariationSettings: isActive ? "'FILL' 1, 'wght' 700" : "'FILL' 0, 'wght' 400"
              }}
            >
              {item.icon}
            </span>
            <span className={styles.navText}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
