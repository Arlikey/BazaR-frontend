import Header from "@/widgets/header/Header";
import Footer from "@/widgets/footer/Footer";
import { Outlet } from "react-router";
import { ModalProvider } from "../_providers/ModalProvider";

import { useEffect } from "react";
import { useLocation } from "react-router";
import PromoBanner from "@/widgets/header/PromoBanner";
import { Toaster } from "sonner";
import { useElementOffset } from "@/shared/hooks/useElementOffset";
import { FooterBanner } from "@/widgets/footer/FooterBanner";
import MobileBar from "./MobileBar";
import { TopScrollButton } from "@/shared/components/ui/TopScrollButton";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export function Layout() {
  useElementOffset();

  return (
    <>
      <ModalProvider />
      <ScrollToTop />
      <Toaster
        position="bottom-center"
        visibleToasts={2}
        toastOptions={{
          classNames: {
            toast: "w-full bottom-15! md:bottom-0!",
          },
        }}
      />

      <div className="mx-auto flex flex-col">
        <div className="grid min-h-screen grid-rows-[auto_auto_1fr_auto]">
          <PromoBanner />
          <Header />

          <main className="mx-auto flex w-full max-w-480 min-w-0 gap-10 px-2 pb-8 md:px-10 2xl:px-14">
            <Outlet />
          </main>
          <FooterBanner />
          <Footer />
        </div>
        <TopScrollButton />
        <MobileBar />
      </div>
    </>
  );
}
