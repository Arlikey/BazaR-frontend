import { useState, useEffect } from "react";
import type { Promotion } from "../../../../entities/promotion/model/Promotion";
import PromotionDao from "../../../../entities/promotion/api/__mocks__/PromotionDao";

export function usePromotions() {
  const [data, setData] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    PromotionDao.getPromotions()
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  return { promotions: data, isLoading };
}
