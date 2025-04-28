import Gun from "gun";
import {
  decryptStudentData,
  encryptStudentData,
} from "./LitProtocol";
import "gun/sea"; // Gun's SEA module for encryption/authentication

const gun = Gun({
  peers: [
    process.env.NEXT_PUBLIC_GunDB_HEROKU_RELAYER_URL,
    "https://gun-manhattan.herokuapp.com/gun",
  ],
});

const email = process.env.NEXT_PUBLIC_GunDB_AUTH_EMAIL;
const password = process.env.NEXT_PUBLIC_GunDB_AUTH_PASS;

if (!email || !password) {
  console.error("❌ GunDB credentials are missing! Please check your .env file.");
}

// Helper to login or create GunDB user
async function loginOrCreateUser(user) {
  return new Promise((resolve, reject) => {
    user.auth(email, password, (ack) => {
      if (ack.err) {
        console.warn("Auth failed. Trying to create account...");
        user.create(email, password, (createAck) => {
          if (createAck.err) {
            console.error("Create account failed:", createAck.err);
            return reject(new Error(createAck.err));
          }
          console.log("✅ Account created successfully.");
          return resolve();
        });
      } else {
        console.log("✅ Logged in successfully.");
        return resolve();
      }
    });
  });
}

// Store encrypted student data
export async function storeStudent(student) {
  const user = gun.user();

  try {
    await loginOrCreateUser(user);

    const studentData = {
      studentId: student?.studentId,
      name: student?.name,
      email: student?.email,
      phoneNumber: student?.phoneNumber,
      nric: student?.nric,
      walletAddress: student?.walletAddress,
      permanentHomeAddress: student?.permanentHomeAddress,
      faculty: student?.faculty,
      course: student?.course,
      race: student?.race,
      gender: student?.gender,
      nationality: student?.nationality,
    };

    const encryptedData = await encryptStudentData(
      student?.walletAddress,
      studentData
    );

    await new Promise((resolve, reject) => {
      user
        .get("students")
        .get(student?.walletAddress)
        .put(encryptedData, (putAck) => {
          if (putAck.ok) {
            console.log("✅ Student data stored successfully.", putAck);
            resolve();
          } else if (putAck.err) {
            console.error("❌ Error storing student data.", putAck.err);
            reject(new Error(putAck.err));
          }
        });
    });

    return true;
  } catch (error) {
    console.error("❌ Failed to store student:", error);
    throw error;
  }
}

// Fetch and decrypt student data
export async function getStudent(address) {
  return new Promise((resolve, reject) => {
    gun
      .get("students")
      .get(address)
      .once(async (data) => {
        if (!data) {
          console.warn("⚠️ No student data found for address:", address);
          return resolve(null);
        }

        console.log("🔍 Fetched encrypted data from GunDB:", data);

        try {
          const decryptedData = await decryptStudentData(
            data?.ciphertext,
            data?.dataToEncryptHash,
            address
          );
          console.log("✅ Decrypted Student Data:", decryptedData);
          resolve(decryptedData);
        } catch (error) {
          console.error("❌ Decryption error:", error);
          reject(error);
        }
      });
  });
}