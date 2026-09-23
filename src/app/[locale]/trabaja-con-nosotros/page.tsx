import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';
import ApplicationForm from '../../../components/ApplicationForm';
import SectionReveal from '../../../components/SectionReveal';
import styles from './page.module.css';

const i18nNamespaces = ['work-with-us', 'common'];

export default async function WorkWithUsPage({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['work-with-us', 'common', 'navbar', 'mailing-list', 'footer']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar />

        <section className={styles.hero}>
          <div className={styles.heroHeading}>
            <p>{t('eyebrow')}</p>
            <h1>{t('header')}</h1>
          </div>
          <p className={styles.heroStatement}>{t('text')}</p>
          <div className={styles.heroRule} />
          <div className={styles.heroMeta}>
            <p>{t('meta-left')}</p>
            <p>{t('meta-right')}</p>
          </div>
        </section>

        <SectionReveal tone="blue">
          <section className={styles.applicationSection}>
            <aside className={styles.applicationIntro}>
              <p className={styles.sectionEyebrow}>{t('application-eyebrow')}</p>
              <h2>{t('application-title')}</h2>
              <p className={styles.applicationNote}>{t('application-note')}</p>
              <div className={styles.process}>
                <div><span>01</span><p>{t('step-one')}</p></div>
                <div><span>02</span><p>{t('step-two')}</p></div>
                <div><span>03</span><p>{t('step-three')}</p></div>
              </div>
            </aside>

            <div className={styles.formColumn}>
              <div className={styles.formHeader}>
                <span>01 / 01</span>
                <p>{t('form-intro')}</p>
              </div>
              <ApplicationForm />
            </div>
          </section>
        </SectionReveal>

        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
