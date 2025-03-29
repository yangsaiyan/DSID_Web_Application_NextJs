"use client";
import {
  StudentIDBody,
  StudentIDContainer,
  StudentInfoContainer,
  StudentInfoText,
  StudentInfoTopContainer,
  StudentInfoWrapper,
  StudentLabel,
  StudentLabelContainer,
  StyledBox,
} from "./styles";
import html2canvas from "html2canvas";

export default function StudentIDCard(props) {
  const { address, studentId, faculty, course } = props;

  const generateImage = async () => {
    html2canvas(document.getElementById("studentID"), {
      backgroundColor: null,
      scale: 2,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "student-id.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <StudentIDContainer>
      <StudentIDBody id="studentID" onClick={generateImage}>
        <StudentLabelContainer>
          <StudentLabel>STUDENT</StudentLabel>
        </StudentLabelContainer>
        <StudentInfoContainer>
          <StudentInfoTopContainer>
            <StyledBox />
            Digital Student ID
          </StudentInfoTopContainer>
          <StudentInfoWrapper>
            <StudentInfoText fontWeight={700}>{studentId}</StudentInfoText>
            <StudentInfoText>{address}</StudentInfoText>
            <StudentInfoText>
              {faculty}-{course}
            </StudentInfoText>
          </StudentInfoWrapper>
        </StudentInfoContainer>
      </StudentIDBody>
    </StudentIDContainer>
  );
}
