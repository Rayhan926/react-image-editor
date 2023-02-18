import { SliderProps } from "rc-slider";
import { ReactNode } from "react";
import { PixelCrop } from "react-image-crop";
import { DraftFunction } from "use-immer";
import { cropAllOptionKeys } from "../config/cropOptions";
import { finetuneAllOptionKeys } from "../config/finetuneOptions";

export type SidebarAllOptionKeys = "crop" | "finetune";

export type SidebarOption = {
  optionKey: SidebarAllOptionKeys;
  icon: ReactNode;
  name: string;
  topBarComponent: ReactNode;
  bottomBarComponent: ReactNode;
};

export type SidebarConfig = {
  options: SidebarOption[];
};

export type SidebarButtonProps = {
  active?: boolean;
} & SidebarOption;

export type LoadingReason = "cropping" | "saving" | null;
export type InitialStates = {
  previewImage: {
    src: string;
    width: number;
    height: number;
  };
  activeOption: SidebarOption;
  flipX: boolean;
  cropOption: {
    activeOption: CropOption;
    options: {
      rotation: number;
      scale: number;
    };
    aspect?: number;
    crop: PixelCrop;
  };
  finetuneOption: {
    activeOption: FinetuneOption;
    filters: {
      blur: number;
      brightness: number;
      contrast: number;
      grayscale: number;
      "hue-rotate": number;
      invert: number;
      opacity: number;
      saturate: number;
      sepia: number;
    };
  };
  loading: {
    status: boolean;
    reason: LoadingReason;
  };
  hasStateTransition: boolean;
};

export type UpdateEditorOptions = {
  timeout?: number;
  transition?: boolean;
  ignoreTransitionWhileAdding?: boolean;
};

export type ImageEditorContextType = {
  updateEditor: (
    draft: InitialStates | DraftFunction<InitialStates>,
    addToEditorHistory?: boolean,
    options?: UpdateEditorOptions,
  ) => void;
  initialStates: InitialStates;
  canUndo: boolean;
  canRedo: boolean;
  hasEditorHistory: boolean;
  undo: () => void;
  redo: () => void;
  resetEditorHistory: () => void;
  setPreviewImageRef: React.Dispatch<
    React.SetStateAction<HTMLImageElement | null>
  >;
  previewImageRef: HTMLImageElement | null;
  cropImage: () => void;
  editorHistory: EditorHistory;
  minScale: number;
  rotation: number;
  startLoading: (reason: LoadingReason) => void;
  endLoading: () => void;
} & InitialStates;

export type DropdownOption = {
  name: string;
  value: string;
};

export type FinetuneAllOption = typeof finetuneAllOptionKeys[number];
export type CropAllOption = typeof cropAllOptionKeys[number];

export type FinetuneOption = {
  optionKey: FinetuneAllOption;
  name: string;
  sliderOptions?: SliderProps;
  valueModifier?: (v: number) => number;
};
export type CropOption = {
  optionKey: CropAllOption;
} & Omit<FinetuneOption, "optionKey">;

export type EditorHistory = {
  head: number;
  history: InitialStates[];
};

export type GetMaxWidthHeight = {
  width: number;
  height: number;
  ratio?: number;
};
