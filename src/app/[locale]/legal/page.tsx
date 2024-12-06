import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';

const i18nNamespaces = ['servicios-legales', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['servicios-legales', 'common', 'navbar', 'mailing-list', 'footer']);
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.content}>
          <Image
            src="/svg/l2.svg"
            alt="Top Right Decoration"
            width={1100}
            height={1100}
            className={styles.topRightImg}
          />
          <Image
            src="/svg/logo3.svg"
            alt="Bottom Left Decoration"
            width={300}
            height={300}
            className={styles.bottomLeftImg}
          />
          <div className={styles.texts}>
            <h1>{t('header')}</h1>
            <p>{t('text')}</p>
            <ul className={styles.linksList}>
              <li><Link href="/legal/analisis-preventivo" className={styles.subLink}>{t('navbar:analisis-preventivo')}</Link></li>
              <li><Link href="/legal/litigio-contencioso" className={styles.subLink}>{t('navbar:litigio-fiscal')}</Link></li>
              <li><Link href="/legal/litigio-constitucional-fiscal" className={styles.subLink}>{t('navbar:litigio-constitucional')}</Link></li>
              <li><Link href="/legal/solucion-anticipada-de-controversias" className={styles.subLink}>{t('navbar:solucion-controversias')}</Link></li>
            </ul>
          </div>
        </div>
        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
