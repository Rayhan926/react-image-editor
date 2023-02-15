import { createContext, ReactNode } from "react";

const EditorHistoryContext = createContext(null!);

const EditorHistoryProvider = ({ children }: { children: ReactNode }) => {
  <EditorHistoryContext.Provider value={null!}>
    {children}
  </EditorHistoryContext.Provider>;
};

const useEditorHistory = () => {
  return <div>useEditorHistory</div>;
};

export default useEditorHistory;
