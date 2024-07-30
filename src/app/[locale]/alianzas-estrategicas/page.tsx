import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';

const i18nNamespaces = ['alianzas-estratégicas', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['alianzas-estratégicas', 'common', 'navbar', 'mailing-list', 'footer']);
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
              <li><Link href="/alianzas-estrategicas/asesoria-usa" className={styles.subLink}>{t('navbar:asesoria-usa')}</Link></li>
              <li><Link href="/alianzas-estrategicas/representacion-legal" className={styles.subLink}>{t('navbar:representacion-legal')}</Link></li>
              <li><Link href="/alianzas-estrategicas/cfo-on-demand" className={styles.subLink}>{t('navbar:cfo-on-demand')}</Link></li>            
            </ul>
          </div>
        </div>
        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}