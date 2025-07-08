
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface SharedLayoutProps {
  children: ReactNode;
}

const SharedLayout = ({ children }: SharedLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SharedLayout;
