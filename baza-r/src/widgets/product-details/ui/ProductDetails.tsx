import { ServicesBlock } from "./blocks/ServicesBlock";
import { Breadcrumbs } from "../../../shared/components/ui/Breadcrumbs";
import { ProductTabs } from "./blocks/ProductTabs";
import { PurchaseBlock } from "./blocks/purchase-block/PurchaseBlock";
import { ProductGallery } from "./blocks/product-gallery/ProductGallery";
import { DeliveryBlock } from "./blocks/DeliveryBlock";
import { PaymentGuaranteeBlock } from "./blocks/PaymentGuaranteeBlock";
import { ProductSpecsBlock } from "./blocks/ProductSpecsBlock";
import { PickUpIcon } from "../../../shared/components/icons/ui/PickUpIcon";
import { CourierIcon } from "../../../shared/components/icons/ui/CourierIcon";
import { PaymentIcon } from "../../../shared/components/icons/ui/PaymentIcon";
import { GuaranteeIcon } from "../../../shared/components/icons/ui/GuaranteeIcon";
import {
  useProduct,
  useProductAttributes,
  useProductOffer,
} from "../../../entities/product/queries";
import { buildCategoryBreadcrumbs } from "../../../entities/category/model/buildBreadcrumbs";
import { useCatalogCategories } from "../../catalog/model/useCategories";
import { useElementOffset } from "../../../shared/hooks/useElementOffset";
import { ReviewsSection } from "./blocks/reviews-section/ReviewsSection";
import { useRef } from "react";
import { RecentlyViewedProducts } from "../../home/recently-viewed-products/ui/RecentlyViewedProducts";
import { useIntersection } from "../../../shared/hooks/useIntersection";
import { getStockStatus } from "../../../entities/product/model/productUtils";
import { SpecificationsSection } from "./blocks/specifications-section/SpecificationsSection";
import { useAttributeSections } from "../../../entities/product/hooks/useAttributesSection";
import { DescriptionSection } from "./blocks/description-section/DescriptionSection";

export type OfferResponse = {
  offerId: string;
  productId: string;
  sellerId: string;
  priceAmount: number;
  priceCurrency: string;
  oldPriceAmount: number | null;
  stock: number;
  sellerSku: string;
  deliveryDays: number | null;
  minOrderQuantity: number;
  status: string;
};

type Props = {
  productId: string;
};

export default function ProductDetails({ productId }: Props) {
  const { data: product, isLoading } = useProduct(productId);
  const { data: attributesView } = useProductAttributes(productId);
  const {
    data: offer = {
      offerId: "",
      priceAmount: 0,
      oldPriceAmount: null,
      stock: 0,
    },
  } = useProductOffer(productId);
  const { flat } = useCatalogCategories();
  const breadcrumbs = buildCategoryBreadcrumbs(product?.categoryId, flat);
  const purchaseRef = useRef<HTMLDivElement>(null);
  const sections = useAttributeSections(attributesView?.attributes);

  const mainSpecs = sections.find((s) => s.name === "Основные характеристики");

  const isPurchaseVisible = useIntersection(purchaseRef, {
    threshold: 0.1,
  });

  useElementOffset({
    selector: "[data-app-tabs]",
    cssVarName: "--tabs-height",
    measure: "height",
  });

  if (!product) return null;

  return (
    <>
      <div id="all" className="scroll-mt-(--scroll-offset)" />
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-9 flex flex-col gap-2">
        <h2 className="text-xl md:text-3xl">{product.name}</h2>
        <span className="text-muted text-base">
          Код: <span>{product.vendorCode}</span>
        </span>
      </div>

      <ProductTabs
        data-app-tabs
        showMiniPurchase={!isPurchaseVisible}
        price={offer.priceAmount}
        oldPrice={offer.oldPriceAmount}
        offerId={offer.offerId}
        productId={productId}
      />

      <div className="flex flex-col gap-12">
        <section className="mt-10 flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-5 lg:w-1/2">
            <ProductGallery
              images={product.images.map((img) => img.url)}
              alt={product.name}
              isLoading={isLoading}
            />
            {mainSpecs && mainSpecs.specs.length > 0 && (
              <ProductSpecsBlock section={mainSpecs} />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <div ref={purchaseRef}>
              <PurchaseBlock
                productId={productId}
                offerId={offer.offerId}
                price={offer.priceAmount}
                oldPrice={offer.oldPriceAmount}
                stockStatus={getStockStatus(offer.stock)}
                onBuy={() => {}}
                onFavorite={() => {}}
                onCompare={() => {}}
              />
            </div>
            <ServicesBlock />
            <DeliveryBlock
              city="Одеса"
              options={[
                {
                  id: "pickup",
                  icon: <PickUpIcon />,
                  label: "Самовивіз з відділень поштових операторів",
                  sublabel: "Показати на карті",
                  date: "Відправимо 8 січня",
                  price: "за тарифами перевізника",
                },
                {
                  id: "courier",
                  icon: <CourierIcon />,
                  label: "Доставка кур'єром",
                  date: "Відправимо 8 січня",
                  price: "за тарифами перевізника",
                },
              ]}
            />
            <PaymentGuaranteeBlock
              items={[
                {
                  id: "payment",
                  icon: <PaymentIcon />,
                  title: "Оплата",
                  description:
                    "Оплата під час отримання товару, Картою онлайн, Google Pay, -5% знижки від ПриватБанк та Mastercard від 500 грн, Безготівковими для юридичних осіб, Покупка частинами monobank, Безготівковий для фізичних осіб, PrivatPay, Apple Pay, Кредит, Оплата частинами, Оплата карткою у відділенні",
                },
                {
                  id: "guarantee",
                  icon: <GuaranteeIcon />,
                  title: "Гарантія",
                  description:
                    "12 місяців Обмін/повернення товару впродовж 14 днів",
                },
              ]}
            />
          </div>
        </section>
        <DescriptionSection description={product.description} />
        <SpecificationsSection sections={sections} />
        <ReviewsSection productId={productId} productSlug={product.slug} />
        {/* <section id="video" className="h-100 scroll-mt-(--scroll-offset)">
        Video
      </section> */}
        {/* <section id="photos" className="h-100 scroll-mt-(--scroll-offset)">
        Photos
      </section> */}
        {/* <section id="together" className="h-100 scroll-mt-(--scroll-offset)">
        Buy with
      </section> */}
        <RecentlyViewedProducts slidesCount={6} />
      </div>
    </>
  );
}
