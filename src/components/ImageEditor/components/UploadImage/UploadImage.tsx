import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cx } from "../../../../utils";
import useImageEditor from "../../hooks/useImageEditor";
import {
  getAspectRatio,
  getHeightAndWidthFromDataUrl,
  getMaxWidthHeight,
} from "../../utils";

const UploadImage = () => {
  const { updateEditor } = useImageEditor();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      getHeightAndWidthFromDataUrl(file).then((d) => {
        const { width, height } = getMaxWidthHeight({
          width: d.width,
          height: d.height,
        });

        const dataURL = URL.createObjectURL(file);
        updateEditor((draft) => {
          draft.previewImage = {
            src: dataURL,
            width,
            height,
          };
          draft.cropOption.crop.width = width;
          draft.cropOption.crop.height = height;
        }, true);
      });
    },
    [updateEditor],
  );
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
  });

  return (
    <div className="absolute inset-0 z-50 bg-slate-800 p-8">
      <div
        {...getRootProps()}
        className={cx(
          "w-full h-full rounded border border-dashed text-center duration-200 flex justify-center items-center flex-col text-white",
          isDragActive ? "border-white/20 bg-white/5" : "border-white/10",
        )}
      >
        <input {...getInputProps()} className="sr-only" />
        <h3 className="text-[20px] leading-[30px] font-semibold">
          Drag your image here or{" "}
          <span
            onClick={open}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            browse
          </span>
        </h3>
        <p className="text-sm mt-2 opacity-70">
          Jpg, Jpeg, Png files are supported
        </p>
      </div>
    </div>
  );
};

export default UploadImage;
