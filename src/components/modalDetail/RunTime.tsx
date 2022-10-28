import { AccessTime } from "@mui/icons-material";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { convertRunningTime } from "../../utils/convertRunningTime";

interface IRuntimeProps {
  runtime: number;
}

const RunTime = ({ runtime }: IRuntimeProps) => {
  const { language } = useContext(LanguageContext);

  return (
    !!runtime && (
      <div>
        <AccessTime />
        <span>{`${convertRunningTime(runtime, language)}`}</span>
      </div>
    )
  );
};

export default RunTime;
