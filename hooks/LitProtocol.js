import {
  checkAndSignAuthMessage,
  LitNodeClient,
} from "@lit-protocol/lit-node-client";
import { LIT_NETWORK, LIT_ABILITY } from "@lit-protocol/constants";
import { encryptString, decryptToString } from "@lit-protocol/encryption";

const litNodeClient = new LitNodeClient({
  litNetwork: LIT_NETWORK.DatilDev,
  debug: false,
});

async function connectLitClient() {
  if (!litNodeClient.connected) {
    await litNodeClient.connect();
  }
}
connectLitClient();

const accessControlConditions = (studentWallet) => [
  {
    conditionType: "evmBasic",
    contractAddress: "",
    standardContractType: "",
    chain: "amoy",
    method: "",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=",
      value: studentWallet,
    },
  },
  {
    operator: "or",
  },
  {
    conditionType: "evmBasic",
    contractAddress: "",
    standardContractType: "",
    chain: "amoy",
    method: "",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=",
      value: process.env.NEXT_PUBLIC_ADMIN_WALLET,
    },
  },
];

export async function encryptStudentData(studentWallet, studentData) {
  if (!litNodeClient.connected) {
    await litNodeClient.connect();
  }

  if (!studentWallet) {
    throw new Error("Student wallet address is required for encryption");
  }

  if (!accessControlConditions || accessControlConditions.length === 0) {
    console.error("Error: Access Control Conditions are missing");
    return;
  }

  const dataString = JSON.stringify(studentData);

  const { ciphertext, dataToEncryptHash } = await encryptString(
    {
      accessControlConditions: accessControlConditions(studentWallet),
      dataToEncrypt: dataString,
    },
    litNodeClient
  );

  return { ciphertext, dataToEncryptHash };
}

export async function decryptStudentData(
  ciphertext,
  dataToEncryptHash,
  address
) {
  if (!litNodeClient.connected) {
    await litNodeClient.connect();
  }
  try {
    const authSig = await checkAndSignAuthMessage({
      chain: "amoy",
      // wallet: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    });
    const accConditions = accessControlConditions(address);

    console.log(authSig)

    if (!ciphertext) {
      console.error("Error: Encrypted string is undefined or empty");
      return;
    }

    if (!authSig || !authSig.sig) {
      console.error("Error: AuthSig is missing or invalid");
      return;
    }

    if (!accessControlConditions || accessControlConditions.length === 0) {
      console.error("Error: Access Control Conditions are missing");
      return;
    }

    if (!dataToEncryptHash) {
      console.error("Error: Data hash is missing");
      return;
    }

    const decryptedData = await decryptToString(
      {
        accessControlConditions: accessControlConditions(address),
        chain: "amoy",
        ciphertext,
        dataToEncryptHash,
        authSig,
      },
      litNodeClient
    );
    console.log("plaintext",decryptedData)
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}

export async function decryptStudentDataCallback(
  ciphertext,
  dataToEncryptHash,
  address,
  authSig
) {
  if (!litNodeClient.connected) {
    await litNodeClient.connect();
  }
  try {
    const accConditions = accessControlConditions(address);

    console.log(authSig)

    if (!ciphertext) {
      console.error("Error: Encrypted string is undefined or empty");
      return;
    }

    if (!accessControlConditions || accessControlConditions.length === 0) {
      console.error("Error: Access Control Conditions are missing");
      return;
    }

    if (!dataToEncryptHash) {
      console.error("Error: Data hash is missing");
      return;
    }

    const decryptedData = await decryptToString(
      {
        accessControlConditions: accessControlConditions(address),
        chain: "amoy",
        ciphertext,
        dataToEncryptHash,
        authSig,
      },
      litNodeClient
    );
    console.log("plaintext",decryptedData)
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}
