import { Button } from "../../shared/components/ui/Button";
import InputField from "../../shared/components/ui/InputField";

export function FooterBanner() {
  return (
    <div className="bg-brand flex h-32 w-full items-center justify-center">
      <span className="text-accent text-2xl font-semibold uppercase">
        будьте в курсі вигідних пропозицій
      </span>
      <InputField
        placeholder="Ел. пошта"
        className="ml-12 h-11 w-full max-w-90"
        containerClassName="h-full w-full"
      />
      <Button
        color="secondary"
        variant="solid"
        className="ml-6 h-11 px-8 text-white"
        rounded="pill"
      >
        Підписатися
      </Button>
    </div>
  );
}
