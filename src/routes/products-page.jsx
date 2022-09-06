import { Container, CategoryTitle, CategoryDescription, ProductsContainer } from "./products-page.styles";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductItem from "../components/product-item";
import FilterSection from "../components/filter-section";
import { selectWomenProducts, selectMenProducts } from "../store/products/products.selectors";

const ProductsPage = () => {
  console.log("Render/Rerender of ProductsPage");
  const {gender, category} = useParams();
  const categoryProducts = [];
  const womenProducts = useSelector(selectWomenProducts);
  const menProducts = useSelector(selectMenProducts);

  // Depending on the URL, push women or men categories into the categorie variable. Delete spaces of category, as URL spaces are also stripped.
  if (gender === "women" && womenProducts.length > 0) {
    const productArr = womenProducts.filter((cat) => cat.titleSanitized === category)[0].items;
    categoryProducts.push(...productArr);
  } else if (menProducts.length > 0) {
    const productArr = menProducts.filter((cat) => cat.titleSanitized === category)[0].items;
    categoryProducts.push(...productArr);
  }

  return (
    <Container>
      <CategoryTitle>{category.replace("&", " & ")}</CategoryTitle>
      <CategoryDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus mollis blandit bibendum. Ut ac elit at nunc porta imperdiet. Nulla rutrum velit at dolor iaculis efficitur. Sed sit amet porta magna. Maecenas eu ipsum eu mi ornare maximus nec at lorem. Phasellus non maximus enim. Nullam congue suscipit condimentum. Aliquam non mauris nunc.</CategoryDescription>
      <FilterSection />
      <ProductsContainer>
        {categoryProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Container>
  );
};

export default ProductsPage;
