import { ResetIcon } from "../../assets/Icons/ResetIcon";

interface ResetButtonProps {
  onReset: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  return (
    <button
      className="text-red border-red foucus:outline-none flex items-center gap-2 border-b-2"
      onClick={onReset}
    >
      <span className="font-medium">Reset</span>
      <ResetIcon className="text-red h-6 w-6" />
    </button>
  );
};
