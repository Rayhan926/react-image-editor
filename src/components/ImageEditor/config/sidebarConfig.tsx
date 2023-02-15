import { BiCrop } from "react-icons/bi";
import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import CropBottomBar from "../components/Crop/CropBottomBar";
import CropTopBar from "../components/Crop/CropTopBar";
import FinetuneBottomBar from "../components/Finetune/FinetuneBottomBar";
import { SidebarConfig } from "../types";

const sidebarConfig: SidebarConfig = {
  options: [
    {
      optionKey: "crop",
      icon: <BiCrop />,
      name: "Crop",
      topBarComponent: <CropTopBar />,
      bottomBarComponent: <CropBottomBar />,
    },
    {
      optionKey: "finetune",
      icon: <HiOutlineAdjustmentsVertical />,
      name: "Finetune",
      topBarComponent: null,
      bottomBarComponent: <FinetuneBottomBar />,
    },
  ],
};

export default sidebarConfig;
