import React from 'react';
import Link from '@mui/material/Link';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

export default function PrivacyText() {
  const { isDeutsch } = useLanguage();
  return (
    <Link color='inherit' href={'/datenschutz'}>
      {isDeutsch
        ? translationFunction().deutschTranslations.datenschutzerklärung
        : translationFunction().englishTranslations.datenschutzerklärung}
    </Link>
  );
}
