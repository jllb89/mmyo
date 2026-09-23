import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import SectionReveal from '../../../components/SectionReveal';
import styles from './page.module.css';

const i18nNamespaces = ['contacto', 'common'];

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['contacto', 'common', 'navbar', 'mailing-list', 'footer']);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar />

        <section className={styles.intro}>
          <div className={styles.introHeading}>
            <p>{t('eyebrow')}</p>
            <h1>{t('header')}</h1>
          </div>
          <p className={styles.introStatement}>{t('statement')}</p>
          <div className={styles.introRule} />
          <div className={styles.introMeta}>
            <p>{t('meta-left')}</p>
            <p>{t('meta-right')}</p>
          </div>
        </section>

        <SectionReveal tone="blue">
          <section className={styles.contactSection}>
            <aside className={styles.contactDetails}>
              <p className={styles.sectionEyebrow}>{t('details-eyebrow')}</p>
              <h2>{t('details-title')}</h2>
              <div className={styles.detailBlock}>
                <span>{t('address-label')}</span>
                <address>{t('address-line-1')}<br />{t('address-line-2')}<br />{t('address-line-3')}</address>
              </div>
              <div className={styles.detailBlock}>
                <span>{t('e-mail')}</span>
                <a href="mailto:mmyo@mmyo.com.mx">mmyo@mmyo.com.mx</a>
              </div>
            </aside>
            <div className={styles.formColumn}>
              <div className={styles.formHeader}>
                <span>01</span>
                <p>{t('form-intro')}</p>
              </div>
              <ContactForm />
            </div>
          </section>
        </SectionReveal>

        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
