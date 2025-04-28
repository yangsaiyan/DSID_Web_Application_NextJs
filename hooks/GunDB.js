import Gun from "gun";
import {
  decryptStudentData,
  decryptStudentDataCallback,
  encryptStudentData,
} from "./LitProtocol";
import "gun/sea";

const gun = Gun({
  peers: [
    process.env.NEXT_PUBLIC_GunDB_HEROKU_RELAYER_URL,
    "https://gun-manhattan.herokuapp.com/gun",
  ],
});

export async function storeStudent(c) {
  const user = gun.user();
  const email = process.env.NEXT_PUBLIC_GunDB_AUTH_EMAIL;
  const password = process.env.NEXT_PUBLIC_GunDB_AUTH_PASS;

  return new Promise((resolve, reject) => {
    user.auth(email, password, async (ack) => {
      if (ack.err) {
        console.warn("Auth failed. Trying to create account...");
        user.create(email, password, async (createAck) => {
          if (createAck.err) {
            console.error("Create account failed:", createAck.err);
            return reject(new Error(createAck.err));
          }
          console.log("Account created successfully.");

          await proceedToStore();
          resolve(true);
        });
      } else {
        console.log("Logged in successfully.");
        await proceedToStore();
        resolve(true);
      }

      async function proceedToStore() {
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

        user
          .get("students")
          .get(c?.walletAddress)
          .put(encryptedData, (putAck) => {
            if (putAck.ok) {
              console.log("Student data stored successfully.", putAck);
            } else if (putAck.err) {
              console.error("Error storing student data.", putAck.err);
            }
          });
      }
    });
  });
}


// export async function storeStudentImmutable(c, signedMessage) {
//   const user = gun.user();
//   user.auth(
//     process.env.NEXT_PUBLIC_GunDB_AUTH_EMAIL,
//     process.env.NEXT_PUBLIC_GunDB_AUTH_PASS,
//     async (ack) => {
//       const studentData = {
//         studentId: c?.studentId,
//         name: c?.name,
//         nric: c?.nric,
//         gender: c?.gender,
//         race: c?.race,
//       };

//       const encryptedData = await signMessageAndEncrypt(
//         signedMessage,
//         JSON.stringify(studentData)
//       );

//       user
//         .get("studentsImmutable")
//         .get(c?.walletAddress)
//         .put(encryptedData, (ack) => {
//           if (ack.ok) {
//             return true;
//           } else if (ack.err) {
//             return false;
//           }
//         });
//     }
//   );
// }

export async function getStudent(address) {
  return new Promise((resolve, reject) => {
    // Fetch the student data directly from the public GunDB node.
    gun
      .get("students")
      .get(address)
      .once(async (data) => {
        if (!data) {
          console.warn("No student data found for address:", address);
          return resolve(null); // No data found, return null.
        }

        console.log("🔍 Checking GunDB Data:", data);

        try {
          // Decrypt the encrypted student data.
          const decryptedData = await decryptStudentData(
            data?.ciphertext,
            data?.dataToEncryptHash,
            address
          );
          console.log("✅ Decrypted Student Data:", decryptedData);
          resolve(decryptedData); // Return decrypted student data.
        } catch (decryptionError) {
          console.error("❌ Decryption error:", decryptionError);
          reject(decryptionError); // Handle decryption errors.
        }
      });
  });
}