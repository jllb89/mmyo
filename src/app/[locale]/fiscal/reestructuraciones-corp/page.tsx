import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../../i18n';
import TranslationsProvider from '../../../../components/TranslationsProvider';
import Navbar from '../../../../components/Navbar';
import MailingList from '../../../../components/MailingList';
import Footer from '../../../../components/Footer';

const i18nNamespaces = ['reestructuraciones-corporativas', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['reestructuraciones-corporativas', 'navbar', 'mailing-list', 'footer']);
  const textLines = t('text').split('\n\n');

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar linkColor="#535E6B" logoType="logo2.svg" />
        <div className={styles.content}>
          <div className={styles.pageCategory}>
            <p>{t('category')}</p>
          </div>
          <div className={styles.texts}>
            <h1>{t('header')}</h1>
            {textLines.map((line: string, index: number) => (
              <p key={index} className={styles.textLine}>{line}</p>
            ))}
            <div className={styles.linkContainer}>
              <div className={`${styles.linkWrapper} ${styles.leftAlign}`}>
                <Link href="/fiscal/proyectos-infraestructura" className={styles.serviceLink}>{t('servicio-anterior')}
                </Link>
                <p className={styles.linkTitle}>{t('navbar:proyectos-infraestructura')}</p>
              </div>
              <div className={`${styles.linkWrapper} ${styles.rightAlign}`}>
                <Link href="/fiscal/asesoria-alianzas" className={styles.serviceLink}>{t('siguiente-servicio')}
                </Link>
                <p className={styles.linkTitle2}>{t('navbar:asesoria-alianzas')}</p>
              </div>
            </div>
          </div>
        </div>
        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}