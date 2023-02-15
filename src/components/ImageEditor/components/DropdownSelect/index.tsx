import { ReactNode, useRef } from "react";
import { useClickAway, useToggle } from "react-use";
import { cx } from "../../../../utils";
import { DropdownOption } from "../../types";

type DropdownSelect = {
  dropdownClass?: string;
  handleNode: ReactNode;
  options: DropdownOption[];
  value?: DropdownOption;
  onChange: (value: DropdownOption) => void;
};
const DropdownSelect = ({
  dropdownClass,
  handleNode,
  options,
  value,
  onChange,
}: DropdownSelect) => {
  const ref = useRef(null!);
  const [open, toggle] = useToggle(false);

  useClickAway(ref, () => toggle(false));
  return (
    <div className="relative" ref={ref}>
      <div onClick={toggle}>{handleNode}</div>

      <div
        className={cx(
          "absolute z-10 top-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded bg-slate-800 border border-white/20 duration-300",
          !open && "-translate-y-2 opacity-0 pointer-events-none",
          dropdownClass,
        )}
      >
        <div className="w-2 h-2 rotate-45 bg-slate-800 border-t border-l border-white/20 pointer-events-none absolute -top-[4.5px] rounded-[1px] left-1/2 -translate-x-1/2"></div>

        <div className="py-[5px]">
          {options.map((option, i) => (
            <button
              type="button"
              onClick={() => {
                onChange(option);
                toggle(false);
              }}
              className={cx(
                "px-3 py-[5px] block w-full text-left dark:text-[#D2D3D6]",
                option.value === value?.value
                  ? "bg-slate-900/10"
                  : "hover:bg-white/5",
              )}
              key={i}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropdownSelect;
