import { ITokenReader } from './types';
const regex = /^data:application\/json;base64,/;
export const base64Reader: ITokenReader = {
  isSupport: (uri: string) => {
    return regex.test(uri);
  },
  read: async (uri: string) => {
    return JSON.parse(atob(uri.replace(regex, '')));
  },
};
