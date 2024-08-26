import Header from "@/components/Menu/Header";
import MobileMenu from "@/components/Menu/MobileMenu";
import Sidebar from "@/components/Menu/Sidebar";
import { QuizProvider } from "@/context/QuizContext";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RoutesLayout = ({ children }: RootLayoutProps) => {
  return (
    <main className="flex min-h-screen">
      <QuizProvider>
        <Sidebar />
        <MobileMenu />
        <div className="flex-1 lg:ml-72 ml-0 lg:max-h-screen">
          <Header />
          <div className="mx-auto px-5 w-full bg-white-image dark:bg-dark-image bg-cover bg-center bg-no-repeat">
            {children}
          </div>
        </div>
      </QuizProvider>
    </main>
  );
};

export default RoutesLayout;
