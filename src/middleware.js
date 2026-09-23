import {i18nRouter} from 'next-i18n-router';
import {NextResponse} from 'next/server';
import i18nConfig from '../i18nConfig';

const categoryServices = {
    fiscal: new Set([
        'consultoria-fiscal',
        'transacciones-financieras',
        'emisiones-valores',
        'fondos-inversion',
        'proyectos-inversion',
        'proyectos-infraestructura',
        'reestructuraciones-corp',
        'asesoria-alianzas',
        'promociones-fiscales',
        'due-dilligence',
        'revision-fiscal',
        'proyectos-energia',
        'dictamenes-fiscales',
    ]),
    legal: new Set([
        'analisis-preventivo',
        'litigio-contencioso',
        'litigio-constitucional-fiscal',
        'solucion-anticipada-de-controversias',
    ]),
    patrimonial: new Set([
        'evolucion-familiar',
        'trust-book',
        'family-governance',
        'planeacion-estructuras',
        'cumplimiento-fiscal',
        'procesos-sucesorios',
        'liquidez-familiar',
        'nuevas-inversiones',
        'transparency-act',
    ]),
    'venture-capital': new Set(['estructuracion-inv', 'diagnostico-inicial']),
    'alianzas-estrategicas': new Set(['asesoria-usa', 'representacion-legal', 'cfo-on-demand']),
};

export function middleware (request) {
    const pathname = request.nextUrl.pathname;
    const locales = i18nConfig.locales.join('|');
    const legacyServiceRoute = pathname.match(
        new RegExp(`^/(?:(?<locale>${locales})/)?(?<category>${Object.keys(categoryServices).join('|')})/(?<service>[^/]+)/?$`)
    );

    if (legacyServiceRoute?.groups) {
        const {locale, category, service} = legacyServiceRoute.groups;
        if (categoryServices[category]?.has(service)) {
            const destination = request.nextUrl.clone();
            destination.pathname = `${locale ? `/${locale}` : ''}/${category}`;
            destination.hash = service;
            return NextResponse.redirect(destination, 308);
        }
    }

    return i18nRouter(request, i18nConfig);
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
  };
