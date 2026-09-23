'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './not-found.module.css';

const copy = {
  es: {
    eyebrow: 'ERROR / 404',
    title: 'Esta página no está aquí.',
    text: 'La dirección pudo cambiar o el contenido ya no está disponible.',
    action: 'VOLVER AL INICIO',
    note: 'MMYO / NAVEGACIÓN',
  },
  en: {
    eyebrow: 'ERROR / 404',
    title: 'This page is not here.',
    text: 'The address may have changed or the content is no longer available.',
    action: 'BACK TO HOME',
    note: 'MMYO / NAVIGATION',
  },
};

export default function NotFoundPage() {
  const params = useParams();
  const locale = params?.locale === 'en' ? 'en' : 'es';
  const content = copy[locale];

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href={`/${locale}`} aria-label="MMYO">MMYO</Link>
        <span>{content.note}</span>
      </header>
      <section className={styles.content}>
        <p className={styles.eyebrow}>{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <div className={styles.details}>
          <p>{content.text}</p>
          <Link href={`/${locale}`}>{content.action}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <footer className={styles.footer}>
        <span>19.3866° N / 99.2524° W</span>
        <span>MMYO © {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}
