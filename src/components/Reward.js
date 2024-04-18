import UIAfterAllCorrect from "./UIAfterAllCorrect";
import UIForLessThanThree from "./UIForLessThanThree";
import { userId } from "../utils/utils";

const Reward = () => {
  const correctCount = localStorage.getItem(`correct_count_${userId}`);
  return (
    <div className="aftercomplete">
      {correctCount == 3 ? <UIAfterAllCorrect /> : <UIForLessThanThree />}
    </div>
  );
};

export default Reward;
