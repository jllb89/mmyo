import Link from 'next/link';
import styles from './page.module.css';
import initTranslations from '../../i18n';
import TranslationsProvider from '../../../components/TranslationsProvider';
import Navbar from '../../../components/Navbar';
import Image from 'next/image';
import MailingList from '../../../components/MailingList';
import Footer from '../../../components/Footer';

const i18nNamespaces = ['nuestro-equipo', 'common'];

const socios = [
  { name: 'Alejo Muñoz Manzo', positionKey: 'socio-fundador', linkedin: 'https://linkedin.com/in/johndoe', image: '/images/MM.png' },
  { name: 'Eduardo Ocampo Gayón', positionKey: 'socio-fundador', linkedin: 'https://linkedin.com/in/janesmith', image: '/images/eduardo.webp' },
  { name: 'Gerardo Napolitano Pompa', positionKey: 'socio', linkedin: 'https://linkedin.com/in/jimbrown', image: '/images/gerardo.webp' },
  { name: 'Federico Groenewold Rivas', positionKey: 'socio', linkedin: 'https://linkedin.com/in/johndoe', image: '' },
  { name: 'Gyselle San Martín', positionKey: 'socio-fundador', linkedin: 'https://linkedin.com/in/janesmith', image: '/images/gsm.webp' },
  { name: 'Ma. Elena Paredes Sánchez', positionKey: 'socio', linkedin: 'https://linkedin.com/in/jimbrown', image: '/images/elena.webp' },
  { name: 'Rodolfo Martínez Valdez', positionKey: 'socio', linkedin: 'https://linkedin.com/in/johndoe', image: '/images/RMV.webp' },
  { name: 'Daniel M. Ramírez Robles', positionKey: 'socio-fundador', linkedin: 'https://linkedin.com/in/janesmith', image: '/images/daniel.webp' },
];

const asociados = [
  { name: 'Mayanin Bello Carranza', positionKey: 'consultor', linkedin: 'https://linkedin.com/in/lisawhite', image: '/images/mayanin.png' },
  { name: 'Ana María Caballero Rosetti', positionKey: 'asociada', linkedin: 'https://linkedin.com/in/tomgreen', image: '/images/ana.webp' },
  { name: 'Gabriela Castillo Soriano', positionKey: 'asociada-area-patrimonial', linkedin: 'https://linkedin.com/in/sarablack', image: '/images/gaby.webp' },
  { name: 'Alfonso Corral Montalvo', positionKey: 'asociado', linkedin: 'https://linkedin.com/in/jakeblue', image: '/images/alfonso.webp' },
  { name: 'José Arturo Flores Graue', positionKey: 'supervisor', linkedin: 'https://linkedin.com/in/ninared', image: '/images/arturo.webp' },
  { name: 'Jocelyn Mariana García Martínez', positionKey: 'gerente', linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/jocelyn.webp' },
  { name: 'Luis Fernando Garrido Treviño', positionKey: 'asociado', linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/luis.webp' },
  { name: 'Moisés Godinez Hernández', positionKey: 'asociado', linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/moises.webp' },
  { name: 'Lizeth Adriana Hernández Aguirre', positionKey: 'gerente', linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/lizeth.webp' },
  { name: 'Raúl Iván Martínez González Vega', positionKey: 'asociado', linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/raul.webp' },
  { name: 'Ilse Gabriela Moreno López', positionKey: 'asociada-area-patrimonial', linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/ilse.webp' },
  { name: 'José Mario Pereda Valdez', positionKey: 'gerente', linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/jose.webp' },
  { name: 'Pamela Rodríguez Hernández', positionKey: 'supervisora-consultoria-patrimonial', linkedin: 'https://linkedin.com/in/paulyellow', image: '/images/pamela.webp' }
];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, ['nuestro-equipo', 'common', 'navbar', 'mailing-list', 'footer', 'home']);
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

        <div className={styles.homeContent}>
          <div className={styles.contentTitles}>
            <p>{t("socios")}</p>
          </div>

          <div className={styles.gridContainer}>
            {socios.map((member, index) => (
              <div className={styles.gridItem} key={index}>
                <p className={styles.name}>{member.name}
                  <span className={styles.imageWrapper}>
                    <Image src={member.image} alt={member.name} width={300} height={300} className={styles.image} />
                  </span>
                </p>
                <p className={styles.position}>{t(member.positionKey)}</p>
                <Link href={member.linkedin} className={styles.linkedinLink}>LinkedIn</Link>
              </div>
            ))}
          </div>

          <div className={styles.contentTitles}>
            <p>{t("asociados")}</p>
          </div>

          <div className={styles.gridContainer}>
            {asociados.map((member, index) => (
              <div className={styles.gridItem} key={index}>
                <p className={styles.name}>{member.name}
                  <span className={styles.imageWrapper}>
                    <Image src={member.image} alt={member.name} width={300} height={300} className={styles.image} />
                  </span>
                </p>
                <p className={styles.position}>{t(member.positionKey)}</p>
                <Link href={member.linkedin} className={styles.linkedinLink}>LinkedIn</Link>
              </div>
            ))}
          </div>

          <div className={styles.p2}>
            <div className={styles.p2textContainer}>
              <p>{t("text")}</p>
            </div>
          </div>
          <div className={styles.homeLink}>
            <Link href="/trabaja-con-nosotros">
              <h3>
                {t("trabaja-con-nosotros").split('\n').map((line: string, index: number) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </h3>
            </Link>
          </div>
        </div>
        <div className={styles.bottomContainer}>
          <MailingList />
          <Footer />
        </div>
      </main>
    </TranslationsProvider >
  );
}
