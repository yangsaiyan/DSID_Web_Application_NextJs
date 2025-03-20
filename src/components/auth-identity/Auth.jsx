"use client";

import { Grid2 } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { recoverMessageAddress } from "viem";


export default function Auth() {

      const params = useSearchParams();
      const message = decodeURIComponent(params.get("message"));
      const signer = decodeURIComponent(params.get("signer"));
      const address = decodeURIComponent(params.get("address"));
      const challenge = decodeURIComponent(params.get("challenge"));

      const handleVerify= async () => {
        const verifiedAddress = await recoverMessageAddress({
            message: challenge,
            signature: signer,
        })
        console.log("Verified address", verifiedAddress);
      }

      useEffect(()=>{
        console.log(message)
        console.log(signer)
        console.log(address)
        console.log(challenge)
        handleVerify();
      },[params])

    return <Grid2>

    </Grid2>
}