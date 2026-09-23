export type ServiceDefinition = {
  id: string;
  namespace: string;
  previewKey: string;
};

export type ServiceCategoryDefinition = {
  key: string;
  namespace: string;
  index: string;
  services: ServiceDefinition[];
};

export const serviceCategories: Record<string, ServiceCategoryDefinition> = {
  fiscal: {
    key: 'fiscal',
    namespace: 'servicios-fiscales',
    index: '01',
    services: [
      { id: 'consultoria-fiscal', namespace: 'consultoria-fiscal-local-e-internacional', previewKey: 'consultoria' },
      { id: 'transacciones-financieras', namespace: 'especialización-en-transacciones-del-sector-financiero', previewKey: 'especializacion' },
      { id: 'emisiones-valores', namespace: 'emisiones-a-traves-de-bolsas-de-valores', previewKey: 'emisiones-bolsas' },
      { id: 'fondos-inversion', namespace: 'fondos-de-inversion-vc-y-pc', previewKey: 'fondos-vcpc' },
      { id: 'proyectos-inversion', namespace: 'proyectos-de-inversion', previewKey: 'proyectos-inversion' },
      { id: 'proyectos-infraestructura', namespace: 'proyectos-de-infraestructura-generacion-de-energia-e-inmobiliarios', previewKey: 'proyectos-infraestructura' },
      { id: 'reestructuraciones-corp', namespace: 'reestructuraciones-corporativas', previewKey: 'reestructuraciones-corporativas' },
      { id: 'asesoria-alianzas', namespace: 'asesoria-en-alianzas-estrategicas', previewKey: 'asesoria-alianzas' },
      { id: 'promociones-fiscales', namespace: 'promociones-ante-las-autoridades-fiscales', previewKey: 'promociones-autoridades' },
      { id: 'due-dilligence', namespace: 'due-diligence-fiscal', previewKey: 'due-dilligence' },
      { id: 'revision-fiscal', namespace: 'revision-fiscal-de-documentos-relevantes', previewKey: 'revision-fiscal' },
      { id: 'proyectos-energia', namespace: 'proyectos-de-energia', previewKey: 'proyectos-energia' },
      { id: 'dictamenes-fiscales', namespace: 'dictamenes-y-certificaciones-fiscales', previewKey: 'dictamenes-certificaciones' },
    ],
  },
  legal: {
    key: 'legal',
    namespace: 'servicios-legales',
    index: '02',
    services: [
      { id: 'analisis-preventivo', namespace: 'análisis-preventivo-de-operaciones', previewKey: 'analisis-preventivo' },
      { id: 'litigio-contencioso', namespace: 'litigio-contencioso-en-materias-fiscales-y-administrativas', previewKey: 'litigio-fiscal' },
      { id: 'litigio-constitucional-fiscal', namespace: 'litigio-constitucional-fiscal-y-administrativo', previewKey: 'litigio-constitucional' },
      { id: 'solucion-anticipada-de-controversias', namespace: 'solución-anticipada-de-controversias', previewKey: 'solucion-controversias' },
    ],
  },
  patrimonial: {
    key: 'patrimonial',
    namespace: 'servicios-patrimoniales',
    index: '03',
    services: [
      { id: 'evolucion-familiar', namespace: 'acompañamiento-en-la-evolucion-familiar', previewKey: 'evolucion-familiar' },
      { id: 'trust-book', namespace: 'trust-book', previewKey: 'trust-book' },
      { id: 'family-governance', namespace: 'family-governance-y-planeacion-sucesoria-en-los-negocios', previewKey: 'family-governance' },
      { id: 'planeacion-estructuras', namespace: 'planeacion-y-regularizacion-de-estructuras-e-inversiones', previewKey: 'planeacion-estructuras' },
      { id: 'cumplimiento-fiscal', namespace: 'cumplimientos-de-obligaciones-fiscales-patrimoniales', previewKey: 'cumplimiento-fiscal' },
      { id: 'procesos-sucesorios', namespace: 'planeacion-y-acompañamiento-en-procesos-sucesorios-en-mexico-y-el-extranjero', previewKey: 'procesos-sucesorios' },
      { id: 'liquidez-familiar', namespace: 'eventos-de-liquidez-familiar', previewKey: 'liquidez-familiar' },
      { id: 'nuevas-inversiones', namespace: 'estructuración-de-nuevas-inversiones-en-mexico-y-el-extranjero', previewKey: 'nuevas-inversiones' },
      { id: 'transparency-act', namespace: 'corporate-transparency-act', previewKey: 'transparency-act' },
    ],
  },
  'venture-capital': {
    key: 'venture-capital',
    namespace: 'venture-capital',
    index: '04',
    services: [
      { id: 'estructuracion-inv', namespace: 'estructuración-de-las-inversiones-con-enfoque-multi-pais', previewKey: 'estructuracion-inv' },
      { id: 'diagnostico-inicial', namespace: 'diagnostico-inicial', previewKey: 'diagnostico-inicial' },
    ],
  },
  'alianzas-estrategicas': {
    key: 'alianzas-estrategicas',
    namespace: 'alianzas-estratégicas',
    index: '05',
    services: [
      { id: 'asesoria-usa', namespace: 'asesoría-fiscal-en-estados-unidos-de-america', previewKey: 'asesoria-usa' },
      { id: 'representacion-legal', namespace: 'representación-legal', previewKey: 'representacion-legal' },
      { id: 'cfo-on-demand', namespace: 'chief-financial-officer-on-demand', previewKey: 'cfo-on-demand' },
    ],
  },
};
