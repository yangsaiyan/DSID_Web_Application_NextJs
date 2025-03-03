import Gun from "gun";
import "gun/sea";

export function storeStudent(c) {
  const gun = Gun();

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

  const encryptedData = "";

  gun.get("students").get(studentData.walletAddress).put(encryptedData, (ack) => {
    if (ack.ok) {
      return res.ok;
    } else if (ack.err) {
      return ack.err;
    }
  });
}
