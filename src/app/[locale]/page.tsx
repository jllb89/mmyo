import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../i18n';
import TranslationsProvider from '../../components/TranslationsProvider';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import MailingList from '../../components/MailingList';
import Footer from '../../components/Footer';

const i18nNamespaces = ['home'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['home', 'common', 'navbar', 'mailing-list', 'footer']);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <h1>{t("header")}</h1>
            <div className={styles.buttonContainer}>
              <Link href="/contacto" className={styles.headerButton}>{t("contacto")}</Link>
            </div>
          </div>
        </div>
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <Image src="/svg/MMYO.svg" alt="MMYO Logo" width={200} height={200} />
          </div>
        </div>
        <div className={styles.homeContent}>
          <div className={styles.p1}>
            <div className={styles.textContainer}>
              <h2>{t("p1")}</h2>
            </div>
            <hr className={styles.horizontalLine} />
          </div>
          <div className={styles.homeTitle}>
            <h3>
              {t("quienes-somos").split('\n').map((line: string, index: number) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </h3>
          </div>
          <div className={styles.p2}>
            <div className={styles.p2textContainer}>
              <h2>{t("p2")}</h2>
            </div>
          </div>
          <div className={styles.homeLink}>
            <h3>
              {t("nuestros-servicios").split('\n').map((line: string, index: number) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </h3>
          </div>
        </div>
        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
