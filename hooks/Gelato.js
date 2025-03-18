import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import { useAccount, useWalletClient } from "wagmi";
import { encodeFunctionData, parseEther } from "viem";

const GELATO_API_KEY = process.env.NEXT_PUBLIC_GELATO_API_KEY;
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export const useGaslessTransaction = () => {
    const { address } = useAccount();
    const { data: walletClient } = useWalletClient();

    const sendTransaction = async (userData) => {
        if (!walletClient || !address) return console.error("Wallet not connected");

        const relay = new GelatoRelay();

        const calldata = encodeFunctionData({
            abi: [
                {
                    inputs: [{ internalType: "uint256", name: "_data", type: "uint256" }],
                    name: "updateUserData",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
            ],
            functionName: "updateUserData",
            args: [userData],
        });

        const request = {
            chainId: 80001, // Polygon Mumbai
            target: CONTRACT_ADDRESS,
            data: calldata,
            user: address,
        };

        try {
            const response = await relay.sponsoredCall(request, GELATO_API_KEY);
            console.log("Gelato Task ID:", response.taskId);
        } catch (error) {
            console.error("Error sending transaction:", error);
        }
    };

    return { sendTransaction };
};
