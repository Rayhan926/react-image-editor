import { FinetuneOption } from "../types";

export const finetuneAllOptionKeys = [
  "blur",
  "brightness",
  "contrast",
  //   "drop-shadow",
  "grayscale",
  "hue-rotate",
  "invert",
  "opacity",
  "saturate",
  "sepia",
  //   "url",
] as const;

const finetuneOptions: FinetuneOption[] = [
  {
    optionKey: "blur",
    name: "Blur",
  },
  {
    optionKey: "brightness",
    name: "Brightness",
    sliderOptions: {
      startPoint: 100,
      max: 200,
    },
    valueModifier(v) {
      return v - this.sliderOptions!.startPoint! || 0;
    },
  },
  {
    optionKey: "contrast",
    name: "Contrast",
    sliderOptions: {
      startPoint: 100,
      max: 200,
    },
    valueModifier(v) {
      return v - this.sliderOptions!.startPoint! || 0;
    },
  },
  {
    optionKey: "grayscale",
    name: "Grayscale",
  },
  {
    optionKey: "hue-rotate",
    name: "Hue",
  },
  {
    optionKey: "invert",
    name: "Invert",
  },
  {
    optionKey: "opacity",
    name: "Opacity",
  },
  {
    optionKey: "saturate",
    name: "Saturate",
    sliderOptions: {
      startPoint: 100,
      max: 200,
    },
    valueModifier(v) {
      return v - this.sliderOptions!.startPoint! || 0;
    },
  },
  {
    optionKey: "sepia",
    name: "Sepia",
  },
];

export default finetuneOptions;
