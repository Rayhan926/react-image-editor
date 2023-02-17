import BottomBar from "./components/ImageEditor/components/BottomBar";
import EditorPreview from "./components/ImageEditor/components/EditorPreview";
import Header from "./components/ImageEditor/components/Header";
import Sidebar from "./components/ImageEditor/components/Sidebar";
import TopBar from "./components/ImageEditor/components/TopBar";
import UploadImage from "./components/ImageEditor/components/UploadImage";
import useImageEditor from "./components/ImageEditor/hooks/useImageEditor";

const App = () => {
  const { previewImage } = useImageEditor();
  return (
    <section className="flex items-center flex-col justify-center min-h-screen bg-slate-900">
      {/** Editor Wrapper --Start-- */}
      <div className="w-[1000px] flex flex-col overflow-hidden bg-slate-800 rounded-md border border-white/[0.07] relative">
        <Header />

        <div className="grid grid-cols-[106px,auto] grow py-4">
          {/* overflow-hidden */}
          <Sidebar />
          {/** Body --Start-- */}
          <div className="relative w-[calc(100%-16px)]">
            {/* overflow-hidden */}
            <TopBar />
            <EditorPreview />
            <BottomBar />
          </div>
          {/** Body --End-- */}

          {!previewImage.src && <UploadImage />}
        </div>
      </div>
      {/** Editor Wrapper --End-- */}
    </section>
  );
};

export default App;
