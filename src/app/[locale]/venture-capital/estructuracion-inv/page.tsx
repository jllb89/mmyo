import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../../i18n';
import TranslationsProvider from '../../../../components/TranslationsProvider';
import Navbar from '../../../../components/Navbar';
import MailingList from '../../../../components/MailingList';
import Footer from '../../../../components/Footer';
import HighlightText from '../../../../components/HighlightText';
import Image from 'next/image';

const i18nNamespaces = ['estructuración-de-las-inversiones-con-enfoque-multi-pais', 'common'];

const phrasesToHighlight = [
  'punta de lanza de emprendimientos',
  'la estructuración de los mismos'
];


export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['estructuración-de-las-inversiones-con-enfoque-multi-pais', 'navbar', 'mailing-list', 'footer']);
  const textLines = t('text').split('\n\n');

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar linkColor="#535E6B" logoType="logo2.svg" />
        <div className={styles.content}>
        <Image
            src="/images/l5.png"
            alt="Bottom Left Decoration"
            width={1500}
            height={1500}
            className={styles.bottomRightImg}
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
                <p className={styles.linkTitle}></p>
              </div>
              <div className={`${styles.linkWrapper} ${styles.rightAlign}`}>
                <Link href="/venture-capital/diagnostico-inicial" className={styles.serviceLink}>{t('siguiente-servicio')}
                </Link>
                <p className={styles.linkTitle2}>{t('navbar:diagnostico-inicial')}</p>
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