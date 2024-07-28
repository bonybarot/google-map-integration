import axios, { AxiosInstance } from 'axios';
import config from '../config';
import store from '../store';
import { logOutFromApi } from '../store/reducers/auth.reducer';
import Toast from 'react-native-toast-message';
import strings from '../i18n/strings';


class APIClient {
  public apiClient!: AxiosInstance;

  public constructor() {
    this.assign(config.baseUrl);
  }

  private assign = async (BASE_URL: string) => {
    this.apiClient = axios.create({
      baseURL: BASE_URL,
    });
    this.apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401 && error.response.config.url !== "/auth/login"&& error.response.config.url !== "/users/whoami") {
          Toast.show({
            type:'error',
            text1:strings.sessionExpire
          })
          store.dispatch(logOutFromApi())
        } else {
            throw error
        }
      }
    );
  };
}

export default new APIClient();

// import config from '../config';
// import axios from 'axios';
// export default axios.create({ baseURL: config.baseUrl });
