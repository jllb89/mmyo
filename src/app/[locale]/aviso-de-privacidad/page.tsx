import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SectionReveal from '../../../components/SectionReveal';
import styles from './page.module.css';

const i18nNamespaces = ['aviso-de-privacidad', 'common'];

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['aviso-de-privacidad', 'common', 'navbar', 'footer']);
  const sections = t('text')
    .split(/\n+/)
    .map((section: string) => section.trim())
    .filter(Boolean);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar />

        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>{t('eyebrow')}</p>
            <h1>{t('header')}</h1>
          </div>
          <p className={styles.heroStatement}>{t('intro')}</p>
          <div className={styles.heroMeta}>
            <span>{t('meta-left')}</span>
            <span>{t('meta-right')}</span>
          </div>
        </section>

        <SectionReveal tone="blue">
          <section className={styles.documentSection}>
            <aside className={styles.documentAside}>
              <div className={styles.asideInner}>
                <p>{t('document-label')}</p>
                <h2>{t('document-title')}</h2>
                <div className={styles.contactBlock}>
                  <span>{t('contact-label')}</span>
                  <a href="mailto:datospersonales@mmyo.com.mx">datospersonales@mmyo.com.mx</a>
                </div>
              </div>
            </aside>

            <article className={styles.legalCopy}>
              {sections.map((section: string, index: number) => (
                <section className={index === 0 ? styles.leadSection : undefined} key={`${index}-${section.slice(0, 24)}`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{section}</p>
                </section>
              ))}
            </article>
          </section>
        </SectionReveal>

        <Footer />
      </main>
    </TranslationsProvider>
  );
}
