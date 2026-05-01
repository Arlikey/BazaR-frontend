import { Navigate, type RouteObject } from "react-router";
import { Layout } from "../layout/Layout";
import { HomePage } from "@/pages/home/ui/HomePage";
import { NotFound } from "@/pages/not-found/ui/NotFound";
import { BlankLayout } from "../layout/BlankLayout";
import ProductPage from "@/pages/product/ui/ProductPage";
import { AccountLayout } from "@/pages/account/ui/AccountLayout";
import { ProfilePage } from "@/pages/account/ui/pages/customer/profile/ProfilePage";
import OrdersPage from "@/pages/account/ui/pages/customer/orders/OrdersPage";
import WishlistPage from "@/pages/account/ui/pages/customer/wishlist/WishlistPage";
import NewslettersPage from "@/pages/account/ui/pages/customer/newsletters/NewslettersPage";
import WalletPage from "@/pages/account/ui/pages/customer/wallet/WalletPage";
import BonusPage from "@/pages/account/ui/pages/customer/bonus/BonusPage";
import PremiumPage from "@/pages/account/ui/pages/customer/premium/PremiumPage";
import ReviewsPage from "@/pages/account/ui/pages/customer/reviews/ReviewsPage";
import MessagesPage from "@/pages/account/ui/pages/customer/messages/MessagesPage";
import PromotionsPage from "@/pages/account/ui/pages/customer/promotions/PromotionsPage";
import SellerProductsPage from "@/pages/account/ui/pages/seller/SellerProductsPage";
import { CreateProductForm } from "@/features/seller/ui/CreateProductForm";
import CreateOfferPage from "@/features/seller/ui/CreateOfferPage";
import EditOfferPage from "@/features/seller/ui/EditOfferPage";
import { AuthGuard } from "./guards/AuthGuard";
import { SellerGuard } from "./guards/SellerGuard";
import OrderPage from "@/pages/checkout/CheckoutPage";
import SearchPage from "@/pages/search/SearсhPage";
import { ViewedPage } from "@/pages/account/ui/pages/customer/viewed/ViewedPage";
import { CategoryPage } from "@/pages/category/ui/CategoryPage";
import { OrderSuccess } from "@/pages/order/OrderSuccess";
import { CatalogPage } from "@/pages/category/ui/CatalogPage";
import { BecomeSellerPage } from "@/pages/seller/NewSellerPage";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product/:productId", element: <ProductPage /> },
      { path: "/catalog/:categoryId", element: <CategoryPage /> },
      { path: "/catalog", element: <CatalogPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/order/success", element: <OrderSuccess /> },
      { path: "/newseller", element: <BecomeSellerPage /> },

      {
        element: <AuthGuard />,
        children: [
          {
            path: "/account",
            element: <AccountLayout />,
            children: [
              {
                index: true,
                element: <Navigate to="/account" replace />,
              },
              { path: "profile", element: <ProfilePage /> },
              { path: "orders", element: <OrdersPage /> },
              { path: "wishlist", element: <WishlistPage /> },
              { path: "viewed", element: <ViewedPage /> },
              { path: "newsletters", element: <NewslettersPage /> },
              { path: "wallet", element: <WalletPage /> },
              { path: "bonus", element: <BonusPage /> },
              { path: "premium", element: <PremiumPage /> },
              { path: "reviews", element: <ReviewsPage /> },
              { path: "messages", element: <MessagesPage /> },
              { path: "promotions", element: <PromotionsPage /> },
              {
                element: <SellerGuard />,
                children: [
                  {
                    path: "seller",
                    children: [
                      { path: "products", element: <SellerProductsPage /> },
                      {
                        path: "products/create",
                        element: <CreateProductForm />,
                      },
                      { path: "offers/create", element: <CreateOfferPage /> },
                      { path: "offers/edit", element: <EditOfferPage /> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: "/*", element: <NotFound /> },
      { path: "/order", element: <OrderPage /> },
    ],
  },
];
