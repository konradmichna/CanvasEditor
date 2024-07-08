import { ImageIcon } from "../../assets/Icons/ImageIcon";

export const ImageButton: React.FC = () => {
  // logika dodawania obrazu

  return (
    <button className="btn-action">
      <ImageIcon className="w-32 h-32 text-black75 mt-8" />
      <span className="text-black100 font-medium">Image</span>
    </button>
  );
};
