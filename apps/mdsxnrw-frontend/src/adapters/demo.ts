import axios from './http';

const api = {
  hello: () => axios.get('/hello'),
};

export default api;
