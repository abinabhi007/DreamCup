import styles from './UpcomingMatches.module.scss';

const MATCHES = [
  {
    id: 'fra-bra',
    homeFlag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUDCi1mpmXB8ATfxIhZyIYRCuslrTLdCqH6VvD5ZxlaRUW0giZ9zmMLMTZSYQsd3TmCr11Sly6q7TxdR4zz2J3bOsHevKM9tn8hyjU2rL3pgavrXpAftPkP6w-QOIXb4VBPQMYWYoTagHpQxOpweMXcI2cOU2aB4_4XtKo69tr2cTG189sXt6EZXEYNnWU4T5kXJxCjhyeV9sKGj51zv2u1rpWq8MrG4PFEdqBsHHxBz4QBeti15aI9AAbMO0EMxXacMd3TZtAxbs',
    homeCode: 'FRA',
    awayFlag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCsL5dr9gvSkqAHlKCfMd3rFYkN7Ce6JsH7UmrYUKF2aCrrlLdiDq1sifq3N6Hth7wVQcZzjwlQufP5Dm2DdSQHX19U89r6E8RTPE4sY5MWA2VsQpO0MjRbkb5NnW_NdV99gxaNIooV797_r7HciwTKhckkcw2YNBEYHVwFm1YVoDkUpyDombcUO8mJdtVnOK1SfHsHansVMrFhElGf8ZiHwcL7kCIaNHFF4c9w0ArVmKIf0ekR-625187w7dvRTQvBlTpT80OyvU',
    awayCode: 'BRA',
    when: 'Tonight, 20:00',
    venue: 'Lusail Stadium, Qatar',
    cta: 'PICK LINEUP',
    ctaPrimary: true,
  },
  {
    id: 'arg-ned',
    homeFlag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApc617cr_3mr0GhLQcTRSXhavkRSHvs53eXHIj14TTnX3O3_BIe4bmZ9ijI6hicwq08xjhGNuoveh0TY8ma_OSFfLY1Dc_ajeQ2dklTrq6aOCMfJRkFE2DLU4rWzn9kbSh1ejykowdoENFTSt_-kmKWwJ9ZNVBKO1yzkfhW1CDi2ZjmPvtm1rojR66h5DVGjqAi_lp5B4rc6aRAqyH7-bIps1sLd5iUPcQ-vsbrw-1wOPalFqRM9z3anyLkxUsVJdhjg8qWvMBrc8',
    homeCode: 'ARG',
    awayFlag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP8x2xuSflMv3RvtD7qt2tULbvi_LA1GYzPaTsKjQ_33sbLTowuPuDnTdY73GESriOp0VgFcgbSh-qxDsk7_QeB-c489V7GyRa4QXRamTtmp0UX7FMXOQn7HVxXQRsmAEkkYCKhk1TsBJNiG_v2U7SMKAFiYxbVD0k78cGO9jS7UYo8MOq9M2IdGxASLRs7dzd5UEKMK7V7gRdZXR8V8iNLsahPlF58ajNWjAfQvVaENr0P8JFQS8EgaX3yc6_cD1bZjfDKOq_BeQ',
    awayCode: 'NED',
    when: 'Tomorrow, 17:30',
    venue: 'Al Thumama Stadium',
    cta: 'RESERVE SLOT',
    ctaPrimary: false,
  },
];

export default function UpcomingMatches() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.sectionTitle}>Upcoming High-Stakes Matches</h2>

        <div className={styles.grid}>
          {MATCHES.map((m) => (
            <div
              key={m.id}
              className={`${styles.matchCard} glass-panel${m.ctaPrimary ? ' ' + styles.matchCardPrimary : ''}`}
            >
              {/* Teams */}
              <div className={styles.teams}>
                <div className={styles.teamCol}>
                  <img src={m.homeFlag} alt={m.homeCode} className={styles.flag} />
                  <span className={styles.teamCode}>{m.homeCode}</span>
                </div>
                <span className={styles.vs}>VS</span>
                <div className={styles.teamCol}>
                  <img src={m.awayFlag} alt={m.awayCode} className={styles.flag} />
                  <span className={styles.teamCode}>{m.awayCode}</span>
                </div>
              </div>

              {/* Right info */}
              <div className={styles.matchInfo}>
                <p className={styles.matchWhen}>{m.when}</p>
                <p className={styles.matchVenue}>{m.venue}</p>
                <button
                  className={`${styles.matchBtn}${m.ctaPrimary ? ' ' + styles.matchBtnPrimary : ' ' + styles.matchBtnSecondary}`}
                  id={`match-cta-${m.id}`}
                >
                  {m.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
