import Gun from "gun";
import "gun/sea";

export function studentRegister(a, b, c) {

  const gun = Gun();
  const user = gun.user();

  user.create(a, b);

  user.auth(a, b, async (res) => {
    if (res.err) {
      return res.err;
    }

    const studentData = {
      studentID: c?.studentID,
      name: c?.name,
      email: c?.email,
      nric: c?.nric,
      walletAddress: c?.walletAddress,
      homeAddress: c?.homeAddress,
      faculty: c?.faculty,
      programme: c?.programme,
    };

    const encryptedData = await Gun.SEA.encrypt(studentData, user._.sea);

    user.get("students").put(encryptedData, (ack) => {
      if (ack.ok) {
        return res.ok;
      } else if (ack.err) {
        return ack.err;
      }
    });
  });
}
