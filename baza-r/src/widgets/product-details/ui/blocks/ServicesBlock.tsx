import { CheckIcon } from "../../../../shared/components/icons/ui/CheckIcon";
import { InfoIcon } from "../../../../shared/components/icons/ui/InfoIcon";
import Block from "../../../../shared/components/ui/Block";
import IconWrapper from "../../../../shared/components/ui/IconWrapper";
import { SERVICES } from "../../config/services.config";
import { useServicesState } from "../../hooks/useServicesState";

export function ServicesBlock() {
  const {
    checkedServices,
    selectedSubOptions,
    toggleService,
    selectSubOption,
  } = useServicesState(SERVICES);

  return (
    <Block rounded="xl" className="flex flex-col gap-3 px-4 md:px-8 py-5">
      {SERVICES.map((service) => {
        const isChecked = !!checkedServices[service.id];

        return (
          <div key={service.id} className="flex flex-col gap-2 text-base">
            <div className="flex items-center gap-3">
              <button
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => toggleService(service.id)}
                className="flex items-center gap-3 text-left"
              >
                <div className="border-accent text-accent flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-sm border">
                  {isChecked && (
                    <IconWrapper>
                      <CheckIcon />
                    </IconWrapper>
                  )}
                </div>

                <span>{service.label}</span>
              </button>
              <button className="text-neutral-400 transition-colors hover:text-neutral-600">
                <InfoIcon />
              </button>
            </div>

            {service.subOptions && (
              <div className="ml-8 flex flex-col gap-2">
                {service.subOptions.map((sub) => {
                  const isSelected =
                    isChecked && selectedSubOptions[service.id] === sub.id;

                  return (
                    <button
                      key={sub.id}
                      role="radio"
                      onClick={() => selectSubOption(service.id, sub.id)}
                      className="flex items-center gap-3 text-left"
                    >
                      <div className="border-accent flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border">
                        {isSelected && (
                          <div className="bg-accent h-2.5 w-2.5 rounded-full" />
                        )}
                      </div>
                      <span>{sub.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </Block>
  );
}
