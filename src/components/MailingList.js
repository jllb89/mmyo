'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MailingList.module.css';

export default function MailingList() {
  const { t } = useTranslation('mailing-list');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('default');

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());
    setStatus(isValid ? 'success' : 'error');
  };

  return (
    <section className={styles.mailingSection} aria-labelledby="newsletter-title">
      <div className={styles.blueVeil} aria-hidden="true" />
      <div className={styles.leftFocus} aria-hidden="true" />
      <div className={styles.headline}>
        <span className={styles.accent} aria-hidden="true" />
        <h2 id="newsletter-title">{t('title')}</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {status === 'success' ? (
          <div className={styles.successRow} role="status">
            <p>{t('confirmation')}</p>
            <span className={styles.successMark} aria-hidden="true">✓</span>
          </div>
        ) : (
          <div className={styles.inputRow}>
            <label className={styles.visuallyHidden} htmlFor="newsletter-email">{t('placeholder')}</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              placeholder={t('placeholder')}
              aria-invalid={status === 'error'}
              aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status === 'error') setStatus('default');
              }}
            />
            <button type="submit" aria-label={t('submit')}><span aria-hidden="true">→</span></button>
          </div>
        )}
        <span className={styles.hairline} aria-hidden="true" />
        {status === 'error' && <p id="newsletter-error" className={styles.error} role="alert">{t('invalid-email')}</p>}
      </form>
    </section>
  );
}
