'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ApplicationForm.module.css';

export default function ApplicationForm() {
    const { t } = useTranslation('work-with-us');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        resume: null,
        about: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [fileName, setFileName] = useState(t('form-field-3'));

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
        if (files) {
            setFileName(files[0]?.name || t('form-field-3'));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.name && formData.email && formData.phone && formData.resume && formData.about) {
            setIsSending(true); // Show "sending" message

            const body = new FormData();
            body.append('name', formData.name);
            body.append('email', formData.email);
            body.append('phone', formData.phone);
            body.append('about', formData.about);
            body.append('resume', formData.resume);

            try {
                const response = await fetch('/api/application-form', {
                    method: 'POST',
                    body,
                });

                if (response.ok) {
                    setError('');
                    setSubmitted(true);
                } else {
                    const errorData = await response.json();
                    setError(`Error: ${errorData.error || t('invalid-input')}`);
                }
            } catch (error) {
                setError(`Error: ${error.message || t('invalid-input')}`);
            } finally {
                setIsSending(false); // Hide "sending" message after completion
            }
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
                            <input
                                type="text"
                                name="phone"
                                placeholder={t('form-field-name-5')}
                                className={styles.input}
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <textarea
                                name="about"
                                placeholder={t('form-field-name-4')}
                                className={styles.textarea}
                                value={formData.about}
                                onChange={handleChange}
                                maxLength="250"
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label className={styles.fileLabel}>
                                {fileName}
                                <input
                                    type="file"
                                    name="resume"
                                    className={styles.fileInput}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                        <div className={styles.buttonContainer}>
                            <button className={styles.submitButton} onClick={handleSubmit} disabled={isSending}>
                                {t('form-button')}
                            </button>
                        </div>
                        <div className={styles.statusContainer}>
                            {isSending && <p className={styles.statusMessage}>{t('sending')}</p>}
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
