import React from "react";
import { Rnd } from "react-rnd";
import { DeleteIcon } from "../../assets/Icons/DeleteIcon";
import { MoveIcon } from "../../assets/Icons/MoveIcon";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../constants/canvasSize";

interface ImageEditorProps {
  id: number;
  removeElement: (id: number) => void;
  imageUrl: string;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({
  id,
  removeElement,
  imageUrl,
}) => {
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
      enableResizing={{ bottomRight: true }}
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
      <div className="relative border-2 border-primary w-full h-full">
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
