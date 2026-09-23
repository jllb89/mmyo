import Image from 'next/image';
import styles from '../app/[locale]/nuestro-equipo/page.module.css';

interface Member {
  name: string;
  position: string;
  image?: string;
}

interface TeamProps {
  socios: Member[];
  asociados: Member[];
  sociosTitle: string;
  asociadosTitle: string;
  leadershipLabel: string;
  teamLabel: string;
}

const Team: React.FC<TeamProps> = ({ socios, asociados, sociosTitle, asociadosTitle, leadershipLabel, teamLabel }) => {
  const featuredPartners = socios.slice(0, 3);
  const remainingPartners = socios.slice(3);

  const renderPartner = (member: Member, index: number, featured = false) => (
    <article className={`${styles.partnerCard} ${featured ? styles.featuredPartner : ''}`} key={member.name}>
      {member.image && (
        <div className={styles.portrait}>
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes={featured ? '(max-width: 700px) 44vw, 28vw' : '(max-width: 700px) 44vw, 20vw'}
            className={styles.portraitImage}
          />
        </div>
      )}
      <h3><span>{String(index + 1).padStart(2, '0')}</span>{member.name}</h3>
      <p>{member.position}</p>
    </article>
  );

  return (
    <>
      {socios.length > 0 && (
        <section className={styles.partnersSection} aria-labelledby="partners-title">
          <header className={styles.sectionHeader}>
            <h2 id="partners-title">{sociosTitle}</h2>
            <p>{leadershipLabel} / {String(socios.length).padStart(2, '0')}</p>
          </header>
          <div className={styles.sectionRule} />
          <div className={styles.featuredPartners}>
            {featuredPartners.map((member, index) => renderPartner(member, index, true))}
          </div>
          <div className={styles.partnerGrid}>
            {remainingPartners.map((member, index) => renderPartner(member, index + 3))}
          </div>
        </section>
      )}

      {asociados.length > 0 && (
        <section className={styles.associatesSection} aria-labelledby="associates-title">
          <header className={styles.sectionHeader}>
            <h2 id="associates-title">{asociadosTitle}</h2>
            <p>{teamLabel} / {String(asociados.length).padStart(2, '0')}</p>
          </header>
          <div className={styles.sectionRule} />
          <div className={styles.associateGrid}>
            {asociados.map((member, index) => (
              <article className={styles.associateRow} key={member.name}>
                <span className={styles.associateIndex}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default Team;
