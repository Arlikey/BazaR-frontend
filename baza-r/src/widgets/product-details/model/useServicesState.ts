import { useState } from "react";
import type { ServiceOption } from "./services.config";

export function useServicesState(services: ServiceOption[]) {
  const [checkedServices, setCheckedServices] = useState<
    Record<string, boolean>
  >({});
  const [selectedSubOptions, setSelectedSubOptions] = useState<
    Record<string, string>
  >({});

  const toggleService = (id: string) => {
    const nowChecked = !checkedServices[id];
    setCheckedServices((prev) => ({ ...prev, [id]: nowChecked }));

    if (nowChecked && !selectedSubOptions[id]) {
      const service = services.find((s) => s.id === id);
      const firstSub = service?.subOptions?.[0];
      if (firstSub) {
        setSelectedSubOptions((prev) => ({ ...prev, [id]: firstSub.id }));
      }
    }
  };

  const selectSubOption = (serviceId: string, subId: string) => {
    setSelectedSubOptions((prev) => ({ ...prev, [serviceId]: subId }));
    setCheckedServices((prev) => ({ ...prev, [serviceId]: true }));
  };

  return {
    checkedServices,
    selectedSubOptions,
    toggleService,
    selectSubOption,
  };
}
