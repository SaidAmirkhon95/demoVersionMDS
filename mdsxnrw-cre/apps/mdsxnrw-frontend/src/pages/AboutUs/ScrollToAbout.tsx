import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import AboutSection2 from './AboutSection2';
import AboutSection3 from './AboutSection3';
import AboutSection4 from './AboutSection4';
import AboutSection5 from './AboutSection5';
import AboutSection6 from './AboutSection6';
import AboutSection7 from './AboutSection7';

const ScrollToAbout = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    /* { id: 0, component: <AboutSection1 /> }, */
    { id: 1, component: <AboutSection2 /> },
    { id: 3, component: <AboutSection3 /> },
    { id: 4, component: <AboutSection4 /> },
    { id: 5, component: <AboutSection5 /> },
    { id: 6, component: <AboutSection6 /> },
    { id: 7, component: <AboutSection7 /> },
  ];

  useEffect(() => {
    scrollToTop();
  }, [activeSection]);

  const scrollToTop = () => {
    window.scrollTo({ top: 1, behavior: 'smooth' });
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
    </>
  );
};

export default ScrollToAbout;
