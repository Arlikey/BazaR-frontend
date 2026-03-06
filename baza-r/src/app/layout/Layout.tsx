import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import { Outlet } from "react-router";
import { ModalProvider } from "../_providers/ModalProvider";
import { uiText } from "../../shared/config/ui-text";

import { useEffect } from "react";
import { useLocation } from "react-router";

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

      <div className="mx-auto flex min-h-screen flex-col">
        <section
          aria-label={uiText.layout.promotionBannerAriaLabel}
          className="bg-accent z-50 flex h-8 items-center justify-center"
        >
          <span className="text-sm font-medium uppercase lg:text-lg">
            {uiText.layout.promotionBannerMessage}
          </span>
        </section>
        <div className="min-h-screen">
          <Header />

          <main className="mx-auto flex min-h-75 max-w-480 gap-10 px-4 py-8 md:px-8 lg:px-13.75">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
