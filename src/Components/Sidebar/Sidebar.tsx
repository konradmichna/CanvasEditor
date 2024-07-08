import { AddContent } from "./AddContent";
import { ExportButton } from "./ExportButton";
import { TextIcon } from "../../assets/Icons/TextIcon";
import { ImageIcon } from "../../assets/Icons/ImageIcon";
import { BackgroundIcon } from "../../assets/Icons/BackgroundIcon";
import { ActionButton } from "./ActionButton";

interface SidebarProps {
  onAddText: () => void;
  onAddImage: () => void;
  onChangeBackground: (bg: string) => void;
  isTextAdded: boolean;
  isImageAdded: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  onAddText,
  onAddImage,
  onChangeBackground,
  isTextAdded,
  isImageAdded,
}) => {
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      onChangeBackground(file);
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
        <ActionButton
          icon={ImageIcon}
          text="Image"
          onClick={onAddImage}
          disabled={isImageAdded}
        />
        <ActionButton icon={BackgroundIcon} text="Background">
          <input
            type="file"
            onChange={handleBackgroundChange}
            className="hidden"
          />
        </ActionButton>
      </div>
      <div className="flex flex-grow justify-end">
        <ExportButton />
      </div>
    </div>
  );
};
