'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../i18nConfig';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';

export default function Navbar({ linkColor = '#CBBAA1', logoType = 'logo.svg' }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); 
  const [isVisible, setIsVisible] = useState(false); 
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1200);
      if (window.innerWidth > 1200) {
        setMenuOpen(false);
        setSubMenuOpen(null);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleResize();
    handleScroll(); 

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll); 

    setIsVisible(true); 

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll); 
    };
  }, []);

  const handleChange = (newLocale) => {
    const days = 5;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  const handleLinkClick = (e, index) => {
    if (isMobileView) {
      // On mobile, toggle subMenuOpen
      if (subMenuOpen === index) {
        setSubMenuOpen(null);
      } else {
        e.preventDefault();
        setSubMenuOpen(index);
      }
    }
  };

  const fiscalSubLinks = [
    { href: '/fiscal/consultoria-fiscal', label: t('navbar:consultoria-fiscal') },
    { href: '/fiscal/transacciones-financieras', label: t('navbar:transacciones-financieras') },
    { href: '/fiscal/emisiones-valores', label: t('navbar:emisiones-valores') },
    { href: '/fiscal/fondos-inversion', label: t('navbar:fondos-inversion') },
    { href: '/fiscal/proyectos-inversion', label: t('navbar:proyectos-inversion') },
    { href: '/fiscal/proyectos-infraestructura', label: t('navbar:proyectos-infraestructura') },
    { href: '/fiscal/reestructuraciones-corp', label: t('navbar:reestructuraciones-corp') },
    { href: '/fiscal/asesoria-alianzas', label: t('navbar:asesoria-alianzas') },
    { href: '/fiscal/promociones-fiscales', label: t('navbar:promociones-fiscales') },
    { href: '/fiscal/due-dilligence', label: t('navbar:due-diligence') },
    { href: '/fiscal/revision-fiscal', label: t('navbar:revision-fiscal') },
    { href: '/fiscal/proyectos-energia', label: t('navbar:proyectos-energia') },
    { href: '/fiscal/dictamenes-fiscales', label: t('navbar:dictamenes-fiscales') },
  ];

  const legalSubLinks = [
    { href: '/legal/analisis-preventivo', label: t('navbar:analisis-preventivo') },
    { href: '/legal/litigio-contencioso', label: t('navbar:litigio-fiscal') },
    { href: '/legal/litigio-constitucional-fiscal', label: t('navbar:litigio-constitucional') },
    { href: '/legal/solucion-anticipada-de-controversias', label: t('navbar:solucion-controversias') },
  ];

  const patrimonialSubLinks = [
    { href: '/patrimonial/evolucion-familiar', label: t('navbar:evolucion-familiar') },
    { href: '/patrimonial/trust-book', label: t('navbar:trust-book') },
    { href: '/patrimonial/family-governance', label: t('navbar:family-governance') },
    { href: '/patrimonial/planeacion-estructuras', label: t('navbar:planeacion-estructuras') },
    { href: '/patrimonial/cumplimiento-fiscal', label: t('navbar:cumplimiento-fiscal') },
    { href: '/patrimonial/procesos-sucesorios', label: t('navbar:procesos-sucesorios') },
    { href: '/patrimonial/liquidez-familiar', label: t('navbar:liquidez-familiar') },
    { href: '/patrimonial/nuevas-inversiones', label: t('navbar:nuevas-inversiones') },
    { href: '/patrimonial/transparency-act', label: t('navbar:transparency-act') },
  ];

  const ventureSubLinks = [
    { href: '/venture-capital/estructuracion-inv', label: t('navbar:estructuracion-inv') },
    { href: '/venture-capital/diagnostico-inicial', label: t('navbar:diagnostico-inicial') },
  ];

  const alianzasSubLinks = [
    { href: '/alianzas-estrategicas/asesoria-usa', label: t('navbar:asesoria-usa') },
    { href: '/alianzas-estrategicas/representacion-legal', label: t('navbar:representacion-legal') },
    { href: '/alianzas-estrategicas/cfo-on-demand', label: t('navbar:cfo-on-demand') },
  ];

  const getSubMenuClass = (subLinks) => subLinks.length > 8 ? `${styles.subMenu} ${styles.twoColumn}` : styles.subMenu;

  const getOppositeColor = (color) => {
    if (color.toLowerCase() === '#cbbaa1') {
      return '#535E6B';
    } else if (color.toLowerCase() === '#535e6b') {
      return '#CBBAA1';
    } else {
      return 'transparent';
    }
  };

  const backgroundColor = isScrolled ? getOppositeColor(linkColor) : 'transparent';

  const renderSubLinks = (subLinks, index) =>
    subLinks.map((subLink, idx) => (
      <Link key={idx} href={subLink.href} className={styles.subLink}>
        <span className={styles.subLinkText}>{subLink.label}</span>
        <img src="/svg/f2.svg" alt="icon" className={styles.subLinkIcon}/>
      </Link>
    ));

  return (
    <div
      className={`${styles.navbarContainer} ${isVisible ? styles.navbarVisible : ''}`} style={{ backgroundColor }}>
      <nav className={styles.navbar}>
        <div className={styles.logoWrapper}>
          <Link href="/">
            <Image src={`/svg/${logoType}`} alt="Logo" width={250} height={50} className={styles.navbarLogo} style={{ color: isMobileView ? '#CBBAA1' : linkColor }} />
          </Link>
        </div>
        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} style={{ color: linkColor }}>
          ☰
        </button>
        <div className={`${styles.linksWrapper} ${menuOpen ? styles.open : ''}`}>
          <button className={styles.closeButton} onClick={() => setMenuOpen(false)}>
            ✕
          </button>
          <div className={`${styles.linkWrapper} ${isMobileView ? '' : styles.hoverEffect}`}>
            <div className={styles.link}>
              <Link href="/fiscal" className={styles.link} style={{ color: isMobileView ? '#CBBAA1' : linkColor }} onClick={(e) => handleLinkClick(e, 0)}>
                {t('navbar:fiscal')}
              </Link>
            </div>
            <div className={`${getSubMenuClass(fiscalSubLinks)} ${(subMenuOpen === 0 && isMobileView) || (!isMobileView && subMenuOpen === 0) ? styles.open : ''}`}>
              {!isMobileView && <div className={styles.subMenuHeader}>{t('navbar:fiscal')}</div>}
              {!isMobileView && <div className={styles.subMenuDivider}></div>}
              {renderSubLinks(fiscalSubLinks, 0)}
            </div>
          </div>
          <div className={`${styles.linkWrapper} ${isMobileView ? '' : styles.hoverEffect}`}>
            <div className={styles.link}>
              <Link href="/legal" className={styles.link} style={{ color: isMobileView ? '#CBBAA1' : linkColor }} onClick={(e) => handleLinkClick(e, 1)}>
                {t('navbar:legal')}
              </Link>
            </div>
            <div className={`${getSubMenuClass(legalSubLinks)} ${(subMenuOpen === 1 && isMobileView) || (!isMobileView && subMenuOpen === 1) ? styles.open : ''}`}>
              {!isMobileView && <div className={styles.subMenuHeader}>{t('navbar:legal')}</div>}
              {!isMobileView && <div className={styles.subMenuDivider}></div>}
              {renderSubLinks(legalSubLinks, 1)}
            </div>
          </div>
          <div className={`${styles.linkWrapper} ${isMobileView ? '' : styles.hoverEffect}`}>
            <div className={styles.link}>
              <Link href="/patrimonial" className={styles.link} style={{ color: isMobileView ? '#CBBAA1' : linkColor }} onClick={(e) => handleLinkClick(e, 2)}>
                {t('navbar:patrimonial')}
              </Link>
            </div>
            <div className={`${getSubMenuClass(patrimonialSubLinks)} ${(subMenuOpen === 2 && isMobileView) || (!isMobileView && subMenuOpen === 2) ? styles.open : ''}`}>
              {!isMobileView && <div className={styles.subMenuHeader}>{t('navbar:patrimonial')}</div>}
              {!isMobileView && <div className={styles.subMenuDivider}></div>}
              {renderSubLinks(patrimonialSubLinks, 2)}
            </div>
          </div>
          <div className={`${styles.linkWrapper} ${isMobileView ? '' : styles.hoverEffect}`}>
            <div className={styles.link}>
              <Link href="/venture-capital" className={styles.link} style={{ color: isMobileView ? '#CBBAA1' : linkColor }} onClick={(e) => handleLinkClick(e, 3)}>
                {t('navbar:venture-capital')}
              </Link>
            </div>
            <div className={`${getSubMenuClass(ventureSubLinks)} ${(subMenuOpen === 3 && isMobileView) || (!isMobileView && subMenuOpen === 3) ? styles.open : ''}`}>
              {!isMobileView && <div className={styles.subMenuHeader}>{t('navbar:venture-capital')}</div>}
              {!isMobileView && <div className={styles.subMenuDivider}></div>}
              {renderSubLinks(ventureSubLinks, 3)}
            </div>
          </div>
          <div className={`${styles.linkWrapper} ${isMobileView ? '' : styles.hoverEffect}`}>
            <div className={styles.link}>
              <Link href="/alianzas-estrategicas" className={styles.link} style={{ color: isMobileView ? '#CBBAA1' : linkColor }} onClick={(e) => handleLinkClick(e, 4)}>
                {t('navbar:alianzas-estrategicas')}
              </Link>
            </div>
            <div className={`${getSubMenuClass(alianzasSubLinks)} ${(subMenuOpen === 4 && isMobileView) || (!isMobileView && subMenuOpen === 4) ? styles.open : ''}`}>
              {!isMobileView && <div className={styles.subMenuHeader}>{t('navbar:alianzas-estrategicas')}</div>}
              {!isMobileView && <div className={styles.subMenuDivider}></div>}
              {renderSubLinks(alianzasSubLinks, 4)}
            </div>
          </div>
          <div className={styles.linkWrapper}>
            <div className={styles.link}>
              <Link href="/nuestro-equipo" className={styles.link} style={{ color: isMobileView ? '#CBBAA1' : linkColor }} onClick={(e) => handleLinkClick(e, 5)}>
                {t('navbar:nuestro-equipo')}
              </Link>
            </div>
            <div className={`${styles.subMenu} ${(subMenuOpen === 5 && isMobileView) || (!isMobileView && subMenuOpen === 5) ? styles.open : ''}`}>
              {!isMobileView && <div className={styles.subMenuHeader}>{t('navbar:nuestro-equipo')}</div>}
              {!isMobileView && <div className={styles.subMenuDivider}></div>}
            </div>
          </div>
          <div className={styles.languageSwitcher}>
            <button className={styles.button} onClick={() => handleChange('en')} style={{ color: isMobileView ? '#CBBAA1' : linkColor }}>EN</button>
            <button className={styles.button} onClick={() => handleChange('es')} style={{ color: isMobileView ? '#CBBAA1' : linkColor }}>ES</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
