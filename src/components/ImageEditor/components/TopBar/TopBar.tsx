import { cx } from "../../../../utils";
import { editorConfig } from "../../config/constants";
import sidebarConfig from "../../config/sidebarConfig";
import useImageEditor from "../../hooks/useImageEditor";

const TopBar = () => {
  const { activeOption } = useImageEditor();
  return (
    <div
      style={{
        height: editorConfig.topBar.height,
      }}
      className="absolute z-10 w-full"
    >
      {/* {activeOption.topBarComponent} */}
      {sidebarConfig.options.map((option) => {
        const isActive = activeOption.optionKey === option.optionKey;
        return (
          <div
            key={option.optionKey}
            className={cx(
              "absolute top-0 left-0 w-full duration-300",
              !isActive && "-translate-y-3 opacity-0 pointer-events-none",
            )}
          >
            {option.topBarComponent}
          </div>
        );
      })}
    </div>
  );
};

export default TopBar;
