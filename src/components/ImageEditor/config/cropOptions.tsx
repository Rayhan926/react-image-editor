import { CropOption } from "../types";

export const cropAllOptionKeys = ["rotation", "scale"] as const;

const cropOptions: CropOption[] = [
  {
    optionKey: "rotation",
    name: "Rotation",
    sliderOptions: {
      startPoint: 45,
      max: 90,
    },
    valueModifier(v) {
      return v - 45;
    },
  },
  {
    optionKey: "scale",
    name: "Scale",
  },
];

export default cropOptions;
