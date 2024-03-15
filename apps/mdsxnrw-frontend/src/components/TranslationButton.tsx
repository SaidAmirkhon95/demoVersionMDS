import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useLanguage } from '../LanguageContext';
import LanguageIcon from '@mui/icons-material/Language';

export default function BasicButtons() {
  const { isDeutsch, toggleLanguage } = useLanguage();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Stack spacing={2} direction='row'>
      <Button
        variant='text'
        onClick={toggleLanguage}
        sx={{
          color: '#000',
          marginLeft: '-10px',
        }}
      >
        <LanguageIcon sx={{ color: isMobile ? '#414141' : '#000' }} />
        <div
          style={{
            marginLeft: isMobile ? '32px' : '5px',
            color: isMobile ? '#414141' : '#000',
          }}
        >
          {isDeutsch ? 'English' : 'Deutsch'}
        </div>
      </Button>
    </Stack>
  );
}
