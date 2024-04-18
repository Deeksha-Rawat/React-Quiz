import React from "react";
import { remainder, copiedImg, copyImg } from "../utils/utils";
import NotEligibleMessage from "./NotEligibleMessage";
const UIAfterAllCorrect = () => {
  let rewardContent = null;
  let copyCode = "";
  const setClipboard = (event, label) => {
    var el = event.target;
    const copyText = label;
    const textArea = document.createElement("textarea");
    textArea.value = copyText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    document.querySelector(".copytextcont p").innerHTML = "Copied!";
    el.src = copiedImg;
  };
  if (remainder < 5) {
    copyCode = "QUIZDEP100";
  } else if (remainder < 10) {
    copyCode = "QUIWINP100";
  } else if (remainder < 15) {
    rewardContent = (
      <>
        <div className="ribbon1">
          <p className="rewards">
            You won 10% off on guaranteed contest on next Indian T20 match
          </p>
        </div>
        <div>
          <button>Claim Now</button>
        </div>
      </>
    );
  }

  if (copyCode) {
    rewardContent = (
      <>
        <div className="copydiv">
          <p>Use code</p>
          <p className="copycode">
            <span>{copyCode}</span>
          </p>
        </div>
        <p className="benefits">& Get Benefits upto ₹2000</p>
        <div id="copybutton">
          <button
            onClick={() => {
              console.log("claim");
            }}
          >
            Claim Now
          </button>
          <div className="copytextcont">
            <p>Copy Code</p>
            <img
              className="copyimg"
              src={copyImg}
              onClick={(event) => setClipboard(event, copyCode)}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <p>
        <span className="questionscompleted">3</span>/3 Correct Answers!
      </p>
      {rewardContent}
    </>
  );
};

export default UIAfterAllCorrect;
