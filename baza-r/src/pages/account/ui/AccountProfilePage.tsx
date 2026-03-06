import { useLogout } from "../../../features/auth/model/authMutations";
import { useNavigate } from "react-router";
import { Button } from "../../../shared/components/ui/Button";

export function AccountProfilePage() {
  const navigate = useNavigate();
  const logout = useLogout();

  return (
    <div>
      <Button
        variant="link"
        color="link"
        onClick={() =>
          logout.mutate(undefined, {
            onSuccess: () => navigate("/"),
          })
        }
      >
        Вихід
      </Button>
    </div>
  );
}
