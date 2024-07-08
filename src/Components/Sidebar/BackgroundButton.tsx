import { BackgroundIcon } from "../../assets/Icons/BackgroundIcon";

export const BackgroundButton: React.FC = () => {
  // logika dodawania tła

  return (
    <button className="btn-action">
      <BackgroundIcon className="w-32 h-32 text-black75 mt-8" />
      <span className="text-black100 font-medium">Background</span>
    </button>
  );
};
