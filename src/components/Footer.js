'use client';

import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const { t } = useTranslation('footer');

    const addressLines = `Corporativo Espacio Santa Fé,
Carretera México Toluca 5420-2604,
Col. El Yaqui.
CP 05320
CDMX.`.split('\n');

    return (
        <div className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerLogo}>
                    <Link href="/">
                        <Image src="/svg/logo2.svg" alt="Logo" width={250} height={50} className={styles.navbarLogo} />
                    </Link>
                </div>
                <div className={styles.footerRow}>
                    <div className={styles.footerColumn50}>
                        <p>{t('column-1')}</p>
                    </div>
                    <div className={styles.footerColumn25}>
                        <h3>{t('column-2-services')}</h3>
                        <ul>
                            <li><Link href="/fiscal">{t('column-2-link1')}</Link></li>
                            <li><Link href="/venture-capital">{t('column-2-link2')}</Link></li>
                            <li><Link href="/legal">{t('column-2-link3')}</Link></li>
                            <li><Link href="/patrimonial">{t('column-2-link4')}</Link></li>
                            <li><Link href="/alianzas-estrategicas">{t('column-2-link5')}</Link></li>
                        </ul>
                    </div>
                    <div className={styles.footerColumn25}>
                        <h3>{t('column-3-more')}</h3>
                        <ul>
                            <li><Link href="/nuestro-equipo">{t('column-3-team')}</Link></li>
                            <li><Link href="/trabaja-con-nosotros">{t('column-3-work-with-us')}</Link></li>
                            <li><Link href="/contacto">{t('colum-3-terms')}</Link></li>
                            <li><Link href="/aviso-de-privacidad">{t('column-3-privacy-notice')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.footerRow}>
                    <div className={styles.footerColumn50}>
                        <div className={styles.footerColumn50email}>
                            <h3>Email:</h3>
                            <p>mmyo@mmyo.com.mx</p>
                        </div>
                    </div>
                    <div className={styles.footerColumn25}>
                        <h3>{t('contacto')}</h3>
                        <p className={styles.address}>
                            {addressLines.map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className={styles.footerColumn25}>
                        <h3>{t('column-3-follow-us')}</h3>
                        <ul>
                            <li>
                                <Link href="#link6">Fb</Link>
                                <Link href="#link7">Ig</Link>
                                <Link href="#link8">Li</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.lastFooterRow}>
                    <div className={styles.footerLegal}>
                        <p>© 2024 Muñoz Manzo & Ocampo</p>
                    </div>
                    <div className={styles.footerLogo}>
                        <Link href="#top">
                            <Image src="/svg/top_button.svg" alt="Logo" width={250} height={50} className={styles.navbarLogo} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}