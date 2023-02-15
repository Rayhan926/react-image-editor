import { createContext, ReactNode, useContext, useRef } from "react";
import { DraftFunction, useImmer } from "use-immer";
import finetuneOptions from "../config/finetuneOptions";
import sidebarConfig from "../config/sidebarConfig";
import {
  EditorHistory,
  ImageEditorContextType,
  InitialStates,
  UpdateEditorOptions,
} from "../types";

const ImageEditorContext = createContext<ImageEditorContextType>(null!);

export const ImageEditorProvider = ({ children }: { children: ReactNode }) => {
  const initialStates: InitialStates = {
    activeOption: sidebarConfig.options[0],
    flipX: false,
    cropOption: {
      crop: {
        width: 10,
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
  };
  const [editor, _updateEditor] = useImmer({
    ...initialStates,
  });

  const [editorHistory, updateEditorHistory] = useImmer<EditorHistory>({
    head: -1,
    history: [],
  });

  console.log(editorHistory);

  const canUndo = editorHistory.head > 0;
  const canRedo =
    editorHistory.history.length > 0 &&
    editorHistory.head < editorHistory.history.length - 1;
  const hasEditorHistory = canUndo;

  const undo = () => {
    updateEditorHistory((draft) => {
      const newHead = editorHistory.head - 1;
      const newHistory = editorHistory.history[newHead];
      draft.head = newHead;
      _updateEditor(newHistory);
    });
  };
  const redo = () => {
    updateEditorHistory((draft) => {
      const newHead = editorHistory.head + 1;
      const newHistory = editorHistory.history[newHead];
      draft.head = newHead;
      _updateEditor(newHistory);
    });
  };

  const resetEditorHistory = () => {
    updateEditorHistory((draft) => {
      const tempFirstState = JSON.parse(JSON.stringify(draft.history[0]));
      draft.head = 0;
      draft.history = [tempFirstState];
      _updateEditor(tempFirstState);
    });
  };

  const timeoutRef = useRef<any>(null);
  const updateEditor = (
    draft: InitialStates | DraftFunction<InitialStates>,
    addToEditorHistory?: boolean,
    options?: UpdateEditorOptions,
  ) => {
    if (typeof draft === "function") {
      return _updateEditor((d) => {
        draft(d);

        if (editorHistory.head === -1) {
          const parsedDraft = JSON.parse(JSON.stringify(d));
          updateEditorHistory((hDraft) => {
            hDraft.head++;
            hDraft.history.push(parsedDraft);
          });
          return;
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
  };

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
      }}
    >
      {children}
    </ImageEditorContext.Provider>
  );
};

const useImageEditor = () => useContext(ImageEditorContext);
export default useImageEditor;
