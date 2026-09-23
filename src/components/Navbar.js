'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../i18nConfig';
import styles from './Navbar.module.css';

const CATEGORY_DEFINITIONS = [
  {
    key: 'fiscal', href: '/fiscal', items: [
      ['/fiscal#consultoria-fiscal', 'consultoria'],
      ['/fiscal#transacciones-financieras', 'especializacion'],
      ['/fiscal#emisiones-valores', 'emisiones-bolsas'],
      ['/fiscal#fondos-inversion', 'fondos-vcpc'],
      ['/fiscal#proyectos-inversion', 'proyectos-inversion'],
      ['/fiscal#proyectos-infraestructura', 'proyectos-infraestructura'],
      ['/fiscal#reestructuraciones-corp', 'reestructuraciones-corporativas'],
      ['/fiscal#asesoria-alianzas', 'asesoria-alianzas'],
      ['/fiscal#promociones-fiscales', 'promociones-autoridades'],
      ['/fiscal#due-dilligence', 'due-dilligence'],
      ['/fiscal#revision-fiscal', 'revision-fiscal'],
      ['/fiscal#proyectos-energia', 'proyectos-energia'],
      ['/fiscal#dictamenes-fiscales', 'dictamenes-certificaciones'],
    ],
  },
  {
    key: 'legal', href: '/legal', items: [
      ['/legal#analisis-preventivo', 'analisis-preventivo'],
      ['/legal#litigio-contencioso', 'litigio-fiscal'],
      ['/legal#litigio-constitucional-fiscal', 'litigio-constitucional'],
      ['/legal#solucion-anticipada-de-controversias', 'solucion-controversias'],
    ],
  },
  {
    key: 'patrimonial', href: '/patrimonial', items: [
      ['/patrimonial#evolucion-familiar', 'evolucion-familiar'],
      ['/patrimonial#trust-book', 'trust-book'],
      ['/patrimonial#family-governance', 'family-governance'],
      ['/patrimonial#planeacion-estructuras', 'planeacion-estructuras'],
      ['/patrimonial#cumplimiento-fiscal', 'cumplimiento-fiscal'],
      ['/patrimonial#procesos-sucesorios', 'procesos-sucesorios'],
      ['/patrimonial#liquidez-familiar', 'liquidez-familiar'],
      ['/patrimonial#nuevas-inversiones', 'nuevas-inversiones'],
      ['/patrimonial#transparency-act', 'transparency-act'],
    ],
  },
  {
    key: 'venture-capital', href: '/venture-capital', items: [
      ['/venture-capital#estructuracion-inv', 'estructuracion-inv'],
      ['/venture-capital#diagnostico-inicial', 'diagnostico-inicial'],
    ],
  },
  {
    key: 'alianzas-estrategicas', href: '/alianzas-estrategicas', items: [
      ['/alianzas-estrategicas#asesoria-usa', 'asesoria-usa'],
      ['/alianzas-estrategicas#representacion-legal', 'representacion-legal'],
      ['/alianzas-estrategicas#cfo-on-demand', 'cfo-on-demand'],
    ],
  },
  { key: 'nuestro-equipo', href: '/nuestro-equipo', items: [] },
];

