import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
/* import Layout from './pages/Layout'; */
import LandingPage from './pages/Landingpage';
import MDSxNRW from 'pages/InputForm/MDSxNRW';
/* import App from './App'; */
import reportWebVitals from './reportWebVitals';
import DatenschutzText from './pages/InputForm/DatenschutzText';
import './i18n';
import ImpressumText from 'pages/InputForm/ImpressumText';
import KontaktInfo from 'pages/InputForm/KontaktInfo';
import ScrollToAbout from 'pages/AboutUs/ScrollToAbout';
import ScrollToInfo from 'pages/Info/ScrollToInfo';
import ReiterForConnector from 'pages/Landingpage/ReiterForConnector';
import { LanguageProvider } from './LanguageContext';
import { MyContextProvider } from './MyContext';
import { TableDataProvider } from 'TableDataProvider';
import { DataProvider } from './DataContext';
import { SortedDataProvider } from 'SortedDataProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <MyContextProvider>
        <TableDataProvider>
          <DataProvider>
            <SortedDataProvider>
              <React.Suspense fallback='Loading...'>
                <BrowserRouter>
                  <Navbar />
                  <Routes>
                    <Route path='/'>
                      <Route index element={<LandingPage />} />
                      <Route path='about' element={<ScrollToAbout />} />
                      <Route path='info' element={<ScrollToInfo />} />
                      <Route path='contact' element={<KontaktInfo />} />
                      <Route path='app' element={<MDSxNRW />} />
                      <Route path='reiter' element={<ReiterForConnector />} />
                      <Route path='datenschutz' element={<DatenschutzText />} />
                      <Route path='impressum' element={<ImpressumText />} />
                      <Route path='kontaktinfo' element={<KontaktInfo />} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              </React.Suspense>
            </SortedDataProvider>
          </DataProvider>
        </TableDataProvider>
      </MyContextProvider>
    </LanguageProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
