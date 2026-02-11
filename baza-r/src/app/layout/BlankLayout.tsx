import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import { Outlet } from "react-router";
import { ModalProvider } from "../_providers/ModalProvider";

export function BlankLayout() {
  return (
    <>
      <div className="mx-auto flex min-h-screen flex-col">
        <Outlet />
      </div>
    </>
  );
}
