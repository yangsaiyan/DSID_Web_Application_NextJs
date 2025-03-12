import Gun from "gun";
import { decryptStudentData, encryptStudentData } from "./LitProtocol";
import "gun/sea";


const gun = Gun({
  peers: [
    process.env.NEXT_PUBLIC_GunDB_FLYIO_RELAYER_URL,
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
        studentID: c?.studentID,
        name: c?.name,
        email: c?.email,
        phoneNumber: c?.phoneNumber,
        nric: c?.nric,
        walletAddress: c?.walletAddress,
        homeAddress: c?.homeAddress,
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
  user.auth(
    process.env.NEXT_PUBLIC_GunDB_AUTH_EMAIL,
    process.env.NEXT_PUBLIC_GunDB_AUTH_PASS,
    async (ack) => {
      console.log(address);
      user
        .get("students")
        .get(address)
        .once((data) => {
          const encryptedData = data;
          decryptStudentData(
            encryptedData?.ciphertext,
            encryptedData?.dataToEncryptHash,
            address
          ).then((decryptedData) => {
            console.log(decryptedData);
            return decryptedData;
          });
        });
    }
  );
}
