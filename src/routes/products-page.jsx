import { Container, CategoryTitle, CategoryDescription, ProductsContainer } from "./products-page.styles";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectWomenCategories, selectMenCategories, selectIsLoading } from "../store/products/products.selectors";
import { selectSortByFilterValue, selectColorFilterValues } from "../store/filters/filters.selectors";
import { setSortByFilterValue, resetColorFilterValue } from "../store/filters/filters.actions";
import ProductItem from "../components/product-item";
import ProductFilters from "../components/product-filters";
import LoadingSpinner from "../components/loading-spinner";

const ProductsPage = () => {
  console.log("Render/Rerender of ProductsPage");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { gender, category } = useParams();
  const womenCategories = useSelector(selectWomenCategories);
  const menCategories = useSelector(selectMenCategories);
  const isLoading = useSelector(selectIsLoading);
  const colors = useSelector(selectColorFilterValues);
  const sortBy = useSelector(selectSortByFilterValue);
  const dispatch = useDispatch();

  // This useEffect runs on mount and then again when women and man products get set or the category changes.
  // Depending on URL params "gender" and "category" push the corresponding products into local state.
  // Initialize the filteredProducts state variable as the filtered Products get rendered.
  useEffect(() => {
    if (womenCategories.length > 0 && menCategories.length > 0) {
      console.log("Setting Products on products page (again) - should only happen ONE TIME.");
      const categoryProducts =
        gender === "women"
          ? womenCategories.filter((cat) => cat.titleSanitized === category)[0].items
          : menCategories.filter((cat) => cat.titleSanitized === category)[0].items;
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    }
  }, [womenCategories, menCategories, category, gender]);

  // Everytime the user navigates to another category, reset all filters:
  useEffect(() => {
    console.log("Resetting filters (should only happen on category change)");
    if (colors.length > 0) {
      dispatch(resetColorFilterValue());
    }
    if (sortBy !== "recommended") {
      dispatch(setSortByFilterValue("recommended"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  // Whenever some filter gets applied, run this useEffect. Filter first, then sort the filtered selection.
  useEffect(() => {
    // Maybe change this line as it does not detect products with more than one color.
    console.log("run filter and sorting effect");
    const filtered = colors.length > 0 ? products.filter((product) => colors.includes(product.color)) : [...products];
    switch (sortBy) {
      case "recommended":
        setFilteredProducts(filtered.sort((a, b) => a.id - b.id));
        break;
      case "lowest price":
        setFilteredProducts(filtered.sort((a, b) => a.price - b.price));
        console.log("case lowest price");
        break;
      case "highest price":
        setFilteredProducts(filtered.sort((a, b) => b.price - a.price));
        break;
      default:
        break;
    }
  }, [colors, sortBy, products]);

  return (
    <Container>
      <CategoryTitle>{category.replace("&", " & ")}</CategoryTitle>
      <CategoryDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis blandit bibendum. Ut ac elit at nunc
        porta imperdiet. Nulla rutrum velit at dolor iaculis efficitur. Sed sit amet porta magna. Maecenas eu ipsum eu
        mi ornare maximus nec at lorem. Phasellus non maximus enim. Nullam congue suscipit condimentum. Aliquam non
        mauris nunc.
      </CategoryDescription>
      <ProductFilters />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProductsContainer>
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </ProductsContainer>
      )}
    </Container>
  );
};

export default ProductsPage;
