import Icons from "../../Ui/Icons";
import Spinner from "../../Ui/Spinner";
import Product from "../Products/Product";
import { useSearchedProducts } from "./useSearchedProducts";

function SearchedProductsMain() {
  const { searchedProducts, isLoading } = useSearchedProducts();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Icons />
      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-9 mt-5 mx-2.5 lg:mx-33.75">
        {searchedProducts.map((product) => (
          <Product product={product} key={product.slug} />
        ))}
      </section>
    </>
  );
}

export default SearchedProductsMain;
