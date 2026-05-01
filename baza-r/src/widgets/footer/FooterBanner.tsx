import { Button } from "@/shared/components/ui/Button";
import InputField from "@/shared/components/ui/InputField";

export function FooterBanner() {
  return (
    <div className="bg-brand hidden h-32 w-full items-center justify-center md:flex flex-col xl:flex-row gap-3">
      <span className="text-accent text-2xl font-semibold uppercase">
        будьте в курсі вигідних пропозицій!
      </span>
      <form className="flex max-w-180 xl:max-w-140 w-full ">
        <InputField
          placeholder="Ел. пошта"
          className="ml-10 h-11 w-full max-w-120 xl:max-w-100"
          containerClassName="h-full w-full"
        />
        <Button
          color="secondary"
          variant="solid"
          className="ml-6 h-11 px-8 text-base text-white"
          rounded="pill"
        >
          Підписатися
        </Button>
      </form>
    </div>
  );
}
