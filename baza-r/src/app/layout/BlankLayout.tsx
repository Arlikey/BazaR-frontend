import { Outlet } from "react-router";

export function BlankLayout() {
  return (
    <>
      <div className="mx-auto flex min-h-screen flex-col">
        <Outlet />
      </div>
    </>
  );
}
