import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./Ui/AppLayout";
import Landing from "./Pages/Landing";
import AboutUs from "./Pages/AboutUs";
import Articles from "./Pages/Articles";
import EachArticle from "./Pages/EachArticle";
import EachProduct from "./Pages/EachProduct";
import Products from "./Pages/Products";
import SearchedProducts from "./Pages/SearchedProducts";
import { Toaster } from "react-hot-toast";
import Authentication from "./Pages/Authentication";
import { useUserInfo } from "./Features/Authentication/useUserInfo";
import Spinner from "./Ui/Spinner";
import ContactUs from "./Pages/ContactUs";
import Checkout from "./Features/ShoppingCart/Checkout";

function App() {
  const { isPendingUserInfo } = useUserInfo();

  if (isPendingUserInfo) return <Spinner />;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          className: "font-VazirBold",
          success: { duration: 4000 },
          error: { duration: 6000 },
        }}
      />
      <HashRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="landing" />} />
            <Route path="landing" element={<Landing />} />
            <Route path="products" element={<Products />} />
            <Route path="articles" element={<Articles />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="articles/item/:slug" element={<EachArticle />} />
            <Route path="products/item/:slug" element={<EachProduct />} />
            <Route path="search-products" element={<SearchedProducts />} />
            <Route path="products/category/:category" element={<Products />} />
            <Route path="authentication" element={<Authentication />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
