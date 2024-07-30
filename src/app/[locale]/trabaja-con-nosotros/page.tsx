import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';
import ApplicationForm from '../../../components/ApplicationForm';

const i18nNamespaces = ['work-with-us', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, ['work-with-us', 'common', 'navbar', 'mailing-list', 'footer']);
    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}>
            <main className={styles.main}>
                <Navbar />
                <div className={styles.content}>
                    <div className={styles.texts}>
                        <h1>{t('header')}</h1>
                        <div className={styles.pageText}>
                            <p>{t('text')}</p>
                        </div>
                    </div>
                    <div className={styles.formWrapper}>
                        <ApplicationForm />
                    </div>
                </div>
                <MailingList />
                <Footer />
            </main>
        </TranslationsProvider>
    );
}
