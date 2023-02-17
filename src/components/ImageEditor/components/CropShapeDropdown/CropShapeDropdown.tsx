import { useRef, useState } from "react";
import { BiCheck, BiCrop } from "react-icons/bi";
import { FiSquare } from "react-icons/fi";
import { useClickAway, useToggle } from "react-use";
import { cx } from "../../../../utils";
import { btn } from "../../config/constants";
import useImageEditor from "../../hooks/useImageEditor";
import { centerAspectCrop, getMaxWidthHeight } from "../../utils";

type Ratio = { text: string; value: number };
const landscapeRatios: Ratio[] = [
  {
    text: "1:1",
    value: 1 / 1,
  },
  {
    text: "2:1",
    value: 2 / 1,
  },
  {
    text: "3:2",
    value: 3 / 2,
  },
  {
    text: "4:3",
    value: 4 / 3,
  },
  {
    text: "5:4",
    value: 5 / 4,
  },
  {
    text: "16:10",
    value: 16 / 10,
  },
  {
    text: "16:9",
    value: 16 / 9,
  },
];
const portraitRatios: Ratio[] = [
  {
    text: "1:1",
    value: 1 / 1,
  },
  {
    text: "1:2",
    value: 1 / 2,
  },
  {
    text: "2:3",
    value: 2 / 3,
  },
  {
    text: "3:4",
    value: 3 / 4,
  },
  {
    text: "4:5",
    value: 4 / 5,
  },
  {
    text: "10:16",
    value: 10 / 16,
  },
  {
    text: "9:16",
    value: 9 / 16,
  },
];

const CropShapeDropdown = () => {
  const { cropOption, updateEditor } = useImageEditor();

  const value = cropOption.aspect;

  const ref = useRef(null!);
  const [isLandscapeRatioSelected, setIsLandscapeRatioSelected] =
    useState(true);
  const [open, toggle] = useToggle(false);

  useClickAway(ref, () => toggle(false));

  const onChangeHandler = (r: Ratio) => {
    updateEditor(
      (draft) => {
        draft.cropOption.aspect = r.value;

        const { width, height } = getMaxWidthHeight({
          width: draft.previewImage.width,
          height: draft.previewImage.height,
          ratio: r.value,
        });

        draft.cropOption.crop = centerAspectCrop(
          draft.previewImage.width,
          draft.previewImage.height,
          r.value,
          width,
          height,
        );
      },
      true,
      {
        transition: true,
      },
    );
    toggle(false);
  };

  return (
    <div className="relative" ref={ref}>
      <div onClick={toggle}>
        <button className={btn}>
          <BiCrop />
          Crop Shape
        </button>
      </div>

      <div
        className={cx(
          "absolute z-10 top-[calc(100%+8px)] w-[95px] left-1/2 -translate-x-1/2 rounded bg-slate-800 border border-white/20 duration-300",
          !open && "-translate-y-2 opacity-0 pointer-events-none",
        )}
      >
        <div className="w-2 h-2 rotate-45 bg-slate-800 border-t border-l border-white/20 pointer-events-none absolute -top-[4.5px] rounded-[1px] left-1/2 -translate-x-1/2"></div>

        <div className="py-[5px]">
          <div className="flex items-center gap-2 px-3 py-1.5 mb-[2.5px]">
            <div className="grow flex justify-center">
              <button
                onClick={() => setIsLandscapeRatioSelected(true)}
                className={cx(
                  "text-white w-[22px] flex justify-center items-center aspect-[16/10.5] border border-white/80 rounded-sm",
                  !isLandscapeRatioSelected && "opacity-70",
                )}
              >
                {isLandscapeRatioSelected && <BiCheck size={12} />}
              </button>
            </div>
            <div className="grow flex justify-center">
              <button
                onClick={() => setIsLandscapeRatioSelected(false)}
                className={cx(
                  "text-white w-3.5 flex justify-center items-center aspect-[9/14] border border-white/80 rounded-sm",
                  isLandscapeRatioSelected && "opacity-70",
                )}
              >
                {!isLandscapeRatioSelected && <BiCheck size={12} />}
              </button>
            </div>
          </div>
          <button
            className={cx(
              "px-3 py-[6px] font-medium grid grid-cols-[15px,auto] gap-[7px] w-full text-left text-white",
              value === undefined ? "bg-white/[0.07]" : "hover:bg-white/5",
            )}
            onClick={() => {
              if (value === undefined) return;
              updateEditor((draft) => {
                draft.cropOption.aspect = undefined;
              }, true);
              toggle(false);
            }}
          >
            <FiSquare size={16} />
            Custom
          </button>
          {(isLandscapeRatioSelected ? landscapeRatios : portraitRatios).map(
            (r, i) => {
              const isSelected = value === r.value;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (isSelected) return;
                    onChangeHandler(r);
                  }}
                  className={cx(
                    "px-3 py-[6px] font-medium grid grid-cols-[15px,auto] gap-[7px] w-full text-left text-white",
                    isSelected ? "bg-white/[0.07]" : "hover:bg-white/5",
                  )}
                >
                  <div className="flex justify-center items-center h-full">
                    <span
                      style={
                        isLandscapeRatioSelected
                          ? {
                              width: 14,
                              height: 14 / r.value,
                            }
                          : {
                              height: 14,
                              width: 14 * r.value,
                            }
                      }
                      className={cx(
                        "inline-block rounded-[3px]",
                        isSelected ? "bg-white" : "bg-white/80",
                      )}
                    ></span>
                  </div>
                  {r.text}
                </button>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
};

export default CropShapeDropdown;
