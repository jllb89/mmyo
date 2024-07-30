import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';

const i18nNamespaces = ['servicios-patrimoniales', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
    const { t, resources } = await initTranslations(locale, ['servicios-patrimoniales', 'common', 'navbar', 'mailing-list', 'footer']);
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
                        <p>{t('text')}</p>
                        <ul className={styles.linksList}>
                            <li><Link href="/patrimonial/evolucion-familiar" className={styles.subLink}>{t('navbar:evolucion-familiar')}</Link></li>
                            <li><Link href="/patrimonial/trust-book" className={styles.subLink}>{t('navbar:trust-book')}</Link></li>
                            <li><Link href="/patrimonial/family-governance" className={styles.subLink}>{t('navbar:family-governance')}</Link></li>
                            <li><Link href="/patrimonial/planeacion-estructuras" className={styles.subLink}>{t('navbar:planeacion-estructuras')}</Link></li>
                            <li><Link href="/patrimonial/cumplimiento-fiscal" className={styles.subLink}>{t('navbar:cumplimiento-fiscal')}</Link></li>
                            <li><Link href="/patrimonial/procesos-sucesorios" className={styles.subLink}>{t('navbar:procesos-sucesorios')}</Link></li>
                            <li><Link href="/patrimonial/liquidez-familiar" className={styles.subLink}>{t('navbar:liquidez-familiar')}</Link></li>
                            <li><Link href="/patrimonial/nuevas-inversiones" className={styles.subLink}>{t('navbar:nuevas-inversiones')}</Link></li>
                            <li><Link href="/patrimonial/transparency-act" className={styles.subLink}>{t('navbar:transparency-act')}</Link></li>
                        </ul>
                    </div>
                </div>
                <MailingList />
                <Footer />
            </main>
        </TranslationsProvider>
    );
}