export default function Navbar({ linkColor = '', logoType = '' } = {}) {
  // Retained as optional legacy props so existing page calls remain source-compatible.
  void linkColor;
  void logoType;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [navVisible, setNavVisible] = useState(true);
  const headerRef = useRef(null);
  const navigationResetLockRef = useRef(false);
  const { t, i18n } = useTranslation('navbar');
  const pathname = usePathname();
  const router = useRouter();
  const locale = i18n.resolvedLanguage || i18n.language || i18nConfig.defaultLocale;

  const localizedHref = (href) => {
    const prefix = locale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault ? '' : `/${locale}`;
    return href === '/' ? (prefix || '/') : `${prefix}${href}`;
  };

  const categories = useMemo(() => CATEGORY_DEFINITIONS.map((category) => ({
    ...category,
    label: t(category.key),
    items: category.items.map(([href, labelKey], index) => ({
      href,
      label: t(labelKey),
      preview: t(`preview-${labelKey}`),
      number: String(index + 1).padStart(2, '0'),
    })),
  })), [t]);

  const currentCategory = categories.find(({ key }) => key === activeCategory);

  useEffect(() => {
    setMenuOpen(false);
    setActiveCategory(null);
    setNavVisible(true);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      setNavVisible(true);
      return undefined;
    }

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= 80) {
        setNavVisible(true);
      } else if (delta > 5) {
        setNavVisible(false);
        setActiveCategory(null);
      } else if (delta < -5) {
        setNavVisible(true);
      }

      if (Math.abs(delta) > 5 || currentScrollY <= 80) lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setActiveCategory(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (!activeCategory) return undefined;
    const handleOutsideClick = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) setActiveCategory(null);
    };
    document.addEventListener('pointerdown', handleOutsideClick);
    return () => document.removeEventListener('pointerdown', handleOutsideClick);
  }, [activeCategory]);

  const changeLocale = (newLocale) => {
    if (newLocale === locale) return;
    const expires = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale}; expires=${expires}; path=/`;

    const localePattern = new RegExp(`^/(${i18nConfig.locales.join('|')})(?=/|$)`);
    const pathWithoutLocale = pathname.replace(localePattern, '') || '/';
    const nextPath = newLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault
      ? pathWithoutLocale
      : `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
    router.push(nextPath);
    router.refresh();
  };

  const closeNavigation = () => {
    setMenuOpen(false);
    setActiveCategory(null);
    navigationResetLockRef.current = true;
  };

  return (
    <header
      ref={headerRef}
      className={`${styles.navbarContainer} ${navVisible || menuOpen ? '' : styles.navbarHidden}`}
      onPointerLeave={() => {
        navigationResetLockRef.current = false;
        setActiveCategory(null);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          navigationResetLockRef.current = false;
          setActiveCategory(null);
        }
      }}
    >
      <div className={styles.announcement}>{t('announcement')}</div>
      <div className={styles.navigationRow}>
        <Link href={localizedHref('/')} className={styles.logoLink} aria-label="MMYO">
          <Image src="/svg/logo.svg" alt="Muñoz Manzo & Ocampo" width={226} height={50} className={styles.logo} priority />
        </Link>

        <nav className={styles.desktopNavigation} aria-label={t('primary-navigation')}>
          {categories.map((category) => (
            <div
              className={styles.desktopItem}
              key={category.key}
              onMouseEnter={() => {
                if (!category.items.length) setActiveCategory(null);
                else if (!navigationResetLockRef.current) setActiveCategory(category.key);
              }}
              onFocus={() => {
                if (!category.items.length) setActiveCategory(null);
                else if (!navigationResetLockRef.current) setActiveCategory(category.key);
              }}
            >
              {category.items.length > 0 ? (
                <Link
                  href={localizedHref(category.href)}
                  className={`${styles.primaryLink} ${activeCategory === category.key ? styles.primaryLinkActive : ''}`}
                  aria-haspopup="true"
                  aria-expanded={activeCategory === category.key}
                  onClick={closeNavigation}
                >
                  {category.label}
                </Link>
              ) : (
                <Link href={localizedHref(category.href)} className={styles.primaryLink} onClick={closeNavigation}>{category.label}</Link>
              )}
              {category.items.length > 0 && activeCategory === category.key && (
                <div className={styles.hoverBridge}>
                  <MegaMenu
                    key={category.key}
                    category={category}
                    localizedHref={localizedHref}
                    t={t}
                    onClose={closeNavigation}
                  />
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className={styles.desktopActions}>
          <LanguageSwitcher locale={locale} onChange={changeLocale} />
          <Link href={localizedHref('/contacto')} className={styles.contactButton}>{t('contact')}</Link>
        </div>

        <button
          type="button"
          className={styles.menuToggle}
          aria-label={menuOpen ? t('close-menu') : t('open-menu')}
          aria-expanded={menuOpen}
          onClick={() => {
            setMenuOpen((open) => !open);
            setActiveCategory(null);
          }}
        >
          {menuOpen ? <span className={styles.closeGlyph}>×</span> : <span className={styles.menuGlyph}><i /><i /></span>}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobilePanel}>
          {!currentCategory ? (
            <div className={styles.mobileMenuBody}>
              <p className={styles.mobileEyebrow}>{t('menu-level-one')}</p>
              <div className={styles.mobileCategoryList}>
                {categories.map((category, index) => (
                  <div className={styles.mobileCategoryRow} key={category.key}>
                    <Link
                      href={localizedHref(category.href)}
                      className={`${styles.mobileCategory} ${category.items.length ? '' : styles.mobileCategoryDirect}`}
                      onClick={closeNavigation}
                    >
                      <span className={styles.mobileCategoryLabel}>
                        <span className={styles.mobileIndex}>{String(index + 1).padStart(2, '0')}</span>
                        <span>{category.label}</span>
                      </span>
                      {!category.items.length && <span aria-hidden="true">↗</span>}
                    </Link>
                    {category.items.length > 0 && (
                      <button
                        type="button"
                        className={styles.mobileCategoryDrilldown}
                        aria-label={`${category.label}: ${t('services-count', { count: category.items.length })}`}
                        onClick={() => setActiveCategory(category.key)}
                      >
                        <span aria-hidden="true">→</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.mobileMenuFooter}>
                <Link href={localizedHref('/contacto')} className={styles.mobileContactButton} onClick={closeNavigation}>
                  <span>{t('contact')}</span><span aria-hidden="true">↗</span>
                </Link>
                <LanguageSwitcher locale={locale} onChange={changeLocale} />
              </div>
            </div>
          ) : (
            <div className={styles.mobileMenuBody}>
              <button type="button" className={styles.backButton} onClick={() => setActiveCategory(null)}>
                <span aria-hidden="true">←</span><span>{t('menu-back', { category: currentCategory.label })}</span>
              </button>
              <div className={styles.mobileCategoryHeading}>
                <h2>{currentCategory.label}</h2>
                <Link href={localizedHref(currentCategory.href)} onClick={closeNavigation}>{t('view-all')} ↗</Link>
              </div>
              <div className={styles.mobileServiceList}>
                {currentCategory.items.map((item) => (
                  <Link href={localizedHref(item.href)} key={item.href} onClick={closeNavigation}>
                    <span>{item.label}</span><span aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
              <Link href={localizedHref('/contacto')} className={styles.mobileContactButton} onClick={closeNavigation}>
                <span>{t('contact')}</span><span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

function MegaMenu({ category, localizedHref, t, onClose }) {
  const [previewService, setPreviewService] = useState(null);
  const splitAt = Math.ceil(category.items.length / 2);
  const columns = [category.items.slice(0, splitAt), category.items.slice(splitAt)];

  return (
    <div className={styles.megaMenu}>
      <div className={styles.megaIntro}>
        <span className={styles.megaLabel}>{t('level-one')}</span>
        <h2>{category.label}</h2>
        <span className={styles.serviceCount}>{t('services-count', { count: category.items.length })}</span>
        <Link href={localizedHref(category.href)} onClick={onClose}>{t('view-all')} ↗</Link>
      </div>
      {columns.map((items, columnIndex) => items.length > 0 && (
        <div className={styles.megaColumn} key={columnIndex}>
          <span className={styles.megaLabel}>{t('services-range', {
            start: String(columnIndex === 0 ? 1 : splitAt + 1).padStart(2, '0'),
            end: String(columnIndex === 0 ? splitAt : category.items.length).padStart(2, '0'),
          })}</span>
          {items.map((item) => (
            <Link
              href={localizedHref(item.href)}
              key={item.href}
              onClick={onClose}
              onMouseEnter={() => setPreviewService(item)}
              onFocus={() => setPreviewService(item)}
            >
              <span>{item.label}</span><span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      ))}
      <div className={styles.megaContext}>
        <div className={styles.megaContextContent} key={previewService?.href || 'category-overview'}>
          <span className={styles.megaLabel}>
            {previewService
              ? t('service-preview-label', { category: category.label, number: previewService.number })
              : t('context-label')}
          </span>
          <h3>{previewService?.label || t('context-copy')}</h3>
          {previewService && <p>{previewService.preview}</p>}
          <Link
            href={localizedHref(previewService?.href || '/contacto')}
            onClick={onClose}
          >
            {previewService ? t('go-to-service') : t('contact')} ↗
          </Link>
        </div>
      </div>
    </div>
  );
}

function LanguageSwitcher({ locale, onChange }) {
  return (
    <div className={styles.languageSwitcher} aria-label="Language selector">
      <button type="button" className={locale === 'en' ? styles.activeLanguage : ''} onClick={() => onChange('en')}>EN</button>
      <span>|</span>
      <button type="button" className={locale === 'es' ? styles.activeLanguage : ''} onClick={() => onChange('es')}>ES</button>
    </div>
  );
}
