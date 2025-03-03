import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { LIT_NETWORK, LIT_ABILITY } from "@lit-protocol/constants";
import { encryptString, decryptToString } from "@lit-protocol/encryption";
import {
  LitAccessControlConditionResource,
  createSiweMessage,
  generateAuthSig,
} from "@lit-protocol/auth-helpers";

const litNodeClient = new LitNodeClient({
  litNetwork: LIT_NETWORK.DatilDev,
  debug: false,
});

async function connectLitClient() {
  if (!litNodeClient.connected) {
    await litNodeClient.connect();
    console.log("✅ LitNodeClient connected");
  }
}
connectLitClient();

const accessControlConditions = (studentWallet) => [
  {
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
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
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "",
    parameters: [":userAddress"],
    returnValueTest: {
      comparator: "=",
      value: process.env.NEXT_PUBLIC_ADMIN_WALLET,
    },
  },
];

export async function encryptStudentData(studentWallet, studentData) {
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
  encryptedString,
  dataToEncryptHash,
  studentWallet
) {
  try {
    const decryptedData = await decryptToString(
      {
        chain: "ethereum",
        encryptedString,
        dataToEncryptHash,
        accessControlConditions: accessControlConditions(studentWallet),
        sessionSigs,
      },
      litNodeClient
    );
    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}
export async function sessionSigs(dataToEncryptHash, address) {
  const signature = await litNodeClient.getSessionSigs({
    chain: "ethereum",
    expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(),
    resourceAbilityRequests: [
      {
        resource: new LitAccessControlConditionResource(
          await LitAccessControlConditionResource.generateResourceString(
            accessControlConditions,
            dataToEncryptHash
          )
        ),
        ability: LIT_ABILITY.AccessControlConditionDecryption,
      },
    ],
    authNeededCallback: async ({
      uri,
      expiration,
      resourceAbilityRequests,
    }) => {
      const toSign = await createSiweMessage({
        uri,
        expiration,
        resources: resourceAbilityRequests,
        walletAddress: address,
        nonce: await litNodeClient.getLatestBlockhash(),
        litNodeClient,
      });

      return await generateAuthSig({
        signer: ethersWallet,
        toSign,
      });
    },
  });
  console.log(signature);
  return signature;
}
