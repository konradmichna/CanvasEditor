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
        className={`relative h-full w-full ${
          isEditing ? "border-primary border-2" : ""
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
        <div className="flex h-full w-full items-center justify-center">
          <img
            src={imageUrl}
            alt="Image"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </Rnd>
  );
};
