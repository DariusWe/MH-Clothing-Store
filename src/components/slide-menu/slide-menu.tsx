import { Wrapper, SlideMenuContainer, Label, CloseBtn, DarkOverlay } from "./slide-menu.styles";
import { useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { useTypedDispatch, useTypedSelector } from "../../store/typed-hooks";
import { toggleCart } from "../../store/slices/cart.slice";
import { toggleProfileMenu } from "../../store/slices/user.slice";
import { toggleFavouritesList } from "../../store/slices/favourites.slice";
import { toggleNavbarSideMobile } from "../../store/slices/navbar-side-mobile.slice";
import { ProfileMenu, Cart, FavouritesMenu, NavbarSideMobile } from "../index";

/* 
Notes to CSS-Transition-Group:
To animate a component on mount AND UNMOUNT, you have to use react-css-transition-group. This "library" basically introduces
new lifecycle stages to components, which you can use to toggle classnames. Animations and transitions are still done via CSS.
Important are the exit and exit-active stages: Component moves from exit to exit-active stage in a specified time frame, in which
the animation happens. In this time frame the component and its children are NOT frozen, meaning that content in the children
can unmount while the animation is happening. For that reason i cannot pass the child component to the SlideMenu dynamically
(it would unmount while animation is still running), i have to explicitly hardcode it into the CSSTransition wrapper 
component - and therefore i need three seperate blocks of code to implement the same animation to every MenuSlide child, see 
return statement. 
*/

const SlideMenu: React.FC = () => {
  const dispatch = useTypedDispatch();
  const isCartOpen = useTypedSelector((state) => state.cart.isCartOpen);
  const isProfileMenuOpen = useTypedSelector((state) => state.user.isProfileMenuOpen);
  const isFavouritesOpen = useTypedSelector((state) => state.favourites.isFavouritesOpen);
  const isNavbarSideMobileOpen = useTypedSelector((state) => state.navbarSideMobile.isOpen);
  const isAnyMenuOpen = isCartOpen || isProfileMenuOpen || isFavouritesOpen || isNavbarSideMobileOpen;
  const menuRef = useRef<HTMLDivElement>(null);

  const closeSlideMenu = useCallback(() => {
    // If not using useCallback, this function would be recreated on every render
    // This would lead to useEffect (see below) also beeing run on every render
    isCartOpen && dispatch(toggleCart());
    isProfileMenuOpen && dispatch(toggleProfileMenu());
    isFavouritesOpen && dispatch(toggleFavouritesList());
    isNavbarSideMobileOpen && dispatch(toggleNavbarSideMobile());
  }, [isCartOpen, isProfileMenuOpen, isFavouritesOpen, isNavbarSideMobileOpen, dispatch]);

  ////////////////////////////////////// Outside-click-handler //////////////////////////////////////

  useEffect(() => {
    const checkClickLocation = (e: MouseEvent) => {
      if (e.target instanceof Node) {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          closeSlideMenu();
        }
      }
    };
    isAnyMenuOpen
      ? document.addEventListener("mousedown", checkClickLocation)
      : document.removeEventListener("mousedown", checkClickLocation);
    return () => {
      document.removeEventListener("mousedown", checkClickLocation);
    };
  }, [isAnyMenuOpen, closeSlideMenu]);

  /////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <Wrapper>
      <CSSTransition in={isCartOpen} unmountOnExit timeout={300} classNames="slide-menu">
        <SlideMenuContainer ref={menuRef}>
          <Label>Cart</Label>
          <CloseBtn className="fa-solid fa-xmark" onClick={closeSlideMenu}></CloseBtn>
          <Cart />
        </SlideMenuContainer>
      </CSSTransition>
      <CSSTransition in={isProfileMenuOpen} unmountOnExit timeout={300} classNames="slide-menu">
        <SlideMenuContainer ref={menuRef} style={{ width: "18vw" }}>
          <CloseBtn className="fa-solid fa-xmark" onClick={closeSlideMenu}></CloseBtn>
          <ProfileMenu />
        </SlideMenuContainer>
      </CSSTransition>
      <CSSTransition in={isFavouritesOpen} unmountOnExit timeout={300} classNames="slide-menu">
        <SlideMenuContainer ref={menuRef}>
          <Label>Favourites</Label>
          <CloseBtn className="fa-solid fa-xmark" onClick={closeSlideMenu}></CloseBtn>
          <FavouritesMenu />
        </SlideMenuContainer>
      </CSSTransition>
      <CSSTransition in={isNavbarSideMobileOpen} unmountOnExit timeout={300} classNames="slide-menu">
        <SlideMenuContainer ref={menuRef}>
          <Label>Categories</Label>
          <CloseBtn className="fa-solid fa-xmark" onClick={closeSlideMenu}></CloseBtn>
          <NavbarSideMobile />
        </SlideMenuContainer>
      </CSSTransition>
      <CSSTransition in={isAnyMenuOpen} unmountOnExit timeout={200} classNames="dark-overlay">
        <DarkOverlay />
      </CSSTransition>
    </Wrapper>
  );
};

export default SlideMenu;
