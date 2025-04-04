"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import { Providers } from "./Providers";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import("../components/loading/loading"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/images/indexBackground.jpg";
    img.onload = () => setIsLoading(false);
  }, []);

  return (
    <html
      lang="en"
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          backgroundImage: `linear-gradient(145deg, rgba(73,73,73,0.6) 0%, rgba(0,0,0,1) 100%), 
          url("/assets/images/indexBackground.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {isLoading ? <Loading /> : <Providers>{children}</Providers>}
      </body>
    </html>
  );
}
