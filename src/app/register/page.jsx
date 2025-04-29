"use client";
import Loading from "@/components/loading/loading";
import { Grid2 } from "@mui/material";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

const FormComponent = dynamic(() => import("../../components/form/form"), {
  ssr: false,
  loading: () => <Loading />,
});

const StudenIDComponent = dynamic(
  () => import("../../components/studentId/studentId"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function page() {
  const account = useAccount();
  const studentData = useSelector((state) => state.student);

  return (
    <Grid2
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Grid2
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormComponent
          account={account}
        />
        <StudenIDComponent
          address={account?.address}
          studentId={studentData?.studentId}
          faculty={studentData?.faculty}
          course={studentData?.course}
        />
      </Grid2>
    </Grid2>
  );
}
