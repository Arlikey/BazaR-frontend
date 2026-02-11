import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import { Outlet } from "react-router";
import { ModalProvider } from "../_providers/ModalProvider";

export function Layout() {
  return (
    <>
      <ModalProvider />
      <div className="mx-auto flex min-h-screen flex-col">
        <section
          aria-label="Promotion banner"
          className="bg-accent flex h-8 items-center justify-center"
        >
          <span className="text-sm font-medium uppercase lg:text-lg">
            тотальний розпродаж до -50%
          </span>
        </section>
        <div className="min-h-screen">
          <Header />

          <main className="mx-auto flex min-h-75 max-w-480 gap-10 px-4 py-7.5 md:px-8 lg:px-13.75">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
