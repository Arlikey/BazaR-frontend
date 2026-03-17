import { ServicesBlock } from "./blocks/ServicesBlock";
import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "../../../shared/components/ui/Breadcrumbs";
import { ProductTabs } from "./blocks/ProductTabs";
import { PurchaseBlock } from "./blocks/PurchaseBlock";
import { ProductGallery } from "./blocks/product-gallery/ProductGallery";
import { DeliveryBlock } from "./blocks/DeliveryBlock";
import { PaymentGuaranteeBlock } from "./blocks/PaymentGuaranteeBlock";
import { ProductSpecsBlock } from "./blocks/ProductSpecsBlock";
import { ProductDescriptionBlock } from "./blocks/ProductDescriptionBlock";
import { ProductReviewsBlock } from "./blocks/review-block/ProductReviewsBlock";
import { useElementOffset } from "../../../shared/hooks/useElementOffset";
import { Button } from "../../../shared/components/ui/Button";
import { PickUpIcon } from "../../../shared/components/icons/ui/PickUpIcon";
import { CourierIcon } from "../../../shared/components/icons/ui/CourierIcon";
import { PaymentIcon } from "../../../shared/components/icons/ui/PaymentIcon";
import { GuaranteeIcon } from "../../../shared/components/icons/ui/GuaranteeIcon";
import {
  useProduct,
  useProductAttributes,
  useProductOffer,
} from "../../../features/products/queries";
import { getAttributeValue } from "../../../features/products/model/getAttributeValue";

type Props = {
  productId: string;
};

export default function ProductDetails({ productId }: Props) {
  const { data: product, isLoading } = useProduct(productId);
  const { data: attributesView } = useProductAttributes(productId);
  const { data: offer } = useProductOffer(productId);

  useElementOffset();
  useElementOffset({
    selector: "[data-app-tabs]",
    cssVarName: "--tabs-height",
    measure: "height",
  });

  if (isLoading) return null;
  if (!product) return null;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Комп'ютери та ноутбуки", to: "/computers" },
    { label: "Ноутбуки", to: "/computers/laptops" },
    { label: "Ноутбуки Apple", to: "/computers/laptops/apple" },
  ];

  return (
    <>
      <div id="all" className="scroll-mt-(--scroll-offset)" />
      <Breadcrumbs items={breadcrumbs} />
      <h2 className="mb-2 text-3xl">{product.name}</h2>
      <span className="text-muted text-base">
        Код: <span>{product.vendorCode}</span>
      </span>
      <ProductTabs data-app-tabs />
      <section className="mt-10 flex gap-5">
        <div className="flex w-1/2 flex-col gap-5">
          <ProductGallery
            images={product.images
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((img) => `http://localhost:8080${img.url}`)}
            alt={product.name}
            isLoading={isLoading}
          />
          <ProductSpecsBlock
            specs={(attributesView?.attributes ?? []).map((attr) => ({
              label: attr.name,
              value: getAttributeValue(attr),
            }))}
          />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <PurchaseBlock
            price={offer?.priceAmount ?? 0}
            oldPrice={offer?.oldPriceAmount ?? undefined}
            stockStatus={
              !offer
                ? "unavailable"
                : offer.stock === 0
                  ? "unavailable"
                  : offer.stock < 5
                    ? "ending"
                    : "available"
            }
            onBuy={() => {}}
            onFavourite={() => {}}
            onCompare={() => {}}
          />
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
      <section id="specs" className="h-100 scroll-mt-(--scroll-offset)">
        Specifications
      </section>
      <section
        id="reviews"
        className="grid scroll-mt-(--scroll-offset) grid-cols-2 grid-rows-[auto_1fr] gap-x-10"
      >
        <h3 className="mb-4 self-end text-2xl">Опис</h3>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl">
            Відгуки покупців <span className="text-muted">27</span>
          </h2>
          <Button
            color="secondary"
            size="lg"
            className="text-white"
            rounded="pill"
          >
            Написати відгук
          </Button>
        </div>

        <div className="flex-1">
          <ProductDescriptionBlock
            html={`Ноутбук Lenovo V15-ADA (82C700DPRA) Iron Grey - це надійний та потужний пристрій, який ідеально підходить для роботи та розваг. Оснащений 4-ядерним процесором AMD Ryzen 3 7320U з тактовою частотою від 2.4 до 4.1 ГГц, цей ноутбук забезпечує швидку та ефективну роботу з будь-якими завданнями. Відеокарта Radeon 610M дозволяє насолоджуватися якісною графікою, а обсяг SSD в 512 ГБ забезпечує достатньо місця для зберігання файлів та програм. Ноутбук має стильний дизайн в кольорі Iron Grey, що додає йому елегантності та сучасності.`}
            collapsedHeight={300}
          />
        </div>
        <div className="flex-1">
          <ProductReviewsBlock
            productSlug="lenovo-v15-ada"
            totalCount={27}
            reviews={[
              {
                id: "1",
                author: "Олег Сидоров",
                isSeller: false,
                sellerName: "BAZA-R",
                date: "09 січня 2022",
                rating: 4,
                text: "Коли навантажений 100%, можна працювати майже без лагів...",
                pros: "Корпус, додаткове місце під SSD",
                cons: "Слабкий екран, один слот пам'яті",
                likes: 1,
                dislikes: 0,
                photos: [
                  {
                    id: "p1",
                    src: "/images/products/thumbs/472002265_thumb.png",
                  },
                  {
                    id: "p2",
                    src: "/images/products/thumbs/472002266_thumb.png",
                  },
                ],
                replies: [
                  {
                    id: "r1",
                    author: "BAZA-R",
                    isSeller: true,
                    text: "Дякуємо за відгук!",
                    date: "10 січня 2022",
                  },
                ],
              },
              {
                id: "1",
                author: "Андрій Мельничук",
                isSeller: false,
                sellerName: "BAZA-R",
                date: "07 січня 2022",
                rating: 2,
                text: "Не потянув Baldur's Gate 3 на мінімалках, хоча мав би. Можливо, проблема в оптимізації гри, але ноутбук не виправдав моїх очікувань.",
                pros: "Корпус, додаткове місце під SSD",
                cons: "Слабкий, неяскравий екран, один слот пам'яті",
                likes: 0,
                dislikes: 2,
              },
            ]}
          />
        </div>
      </section>
      <section id="questions" className="h-100 scroll-mt-(--scroll-offset)">
        Questions
      </section>
      <section id="video" className="h-100 scroll-mt-(--scroll-offset)">
        Video
      </section>
      <section id="photos" className="h-100 scroll-mt-(--scroll-offset)">
        Photos
      </section>
      <section id="together" className="h-100 scroll-mt-(--scroll-offset)">
        Buy with
      </section>
    </>
  );
}
