import { Rnd } from "react-rnd";
import { MoveIcon } from "../../assets/Icons/MoveIcon";
import { DeleteIcon } from "../../assets/Icons/DeleteIcon";
import { ColorButton } from "./ColorButton";
import { useEffect, useRef, useState } from "react";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants/canvasSize";

interface TextEditorProps {
  id: number;
  isEditing: boolean;
  removeElement: (id: number) => void;
  onClickOutside: (id: number) => void;
  textContent: string;
  setTextContent: (id: number, text: string) => void;
  setEditing: (id: number) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  id,
  isEditing,
  removeElement,
  onClickOutside,
  textContent,
  setTextContent,
  setEditing,
}) => {
  const [buttonColor, setButtonColor] = useState("black");
  const editorRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const ignoreClickRef = useRef(false);

  const handleColorChange = (newColor: string) => {
    setButtonColor(newColor);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ignoreClickRef.current) {
        ignoreClickRef.current = false;
        return;
      }

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

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <Rnd
      bounds="parent"
      default={{
        x: (CANVAS_WIDTH - 350) / 2,
        y: (CANVAS_HEIGHT - 130) / 2,
        width: 350,
        height: 130,
      }}
      minWidth={100}
      minHeight={50}
      dragHandleClassName="move-icon"
      enableResizing={isEditing ? { bottomRight: true } : false}
      resizeHandleStyles={
        isEditing
          ? {
              bottomRight: {
                width: 24,
                height: 24,
                backgroundColor: "#7209B7",
                borderRadius: "50%",
                border: "4px solid #FFFFFF",
              },
            }
          : {}
      }
    >
      <div
        ref={editorRef}
        className={`relative h-full w-full ${
          isEditing ? "border-primary border-2 bg-transparent px-7 py-3" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setEditing(id);
        }}
      >
        {isEditing && (
          <>
            <div className="p- move-icon absolute -left-4 -top-4 cursor-move rounded-full bg-white">
              <MoveIcon className="text-primary h-10 w-10" />
            </div>
            <div className="absolute -right-[14px] -top-3 cursor-pointer rounded-full bg-white p-1">
              <DeleteIcon
                className="text-red h-[18px] w-[18px]"
                onClick={(e) => {
                  e.stopPropagation();
                  removeElement(id);
                }}
              />
            </div>
          </>
        )}
        <textarea
          ref={textAreaRef}
          className={`h-full w-full resize-none bg-transparent text-center text-[32px] font-bold outline-none ${
            isEditing ? "" : "pointer-events-none"
          }`}
          placeholder="Type your text here"
          style={{ color: buttonColor }}
          value={textContent}
          onChange={(e) => setTextContent(id, e.target.value)}
        />
      </div>
      {isEditing && (
        <div
          className="absolute -bottom-8 left-0 flex space-x-3 p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <ColorButton
            color="black"
            isSelected={buttonColor === "black"}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleColorChange("black");
            }}
          />
          <ColorButton
            color="white"
            isSelected={buttonColor === "white"}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleColorChange("white");
            }}
          />
          <ColorButton
            color="red"
            isSelected={buttonColor === "red"}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleColorChange("red");
            }}
          />
          <ColorButton
            color="blue"
            isSelected={buttonColor === "blue"}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleColorChange("blue");
            }}
          />
          <ColorButton
            color="green"
            isSelected={buttonColor === "green"}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleColorChange("green");
            }}
          />
        </div>
      )}
    </Rnd>
  );
};
