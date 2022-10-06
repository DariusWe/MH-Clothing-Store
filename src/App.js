import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChangedListener } from "./utils/firebase";
import { fetchProductsAsync } from "./store/products.slice";
import { setCurrentUser } from "./store/user.slice";
import Navigation from "./routes/navigation";
import ProductsPage from "./routes/products-page";
import SignInPage from "./routes/sign-in-page";
import SignUpPage from "./routes/sign-up-page";
import CheckoutPage from "./routes/checkout-page";
import WomenPage from "./routes/women-page";
import MenPage from "./routes/men-page";
import ScrollToTop from "./utils/scrollToTop";

const App = () => {
  console.log("Render/Rerender of App");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((userInstance) => {
      if (userInstance) {
        const { uid, email, displayName } = userInstance;
        dispatch(setCurrentUser({ uid, email, displayName }));
      } else {
        dispatch(setCurrentUser(null));
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Navigation />}>
            {/* replace index, women- and menpage with "indexpage" */}
            <Route index element={<WomenPage />} />
            <Route path="women" element={<WomenPage />} />
            <Route path="men" element={<MenPage />} />
            <Route path=":gender/:category" element={<ProductsPage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
