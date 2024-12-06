import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../i18n';
import TranslationsProvider from '../../components/TranslationsProvider';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import MailingList from '../../components/MailingList';
import Footer from '../../components/Footer';
import FadeInOnScroll from '../../components/FadeInOnScroll'; // Client component

const i18nNamespaces = ['home'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, [
    'home',
    'common',
    'navbar',
    'mailing-list',
    'footer'
  ]);

  // Define the phrases to highlight
  const phrasesToHighlight = [
    'Muñoz Manzo y Ocampo',
    'empresarial y familiar',
    'rápidamente',
    'óptima asesoría',
    'independencia, especialización y trato personalizado.',
    'máxima calidad en los servicios que ofrecemos,',
    'sólida experiencia, talento y creatividad'
  ];

  // Updated highlightText function
  function highlightText(text: string, phrases: string[]) {
    const escapedPhrases = phrases.map(phrase =>
      phrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    );

    const paragraphBreakPlaceholder = '###PARAGRAPH_BREAK###';
    const lineBreakPlaceholder = '###LINE_BREAK###';
    const textWithPlaceholders = text
      .replace(/\n\n/g, paragraphBreakPlaceholder)
      .replace(/\n/g, lineBreakPlaceholder);

    const regex = new RegExp(
      `(${escapedPhrases.join('|')}|${paragraphBreakPlaceholder}|${lineBreakPlaceholder})`,
      'g'
    );

    const parts = textWithPlaceholders.split(regex);

    return parts.map((part, index) => {
      if (phrases.includes(part)) {
        return (
          <span key={index} className={styles.highlight}>
            {part}
          </span>
        );
      } else if (part === paragraphBreakPlaceholder) {
        return (
          <React.Fragment key={index}>
            <br />
            <br />
          </React.Fragment>
        );
      } else if (part === lineBreakPlaceholder) {
        return <br key={index} />;
      } else {
        return part;
      }
    });
  }

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}
    >
      <main className={styles.main}>
        <Navbar />
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <h1>{t('header')}</h1>
            <div className={styles.buttonContainer}>
              <Link href="/contacto" className={styles.headerButton}>
                {t('contacto')}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <Image src="/svg/MMYO.svg" alt="MMYO Logo" width={200} height={200} />
          </div>
        </div>

        {/* Wrap the homeContent in FadeInOnScroll, add background inline */}
        <FadeInOnScroll delay={0}>
          <div className={styles.homeContent}>
            <div
              className={styles.backgroundImage}
              style={{
                background: "url('/svg/l1.svg') no-repeat top",
                backgroundSize: "190% 190%",
                backgroundPosition: "0% 40%",
                opacity: 0.3,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
              }}
            />
            <div className={styles.homeContentInner}>
              <div className={styles.p1}>
                <div className={styles.textContainer}>
                  <h2>{highlightText(t('p1'), phrasesToHighlight)}</h2>
                </div>
                <hr className={styles.horizontalLine} />
              </div>
              <div className={styles.homeTitle}>
                <h3>{highlightText(t('quienes-somos'), phrasesToHighlight)}</h3>
              </div>
              <div className={styles.p2}>
                <div className={styles.p2textContainer}>
                  <h2>{highlightText(t('p2'), phrasesToHighlight)}</h2>
                </div>
              </div>
              <div className={styles.homeLink}>
                <h3>{highlightText(t('nuestros-servicios'), phrasesToHighlight)}</h3>
              </div>
            </div>
          </div>
        </FadeInOnScroll>

        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
