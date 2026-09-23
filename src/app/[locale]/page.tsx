import Image from 'next/image';
import Link from 'next/link';
import initTranslations from '../i18n';
import TranslationsProvider from '../../components/TranslationsProvider';
import Navbar from '../../components/Navbar';
import MailingList from '../../components/MailingList';
import Footer from '../../components/Footer';
import HomeServices from '../../components/HomeServices';
import SectionReveal from '../../components/SectionReveal';
import styles from './page.module.css';

const i18nNamespaces = ['home', 'common', 'navbar', 'mailing-list', 'footer'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const localePrefix = locale === 'es' ? '' : `/${locale}`;
  const localizedHref = (href: string) => `${localePrefix}${href}` || '/';

  const services = [
    { href: localizedHref('/fiscal'), label: t('service-fiscal') },
    { href: localizedHref('/patrimonial'), label: t('service-patrimonial') },
    { href: localizedHref('/legal'), label: t('service-legal') },
    { href: localizedHref('/venture-capital'), label: t('service-venture') },
    { href: localizedHref('/alianzas-estrategicas'), label: t('service-alliances') },
  ];

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar />

        <section className={styles.hero} aria-labelledby="home-title">
          <Image
            src="/images/hero-architecture-v2.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
          <div className={styles.heroVeil} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>{t('hero-eyebrow')}</p>
            <h1 id="home-title">{t('hero-title')}</h1>
            <p className={styles.heroSupport}>{t('hero-support')}</p>
            <aside className={styles.heroAside}>
              <p>01 / 05</p>
              <span>{t('hero-aside')}</span>
            </aside>
            <div className={styles.heroFooter}>
              <a href="#firma">{t('discover-firm')} ↓</a>
              <p>{t('coordinates')}</p>
            </div>
          </div>
        </section>

        <SectionReveal tone="sand">
          <section className={styles.brandBand} aria-label={t('brand-name')}>
            <p className={styles.wordmark}>MMYO</p>
            <div className={styles.brandCopy}>
              <h2>{t('brand-name')}</h2>
              <p>{t('brand-description')}</p>
              <span>{t('disciplines')}</span>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal tone="blue">
          <section className={styles.contextSection} id="firma">
            <div className={styles.sectionMarker}>
              <p>{t('context-eyebrow')}</p>
              <span aria-hidden="true" />
            </div>
            <h2>{t('context-title')}</h2>
            <p className={styles.contextSupport}>{t('context-support')}</p>
            <p className={styles.chapterNumber}>01</p>
          </section>
        </SectionReveal>

        <SectionReveal tone="sand">
          <section className={styles.firmSection}>
            <p className={styles.firmMarker}>{t('firm-eyebrow')}</p>
            <h2>{t('firm-title')}</h2>
            <div className={styles.firmCopy}>
              <p className={styles.firmLead}>{t('firm-body')}</p>
              <p>{t('firm-body-secondary')}</p>
              <Link href={localizedHref('/nuestro-equipo')}>{t('team-link')} ↗</Link>
            </div>
            <p className={styles.chapterNumber}>02</p>
          </section>
        </SectionReveal>

        <HomeServices
          services={services}
          eyebrow={t('services-eyebrow')}
          title={t('services-title')}
          intro={t('services-intro')}
          instruction={t('services-instruction')}
          actionLabel={t('services-action')}
        />

        <SectionReveal tone="blue">
          <MailingList />
        </SectionReveal>
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
