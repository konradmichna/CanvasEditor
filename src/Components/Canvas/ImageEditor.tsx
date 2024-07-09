import React, { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { DeleteIcon } from "../../assets/Icons/DeleteIcon";
import { MoveIcon } from "../../assets/Icons/MoveIcon";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants/canvasSize";

interface ImageEditorProps {
  id: number;
  isEditing: boolean;
  removeElement: (id: number) => void;
  imageUrl: string;
  setEditing: (id: number) => void;
  onClickOutside: (id: number) => void;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
  id,
  isEditing,
  removeElement,
  imageUrl,
  setEditing,
  onClickOutside,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

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
      default={{
        x: (CANVAS_WIDTH - 200) / 2,
        y: (CANVAS_HEIGHT - 200) / 2,
        width: 200,
        height: 200,
      }}
      minWidth={100}
      minHeight={100}
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
        className="relative border-2 border-primary w-full h-full"
        onClick={(e) => {
          e.stopPropagation();
          setEditing(id);
        }}
      >
        {isEditing && (
          <>
            <div className="absolute -top-4 -left-4 p- move-icon cursor-move bg-white rounded-full">
              <MoveIcon className="w-10 h-10 text-primary" />
            </div>
            <div className="absolute -top-3 -right-[14px] p-1 cursor-pointer bg-white rounded-full">
              <DeleteIcon
                className="w-[18px] h-[18px] text-red"
                onClick={(e) => {
                  e.stopPropagation();
                  removeElement(id);
                }}
              />
            </div>
          </>
        )}
        <div className="w-full h-full flex justify-center items-center">
          <img
            src={imageUrl}
            alt="Image"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </Rnd>
  );
};
