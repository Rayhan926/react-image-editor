import { cx } from "../../../../utils";
import useImageEditor from "../../hooks/useImageEditor";
import { SidebarButtonProps } from "../../types";

const SidebarButton = (props: SidebarButtonProps) => {
  const { icon, name, active = false } = props;
  const { updateEditor } = useImageEditor();

  return (
    <button
      type="button"
      onClick={() => {
        updateEditor((draft) => {
          draft.activeOption = props;
        }, true);
      }}
      className={cx(
        "w-full aspect-square rounded-lg flex-col gap-1.5 __btn __center",
        active && "active",
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span>{name}</span>
    </button>
  );
};

export default SidebarButton;
