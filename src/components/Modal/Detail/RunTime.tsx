import { AccessTime } from "@mui/icons-material";
import { convertRunningTime } from "../../../utils/convertRunningTime";

interface IRuntimeProps {
  runtime: number;
}

const RunTime = ({ runtime }: IRuntimeProps) => {
  return (
    <>
      {!!runtime && (
        <div>
          <AccessTime />
          <span>{`${convertRunningTime(runtime)}`}</span>
        </div>
      )}
    </>
  );
};

export default RunTime;
