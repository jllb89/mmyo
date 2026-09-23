'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const { t } = useTranslation('contacto');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.message) {
      setError(t('invalid-input'));
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || t('invalid-input'));
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError.message || t('invalid-input'));
    } finally {
      setSubmitting(false);
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
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="contact-name">{t('form-field-name-1')}</label>
        <input id="contact-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className={styles.field}>
        <label htmlFor="contact-email">{t('form-field-name-2')}</label>
        <input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className={`${styles.field} ${styles.messageField}`}>
        <label htmlFor="contact-message">{t('form-field-name-3')}</label>
        <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} maxLength={250} required />
        <span className={styles.counter}>{formData.message.length}/250</span>
      </div>
      <button className={styles.submitButton} type="submit" disabled={submitting}>
        <span>{submitting ? t('sending') : t('form-button')}</span>
        <span aria-hidden="true">↗</span>
      </button>
      <div className={styles.errorContainer} aria-live="polite">
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </form>
  );
}
