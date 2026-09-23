'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './HomeServices.module.css';

export default function HomeServices({ services, eyebrow, title, intro, instruction, actionLabel }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.services} ${revealed ? styles.revealed : ''}`}
      aria-labelledby="services-title"
    >
      <div className={styles.introColumn}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id="services-title">{title}</h2>
        <p className={styles.intro}>{intro}</p>
        <p className={styles.instruction}>{instruction}</p>
      </div>

      <div className={styles.serviceIndex}>
        {services.map((service, index) => {
          const isActive = activeIndex === index;
          return (
            <Link
              href={service.href}
              className={`${styles.serviceRow} ${isActive ? styles.active : ''}`}
              key={service.href}
              style={{ '--row-delay': `${100 + (index * 45)}ms` }}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
            >
              <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
              <span className={styles.label}>{service.label}</span>
              {isActive && <span className={styles.action}>{actionLabel}</span>}
              {isActive && (
                <span className={styles.preview} aria-hidden="true">
                  <Image src="/images/hero-architecture-v2.png" alt="" fill sizes="238px" loading="eager" />
                </span>
              )}
              <span className={styles.arrow} aria-hidden="true">↗</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
