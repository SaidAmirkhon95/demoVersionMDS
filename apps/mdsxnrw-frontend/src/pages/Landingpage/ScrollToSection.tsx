import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Header from './Header';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import CookiesBanner from './CookiesBanner';

const ScrollToSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    { id: 0, component: <Header /> },
    { id: 1, component: <Section1 /> },
    { id: 2, component: <Section2 /> },
    { id: 3, component: <Section3 /> },
  ];

  const handleAcceptCookies = () => {
    //
    console.log('Cookies accepted.');
  };

  useEffect(() => {
    scrollToTop();
  }, [activeSection]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (index: any) => {
    setActiveSection(index);
    const targetSection = document.getElementById(`section-${index}`);
    if (targetSection) {
      const yOffset = 0;
      const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };
  return (
    <>
      {sections.map((section) => (
        <Grid key={section.id} id={`section-${section.id}`} style={{ marginTop: '0px' }}>
          {section.component}
        </Grid>
      ))}
      <CookiesBanner />
    </>
  );
};

export default ScrollToSection;
