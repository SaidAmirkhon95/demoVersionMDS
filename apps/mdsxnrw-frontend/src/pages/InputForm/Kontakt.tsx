import React from 'react';
import Link from '@mui/material/Link';
import { useLanguage } from '../../LanguageContext';
import translationFunction from 'translationFunction';

export default function Kontakt() {
  const { isDeutsch } = useLanguage();
  return (
    <Link color='inherit' href={'/kontaktinfo'}>
      {isDeutsch
        ? translationFunction().deutschTranslations.kontakt
        : translationFunction().englishTranslations.kontakt}
    </Link>
  );
}
