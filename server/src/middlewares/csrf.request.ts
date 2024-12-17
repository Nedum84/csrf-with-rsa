import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../utils/custom.error";
import { rsaEncrypt } from "../utils/rsa.crypt";

type EncPayload = {
  url: string;
  method: string;
  timestamp: number;
};

export async function csrfValidation(req: Request, res: Response, next: NextFunction) {
  // const urlPath = decodeURI(`${req.baseUrl}${req.path}`.trim());
  const urlPath = decodeURIComponent(req.originalUrl.split("?")[0]?.trim() || "");

  const method = req.method.toLowerCase();

  const csrf = req.headers["csrf"];

  if (!csrf || Array.isArray(csrf)) {
    throw new BadRequestError("CSRF token is missing or malformed.", "CSRF_TOKEN_MISSING");
  }

  const now = Date.now();

  const payload = decryptPayload(csrf);

  if (!payload) {
    throw new BadRequestError("Failed to decrypt or parse CSRF token.", "CSRF_TOKEN_INVALID");
  }

  // const payloadUrlPath = decodeURI(payload.url.split("?").at(0)?.trim() || ""); // Trim query parts
  const payloadUrlPath = decodeURIComponent(payload.url.split("?")[0]?.trim() || "");
  if (urlPath !== payloadUrlPath || payload.method.toLowerCase() !== method) {
    throw new BadRequestError(
      "CSRF token validation failed: URL or method mismatch.",
      "CSRF_VALIDATION_FAILED"
    );
  }

  const queryExpiry = 15 * 1000; // 15 seconds
  if (now - payload.timestamp > queryExpiry) {
    console.log("[EXPIRED_CSRF_TOKEN] Payload:", payload);
    throw new BadRequestError("CSRF token has expired.", "CSRF_TOKEN_EXPIRED");
  }

  next();
}

function decryptPayload<T = EncPayload>(payload: string): T | undefined {
  try {
    return JSON.parse(rsaEncrypt.decrypt(payload)) as T;
  } catch (error) {
    console.error("Error decrypting payload:", error);
    return undefined;
  }
}
