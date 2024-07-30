import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';

const i18nNamespaces = ['contacto', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, ['contacto', 'common', 'navbar', 'mailing-list', 'footer']);
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
                            <p>Corporativo Espacio Santa Fe,<br></br>Carretera México Toluca 5420. Piso 25.<br></br>Col. El Yaqui. CP 05320 CDMX.</p>
                        </div>
                        <div className={styles.contactData}>
                            <div className={styles.contactColumn}>
                                <h2>{t('e-mail')}</h2>
                                <p><a href="mailto:info@example.com" className={styles.contactLink}>info@example.com</a></p>
                            </div>
                            <div className={styles.contactColumn}>
                                <h2>{t('telefono')}</h2>
                                <p><a href="tel:+521234567890" className={styles.contactLink}>+52 123 456 7890</a></p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.formWrapper}>
                        <ContactForm />
                    </div>
                </div>
                <MailingList />
                <Footer />
            </main>
        </TranslationsProvider>
    );
}
