'use client';

import { useTranslation } from 'react-i18next';

export default function ExampleClientComponent() {

  const { t } = useTranslation();

  const userName = 'Chino';

  return <p>{t('subheader', {userName})}!</p>;
}