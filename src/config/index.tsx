
import RNFS from 'react-native-fs';

const FileDownloadDirectory = RNFS.DocumentDirectoryPath + '/fileDownloads/';

(async () => {
  if (!(await RNFS.exists(FileDownloadDirectory)))
    RNFS.mkdir(FileDownloadDirectory);
})();
export interface IConfig {
  baseUrl: string;
  socketUrl: string;
  fileDownloadPath: string;
}
const config: IConfig = {
  baseUrl: 'https://tenant-prod.tecxar.io/api/v1/',
  // baseUrl: 'http://192.168.110.106:3000/api/v1/',
  socketUrl: 'https://tenant-prod.tecxar.io',
  fileDownloadPath: FileDownloadDirectory
  // baseUrl: 'https://tenant-test.tecxar.io/api/v1/',
  // socketUrl: 'https://tenant-test.tecxar.io',
};
export default config;
