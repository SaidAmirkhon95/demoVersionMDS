import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import logo from './logo.svg';
import './App.css';
import api from './adapters/index';
import { AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ApiCallProps {}
interface ApiCallState {
  response: string;
}

class ApiCall extends React.Component<ApiCallProps, ApiCallState> {
  constructor(props: any) {
    super(props);
    this.state = {
      response: '',
    };
  }
  componentDidMount() {
    api
      .hello()
      .then((res) => {
        this.setState({ response: res.data });
      })
      .catch((e: AxiosError) => {
        this.setState({ response: e.message });
      });
  }
  render() {
    const { response } = this.state;

    return <h2>{response}</h2>;
  }
}

function Welcome() {
  const { t } = useTranslation();
  return <h2>{t('Welcome to React')}</h2>;
}

function App() {
  return (
    <div className='App'>
      <Suspense fallback='loading'>
        <Welcome />
      </Suspense>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
      <ApiCall />
    </div>
  );
}

export default App;
