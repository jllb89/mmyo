import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../../i18n';
import TranslationsProvider from '../../../../components/TranslationsProvider';
import Navbar from '../../../../components/Navbar';
import MailingList from '../../../../components/MailingList';
import Footer from '../../../../components/Footer';

const i18nNamespaces = ['chief-financial-officer-on-demand', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['chief-financial-officer-on-demand', 'navbar', 'mailing-list', 'footer']);
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
                <Link href="/alianzas-estrategicas/representacion-legal" className={styles.serviceLink}>{t('servicio-anterior')}
                </Link>
                <p className={styles.linkTitle}>{t('navbar:representacion-legal')}</p>
              </div>
              <div className={`${styles.linkWrapper} ${styles.rightAlign}`}>
{/*                 <Link href="/alianzas-estrategicas/cfo-on-demand" className={styles.serviceLink}>{t('siguiente-servicio')}
                </Link> */}
                <p className={styles.linkTitle2}></p>
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