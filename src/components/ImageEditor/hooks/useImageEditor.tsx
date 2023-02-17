import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { DraftFunction, useImmer } from "use-immer";
import finetuneOptions from "../config/finetuneOptions";
import sidebarConfig from "../config/sidebarConfig";
import {
  EditorHistory,
  ImageEditorContextType,
  InitialStates,
  UpdateEditorOptions,
} from "../types";
import {
  addTransition,
  getHeightAndWidthFromDataUrl,
  getMaxWidthHeight,
} from "../utils";
import { getCroppedImageUrl } from "../utils/getCroppedImageUrl";

const ImageEditorContext = createContext<ImageEditorContextType>(null!);

export const ImageEditorProvider = ({ children }: { children: ReactNode }) => {
  const initialStates: InitialStates = {
    previewImage: {
      src: "",
      width: 0,
      height: 0,
    },
    activeOption: sidebarConfig.options[0],
    flipX: false,
    cropOption: {
      aspect: undefined,
      crop: {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        unit: "px",
      },
    },
    finetuneOption: {
      activeOption: finetuneOptions[0],
      filters: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        grayscale: 0,
        "hue-rotate": 0,
        invert: 0,
        opacity: 100,
        saturate: 100,
        sepia: 0,
      },
    },
    hasStateTransition: false,
  };

  const [editor, _updateEditor] = useImmer({
    ...initialStates,
  });

  const [editorHistory, updateEditorHistory] = useImmer<EditorHistory>({
    head: -1,
    history: [],
  });

  const [previewImageRef, setPreviewImageRef] =
    useState<HTMLImageElement | null>(null);

  console.log(editorHistory);

  const canUndo = editorHistory.head > 0;
  const canRedo =
    editorHistory.history.length > 0 &&
    editorHistory.head < editorHistory.history.length - 1;
  const hasEditorHistory = canUndo;

  const undo = () => {
    updateEditorHistory((draft) => {
      const newHead = editorHistory.head - 1;
      const currentHistory = editorHistory.history[editorHistory.head];
      const prevHistory = editorHistory.history[newHead];
      draft.head = newHead;

      if (currentHistory.hasStateTransition) {
        addTransition();
      }
      _updateEditor(prevHistory);
    });
  };
  const redo = () => {
    updateEditorHistory((draft) => {
      const newHead = editorHistory.head + 1;
      const nextHistory = editorHistory.history[newHead];
      draft.head = newHead;

      if (nextHistory.hasStateTransition) {
        addTransition();
      }

      _updateEditor(nextHistory);
    });
  };

  const resetEditorHistory = () => {
    updateEditorHistory((draft) => {
      const tempFirstState = JSON.parse(JSON.stringify(draft.history[0]));
      draft.head = 0;
      draft.history = [tempFirstState];

      addTransition();

      _updateEditor(tempFirstState);
    });
  };

  const cropImage = () => {
    if (previewImageRef) {
      // addTransition();
      getCroppedImageUrl(previewImageRef, editor.cropOption.crop).then(
        (croppedUrl) => {
          getHeightAndWidthFromDataUrl(croppedUrl).then((d) => {
            const { width, height } = getMaxWidthHeight({
              width: d.width,
              height: d.height,
            });

            updateEditor((draft) => {
              draft.previewImage = {
                src: croppedUrl,
                width,
                height,
              };
              draft.cropOption.crop = {
                ...draft.cropOption.crop,
                x: 0,
                y: 0,
                width: width,
                height: height,
              };
            }, true);
          });
        },
      );
    }
  };

  const timeoutRef = useRef<any>(null);
  const updateEditor = useCallback(
    (
      draft: InitialStates | DraftFunction<InitialStates>,
      addToEditorHistory?: boolean,
      options?: UpdateEditorOptions,
    ) => {
      if (options?.transition) {
        addTransition();
      }

      if (typeof draft === "function") {
        return _updateEditor((d) => {
          draft(d);
          // if (editorHistory.head === -1) {
          //   const parsedDraft = JSON.parse(JSON.stringify(d));
          //   updateEditorHistory((hDraft) => {
          //     hDraft.head++;
          //     hDraft.history.push(parsedDraft);
          //   });
          //   return;
          // }

          console.log({ ss: options?.transition });
          if (options?.transition) {
            d.hasStateTransition = true;
          } else {
            d.hasStateTransition = false;
          }

          if (addToEditorHistory) {
            const parsedDraft = JSON.parse(JSON.stringify(d));

            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
              updateEditorHistory((hDraft) => {
                hDraft.head++;
                hDraft.history.push(parsedDraft);
              });

              timeoutRef.current = null;
            }, options?.timeout || 0);
          }
        });
      }
      return _updateEditor(draft);
    },
    [_updateEditor, updateEditorHistory],
  );

  return (
    <ImageEditorContext.Provider
      value={{
        ...editor,
        updateEditor,
        initialStates,
        canUndo,
        canRedo,
        hasEditorHistory,
        undo,
        redo,
        resetEditorHistory,
        previewImageRef,
        setPreviewImageRef,
        cropImage,
        editorHistory,
      }}
    >
      {children}
    </ImageEditorContext.Provider>
  );
};

const useImageEditor = () => useContext(ImageEditorContext);
export default useImageEditor;
