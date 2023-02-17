import { useRef } from "react";
import { cx } from "../../../../../utils";
import { bottomBarBtn } from "../../../config/constants";
import finetuneOptions from "../../../config/finetuneOptions";
import useImageEditor from "../../../hooks/useImageEditor";
import EditorSlider from "../../EditorSlider";

const FinetuneBottomBar = () => {
  const { finetuneOption, updateEditor, initialStates } = useImageEditor();

  const extraSliderOptions = finetuneOption.activeOption.sliderOptions || {};
  const finetuneActiveOption = finetuneOption.activeOption;

  const activeOptionValue =
    finetuneOption.filters[finetuneActiveOption.optionKey];

  const timeoutRef = useRef<any>(null);

  return (
    <div className="flex flex-col items-center justify-end h-full gap-3">
      <div className="w-full text-white">
        <EditorSlider
          onLineClick={() => {
            updateEditor((draft) => {
              draft.finetuneOption.filters[finetuneActiveOption.optionKey] =
                initialStates.finetuneOption.filters[
                  finetuneActiveOption.optionKey
                ];
            }, true);
          }}
          text={
            finetuneActiveOption?.valueModifier?.(activeOptionValue) ??
            activeOptionValue
          }
          slider={{
            onChange: (v) => {
              const value = Array.isArray(v) ? v[0] : v;
              updateEditor(
                (draft) => {
                  draft.finetuneOption.filters[finetuneActiveOption.optionKey] =
                    value;
                },
                true,
                { timeout: 300 },
              );
            },
            // onAfterChange(v) {
            //   const value = Array.isArray(v) ? v[0] : v;
            //   updateEditor((draft) => {
            //     draft.finetuneOption.filters[finetuneActiveOption.optionKey] =
            //       value;
            //   }, true);
            // },
            value: activeOptionValue,
            min: 0,
            max: 100,
            ...extraSliderOptions,
          }}
        />
      </div>
      <div className="flex gap-2.5">
        {finetuneOptions.map((option) => {
          const { name, optionKey } = option;
          return (
            <button
              key={optionKey}
              onClick={() => {
                updateEditor((draft) => {
                  draft.finetuneOption.activeOption = option;
                }, true);
              }}
              className={cx(
                bottomBarBtn,
                finetuneActiveOption.optionKey === optionKey && "active",
              )}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FinetuneBottomBar;
