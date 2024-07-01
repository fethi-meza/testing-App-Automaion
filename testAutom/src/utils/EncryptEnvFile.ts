const CryptoJSUtilFile = require("crypto-js");
const fs = require("fs");
const path = require("path");
require("dotenv").config(); // Load environment variables

const currentDir = __dirname;
const srcDir = path.resolve(currentDir, "..");
const configDir = path.resolve(srcDir, "config");

// Determine the correct path to the .env file
let envFilePath = path.join(configDir, ".env");
if (process.env.NODE_ENV) {
  envFilePath = path.join(configDir, `.env.${process.env.NODE_ENV}`);
}

function checkEnvFileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

export function encryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";

  if (!checkEnvFileExists(envFilePath)) {
    throw new Error(`.env file not found at path: ${envFilePath}`);
  }

  try {
    // Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");

    // Encrypt values and update the array
    const encryptedLines = envLines.map((line) => {
      const [key, value] = line.split("=");

      if (value) {
        const encryptedValue = CryptoJSUtilFile.AES.encrypt(value.trim(), SALT).toString();
        return `${key}=${encryptedValue}`;
      }

      return line;
    });

    // Join the lines and write back to the .env file
    const updatedEnvContent = encryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

    console.log("Encryption complete. Updated .env file.");
  } catch (error) {
    console.error("Error during encryption:", error);
  }
}

export function decryptEnvFile() {
  const SALT = process.env.SALT || "defaultSALT";

  if (!checkEnvFileExists(envFilePath)) {
    throw new Error(`.env file not found at path: ${envFilePath}`);
  }

  try {
    // Read the .env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");

    // Decrypt values and update the array
    const decryptedLines = envLines.map((line) => {
      const [key, value] = line.split("=");

      if (value) {
        const decryptedValue = CryptoJSUtilFile.AES.decrypt(value.trim(), SALT).toString(CryptoJSUtilFile.enc.Utf8);
        return `${key}=${decryptedValue}`;
      }

      return line;
    });

    // Join the lines and write back to the .env file
    const updatedEnvContent = decryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

    console.log("Decryption complete. Updated .env file.");
  } catch (error) {
    console.error("Error during decryption:", error);
  }
}
