import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';

const i18nNamespaces = ['venture-capital', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['venture-capital', 'common', 'navbar', 'mailing-list', 'footer']);
  const textLines = t('text').split('\n\n').map((paragraph: string) =>
    paragraph.split('\n').map((line: string, index: number) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))
  );

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
            {textLines.map((paragraph: JSX.Element[], index: number) => (
              <p key={index} className={styles.textLine}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
