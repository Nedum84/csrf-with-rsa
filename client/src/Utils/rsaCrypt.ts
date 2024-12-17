/* eslint-disable @typescript-eslint/no-unused-vars */
import appConfig from "config";
import { base64 } from "./base64";
import JSEncrypt from "jsencrypt";

const jsEncrypt = new JSEncrypt();

const encrypt = async (payload: string, publicKeyBase64?: string) => {
  const publicKey = (() => {
    const keyBase64 = publicKeyBase64 || appConfig.RSA_PUBLIC_KEY_BASE64;

    try {
      return base64.decode(keyBase64);
    } catch (error) {
      /* empty */
    }
    return undefined;
  })();
  if (!publicKey) return;

  jsEncrypt.setPublicKey(publicKey);
  const encrypted = jsEncrypt.encrypt(payload);
  return encrypted;
};

const decrypt = async (payload: string, privateKeyBase64?: string) => {
  if (!privateKeyBase64) return;

  const privateKey = (() => {
    const keyBase64 = privateKeyBase64;

    try {
      return base64.decode(keyBase64);
    } catch (error) {
      /* empty */
    }
    return undefined;
  })();
  if (!privateKey) return;

  jsEncrypt.setPrivateKey(privateKey);
  const uncrypted = jsEncrypt.decrypt(payload);
  return uncrypted;
};

export const rsaCrypt = {
  encrypt,
  decrypt,
};
