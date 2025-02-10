"use client";
import { StyledLottie } from "./styles";

export default function Lottie(props) {
  
  const { animationData } = props;

  return <StyledLottie animationData={animationData} />;
}
