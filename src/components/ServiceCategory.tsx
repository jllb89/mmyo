import initTranslations from '../app/i18n';
import TranslationsProvider from './TranslationsProvider';
import Navbar from './Navbar';
import MailingList from './MailingList';
import Footer from './Footer';
import ServiceAccordion, { AccordionService } from './ServiceAccordion';
import { ServiceCategoryDefinition } from './serviceCategoryData';
import styles from './ServiceCategory.module.css';

type ServiceCategoryProps = {
  locale: string;
  category: ServiceCategoryDefinition;
};

export default async function ServiceCategory({ locale, category }: ServiceCategoryProps) {
  const namespaces = [
    category.namespace,
    ...category.services.map(({ namespace }) => namespace),
    'service-category',
    'common',
    'navbar',
    'mailing-list',
    'footer',
  ];
  const { t, resources } = await initTranslations(locale, namespaces);

  const services: AccordionService[] = category.services.map((service, index) => {
    const translatedText = t(`${service.namespace}:text`);
    const paragraphs = translatedText
      .split(/\n\s*\n/)
      .map((paragraph: string) => paragraph.replace(/^\s+|\s+$/g, ''))
      .filter(Boolean);

    return {
      id: service.id,
      number: String(index + 1).padStart(2, '0'),
      title: t(`${service.namespace}:header`).trim(),
      preview: t(`navbar:preview-${service.previewKey}`),
      paragraphs,
    };
  });

  const serviceCount = String(services.length).padStart(2, '0');
  const categoryDescription = t(`${category.namespace}:text`)
    .split('\n')
    .map((line: string) => line.trim())
    .find(Boolean);

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={namespaces}>
      <main className={styles.main}>
        <Navbar />

        <section className={styles.hero}>
          <div className={styles.heroTitleBlock}>
            <div>
              <p className={styles.eyebrow}>{t('service-category:practice-area')} / {category.index}</p>
              <h1>{t(`${category.namespace}:header`)}</h1>
            </div>
            <p className={styles.heroNote}>{t('service-category:hero-note')}</p>
          </div>
          <div className={styles.heroStatement}>
            <p>{categoryDescription}</p>
            <div className={styles.serviceCount}>
              <span>{serviceCount}</span>
              <p>{t('service-category:specialized-services')}</p>
            </div>
          </div>
        </section>

        <section className={styles.directory} aria-labelledby="service-directory-title">
          <header className={styles.directoryHeader}>
            <div>
              <h2 id="service-directory-title">{t('service-category:directory-heading')}</h2>
            </div>
            <p className={styles.instruction}>{t('service-category:instruction')}</p>
          </header>
          <ServiceAccordion
            services={services}
            openLabel={t('service-category:open-service')}
            closeLabel={t('service-category:close-service')}
          />
        </section>

        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
