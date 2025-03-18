import Gun from "gun";
import { decryptStudentData, decryptStudentDataCallback, encryptStudentData } from "./LitProtocol";
import "gun/sea";

const gun = Gun({
  peers: [
    process.env.NEXT_PUBLIC_GunDB_HEROKU_RELAYER_URL,
    "https://gun-manhattan.herokuapp.com/gun",
  ],
});

export async function storeStudent(c) {
  const user = gun.user();
  user.auth(
    process.env.NEXT_PUBLIC_GunDB_AUTH_EMAIL,
    process.env.NEXT_PUBLIC_GunDB_AUTH_PASS,
    async (ack) => {
      console.log(ack);
      const studentData = {
        studentId: c?.studentId,
        name: c?.name,
        email: c?.email,
        phoneNumber: c?.phoneNumber,
        nric: c?.nric,
        walletAddress: c?.walletAddress,
        permanentHomeAddress: c?.permanentHomeAddress,
        faculty: c?.faculty,
        course: c?.course,
        race: c?.race,
        gender: c?.gender,
        nationality: c?.nationality,
      };

      const encryptedData = await encryptStudentData(
        c?.walletAddress,
        studentData
      );

      console.log(encryptedData);

      user
        .get("students")
        .get(c?.walletAddress)
        .put(encryptedData, (ack) => {
          if (ack.ok) {
            console.log(ack);
            return true;
          } else if (ack.err) {
            return false;
          }
        });
    }
  );
}

export async function getStudent(address) {
  const user = gun.user();

  return new Promise((resolve, reject) => {
    user.auth(
      process.env.NEXT_PUBLIC_GunDB_AUTH_EMAIL,
      process.env.NEXT_PUBLIC_GunDB_AUTH_PASS,
      (ack) => {
        if (ack.err) {
          return reject(new Error(ack.err));
        }

        user
          .get("students")
          .get(address)
          .once(async (data) => {
            if (!data) {
              return resolve(null);
            }
            console.log("🔍 Checking GunDB Data:", data);
            try {
              const decryptedData = await decryptStudentData(
                data?.ciphertext,
                data?.dataToEncryptHash,
                address
              );
              console.log(decryptedData);
              resolve(decryptedData);
            } catch (decryptionError) {
              reject(decryptionError);
            }
          });
      }
    );
  });
}

export async function getStudentCallback(address, authSig) {
  const user = gun.user();

  return new Promise((resolve, reject) => {
    user.auth(
      process.env.NEXT_PUBLIC_GunDB_AUTH_EMAIL,
      process.env.NEXT_PUBLIC_GunDB_AUTH_PASS,
      (ack) => {
        if (ack.err) {
          return reject(new Error(ack.err));
        }

        user
          .get("students")
          .get(address)
          .once(async (data) => {
            if (!data) {
              return resolve(null);
            }
            console.log("🔍 Checking GunDB Data:", data);
            try {
              const decryptedData = await decryptStudentDataCallback(
                data?.ciphertext,
                data?.dataToEncryptHash,
                address,
                authSig,
              );
              console.log(decryptedData);
              resolve(decryptedData);
            } catch (decryptionError) {
              reject(decryptionError);
            }
          });
      }
    );
  });
}