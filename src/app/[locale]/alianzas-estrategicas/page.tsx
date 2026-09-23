import ServiceCategory from '../../../components/ServiceCategory';
import { serviceCategories } from '../../../components/serviceCategoryData';

export default async function StrategicAlliancesPage({ params: { locale } }: { params: { locale: string } }) {
  return <ServiceCategory locale={locale} category={serviceCategories['alianzas-estrategicas']} />;
}
