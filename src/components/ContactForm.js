'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const { t } = useTranslation('contacto');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume') {
            setFormData({
                ...formData,
                resume: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.phone && formData.resume && formData.about) {
            setError('');
            setSubmitted(true);
        } else {
            setError(t('invalid-input'));
        }
    };

    return (
        <div className={styles.applicationForm}>
            <div className={styles.form}>
                {!submitted ? (
                    <>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="name"
                                placeholder={t('form-field-name-1')}
                                className={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="email"
                                placeholder={t('form-field-name-2')}
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <textarea
                                name="message"
                                placeholder={t('form-field-name-3')}
                                className={styles.textarea}
                                value={formData.message}
                                onChange={handleChange}
                                maxLength="250"
                            />
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.submitButton} onClick={handleSubmit}>
                                {t('form-button')}
                            </button>
                        </div>
                        <div className={styles.errorContainer}>
                            {error && <p className={styles.error}>{error}</p>}
                        </div>
                    </>
                ) : (
                    <p className={`${styles.confirmation} ${styles.fadeIn}`}>{t('confirmation')}</p>
                )}
            </div>
        </div>
    );
}
