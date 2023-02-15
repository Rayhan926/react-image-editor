import { SliderProps } from "rc-slider";
import { ReactNode } from "react";
import { Crop } from "react-image-crop";
import { DraftFunction } from "use-immer";
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

export type InitialStates = {
  activeOption: SidebarOption;
  flipX: boolean;
  cropOption: {
    crop: Crop;
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
};

export type UpdateEditorOptions = {
  timeout: number;
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
} & InitialStates;

export type DropdownOption = {
  name: string;
  value: string;
};

export type FinetuneAllOption = typeof finetuneAllOptionKeys[number];

export type FinetuneOption = {
  optionKey: FinetuneAllOption;
  name: string;
  sliderOptions?: SliderProps;
  valueModifier?: (v: number) => number;
};

export type EditorHistory = {
  head: number;
  history: InitialStates[];
};
