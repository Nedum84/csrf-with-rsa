import { Buffer } from "buffer/";

export const base64 = {
  encode: (str: string) => Buffer.from(str).toString("base64"),
  decode: (str: string) => Buffer.from(str, "base64").toString(),
};
