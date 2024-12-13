import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../../i18n';
import TranslationsProvider from '../../../../components/TranslationsProvider';
import Navbar from '../../../../components/Navbar';
import MailingList from '../../../../components/MailingList';
import Footer from '../../../../components/Footer';
import HighlightText from '../../../../components/HighlightText';
import Image from 'next/image';

const i18nNamespaces = ['consultoria-fiscal-local-e-internacional', 'common'];

const phrasesToHighlight = [
  'maximizar sus oportunidades',
  'determinar la manera más conveniente de invertir y estructurar sus proyectos.',
  'rápidamente'
];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['consultoria-fiscal-local-e-internacional', 'navbar', 'mailing-list', 'footer']);
  const textLines = t('text').split('\n\n');

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar/>
        <div className={styles.content}>
        <Image
            src="/svg/l2.svg"
            alt="Top Right Decoration"
            width={1500}
            height={1500}
            className={styles.topRightImg}
          />
          <Image
            src="/svg/logo3.svg"
            alt="Bottom Left Decoration"
            width={300}
            height={300}
            className={styles.bottomLeftImg}
          />
          <div className={styles.pageCategory}>
            <p>{t('category')}</p>
          </div>
          <div className={styles.texts}>
            <h1>{t('header')}</h1>
            {textLines.map((line: string, index: number) => (
              <p key={index} className={styles.textLine}>
                <HighlightText text={line} phrases={phrasesToHighlight} />
              </p>
            ))}
            <div className={styles.linkContainer}>
              <div className={`${styles.linkWrapper} ${styles.leftAlign}`}>
                <p className={styles.linkTitle}>{/* {t('navbar:dictamenes-fiscales')} */}</p>
              </div>
              <div className={`${styles.linkWrapper} ${styles.rightAlign}`}>
                <Link href="/fiscal/transacciones-financieras" className={styles.serviceLink}>{t('siguiente-servicio')}
                </Link>
                <p className={styles.linkTitle2}>{t('navbar:transacciones-financieras')}</p>
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