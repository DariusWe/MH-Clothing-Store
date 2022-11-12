import { Container, InfoSection, Notice } from "./favourites-menu-item.styles";
import { useTypedDispatch, useTypedSelector } from "../../../store/hooks";
import { setFavourites } from "../../../store/favourites.slice";
import { addItemToCart } from "../../../store/cart.slice";
import Button from "../../button/button";
import type { Item } from "../../../store/products.slice";

type FavouritesMenuItemProps = {
  product: Item;
};

const FavouritesMenuItem: React.FC<FavouritesMenuItemProps> = ({ product }) => {
  const dispatch = useTypedDispatch();
  const cartItems = useTypedSelector((state) => state.cart.cartItems);

  return (
    <Container>
      <img src={product.imageUrl} alt={product.name} />
      <InfoSection>
        <span>
          <b>{product.name}</b>
        </span>
        <span>{`Price: ${product.price} €`}</span>
        {cartItems.some((item) => item.id === product.id) ? (
          <Notice>This item is in your cart</Notice>
        ) : (
          <Button label="Add to Cart" theme="light" onClick={() => dispatch(addItemToCart(product))} />
        )}

        <Button label="Remove from favourites" theme="light" onClick={() => dispatch(setFavourites(product))} />
      </InfoSection>
    </Container>
  );
};

export default FavouritesMenuItem;