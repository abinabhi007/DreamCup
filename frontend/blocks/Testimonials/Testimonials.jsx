import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.scss';

const TESTIMONIALS = [
  {
    id: 'marcus',
    quote: '"The real-time data integration is flawless. It\'s the most immersive fantasy football experience I\'ve ever had."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaedf2-hCd_OHOBwik310fn0INBHEHMQBzXKMAr0z_TQmRvfqh9qBKr4TuDMUbIaPpo4y74zDZtIKgxgQMfC-QhWqP51AtmVo7Ejo6mWpAtfK6jvdnizXZ2-ZoJ2sEKx6ORiBK608nmKKs9zb0_g1scnWbr5S_pAF1zKcdrk6eVQTM5P-Lo1GhbnEMwoaowJm9p9GBD-OTDqqG8Ra7tN8yIQF3ip0TFzyV0psEPEXI3H4VTfjHsjBEXIOej3vWoW4Tm1NiAw0ghGs',
    name: 'Marcus Rashford (Manager)',
    role: 'Top 1% Global Ranking',
    premium: true,
  },
  {
    id: 'sophia',
    quote: '"Clean UI, fast updates, and high-stakes competition. DreamCup is truly in a league of its own for serious fans."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDStmiXnZzxkJNm067bbKE6lXySGKxr1_MLQRIf1_t3JkScP6FqMuCwkZAl_fT7XrMWGIDoqC5RHm3GsJMX0ofHkfCSYIG7XPuGnQtOz9w6K4AiKsWPaLBdmSnNXTpFyL8vWLv403dX9G9o_LiN1VOkbf9peF1le69EI0sl3ANN9oH6OzT31WxbMhKYezhUvRaCY-UQbwOOiJxXFqxoV_E2RIyZqQ9hqxP2TOvMvIl3LIPh9-0_Mf6Zq0bg1yV2RFPovJIMJf974w8',
    name: 'Sophia Mendes',
    role: "League Champion '23",
    premium: false,
  },
  {
    id: 'sophia2',
    quote: '"Clean UI, fast updates, and high-stakes competition. DreamCup is truly in a league of its own for serious fans."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDStmiXnZzxkJNm067bbKE6lXySGKxr1_MLQRIf1_t3JkScP6FqMuCwkZAl_fT7XrMWGIDoqC5RHm3GsJMX0ofHkfCSYIG7XPuGnQtOz9w6K4AiKsWPaLBdmSnNXTpFyL8vWLv403dX9G9o_LiN1VOkbf9peF1le69EI0sl3ANN9oH6OzT31WxbMhKYezhUvRaCY-UQbwOOiJxXFqxoV_E2RIyZqQ9hqxP2TOvMvIl3LIPh9-0_Mf6Zq0bg1yV2RFPovJIMJf974w8',
    name: 'Sophia Mendes',
    role: "League Champion '23",
    premium: false,
  },
  {
    id: 'sophia3',
    quote: '"Clean UI, fast updates, and high-stakes competition. DreamCup is truly in a league of its own for serious fans."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDStmiXnZzxkJNm067bbKE6lXySGKxr1_MLQRIf1_t3JkScP6FqMuCwkZAl_fT7XrMWGIDoqC5RHm3GsJMX0ofHkfCSYIG7XPuGnQtOz9w6K4AiKsWPaLBdmSnNXTpFyL8vWLv403dX9G9o_LiN1VOkbf9peF1le69EI0sl3ANN9oH6OzT31WxbMhKYezhUvRaCY-UQbwOOiJxXFqxoV_E2RIyZqQ9hqxP2TOvMvIl3LIPh9-0_Mf6Zq0bg1yV2RFPovJIMJf974w8',
    name: 'Sophia Mendes',
    role: "League Champion '23",
    premium: false,
  },
  {
    id: 'sophia4',
    quote: '"Clean UI, fast updates, and high-stakes competition. DreamCup is truly in a league of its own for serious fans."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDStmiXnZzxkJNm067bbKE6lXySGKxr1_MLQRIf1_t3JkScP6FqMuCwkZAl_fT7XrMWGIDoqC5RHm3GsJMX0ofHkfCSYIG7XPuGnQtOz9w6K4AiKsWPaLBdmSnNXTpFyL8vWLv403dX9G9o_LiN1VOkbf9peF1le69EI0sl3ANN9oH6OzT31WxbMhKYezhUvRaCY-UQbwOOiJxXFqxoV_E2RIyZqQ9hqxP2TOvMvIl3LIPh9-0_Mf6Zq0bg1yV2RFPovJIMJf974w8',
    name: 'Sophia Mendes',
    role: "League Champion '23",
    premium: false,
  },
  {
    id: 'sophia5',
    quote: '"Clean UI, fast updates, and high-stakes competition. DreamCup is truly in a league of its own for serious fans."',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDStmiXnZzxkJNm067bbKE6lXySGKxr1_MLQRIf1_t3JkScP6FqMuCwkZAl_fT7XrMWGIDoqC5RHm3GsJMX0ofHkfCSYIG7XPuGnQtOz9w6K4AiKsWPaLBdmSnNXTpFyL8vWLv403dX9G9o_LiN1VOkbf9peF1le69EI0sl3ANN9oH6OzT31WxbMhKYezhUvRaCY-UQbwOOiJxXFqxoV_E2RIyZqQ9hqxP2TOvMvIl3LIPh9-0_Mf6Zq0bg1yV2RFPovJIMJf974w8',
    name: 'Sophia Mendes',
    role: "League Champion '23",
    premium: false,
  },
];

export default function Testimonials() {
  const sliderRef = useRef(null);
  let isDown = false, startX = 0, scrollLeft = 0;

  const onMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = 'grabbing';
  };
  const onMouseLeave = () => { isDown = false; sliderRef.current.style.cursor = 'grab'; };
  const onMouseUp = () => { isDown = false; sliderRef.current.style.cursor = 'grab'; };
  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeft - (x - startX) * 2;
  };

  const scrollLeftBtn = () => sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  const scrollRightBtn = () => sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' });

  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.inner}>
        <h2 className={styles.title}>Words from the Elite</h2>

        <div className={styles.sliderWrap}>
          {/* Arrows */}
          <button className={`${styles.arrowBtn} ${styles.prevBtn}`} onClick={scrollLeftBtn}>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          <button className={`${styles.arrowBtn} ${styles.nextBtn}`} onClick={scrollRightBtn}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>

          {/* Draggable slider */}
          <div
            className={styles.slider}
            ref={sliderRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className={`${styles.card} glass-panel${t.premium ? ' premium-border' : ''}`}
              >
                {/* Stars */}
                <div className={styles.stars}>
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} className="material-symbols-outlined" style={{ fontSize: 14, color: 'var(--dc-secondary-fixed)' }}>star</span>
                  ))}
                </div>

                {/* Quote */}
                <p className={styles.quote}>{t.quote}</p>

                {/* Author */}
                <div className={styles.author}>
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    className={styles.avatar}
                    width={48}
                    height={48}
                    style={{ objectFit: 'cover' }}
                  />
                  <div>
                    <p className={styles.authorName}>{t.name}</p>
                    <p className={styles.authorRole}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
