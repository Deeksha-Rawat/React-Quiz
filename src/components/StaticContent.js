import { accordion_custom } from "../utils/utils";
const StaticContent = () => {
  return (
    <div className="static-cont">
      <div className="howtoplaysection">
        <div className="heading">
          <p>How to Play</p>
        </div>
        <div className="content">
          <div className="howitworks">
            <div>
              <div>
                <p>
                  <span>1</span>
                </p>
              </div>
              <div className="center-margin">
                <p>
                  Play the quiz during Indian T20 match hours starting at 7:30
                  PM.
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  <span>2</span>
                </p>
              </div>
              <div className="center-margin">
                <p>Answer 3 questions correctly within time.</p>
              </div>
            </div>
            <div>
              <div>
                <p>
                  <span>3</span>
                </p>
              </div>
              <div className="center-margin">
                <p>Win exciting rewards.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion_outer">
        <div
          className="accordion_hdr active"
          onClick={(e) => {
            accordion_custom(e.currentTarget);
          }}
        >
          Terms & Conditions
        </div>
        <div className="accordion_content">
          <ul>
            <li>
              The quiz will be live during the 7:30 PM Indian T20 League match
              from 2nd April 2024 to 8th April 2024.
            </li>
            <li>
              You have to answer all 3 questions correctly to be eligible for
              the reward.
            </li>
            <li>
              The reward will be added to your account within 4-5 hours of your
              claiming it.
            </li>
            <li>All standard Howzat terms and conditions apply.</li>
            <li>
              The decision of Howzat management shall be final and binding in
              case of any dispute.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StaticContent;
