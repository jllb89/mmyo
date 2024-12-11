import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../../i18n';
import TranslationsProvider from '../../../../components/TranslationsProvider';
import Navbar from '../../../../components/Navbar';
import MailingList from '../../../../components/MailingList';
import Footer from '../../../../components/Footer';
import HighlightText from '../../../../components/HighlightText';

const i18nNamespaces = ['asesoría-fiscal-en-estados-unidos-de-america', 'common'];

const phrasesToHighlight = [
  'podemos atender las necesidades de nuestros clientes respecto de sus inversiones y patrimonio en Estados Unidos,',
  'más de 30 años de experiencia y especialización en impuestos internacionales,',
  'brindamos asesoría fiscal',
  'Planeación y estructuración en Estados Unidos',
  'Elaboración y presentación de declaraciones anuales',
  ' Reporte en Estados Unidos',
  'Determinación de impuestos'
];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['asesoría-fiscal-en-estados-unidos-de-america', 'navbar', 'mailing-list', 'footer']);
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
              <p key={index} className={styles.textLine}>
                <HighlightText text={line} phrases={phrasesToHighlight} />
              </p>
            ))}
            <div className={styles.linkContainer}>
              <div className={`${styles.linkWrapper} ${styles.leftAlign}`}>
{/*                 <Link href="/alianzas-estrategicas/cfo-on-demand" className={styles.serviceLink}>{t('servicio-anterior')}
                </Link> */}
                <p className={styles.linkTitle}></p>
              </div>
              <div className={`${styles.linkWrapper} ${styles.rightAlign}`}>
                <Link href="/alianzas-estrategicas/representacion-legal" className={styles.serviceLink}>{t('siguiente-servicio')}
                </Link>
                <p className={styles.linkTitle2}>{t('navbar:representacion-legal')}</p>
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