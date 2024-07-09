import { ResetIcon } from "../../assets/Icons/ResetIcon";

interface ResetButtonProps {
  onReset: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  return (
    <button
      className="flex items-center text-red border-b-2 border-red foucus:outline-none gap-2"
      onClick={onReset}
    >
      <span className="font-medium">Reset</span>
      <ResetIcon className="w-6 h-6 text-red" />
    </button>
  );
};
