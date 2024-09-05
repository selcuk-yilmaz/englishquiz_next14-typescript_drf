import React, { Suspense } from "react";
import Header from "@/components/Menu/Header";
import MobileMenu from "@/components/Menu/MobileMenu";
import Sidebar from "@/components/Menu/Sidebar";
import { AuthContext } from "@/context/AuthContext";
import { QuizProvider } from "@/context/QuizContext";

const RoutesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen">
      <AuthContext>
        <QuizProvider>
          <Sidebar />
          <MobileMenu />
          <div className="flex-1 lg:ml-72 ml-0 lg:max-h-screen">
            <Suspense fallback={<div>Loading...</div>}>
              <Header />
            </Suspense>
            <div className="mx-auto px-5 w-full bg-white-image dark:bg-dark-image bg-cover bg-center bg-no-repeat min-h-screen">
              {children}
            </div>
          </div>
        </QuizProvider>
      </AuthContext>
    </main>
  );
};

export default RoutesLayout;
