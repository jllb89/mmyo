import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';

const i18nNamespaces = ['servicios-fiscales', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['servicios-fiscales', 'common', 'navbar', 'mailing-list', 'footer']);
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
              <li><Link href="/fiscal/consultoria-fiscal" className={styles.subLink}>{t('navbar:consultoria-fiscal')}</Link></li>
              <li><Link href="/fiscal/transacciones-financieras" className={styles.subLink}>{t('navbar:transacciones-financieras')}</Link></li>
              <li><Link href="/fiscal/emisiones-valores" className={styles.subLink}>{t('navbar:emisiones-valores')}</Link></li>
              <li><Link href="/fiscal/fondos-inversion" className={styles.subLink}>{t('navbar:fondos-inversion')}</Link></li>
              <li><Link href="/fiscal/proyectos-inversion" className={styles.subLink}>{t('navbar:proyectos-inversion')}</Link></li>
              <li><Link href="/fiscal/proyectos-infraestructura" className={styles.subLink}>{t('navbar:proyectos-infraestructura')}</Link></li>
              <li><Link href="/fiscal/reestructuraciones-corp" className={styles.subLink}>{t('navbar:reestructuraciones-corp')}</Link></li>
              <li><Link href="/fiscal/asesoria-alianzas" className={styles.subLink}>{t('navbar:asesoria-alianzas')}</Link></li>
              <li><Link href="/fiscal/promociones-fiscales" className={styles.subLink}>{t('navbar:promociones-fiscales')}</Link></li>
              <li><Link href="/fiscal/due-dilligence" className={styles.subLink}>{t('navbar:due-diligence')}</Link></li>
              <li><Link href="/fiscal/revision-fiscal" className={styles.subLink}>{t('navbar:revision-fiscal')}</Link></li>
              <li><Link href="/fiscal/proyectos-energia" className={styles.subLink}>{t('navbar:proyectos-energia')}</Link></li>
              <li><Link href="/fiscal/dictamenes-fiscales" className={styles.subLink}>{t('navbar:dictamenes-fiscales')}</Link></li>
            </ul>
          </div>
        </div>
        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
