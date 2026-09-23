'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './SectionReveal.module.css';

export default function SectionReveal({ children, tone = 'blue', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${styles[tone]} ${visible ? styles.visible : ''}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}
