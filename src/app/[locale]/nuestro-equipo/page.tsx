import Link from 'next/link';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';
import Team from '../../../components/Team';
import SectionReveal from '../../../components/SectionReveal';
import styles from './page.module.css';

const i18nNamespaces = ['nuestro-equipo', 'common'];

export default async function TeamPage({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, [
    'nuestro-equipo', 'common', 'navbar', 'mailing-list', 'footer',
  ]);

  const socios = [
    { name: 'Alejo Muñoz Manzo', position: t('socio-fundador'), image: '/images/MM.png' },
    { name: 'Eduardo Ocampo Gayón', position: t('socio-fundador'), image: '/images/eduardo.webp' },
    { name: 'Gerardo Napolitano Pompa', position: t('socio'), image: '/images/gerardo.webp' },
    { name: 'Federico Groenewold Rivas', position: t('socio'), image: '/images/fede.webp' },
    { name: 'Gyselle San Martín', position: t('socio-fundador'), image: '/images/gsm.webp' },
    { name: 'Ma. Elena Paredes Sánchez', position: t('socio'), image: '/images/elena.webp' },
    { name: 'Daniel M. Ramírez Robles', position: t('socio-fundador'), image: '/images/daniel.webp' },
  ];

  const asociados = [
    { name: 'Mayanin Bello Carranza', position: t('consultor') },
    { name: 'Ana María Caballero Rosetti', position: t('asociada') },
    { name: 'Gabriela Castillo Soriano', position: t('asociada-area-patrimonial') },
    { name: 'José Arturo Flores Graue', position: t('gerente') },
    { name: 'Jocelyn Mariana García Martínez', position: t('asociada') },
    { name: 'Melanie García Gallardo', position: t('gerente') },
    { name: 'Moisés Godinez Hernández', position: t('asociado') },
    { name: 'Larissa González García', position: t('gerente') },
    { name: 'Erick Johan Hernández Pérez', position: t('gerente') },
    { name: 'Lizeth Adriana Hernández Aguirre', position: t('asociada') },
    { name: 'Sergio Abraham Jiménez Villeda', position: t('gerente') },
    { name: 'Raúl Iván Martínez González Vega', position: t('asociado') },
    { name: 'Ilse Gabriela Moreno López', position: t('asociada-area-patrimonial') },
    { name: 'José Mario Pereda Valdez', position: t('asociado') },
  ];

  return (
    <TranslationsProvider resources={resources} locale={locale} namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar />

        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div className={styles.heroTitle}>
              <p>{t('hero-eyebrow')}</p>
              <h1>{t('title')}</h1>
            </div>
            <p className={styles.heroIntro}>{t('hero-intro')}</p>
          </div>
          <div className={styles.heroRule} />
          <div className={styles.heroFacts}>
            <p>{t('hero-roster')}</p>
            <p>{t('hero-disciplines')}</p>
          </div>
        </section>

        <SectionReveal tone="sand">
          <Team socios={socios} asociados={[]} sociosTitle={t('socios')} asociadosTitle={t('asociados')} leadershipLabel={t('leadership')} teamLabel={t('team-label')} />
        </SectionReveal>

        <SectionReveal tone="blue">
          <section className={styles.practiceBand}>
            <div className={styles.practiceMessage}>
              <p>{t('practice-eyebrow')}</p>
              <h2>{t('practice-statement')}</h2>
            </div>
            <div className={styles.disciplineIndex}>
              <ol>
                <li><span>01</span>{t('discipline-fiscal')}</li>
                <li><span>02</span>{t('discipline-patrimonial')}</li>
                <li><span>03</span>{t('discipline-business')}</li>
              </ol>
              <p>{t('practice-context')}</p>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal tone="sand">
          <Team socios={[]} asociados={asociados} sociosTitle={t('socios')} asociadosTitle={t('asociados')} leadershipLabel={t('leadership')} teamLabel={t('team-label')} />
        </SectionReveal>

        <SectionReveal tone="sand">
          <section className={styles.recruitment}>
            <div>
              <p>{t('talent-eyebrow')}</p>
              <h2>{t('recruitment-question')}</h2>
            </div>
            <Link href={`/${locale}/trabaja-con-nosotros`} className={styles.recruitmentLink}>
              <span>{t('trabaja-con-nosotros')}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </section>
        </SectionReveal>

        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}
