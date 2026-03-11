import { Navigate, type RouteObject } from "react-router";
import { Layout } from "../layout/Layout";
import { HomePage } from "../../pages/home/ui/HomePage";
import { NotFound } from "../../pages/not-found/ui/NotFound";
import { BlankLayout } from "../layout/BlankLayout";
import ProductPage from "../../pages/product/ui/ProductPage";
import { AccountLayout } from "../../pages/account/ui/AccountLayout";
import { ProfilePage } from "../../pages/account/ui/pages/profile/ProfilePage";
import OrdersPage from "../../pages/account/ui/pages/orders/OrdersPage";
import WishlistPage from "../../pages/account/ui/pages/wishlist/WishlistPage";
import ViewedPage from "../../pages/account/ui/pages/viewed/ViewedPage";
import NewslettersPage from "../../pages/account/ui/pages/newsletters/NewslettersPage";
import WalletPage from "../../pages/account/ui/pages/wallet/WalletPage";
import BonusPage from "../../pages/account/ui/pages/bonus/BonusPage";
import PremiumPage from "../../pages/account/ui/pages/premium/PremiumPage";
import ReviewsPage from "../../pages/account/ui/pages/reviews/ReviewsPage";
import MessagesPage from "../../pages/account/ui/pages/messages/MessagesPage";
import PromotionsPage from "../../pages/account/ui/pages/promotions/PromotionsPage";

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product/:productId", element: <ProductPage /> },
      {
        path: "/account",
        element: <AccountLayout />,
        children: [
          { index: true, element: <Navigate to="/account/profile" replace /> },
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
        ],
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [{ path: "/*", element: <NotFound /> }],
  },
];
