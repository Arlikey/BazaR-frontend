import { ServicesBlock } from "./blocks/ServicesBlock";
import { Breadcrumbs } from "@/shared/components/ui/Breadcrumbs";
import { ProductTabs } from "./blocks/ProductTabs";
import {
  PurchaseBlock,
  PurchaseBlockSkeleton,
} from "./blocks/purchase-block/PurchaseBlock";
import { ProductGallery } from "./blocks/product-gallery/ProductGallery";
import { DeliveryBlock } from "./blocks/DeliveryBlock";
import { PaymentGuaranteeBlock } from "./blocks/PaymentGuaranteeBlock";
import { ProductSpecsBlock } from "./blocks/ProductSpecsBlock";
import { PickUpIcon } from "@/shared/components/icons/ui/PickUpIcon";
import { CourierIcon } from "@/shared/components/icons/ui/CourierIcon";
import { PaymentIcon } from "@/shared/components/icons/ui/PaymentIcon";
import { GuaranteeIcon } from "@/shared/components/icons/ui/GuaranteeIcon";
import {
  useProduct,
  useProductAttributes,
  useProductOffer,
} from "@/entities/product/queries";
import { buildCategoryBreadcrumbs } from "@/entities/category/model/buildBreadcrumbs";
import { useCatalogCategories } from "../../catalog/model/useCategories";
import { useElementOffset } from "@/shared/hooks/useElementOffset";
import { ReviewsSection } from "./blocks/reviews-section/ReviewsSection";
import { useRef } from "react";
import { RecentlyViewedProducts } from "../../home/recently-viewed-products/ui/RecentlyViewedProducts";
import { useIntersection } from "@/shared/hooks/useIntersection";
import { getStockStatus } from "@/entities/product/model/productUtils";
import {
  SpecificationsSection,
  SpecificationsSkeletonSection,
} from "./blocks/specifications-section/SpecificationsSection";
import { useAttributeSections } from "@/entities/product/hooks/useAttributesSection";
import {
  DescriptionSection,
  DescriptionSkeletonSection,
} from "./blocks/description-section/DescriptionSection";
import Skeleton from "@/shared/components/ui/loaders/Skeleton";
import { Helmet } from "react-helmet-async";
import { getSiteUrl } from "@/shared/lib/getSiteUrl";
import { NotFound } from "@/pages/not-found/ui/NotFound";
import {
  OG_DEFAULT_DESCRIPTION,
  OG_DEFAULT_TITLE,
} from "@/shared/model/constants";

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
  const purchaseRef = useRef<HTMLDivElement>(null);
  const siteUrl = getSiteUrl();

  const {
    data: product,
    isLoading: isProductLoading,
    isError,
  } = useProduct(productId);
  const { data: attributesView, isLoading: isAttributesLoading } =
    useProductAttributes(productId);
  const { data: offer, isLoading: isOfferLoading } = useProductOffer(productId);
  const { flat } = useCatalogCategories();
  const breadcrumbs = buildCategoryBreadcrumbs(product?.categoryId, flat);
  const sections = useAttributeSections(attributesView?.attributes);

  const mainSpecs = sections.find((s) => s.name === "Основні характеристики");

  const isPurchaseVisible = useIntersection(purchaseRef, {
    threshold: 0.1,
  });

  useElementOffset({
    selector: "[data-app-tabs]",
    cssVarName: "--tabs-height",
    measure: "height",
  });

  // SEO tags
  const title = product?.name ? `${product.name} - Baza-R` : OG_DEFAULT_TITLE;
  const description = product?.name
    ? `Купити ${product.name} — інтернет-магазин Baza-R. Швидка доставка по Україні.`
    : OG_DEFAULT_DESCRIPTION;
  const canonical = `${siteUrl}/product/${productId}`;
  const ogImage =
    product?.images?.[0]?.url ?? `${siteUrl}/Baza-R_OG_Image.webp`;

  if (isProductLoading) return null;

  if (!product || isError) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        {/*   OpenGraph tags   */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />

        {/*   Twitter tags   */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <div id="all" className="scroll-mt-(--scroll-offset)" />
      <Breadcrumbs items={breadcrumbs} />

      <div className="mt-9 flex flex-col gap-2">
        {isProductLoading ? (
          <Skeleton className="h-16 w-full" />
        ) : (
          <h1 className="text-xl md:text-3xl">{product.name}</h1>
        )}
        <span className="text-muted flex items-center gap-2 text-base">
          Код:{" "}
          {isProductLoading ? (
            <Skeleton className="inline-block h-4 w-1/8" />
          ) : (
            <span>{product.vendorCode}</span>
          )}
        </span>
      </div>

      <ProductTabs
        data-app-tabs
        showMiniPurchase={!isPurchaseVisible && offer && offer?.stock > 0}
        price={offer?.priceAmount ?? 0}
        oldPrice={offer?.oldPriceAmount ?? 0}
        offerId={offer?.offerId ?? ""}
        productId={productId}
      />

      <div className="flex flex-col gap-12">
        <section className="mt-10 flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-5 lg:w-1/2">
            <ProductGallery
              images={product?.images?.map((img) => img.url) ?? []}
              alt={product.name}
              isLoading={isProductLoading}
            />
            {mainSpecs && mainSpecs.specs.length > 0 && (
              <ProductSpecsBlock section={mainSpecs} />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <div ref={purchaseRef}>
              {isOfferLoading ? (
                <PurchaseBlockSkeleton />
              ) : (
                <PurchaseBlock
                  productId={productId}
                  offerId={offer?.offerId ?? ""}
                  price={offer?.priceAmount ?? 0}
                  oldPrice={offer?.oldPriceAmount ?? null}
                  stockStatus={getStockStatus(offer?.stock ?? 0)}
                  onBuy={() => {}}
                  onFavorite={() => {}}
                  onCompare={() => {}}
                />
              )}
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

        {isProductLoading ? (
          <DescriptionSkeletonSection />
        ) : (
          <DescriptionSection description={product.description} />
        )}
        {isAttributesLoading ? (
          <SpecificationsSkeletonSection />
        ) : (
          <SpecificationsSection sections={sections} />
        )}
        <ReviewsSection productId={productId} productSlug={product.slug} />
        <RecentlyViewedProducts slidesCount={6} />
      </div>
    </>
  );
}
