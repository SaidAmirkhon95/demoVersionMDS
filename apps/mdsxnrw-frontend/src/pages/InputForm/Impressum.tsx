import React from 'react';
import Link from '@mui/material/Link';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

export default function Impressum() {
  const { isDeutsch } = useLanguage();
  return (
    <Link color='inherit' href={'/impressum'}>
      {isDeutsch
        ? translationFunction().deutschTranslations.impressum
        : translationFunction().englishTranslations.impressum}
    </Link>
  );
}
