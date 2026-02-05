// import RegisterDialog from "@/widgets/register-dialog/ui/RegisterDialog";

import type { AuthMode } from "../../../shared/model/ui.store";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";

type Props = {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
};

export default function AuthDialog({ mode, onModeChange }: Props) {
  return (
    <>
      {mode === "login" ? (
        <LoginDialog onRegisterClick={() => onModeChange("register")} />
      ) : (
        <RegisterDialog onLoginClick={() => onModeChange("login")} />
      )}
    </>
  );
}
