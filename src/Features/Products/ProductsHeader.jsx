import Icons from "../../Ui/Icons";
import MenuBar from "../../Ui/MenuBar";
import NavBar from "../../Ui/NavBar";

function ProductsHeader() {
  return (
    <>
      <Icons />
      <NavBar containerClass="sm:flex" hiddenClass="sm:hidden" />
      <MenuBar containerClass="flex" widthClass="lg:w-64" />
    </>
  );
}

export default ProductsHeader;
