import { cx } from "../../../../../utils";
import { bottomBarBtn } from "../../../config/constants";
import EditorSlider from "../../EditorSlider";

const CropBottomBar = () => {
  return (
    <div className="flex flex-col items-center justify-end h-full gap-3">
      <div className="w-full text-white">
        <EditorSlider
          onLineClick={() => {}}
          text={"10"}
          slider={{
            min: 0,
            max: 100,
          }}
        />
      </div>
      <div className="flex gap-2.5">
        <button className={cx(bottomBarBtn, "active")}>Rotate Left</button>
        <button className={bottomBarBtn}>Rotate Left</button>
      </div>
    </div>
  );
};

export default CropBottomBar;
