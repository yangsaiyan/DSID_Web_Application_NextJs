import { Grid2 } from "@mui/material";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { isEmpty } from "lodash";
import { LogoutIcon } from "./styles";
import { StyledText } from "./styles";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const ensName = useEnsName({ address });
  const ensAvatar = useEnsAvatar({ name: ensName });

  const shortenAddress = (addr) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

  return (
    <Grid2
      display={"flex"}
      alignItems={"center"}
      gap={"8px"}
      bgcolor={"#d9d9d9"}
      padding={"8px"}
      borderRadius={"12px"}
    >
      {!isEmpty(ensAvatar?.data) && <img alt="Avatar" src={ensAvatar} />}
      {address && (
        <Grid2 color={"black"}>
          <StyledText>
            {ensName ? `${shortenAddress(address)}` : shortenAddress(address)}
          </StyledText>
        </Grid2>
      )}
      <Grid2
        onClick={() => disconnect()}
        sx={{
          display: "flex",
          backgroundColor: "rgb(121, 121, 121)",
          borderRadius: "100px",
          padding: "8px",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LogoutIcon />
      </Grid2>
    </Grid2>
  );
}
