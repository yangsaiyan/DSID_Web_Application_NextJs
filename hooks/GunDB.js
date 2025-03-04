import Gun from "gun";
import "gun/sea";
import { decryptStudentData, encryptStudentData } from "./LitProtocol";

const gun = Gun();

export async function storeStudent(c) {
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

  const encryptedData = await encryptStudentData(c?.walletAddress, studentData);

  gun
    .get("students")
    .get(c?.walletAddress)
    .put(encryptedData, (ack) => {
      if (ack.ok) {
        return true;
      } else if (ack.err) {
        return false;
      }
    });
}

export async function getStudent(address) {
  console.log(address);
  const encryptedData = await gun.get("students").get(address);

  const decryptedData = await decryptStudentData(
    encryptedData?.ciphertext,
    encryptedData?.dataToEncryptHash,
    address
  );

  console.log(decryptedData);

  return decryptedData;
}
