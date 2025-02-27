import * as React from "react";
import { Connector, useConnect } from "wagmi";
import { ConnectWalletButton } from "./styles";
import { Box, Grid2 } from "@mui/material";
import { StyledChevronDownIcon } from "./styles";

export function WalletButton() {
  const { connectors, connect } = useConnect();
  const [dropDown, setDropDown] = React.useState(false);

  const firstOption = connectors[0];
  const restOptions = connectors.slice(1);

  return Object.keys(connectors).length > 1 ? (
    <Grid2
      display={"flex"}
      flexDirection={"column"}
      backgroundColor={"rgb(121, 121, 121)"}
      sx={{
        borderRadius: dropDown ? "12px 12px 0 0" : "12px",
        transition: dropDown
          ? "border-radius 0.1s ease-in-out"
          : "border-radius 0.8s ease-in-out",
      }}
    >
      <Grid2
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"row"}
      >
        <WalletOption
          key={firstOption.uid}
          connector={firstOption}
          onClick={() => connect({ connector: firstOption })}
        />
        <StyledChevronDownIcon
          sx={{
            transform: dropDown ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
          onClick={() => {
            setDropDown((prev) => !prev);
          }}
        />
      </Grid2>
      <Grid2 position={"relative"} width={"100%"}>
        <Grid2
          sx={{
            maxHeight: dropDown ? "300px" : "0px", // Expandable height
            overflow: "hidden",
            transition: "max-height 0.3s ease-in-out", // Smooth expand/collapse
            position: "absolute",
            backgroundColor: "rgb(121, 121, 121)",
            borderRadius: "0 0 12px 12px",
            width: "100%",
          }}
        >
          {restOptions.map((connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => connect({ connector })}
            />
          ))}
        </Grid2>
      </Grid2>
    </Grid2>
  ) : (
    <Grid2
      backgroundColor={"rgb(121, 121, 121)"}
      sx={{
        borderRadius: "12px",
      }}
    >
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </Grid2>
  );
}

function WalletOption({ connector, onClick }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <ConnectWalletButton disabled={!ready} onClick={onClick}>
      {connector?.icon && (
        <Box
          component={"img"}
          sx={{ width: "24px", height: "24px" }}
          src={connector?.icon}
        />
      )}{" "}
      {connector.name}
    </ConnectWalletButton>
  );
}
