import Icons from "./../../Ui/Icons";
import { useFetchCommentsOfProduct } from "./useFetchCommentsOfProduct";
import { useProductDetail } from "./useProductDetail";
import CommentBoxForProduct from "./../EachProduct/CommentBoxForProduct";

function EachProductMain() {
  const { productDetail } = useProductDetail();
  const { fetchCommentsOfProduct } = useFetchCommentsOfProduct();

  return (
    <>
      <Icons />
      <CommentBoxForProduct
        productSlug={productDetail.slug}
        fetchCommentsOfProduct={fetchCommentsOfProduct}
      />
    </>
  );
}

export default EachProductMain;
