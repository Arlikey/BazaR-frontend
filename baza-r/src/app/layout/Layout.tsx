import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import { Outlet } from "react-router";
import { ModalProvider } from "../_providers/ModalProvider";

import { useEffect } from "react";
import { useLocation } from "react-router";
import PromoBanner from "../../widgets/header/PromoBanner";
import { Toaster } from "sonner";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export function Layout() {
  return (
    <>
      <ModalProvider />
      <ScrollToTop />
      <Toaster
        position="bottom-center"
        visibleToasts={2}
        toastOptions={{
          classNames: {
            toast: "!w-[500px] !max-w-none !left-1/2 !-translate-x-1/2",
          },
        }}
      />

      <div className="mx-auto flex flex-col">
        <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto]">
          <PromoBanner />
          <Header />

          <main className="flex min-h-75 max-w-480 gap-10 px-4 pb-8 md:px-8 lg:px-13.75">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
