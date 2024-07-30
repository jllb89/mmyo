'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './MailingList.module.css';
import Image from 'next/image';

export default function MailingList() {
    const { t } = useTranslation('mailing-list');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            setError('');
            setSubmitted(true);
        } else {
            setError(t('invalid-email'));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div className={styles.mailingForm}>
            <div className={styles.form}>
                <h2>{t('title')}</h2>
                {!submitted ? (
                    <>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder={t('placeholder')}
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button className={styles.submitButton} onClick={handleSubmit}>
                                <Image src="/svg/right.svg" alt="Submit" width={24} height={24} />
                            </button>
                        </div>
                        <div className={styles.errorContainer}>
                            {error ? <p className={styles.error}>{error}</p> : <p className={styles.errorPlaceholder}>{" "}</p>}
                        </div>
                    </>
                ) : (
                    <p className={`${styles.confirmation} ${styles.fadeIn}`}>{t('confirmation')}</p>
                )}
            </div>
        </div>
    );
}
