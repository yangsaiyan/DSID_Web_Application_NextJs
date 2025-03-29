import html2canvas from "html2canvas";
import { pinata } from "utils/pinata/config";

const uploadImage = async (studentID) => {
  return new Promise((resolve, reject) => {
    const element = document.getElementById("studentID");
    if (!element) {
      console.error("Element with ID 'studentID' not found!");
      return reject("Element not found");
    }

    html2canvas(element, { backgroundColor: null, scale: 2 }).then((canvas) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          console.error("Failed to generate image blob!");
          return reject("Failed to generate image blob");
        }

        const file = new File([blob], `student-${studentID}.png`, {
          type: "image/png",
        });

        try {
          const urlRequest = await fetch("/api/url");
          const urlResponse = await urlRequest.json();
          const upload = await pinata.upload.public.file(file).url(urlResponse.url);
          resolve(upload?.cid);
        } catch (e) {
          console.log(e);
          reject(e);
        }
      }, "image/png");
    });
  });
};

const uploadMetadata = async (studentID) => {
  try {
    const cid = await uploadImage(studentID);

    const metadata = {
      name: `Student ID ${studentID}`,
      description: "Digital Student ID issued by DSID",
      image: `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY}/ipfs/${cid}`,
    };

    const jsonBlob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: "application/json",
    });

    const jsonFile = new File([jsonBlob], `student-${studentID}.json`, {
      type: "application/json",
    });

    const urlRequest = await fetch("/api/url");
    const urlResponse = await urlRequest.json();

    const upload = await pinata.upload.public.file(jsonFile).url(urlResponse.url);

    console.log("Metadata CID:", upload?.cid);
    return upload?.cid;
  } catch (e) {
    console.error("Error uploading metadata:", e);
    throw e;
  }
};


export const getURI = async (studentID) => {
  const uri = await uploadMetadata(studentID);

  return uri;
}