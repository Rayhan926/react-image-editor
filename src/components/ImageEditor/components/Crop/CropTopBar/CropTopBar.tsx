import { AiOutlineRotateLeft } from "react-icons/ai";
import { BiCrop } from "react-icons/bi";
import { TbFlipVertical } from "react-icons/tb";
import { btn } from "../../../config/constants";
import useImageEditor from "../../../hooks/useImageEditor";
import { centerAspectCrop, getMaxWidthHeight } from "../../../utils";
import CropShapeDropdown from "../../CropShapeDropdown";
import DropdownSelect from "../../DropdownSelect";

const CropTopBar = () => {
  const { updateEditor } = useImageEditor();
  return (
    <div className="flex items-center justify-center h-full gap-2.5">
      <DropdownSelect
        onChange={() => {}}
        handleNode={
          <button
            className={btn}
            // onClick={() => {
            //   updateEditor((draft) => {
            //     draft.cropOption.aspect = 1;
            //     const { width, height } = getMaxWidthHeight({
            //       width: draft.cropOption.crop.width,
            //       height: draft.cropOption.crop.height,
            //       ratio: 1,
            //     });

            //     draft.cropOption.crop = centerAspectCrop(
            //       draft.cropOption.crop.width,
            //       draft.cropOption.crop.height,
            //       1,
            //       width,
            //       height,
            //     );

            //     // draft.cropOption.crop.width = width;
            //     // draft.cropOption.crop.height = height;
            //     // draft.cropOption.crop.x =
            //     //   (draft.cropOption.crop.width - width) / 2;
            //   });
            // }}
          >
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
      <CropShapeDropdown />
    </div>
  );
};

export default CropTopBar;
