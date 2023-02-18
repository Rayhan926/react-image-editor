import { useMemo, useState } from "react";
import { MdFilterCenterFocus } from "react-icons/md";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { cx } from "../../../../utils";
import { editorConfig } from "../../config/constants";
import useImageEditor from "../../hooks/useImageEditor";
import CircularProgress from "../CircularProgress";

const EditorPreview = () => {
  const [hideCameraFocus, setDideCameraFocus] = useState(false);
  const {
    activeOption,
    flipX,
    cropOption,
    updateEditor,
    finetuneOption,
    previewImage,
    setPreviewImageRef,
    cropImage,
    minScale,
    rotation,
    loading,
  } = useImageEditor();

  const isCropOption = activeOption.optionKey === "crop";

  const isCropping = loading.status && loading.reason === "cropping";

  const shouldRemoveCameraFocus = useMemo(() => {
    if (!isCropOption) return false;
    return (
      cropOption.crop.width !== previewImage.width ||
      cropOption.crop.height !== previewImage.height ||
      minScale > 1 ||
      !!rotation
    );
  }, [
    cropOption.crop.height,
    cropOption.crop.width,
    isCropOption,
    minScale,
    previewImage.height,
    previewImage.width,
    rotation,
  ]);

  const {
    blur,
    brightness,
    contrast,
    grayscale,
    "hue-rotate": hueRotate,
    invert,
    opacity,
    saturate,
    sepia,
  } = finetuneOption.filters;

  return (
    <div
      style={{
        paddingTop: editorConfig.topBar.height + 10,
        paddingBottom: editorConfig.bottomBar.height + 10,
        // height: `calc(100% - ${
        //   editorConfig.topBar.height + editorConfig.bottomBar.height
        // }px)`,
      }}
      className="h-full"
    >
      <div
        className={cx(
          "mx-auto max-w-[650px] w-fit relative duration-300",
          !isCropOption && "__hide_crop",
          !activeOption.topBarComponent && !activeOption.bottomBarComponent
            ? "scale-[1.35] translate-y-[26px]"
            : !activeOption.topBarComponent &&
                "origin-center scale-[1.1] -translate-y-5",
        )}
      >
        <ReactCrop
          crop={cropOption.crop}
          onChange={(c) =>
            updateEditor((draft) => {
              draft.cropOption.crop = c;
            })
          }
          onComplete={(c) => {
            updateEditor(
              (draft) => {
                draft.cropOption.crop = c;
              },
              true,
              {
                transition: true,
              },
            );
          }}
          keepSelection
          onDragStart={() => setDideCameraFocus(true)}
          onDragEnd={() => setDideCameraFocus(false)}
          aspect={cropOption.aspect}
        >
          <div id="previewImage" className={cx(flipX && "scale-x-[-1]")}>
            <img
              src={previewImage.src}
              ref={setPreviewImageRef}
              alt=""
              style={{
                filter: `
              blur(${blur / 10}px) 
              brightness(${brightness / 100}) 
              contrast(${contrast}%)
              grayscale(${grayscale}%)
              hue-rotate(${hueRotate * 3.6}deg)
              invert(${invert / 100})
              opacity(${opacity / 100})
              saturate(${saturate / 100}) 
              sepia(${sepia / 100}) 
            `,
                transform: `scale(${minScale}) rotate(${rotation}deg)`,
                width: previewImage.width,
                height: previewImage.height,
              }}
              className={cx(
                "max-w-full",
                // duration-300 transition-transform
              )}
            />
          </div>
        </ReactCrop>

        <button
          onClick={cropImage}
          style={{
            top: cropOption.crop.y + cropOption.crop.height / 2,
            left: cropOption.crop.x + cropOption.crop.width / 2,
          }}
          disabled={isCropping}
          className={cx(
            "text-slate-800 absolute w-12 aspect-square -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full flex justify-center items-center bg-white/80 duration-200 transition-opacity",
            hideCameraFocus && "opacity-0",
            !shouldRemoveCameraFocus && "pointer-events-none opacity-0",
          )}
        >
          <MdFilterCenterFocus size={28} />
          {isCropping && (
            <div className="absolute inset-0 __center bg-white text-blue-500">
              <CircularProgress size={20} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditorPreview;
