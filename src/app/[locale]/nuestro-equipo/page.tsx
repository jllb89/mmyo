import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';
import Team from '../../../components/Team';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

const i18nNamespaces = ['nuestro-equipo', 'common'];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['nuestro-equipo', 'common', 'navbar', 'mailing-list', 'footer', 'home']);

  const socios = [
    { name: 'Alejo Muñoz Manzo', position: t('socio-fundador'), linkedin: 'https://linkedin.com/in/johndoe', image: '/images/MM.png' },
    { name: 'Eduardo Ocampo Gayón', position: t('socio-fundador'), linkedin: 'https://linkedin.com/in/janesmith', image: '/images/eduardo.webp' },
    { name: 'Gerardo Napolitano Pompa', position: t('socio'), linkedin: 'https://linkedin.com/in/jimbrown', image: '/images/gerardo.webp' },
    { name: 'Federico Groenewold Rivas', position: t('socio'), linkedin: 'https://linkedin.com/in/johndoe', image: '/images/fede.webp' },
    { name: 'Gyselle San Martín', position: t('socio-fundador'), linkedin: 'https://linkedin.com/in/janesmith', image: '/images/gsm.webp' },
    { name: 'Ma. Elena Paredes Sánchez', position: t('socio'), linkedin: 'https://linkedin.com/in/jimbrown', image: '/images/elena.webp' },
    { name: 'Rodolfo Martínez Valdez', position: t('socio'), linkedin: 'https://linkedin.com/in/johndoe', image: '/images/RMV.webp' },
    { name: 'Daniel M. Ramírez Robles', position: t('socio-fundador'), linkedin: 'https://linkedin.com/in/janesmith', image: '/images/daniel.webp' },
  ];

  const asociados = [
    { name: 'Mayanin Bello Carranza', position: t('consultor'), linkedin: 'https://linkedin.com/in/lisawhite', image: '/images/mayanin.webp' },
    { name: 'Ana María Caballero Rosetti', position: t('asociada'), linkedin: 'https://linkedin.com/in/tomgreen', image: '/images/ana.webp' },
    { name: 'Gabriela Castillo Soriano', position: t('asociada-area-patrimonial'), linkedin: 'https://linkedin.com/in/sarablack', image: '/images/gaby.webp' },
    { name: 'Alfonso Corral Montalvo', position: t('asociado'), linkedin: 'https://linkedin.com/in/jakeblue', image: '/images/alfonso.webp' },
    { name: 'José Arturo Flores Graue', position: t('supervisor'), linkedin: 'https://linkedin.com/in/ninared', image: '/images/arturo.webp' },
    { name: 'Jocelyn Mariana García Martínez', position: t('gerente'), linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/jocelyn.webp' },
    { name: 'Luis Fernando Garrido Treviño', position: t('asociado'), linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/luis.webp' },
    { name: 'Moisés Godinez Hernández', position: t('asociado'), linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/moises.webp' },
    { name: 'Lizeth Adriana Hernández Aguirre', position: t('gerente'), linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/lizeth.webp' },
    { name: 'Raúl Iván Martínez González Vega', position: t('asociado'), linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/raul.webp' },
    { name: 'Ilse Gabriela Moreno López', position: t('asociada-area-patrimonial'), linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/ilse.webp' },
    { name: 'José Mario Pereda Valdez', position: t('gerente'), linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/jose.webp' },
/*     { name: 'Pamela Rodríguez Hernández', position: t('supervisora-consultoria-patrimonial'), linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/pamela.webp' }
 */  ];

  const sociosTitle = t("socios");
  const asociadosTitle = t("asociados");

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={i18nNamespaces}>
      <main className={styles.main}>
        <Navbar linkColor="#535E6B" logoType="logo2.svg" />
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <h1>{t("title")}</h1>
            <h2 className={styles.headerText}>{t("header")}</h2>
            <hr className={styles.horizontalLine} />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Link href="#your-link" className={styles.headerButton}>{t("button")}</Link>
        </div>
        <div className={styles.logo}>
          <div className={styles.logoContainer}>
            <Image src="/images/MM.png" alt="MMYO Logo" width={500} height={678} />
          </div>
        </div>
        <div className={styles.teamGrid}>
        <Team socios={socios} asociados={asociados} sociosTitle={sociosTitle} asociadosTitle={asociadosTitle} />
        </div>
        <MailingList />
        <Footer />
      </main>
    </TranslationsProvider>
  );
}