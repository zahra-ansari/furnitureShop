import EachProductFooter from "../Features/EachProduct/EachProductFooter";
import EachProductHeader from "../Features/EachProduct/EachProductHeader";
import EachProductMain from "../Features/EachProduct/EachProductMain";
import { useFetchCommentsOfProduct } from "../Features/EachProduct/useFetchCommentsOfProduct";
import { useProductDetail } from "../Features/EachProduct/useProductDetail";
import Spinner from "../Ui/Spinner";

function EachProduct() {
  const { isLoading } = useProductDetail();
  const { isPendingFetchComments } = useFetchCommentsOfProduct();

  if (isLoading) return <Spinner />;
  if (isPendingFetchComments) return <Spinner />;

  return (
    <>
      <EachProductHeader />
      <EachProductMain />
      <EachProductFooter />
    </>
  );
}

export default EachProduct;
