'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../app/[locale]/nuestro-equipo/page.module.css';

interface Member {
  name: string;
  position: string;
  linkedin: string;
  image: string;
}

interface TeamProps {
  socios: Member[];
  asociados: Member[];
  sociosTitle: string;
  asociadosTitle: string;
}

const Team: React.FC<TeamProps> = ({ socios, asociados, sociosTitle, asociadosTitle }) => {
  const [visibleImageIndex, setVisibleImageIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleImageVisibility = (index: number) => {
    setVisibleImageIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleNameClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    toggleImageVisibility(index);
  };

  const handleMainClick = () => {
    if (isMobile) {
      setVisibleImageIndex(null);
    }
  };

  return (
    <main className={styles.main} onClick={handleMainClick}>
      <div className={styles.homeTitle}>
        <h3>
          {sociosTitle.split('\n').map((line: string, index: number) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </h3>
      </div>

      <div className={styles.gridContainer}>
        {socios.map((member, index) => (
          <div
            className={styles.gridItem}
            key={index}
            onClick={(e) => isMobile && handleNameClick(e, index)}
            onMouseEnter={() => !isMobile && setVisibleImageIndex(index)}
            onMouseLeave={() => !isMobile && setVisibleImageIndex(null)}
          >
            <p
              className={styles.name}
              onClick={(e) => isMobile && handleNameClick(e, index)}
            >
              {member.name}
            </p>
            <p className={styles.position}>{member.position}</p>
            <Link href={member.linkedin} className={styles.linkedinLink}>
              LinkedIn
            </Link>
            {visibleImageIndex === index && (
              <div className={styles.imageWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className={styles.image}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.homeTitle}>
        <h3>
          {asociadosTitle.split('\n').map((line: string, index: number) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </h3>
      </div>

      <div className={styles.gridContainer}>
        {asociados.map((member, index) => (
          <div
            className={styles.gridItem}
            key={index}
            onClick={(e) => isMobile && handleNameClick(e, index + socios.length)}
            onMouseEnter={() => !isMobile && setVisibleImageIndex(index + socios.length)}
            onMouseLeave={() => !isMobile && setVisibleImageIndex(null)}
          >
            <p
              className={styles.name}
              onClick={(e) => isMobile && handleNameClick(e, index + socios.length)}
            >
              {member.name}
            </p>
            <p className={styles.position}>{member.position}</p>
            <Link href={member.linkedin} className={styles.linkedinLink}>
              LinkedIn
            </Link>
            {visibleImageIndex === index + socios.length && (
              <div className={styles.imageWrapper}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className={styles.image}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Team;
