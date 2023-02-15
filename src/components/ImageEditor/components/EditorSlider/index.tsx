import Slider, { SliderProps } from "rc-slider";

type EditorSliderProps = {
  slider: SliderProps;
  text: string | number;
  onLineClick: () => void;
};
const EditorSlider = ({ slider, text, onLineClick }: EditorSliderProps) => {
  return (
    <div className="max-w-[450px] mx-auto flex flex-col items-center gap-3">
      <div className="relative -translate-x-[0.5px]">
        <p className="text-[10px] text-dark dark:text-white">{text}</p>
        <span
          onClick={onLineClick}
          className={
            "absolute px-1.5 h-3 left-1/2 cursor-pointer -translate-x-[calc(50%-0.5px)] top-[calc(100%+1.5px)]"
          }
        >
          <span className="block w-px h-full bg-dark dark:bg-white"></span>
        </span>
      </div>
      <Slider {...slider} />
    </div>
  );
};

export default EditorSlider;
