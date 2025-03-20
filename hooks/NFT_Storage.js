import { NFTStorage, File } from "nft.storage";

const client = new NFTStorage({ token: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY });

export const uploadNFT = async (file, name, description) => {
  try {
    const metadata = await client.store({
      name,
      description,
      image: new File([file], file.name, { type: file.type }),
    });

    return metadata.url;
  } catch (error) {
    console.error("Error uploading to NFT.Storage:", error);
    return null;
  }
};
