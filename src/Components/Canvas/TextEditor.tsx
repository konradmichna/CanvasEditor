import { Rnd } from "react-rnd";
import { MoveIcon } from "../../assets/Icons/MoveIcon";
import { DeleteIcon } from "../../assets/Icons/DeleteIcon";
import { ColorButton } from "./ColorButton";
import { useEffect, useRef, useState } from "react";

interface TextEditorProps {
  id: number;
  isEditing: boolean;
  removeElement: (id: number) => void;
  onClickOutside: (id: number) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  id,
  isEditing,
  removeElement,
  onClickOutside,
}) => {
  const [buttonColor, setButtonColor] = useState("black");
  // const [text, setText] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  const handleColorChange = (newColor: string) => {
    setButtonColor(newColor);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editorRef.current &&
        !editorRef.current.contains(event.target as Node)
      ) {
        onClickOutside(id);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id, onClickOutside]);

  return (
    <Rnd
      bounds="parent"
      default={{ x: 50, y: 50, width: 350, height: 130 }}
      minWidth={100}
      minHeight={50}
      dragHandleClassName="move-icon"
      enableResizing={{
        bottomRight: true,
      }}
      resizeHandleStyles={{
        bottomRight: {
          width: 24,
          height: 24,
          backgroundColor: "#7209B7",
          borderRadius: "50%",
          border: "4px solid #FFFFFF",
        },
      }}
    >
      <div
        ref={editorRef}
        className="w-full h-full relative bg-black25 border-primary border-2 py-3 px-7"
        onClick={(e) => e.stopPropagation()}
      >
        {isEditing && (
          <>
            <div className="absolute -top-4 -left-4  p- move-icon cursor-move bg-white rounded-full">
              <MoveIcon className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -top-3 -right-[14px] p-1 cursor-pointer bg-white rounded-full">
              <DeleteIcon
                className="w-[18px] h-[18px] text-red"
                onClick={() => removeElement(id)}
              />
            </div>
          </>
        )}
        <textarea
          className="w-full h-full text-[32px] font-bold resize-none bg-transparent outline-none text-center"
          placeholder="Type your text here"
          style={{ color: buttonColor }}
        />
      </div>
      {isEditing && (
        <div className="absolute -bottom-8 left-0 flex space-x-3 p-1">
          <ColorButton
            color="black"
            isSelected={buttonColor === "black"}
            onClick={() => handleColorChange("black")}
          />
          <ColorButton
            color="white"
            isSelected={buttonColor === "white"}
            onClick={() => handleColorChange("white")}
          />
          <ColorButton
            color="red"
            isSelected={buttonColor === "red"}
            onClick={() => handleColorChange("red")}
          />
          <ColorButton
            color="blue"
            isSelected={buttonColor === "blue"}
            onClick={() => handleColorChange("blue")}
          />
          <ColorButton
            color="green"
            isSelected={buttonColor === "green"}
            onClick={() => handleColorChange("green")}
          />
        </div>
      )}
    </Rnd>
  );
};

// TODO: delete, change color, save text, resize text
