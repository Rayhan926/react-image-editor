import { useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { cx } from "../../../../utils";
import { editorConfig } from "../../config/constants";
import useImageEditor from "../../hooks/useImageEditor";

const EditorPreview = () => {
  const { activeOption, flipX, cropOption, updateEditor, finetuneOption } =
    useImageEditor();

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
          "mx-auto max-w-[650px] duration-300",
          activeOption.optionKey !== "crop" && "__hide_crop",
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
            updateEditor((draft) => {
              draft.cropOption.crop = c;
            }, true);
          }}
          keepSelection
        >
          <img
            src="/img/editor-img.jpg"
            id="previewImage"
            onLoad={(e: any) => {
              updateEditor((draft) => {
                draft.cropOption.crop.width = e.target.clientWidth;
                draft.cropOption.crop.height = e.target.clientHeight;
              });
            }}
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
            }}
            className={cx(
              "w-full duration-300 transition-transform",
              flipX && "scale-x-[-1]",
            )}
          />
        </ReactCrop>
      </div>
    </div>
  );
};

export default EditorPreview;
