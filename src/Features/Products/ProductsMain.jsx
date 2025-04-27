import Icons from "../../Ui/Icons";
import Product from "./Product";
import { useProducts } from "./useProducts";
import Spinner from "../../Ui/Spinner";

function ProductsMain() {
  const { isLoading, products } = useProducts();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Icons />
      <main>
        <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-9 mt-5 mx-2.5 lg:mx-33.75">
          {products.map((product) => (
            <Product product={product} key={product.slug} />
          ))}
        </section>
      </main>
    </>
  );
}

export default ProductsMain;
