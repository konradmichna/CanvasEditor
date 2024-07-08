import { ResetIcon } from "../../assets/Icons/ResetIcon";

export const ResetButton: React.FC = () => {
  // logika resetowania

  return (
    <button className="flex items-center text-red  border-b-2 border-red foucus:outline-none gap-2">
      <span className="font-medium">Reset</span>
      <ResetIcon className="w-6 h-6 text-red" />
    </button>
  );
};
