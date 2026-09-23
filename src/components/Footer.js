'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../i18nConfig';
import styles from './Footer.module.css';

export default function Footer() {
  const { t, i18n } = useTranslation('footer');
  const locale = i18n.resolvedLanguage || i18n.language || i18nConfig.defaultLocale;
  const year = new Date().getFullYear();
  const localizedHref = (href) => {
    const prefix = locale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault ? '' : `/${locale}`;
    return href === '/' ? (prefix || '/') : `${prefix}${href}`;
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <section className={styles.destination}>
        <div className={styles.topRow}>
          <p>{t('brand')}</p>
          <button type="button" onClick={scrollToTop}>{t('back-to-top')} ↗</button>
        </div>

        <div className={styles.statementRow}>
          <h2>{t('statement')}</h2>
          <div className={styles.locationMeta}>
            <p>{t('coordinates')}</p>
            <span aria-hidden="true">↗</span>
          </div>
        </div>

        <div className={styles.contactRow}>
          <div className={styles.emailBlock}>
            <p>{t('conversation-label')}</p>
            <a href="mailto:mmyo@mmyo.com.mx">mmyo@mmyo.com.mx</a>
          </div>
          <Link href={localizedHref('/contacto')} className={styles.talkButton}>{t('talk')} ↗</Link>
        </div>
      </section>

      <section className={styles.navigationField}>
        <div className={styles.infoRow}>
          <p className={styles.rowNumber}>01</p>
          <p className={styles.rowLabel}>{t('explore')}</p>
          <nav className={styles.rowContent} aria-label={t('explore')}>
            <Link href={localizedHref('/fiscal')}>{t('services')}</Link><span>/</span>
            <Link href={localizedHref('/nuestro-equipo')}>{t('team')}</Link><span>/</span>
            <Link href={`${localizedHref('/')}#ideas`}>{t('ideas')}</Link><span>/</span>
            <Link href={localizedHref('/contacto')}>{t('contact')}</Link>
          </nav>
        </div>

        <div className={styles.infoRow}>
          <p className={styles.rowNumber}>02</p>
          <p className={styles.rowLabel}>{t('visit')}</p>
          <p className={styles.rowContent}>{t('address')}</p>
          <p className={styles.rowAside}>{t('city')}</p>
        </div>

        <div className={`${styles.infoRow} ${styles.connectRow}`}>
          <p className={styles.rowNumber}>03</p>
          <p className={styles.rowLabel}>{t('connect')}</p>
          <p className={styles.rowContent}>
            <a href="mailto:mmyo@mmyo.com.mx">{t('email')}</a>
          </p>
          <p className={styles.rowAside}><Link href={localizedHref('/aviso-de-privacidad')}>{t('privacy')}</Link> · © {year} MMYO</p>
        </div>

        <div className={styles.bottomRow}>
          <p>{t('disciplines')}</p>
          <p className={styles.country}>{t('country')}</p>
          <p className={styles.mobileLegal}><Link href={localizedHref('/aviso-de-privacidad')}>{t('privacy')}</Link> · © {year} MMYO</p>
        </div>
      </section>
    </footer>
  );
}
