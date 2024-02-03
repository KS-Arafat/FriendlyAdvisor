import { Cipher, createCipheriv, createDecipheriv, createHmac } from "crypto";
// Custom Session Generator

const aesOpt = {
  algo: "aes-256-cbc",
  PK: Buffer.from(process.env.PV_KEY ? process.env.PV_KEY : "PV unaccessible"),
  IV: Buffer.from(
    process.env.INIT_VEC ? process.env.INIT_VEC : "IV unaccessible",
  ),
};

type cipherType = {
  EncryptedText: string | "";
  Tag: string | "";
  error?: string;
};
const findFirstMismatch = (line1: string, line2: string) => {
  const l1 = line1.length,
    l2 = line2.length;
  const sl = l1 < l2 ? l1 : l2;
  let mismatch = "";
  for (let i = 0; i < sl; i++) mismatch += line1[i] == line2[i] ? " " : "^";
  return `${line1}\n${line2}\n${mismatch}`;
};

const EncryptSession = (text: string): cipherType => {
  try {
    const cipher = createCipheriv(aesOpt.algo, aesOpt.PK, aesOpt.IV);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const hmac = createHmac("sha256", aesOpt.PK);
    hmac.update(encrypted);
    const integrityTag = hmac.digest("hex");
    return { EncryptedText: encrypted.toString("hex"), Tag: integrityTag };
  } catch (error) {}
  return { error: "Encryption Failed", EncryptedText: "", Tag: "" };
};

const DecryptSession = (cipherData: cipherType): string | { error: string } => {
  try {
    let encryptedText = Buffer.from(cipherData.EncryptedText, "hex");
    const decipher = createDecipheriv(aesOpt.algo, aesOpt.PK, aesOpt.IV);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {}
  return { error: "Decryption failed" };
};

const NonEdgeIntegrityChecker = (cipherData: cipherType) => {
  const hmac = createHmac("sha256", aesOpt.PK);
  hmac.update(Buffer.from(cipherData.EncryptedText, "hex"));
  const integrityTag = hmac.digest("hex");
  // console.log(findFirstMismatch(integrityTag, cipherData.Tag));
  // console.log(integrityTag == cipherData.Tag);

  return integrityTag == cipherData.Tag;
};

const EdgeIntegrityChecker = async (cipherData: cipherType) => {
  try {
    const keyBuffer = new TextEncoder().encode(aesOpt.PK.toString());
    const importedKey = await crypto.subtle.importKey(
      "raw",
      keyBuffer,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["sign"],
    );

    const encryptedTextBuffer = Uint8Array.from(
      Buffer.from(cipherData.EncryptedText, "hex"),
    );

    const integrityTagBuffer = await crypto.subtle.sign(
      { name: "HMAC", hash: { name: "SHA-256" } },
      importedKey,
      encryptedTextBuffer,
    );

    const integrityTag = Array.from(new Uint8Array(integrityTagBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return integrityTag === cipherData.Tag;
  } catch (error) {
    console.error("Error calculating integrity:", error);
    return false;
  }
};

export {
  EncryptSession,
  DecryptSession,
  NonEdgeIntegrityChecker,
  EdgeIntegrityChecker,
};
