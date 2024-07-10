import { TextIcon } from "../../assets/Icons/TextIcon";

export const TextButton: React.FC = () => {
  // logika dodawania tekstu

  return (
    <button className="btn-action">
      <TextIcon className="text-black75 mt-8 h-32 w-32" />
      <span className="text-black100 font-medium">Text</span>
    </button>
  );
};
