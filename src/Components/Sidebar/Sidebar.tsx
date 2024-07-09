import { AddContent } from "./AddContent";
import { ExportButton } from "./ExportButton";
import { TextIcon } from "../../assets/Icons/TextIcon";
import { ImageIcon } from "../../assets/Icons/ImageIcon";
import { BackgroundIcon } from "../../assets/Icons/BackgroundIcon";
import { ActionButton } from "./ActionButton";

interface SidebarProps {
  onAddText: () => void;
  onAddImage: (file: File) => void;
  onChangeBackground: (bg: string) => void;
  isTextAdded: boolean;
  isImageAdded: boolean;
  onExport: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onAddText,
  onAddImage,
  onChangeBackground,
  isTextAdded,
  isImageAdded,
  onExport,
}) => {
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      onChangeBackground(file);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onAddImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <AddContent />
      <div className="grid grid-cols-2 gap-4 my-6 border-b-2 border-white98 pb-16">
        <ActionButton
          icon={TextIcon}
          text="Text"
          onClick={onAddText}
          disabled={isTextAdded}
        />
        <label className="relative">
          <ActionButton
            icon={ImageIcon}
            text="Image"
            onClick={() => {}}
            disabled={isImageAdded}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
        <label className="relative">
          <ActionButton
            icon={BackgroundIcon}
            text="Background"
            onClick={() => {}}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </label>
      </div>
      <div className="flex flex-grow justify-end">
        <ExportButton onExport={onExport} /> {/* Aktualizujemy tutaj */}
      </div>
    </div>
  );
};
