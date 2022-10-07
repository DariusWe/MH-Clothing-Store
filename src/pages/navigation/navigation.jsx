import { MainContainer, ContentArea, DarkOverlay } from "./navigation.styles";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { selectIsCartOpen } from "../../store/cart.slice";
import NavbarSide from "../../components/navbar-side/navbar-side";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import ShoppingCart from "../../components/shopping-cart/shopping-cart";
import NavbarTop from "../../components/navbar-top/navbar-top";

const Navigation = () => {
  const isCartOpen = useSelector(selectIsCartOpen);
  const isProfileMenuOpen = useSelector((state) => state.user.isProfileMenuOpen);


  return (
    <MainContainer>
      <NavbarSide />
      <ContentArea>
        <NavbarTop />
        <Outlet />
      </ContentArea>
      {isCartOpen && <ShoppingCart />}
      {isProfileMenuOpen && <ProfileMenu />}
      {(isCartOpen || isProfileMenuOpen) && <DarkOverlay />}
    </MainContainer>
  );
};

export default Navigation;
