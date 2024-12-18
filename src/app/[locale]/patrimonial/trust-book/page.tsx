import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../../i18n';
import TranslationsProvider from '../../../../components/TranslationsProvider';
import Navbar from '../../../../components/Navbar';
import MailingList from '../../../../components/MailingList';
import Footer from '../../../../components/Footer';
import HighlightText from '../../../../components/HighlightText';
import Image from 'next/image';

const i18nNamespaces = ['trust-book', 'common'];

const phrasesToHighlight = [
  'Hemos identificado que la gran mayoría de las familias,',
  'creamos Trust Book, un servicio especializado que consiste en identificar las inversiones y documentos relevantes',
  'A través de Trust Book, los clientes pueden consolidar sus datos y documentos relevantes,'
];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['trust-book', 'navbar', 'mailing-list', 'footer']);
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
                <Link href="/patrimonial/evolucion-familiar" className={styles.serviceLink}>{t('servicio-anterior')}
                </Link>
                <p className={styles.linkTitle}>{t('navbar:evolucion-familiar')}</p>
              </div>
              <div className={`${styles.linkWrapper} ${styles.rightAlign}`}>
                <Link href="/patrimonial/family-governance" className={styles.serviceLink}>{t('siguiente-servicio')}
                </Link>
                <p className={styles.linkTitle2}>{t('navbar:family-governance')}</p>
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