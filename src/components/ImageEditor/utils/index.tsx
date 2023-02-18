import { centerCrop, makeAspectCrop } from "react-image-crop";
import { GetMaxWidthHeight } from "../types";

export const getHeightAndWidthFromDataUrl = async (file: File | string) =>
  new Promise<{
    width: number;
    height: number;
  }>((resolve) => {
    const dataURL = typeof file === "string" ? file : URL.createObjectURL(file);
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      resolve({
        height: img.height,
        width: img.width,
      });
    };
  });
export const getAspectRatio = (width: number, height: number) => {
  const ratio = width / height;
  return Number(ratio);
};

export const getMaxWidthHeight = (d: GetMaxWidthHeight) => {
  const ratio = d.ratio || getAspectRatio(d.width, d.height);
  let width = Math.min(d.width, 650);
  let height = width / ratio;

  if (height > 430) {
    height = 430;
    width = height * ratio;
  }
  return { width, height };
};

export const centerAspectCrop = (
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
  newWidth: number,
  newHeight: number,
) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "px",
        width: newWidth,
        height: newHeight,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
};

export const addTransition = () => {
  const style = document.createElement("style");
  style.textContent = `* {
transition: all 0.3s ease-in-out !important;
}`;
  document.documentElement.appendChild(style);

  setTimeout(() => {
    style.remove();
  }, 400);
};

export const convertToObjects = (obj: any): any => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(convertToObjects);
  }
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = convertToObjects(value);
  }
  return result;
};
