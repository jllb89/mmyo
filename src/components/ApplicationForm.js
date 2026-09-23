'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ApplicationForm.module.css';

export default function ApplicationForm() {
  const { t } = useTranslation('work-with-us');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', resume: null, about: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    const nextValue = files ? files[0] || null : value;
    setFormData((current) => ({ ...current, [name]: nextValue }));
    if (files) setFileName(files[0]?.name || '');
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.resume || !formData.about) {
      setError(t('invalid-input'));
      return;
    }

    setIsSending(true);
    setError('');
    const body = new FormData();
    Object.entries(formData).forEach(([key, value]) => body.append(key, value));

    try {
      const response = await fetch('/api/application-form', { method: 'POST', body });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('invalid-input'));
      }
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError.message || t('invalid-input'));
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.confirmation} role="status">
        <span>{t('confirmation-label')}</span>
        <p>{t('confirmation')}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="application-name">{t('form-field-name-1')}</label>
        <input id="application-name" name="name" type="text" value={formData.name} onChange={handleChange} autoComplete="name" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="application-email">{t('form-field-name-2')}</label>
        <input id="application-email" name="email" type="email" value={formData.email} onChange={handleChange} autoComplete="email" required />
      </div>
      <div className={styles.field}>
        <label htmlFor="application-phone">{t('form-field-name-5')}</label>
        <input id="application-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} autoComplete="tel" required />
      </div>
      <div className={`${styles.field} ${styles.aboutField}`}>
        <label htmlFor="application-about">{t('form-field-name-4')}</label>
        <textarea id="application-about" name="about" value={formData.about} onChange={handleChange} maxLength={250} required />
        <span className={styles.counter}>{formData.about.length} / 250</span>
      </div>
      <div className={`${styles.field} ${styles.fileField}`}>
        <span className={styles.fileHeading}>{t('form-field-name-3')}</span>
        <label htmlFor="application-resume" className={styles.fileLabel}>
          <span>{fileName || t('form-field-3')}</span>
          <span className={styles.fileAction} aria-hidden="true">+</span>
        </label>
        <input id="application-resume" name="resume" type="file" className={styles.fileInput} onChange={handleChange} accept=".pdf,.doc,.docx" required />
      </div>
      <button className={styles.submitButton} type="submit" disabled={isSending}>
        <span>{isSending ? t('sending') : t('form-button')}</span>
        <span aria-hidden="true">↗</span>
      </button>
      <div className={styles.statusContainer} aria-live="polite">
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </form>
  );
}
