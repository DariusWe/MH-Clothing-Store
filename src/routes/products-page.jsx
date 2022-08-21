import { CategoryTitle, CategoryDescription, ProductsContainer } from "./products-page.styles";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopProductsContext } from "../contexts/shopProductsContext";
import ProductItem from "../components/product-item";
import FilterSection from "../components/filter-section";

const ProductsPage = () => {
  const params = useParams();
  const categoryProducts = [];
  const { womenProducts, menProducts } = useContext(ShopProductsContext);

  // Depending on the URL, push women or men categories into the categorie variable. Delete spaces of category, as URL spaces are also stripped.
  if (params.sex === "women" && womenProducts.length > 0) {
    const productArr = womenProducts.filter((category) => category.titleSanitized === params.category)[0].items;
    categoryProducts.push(...productArr);
  } else if (menProducts.length > 0) {
    const productArr = menProducts.filter((category) => category.titleSanitized === params.category)[0].items;
    categoryProducts.push(...productArr);
  }

  return (
    <>
      <CategoryTitle>{params.category.replace("&", " & ")}</CategoryTitle>
      <CategoryDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis blandit bibendum. Ut ac elit at nunc porta imperdiet. Nulla rutrum velit at dolor iaculis efficitur. Sed sit amet porta magna. Maecenas eu ipsum eu mi ornare maximus nec at lorem. Phasellus non maximus enim. Nullam congue suscipit condimentum. Aliquam non mauris nunc.</CategoryDescription>
      <FilterSection />
      <ProductsContainer>
        {categoryProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </>
  );
};

export default ProductsPage;
