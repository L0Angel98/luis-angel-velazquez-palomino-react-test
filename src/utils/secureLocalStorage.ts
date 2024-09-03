import CryptoJS from 'crypto-js';

const SECRET_KEY = 'TEST-TOKEN_123'; // Cambia esta clave por una clave secreta segura

const encrypt = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decrypt = (ciphertext: string): any => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

interface SecureLocalStorage {
  setSecureItem(key: string, value: any): void;
  getSecureItem(key: string): any;
  removeSecureItem(key: string): void;
}

const secureLocalStorage: SecureLocalStorage = {
  setSecureItem: (key: string, value: any) => {
    const encryptedValue = encrypt(value);
    localStorage.setItem(key, encryptedValue);
  },

  getSecureItem: (key: string): any => {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      return decrypt(encryptedValue);
    }
    return null;
  },

  removeSecureItem: (key: string): void => {
    localStorage.removeItem(key);
  }
};

export default secureLocalStorage;
