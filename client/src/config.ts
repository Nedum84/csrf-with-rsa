type Props = {
  BASE_URL: string;
  RSA_PUBLIC_KEY_BASE64: string;
};

const appConfig: Props = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  RSA_PUBLIC_KEY_BASE64: import.meta.env.VITE_RSA_PUBLIC_KEY_BASE64,
};

export default appConfig;
