import crypto from "crypto";
import fs from "fs";
import path from "path";
import NodeRSA from "node-rsa";

// Helper function to read keys from a file
const readKeyFromFile = (filePath: string): string => {
  return fs.readFileSync(path.resolve(filePath), "utf8");
};

// Encryption with RSA Public Key
const encryptStringWithRsaPublicKey = (toEncrypt: string): string => {
  const publicKey = readKeyFromFile("./public.pem");

  const buffer = Buffer.from(toEncrypt);
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    buffer
  );
  return encrypted.toString("base64");
};

// Decryption with RSA Private Key
const decryptStringWithRsaPrivateKey = (toDecrypt: string, privateKeyPath?: string): string => {
  const privateKeyString = readKeyFromFile("./private.pem");

  // Handle PKCS#1 padding issue
  const privateKey = new NodeRSA(privateKeyString);
  privateKey.setOptions({ encryptionScheme: "pkcs1", environment: "browser" });

  const decryptedRequestData = privateKey.decrypt(toDecrypt).toString("utf8");

  return decryptedRequestData;
};

export const rsaEncrypt = {
  encrypt: encryptStringWithRsaPublicKey,
  decrypt: decryptStringWithRsaPrivateKey,
};
