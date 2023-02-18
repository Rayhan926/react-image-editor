import { toPng } from "html-to-image";
import { BiRedo, BiUndo } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import useImageEditor from "../../hooks/useImageEditor";

const Header = () => {
  const {
    canUndo,
    canRedo,
    undo,
    redo,
    hasEditorHistory,
    resetEditorHistory,
    startLoading,
    endLoading,
    loading,
  } = useImageEditor();

  const saveImage = () => {
    startLoading("saving");
    toPng(document.getElementById("previewImage")!)
      .then(function (dataUrl) {
        endLoading();
        var link = document.createElement("a");
        link.download = "image.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        alert("oops, something went wrong!");
      });
  };

  const isSaving = loading.status && loading.reason === "saving";
  return (
    <div className="relative z-10 flex justify-between p-4 pb-0 shrink-0">
      <button
        disabled={!hasEditorHistory}
        onClick={resetEditorHistory}
        type="button"
        className="w-[30px] h-[30px] rounded-full __btn __center"
      >
        <MdHistory />
      </button>

      <div className="absolute flex justify-center w-[calc(100%-106px+16px)] right-4">
        <button
          disabled={!canUndo}
          onClick={undo}
          type="button"
          className="w-[35px] translate-x-[0.5px] h-[30px] rounded-l-full __btn __center"
        >
          <BiUndo />
        </button>
        <button
          disabled={!canRedo}
          onClick={redo}
          type="button"
          className="w-[35px] -translate-x-[0.5px]  h-[30px] rounded-r-full __btn __center"
        >
          <BiRedo />
        </button>
      </div>

      <button
        onClick={saveImage}
        className="h-[30px] px-3 relative z-[2] outline-none rounded-full bg-blue-500 duration-200 hover:bg-blue-600 text-white inline-block"
      >
        {isSaving ? "Saving.." : " Done"}
      </button>
    </div>
  );
};

export default Header;
