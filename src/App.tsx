import { useState } from "react";
import { Canvas } from "./Components/Canvas/Canvas";
import { Header } from "./Components/Header/Header";
import { Sidebar } from "./Components/Sidebar/Sidebar";
import { Alert } from "./Components/Alert/Alert";
import startImage from "./assets/Images/startImage.png";
import html2canvas from "html2canvas";

interface Element {
  id: number;
  type: "text" | "image";
  isEditing: boolean;
  textContent: string;
  imageUrl: string;
}

function App() {
  const [elements, setElements] = useState<Element[]>([]);
  const [background, setBackground] = useState<string | null>(startImage);
  const [isTextAdded, setIsTextAdded] = useState(false);
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [userBackground, setUserBackground] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const addElement = (type: "text" | "image", imageUrl?: string) => {
    if ((type === "text" && isTextAdded) || (type === "image" && isImageAdded))
      return;

    const id = new Date().getTime();
    setElements((prevElements) => [
      ...prevElements,
      { id, type, isEditing: true, textContent: "", imageUrl: imageUrl || "" },
    ]);
    if (type === "text") setIsTextAdded(true);
    if (type === "image") setIsImageAdded(true);
  };

  const removeElement = (id: number) => {
    const element = elements.find((element) => element.id === id);
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== id),
    );

    if (element?.type === "text") setIsTextAdded(false);
    if (element?.type === "image") setIsImageAdded(false);
  };

  const updateElements = (id: number, update: Partial<Element>) => {
    setElements((prevElements) =>
      prevElements.map((element) =>
        element.id === id ? { ...element, ...update } : element,
      ),
    );
  };

  const onElementClick = (id: number | null) => {
    setElements((prevElements) =>
      prevElements.map((element) => ({
        ...element,
        isEditing: element.id === id ? true : false,
      })),
    );
  };

  const changeBackground = (bg: string) => {
    setBackground(bg);
    setUserBackground(true);
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    addElement("image", imageUrl);
  };

  const handleExport = async () => {
    if (!elements.length && !userBackground) return;

    const canvasElement = document.getElementById("canvas");
    if (canvasElement) {
      const canvas = await html2canvas(canvasElement as HTMLElement);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "canvas.png";
      link.click();
    }
  };

  const handleReset = () => {
    setElements([]);
    setBackground(startImage);
    setIsTextAdded(false);
    setIsImageAdded(false);
    setUserBackground(false);
    setShowAlert(false);
  };

  return (
    <div className="flex justify-center gap-6 p-8">
      <Canvas
        elements={elements}
        removeElement={removeElement}
        background={background}
        userBackground={userBackground}
        onElementClick={onElementClick}
        setTextContent={(id, text) => updateElements(id, { textContent: text })}
        setEditing={(id) => updateElements(id, { isEditing: true })}
        onClickOutside={(id) => updateElements(id, { isEditing: false })}
      />
      <div className="flex flex-col">
        <Header onReset={() => setShowAlert(true)} />
        <Sidebar
          onAddText={() => addElement("text")}
          onAddImage={handleImageUpload}
          onChangeBackground={changeBackground}
          isTextAdded={isTextAdded}
          isImageAdded={isImageAdded}
          onExport={handleExport}
        />
      </div>
      {showAlert && (
        <Alert onConfirm={handleReset} onCancel={() => setShowAlert(false)} />
      )}
    </div>
  );
}

export default App;
