import { cx } from "../../../../../utils";
import { bottomBarBtn } from "../../../config/constants";
import cropOptions from "../../../config/cropOptions";
import useImageEditor from "../../../hooks/useImageEditor";
import EditorSlider from "../../EditorSlider";

const FinetuneBottomBar = () => {
  const { cropOption, updateEditor, initialStates } = useImageEditor();

  const extraSliderOptions = cropOption.activeOption.sliderOptions || {};
  const cropActiveOption = cropOption.activeOption;

  const activeOptionValue = cropOption.options[cropActiveOption.optionKey];

  return (
    <div className="flex flex-col items-center justify-end h-full gap-3">
      <div className="w-full text-white">
        <EditorSlider
          onLineClick={() => {
            updateEditor(
              (draft) => {
                draft.cropOption.options[cropActiveOption.optionKey] =
                  initialStates.cropOption.options[cropActiveOption.optionKey];
              },
              true,
              { transition: true },
            );
          }}
          text={
            cropActiveOption?.valueModifier?.(activeOptionValue) ??
            activeOptionValue
          }
          slider={{
            onChange: (v) => {
              const value = Array.isArray(v) ? v[0] : v;
              updateEditor(
                (draft) => {
                  draft.cropOption.options[cropActiveOption.optionKey] = value;
                },
                true,
                {
                  timeout: 300,
                  transition: true,
                  ignoreTransitionWhileAdding: true,
                },
              );
            },
            value: activeOptionValue,
            min: 0,
            max: 100,
            ...extraSliderOptions,
          }}
        />
      </div>
      <div className="flex gap-2.5">
        {cropOptions.map((option) => {
          const { name, optionKey } = option;
          return (
            <button
              key={optionKey}
              onClick={() => {
                updateEditor((draft) => {
                  draft.cropOption.activeOption = option;
                }, true);
              }}
              className={cx(
                bottomBarBtn,
                cropActiveOption.optionKey === optionKey && "active",
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
