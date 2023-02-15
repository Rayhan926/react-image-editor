import { AiOutlineRotateLeft } from "react-icons/ai";
import { BiCrop } from "react-icons/bi";
import { TbFlipVertical } from "react-icons/tb";
import useImageEditor from "../../../hooks/useImageEditor";
import DropdownSelect from "../../DropdownSelect";

const btn = "px-2.5 __center gap-1 py-[5px] rounded-full __btn btn_transparent";

const CropTopBar = () => {
  const { updateEditor } = useImageEditor();
  return (
    <div className="flex items-center justify-center h-full gap-2.5">
      <DropdownSelect
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
      />
      <button
        className={btn}
        type="button"
        onClick={() =>
          updateEditor((draft) => {
            draft.flipX = !draft.flipX;
          }, true)
        }
      >
        <TbFlipVertical size={17} />
        Flip horizontal
      </button>
      <button className={btn}>
        <BiCrop />
        Crop Shape
      </button>
    </div>
  );
};

export default CropTopBar;
