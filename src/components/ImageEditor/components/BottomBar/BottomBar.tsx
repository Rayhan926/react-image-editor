import { cx } from "../../../../utils";
import { editorConfig } from "../../config/constants";
import sidebarConfig from "../../config/sidebarConfig";
import useImageEditor from "../../hooks/useImageEditor";

const BottomBar = () => {
  const { activeOption } = useImageEditor();
  return (
    <div
      style={{
        height: editorConfig.bottomBar.height,
      }}
      className={"absolute w-full bottom-0"}
    >
      {sidebarConfig.options.map((option) => {
        const isActive = activeOption.optionKey === option.optionKey;
        return (
          <div
            key={option.optionKey}
            className={cx(
              "absolute top-0 left-0 w-full duration-300",
              !isActive && "translate-y-5 opacity-0 pointer-events-none",
            )}
          >
            {option.bottomBarComponent}
          </div>
        );
      })}
    </div>
  );
};

export default BottomBar;
