import sidebarConfig from "../../config/sidebarConfig";
import useImageEditor from "../../hooks/useImageEditor";
import SidebarButton from "../SidebarButton";

const Sidebar = () => {
  const { activeOption } = useImageEditor();
  return (
    <div className="h-fit my-auto max-h-full px-4 space-y-2.5 overflow-y-auto scrollbar-none relative z-10">
      {sidebarConfig.options.map((option) => (
        <SidebarButton
          {...option}
          active={activeOption.optionKey === option.optionKey}
          key={option.optionKey}
        />
      ))}
    </div>
  );
};

export default Sidebar;
