import { TbFlipVertical } from "react-icons/tb";
import { btn } from "../../../config/constants";
import useImageEditor from "../../../hooks/useImageEditor";
import CropShapeDropdown from "../../CropShapeDropdown";

const CropTopBar = () => {
  const { updateEditor } = useImageEditor();
  return (
    <div className="flex items-center justify-center h-full gap-2.5">
      {/* <DropdownSelect
        onChange={() => {}}
        handleNode={
          <button className={btn}>
            <AiOutlineRotateLeft />
            Rotate Left
          </button>
        }
        dropdownClass="w-[100px]"
        options={[
          {
            name: "Hello World",
            value: "",
          },
          {
            name: "Hello World",
            value: "",
          },
          {
            name: "Hello World",
            value: "",
          },
          {
            name: "Hello World",
            value: "",
          },
        ]}
      /> */}
      <button
        className={btn}
        type="button"
        onClick={() =>
          updateEditor(
            (draft) => {
              draft.flipX = !draft.flipX;
            },
            true,
            { transition: true },
          )
        }
      >
        <TbFlipVertical size={17} />
        Flip horizontal
      </button>
      <CropShapeDropdown />
    </div>
  );
};

export default CropTopBar;
