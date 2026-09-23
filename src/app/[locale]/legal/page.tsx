import ServiceCategory from '../../../components/ServiceCategory';
import { serviceCategories } from '../../../components/serviceCategoryData';

export default async function LegalPage({ params: { locale } }: { params: { locale: string } }) {
  return <ServiceCategory locale={locale} category={serviceCategories.legal} />;
}
