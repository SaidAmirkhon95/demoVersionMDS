import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import InfoSection1 from './InfoSection1';
import InfoSection2 from './InfoSection2';
import InfoSection3 from './InfoSection3';
import InfoSection4 from './InfoSection4';
import InfoSection5 from './InfoSection5';
import InfoSection6 from './InfoSection6';
import InfoSection7 from './InfoSection7';

const ScrollToAbout = () => {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    { id: 0, component: <InfoSection1 /> },
    { id: 1, component: <InfoSection2 /> },
    { id: 3, component: <InfoSection3 /> },
    { id: 4, component: <InfoSection4 /> },
    { id: 5, component: <InfoSection5 /> },
    { id: 6, component: <InfoSection6 /> },
    { id: 7, component: <InfoSection7 /> },
  ];

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
    </>
  );
};

export default ScrollToAbout;
