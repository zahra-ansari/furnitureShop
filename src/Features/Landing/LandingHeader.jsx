import MenuBar from "../../Ui/MenuBar";
import NavBar from "../../Ui/NavBar";
import SideBar from "../../Ui/SideBar";
import Icons from "./../../Ui/Icons";
import PortfolioSwiper from "./PortfolioSwiper";

function LandingHeader() {
  return (
    <>
      <Icons />
      <header>
        <NavBar containerClass="sm:flex" hiddenClass="sm:hidden" />
        <MenuBar containerClass="flex" widthClass="xl:w-64" />
        <div className="flex gap-x-2.5 mx-2.5 lg:mx-33.75">
          <SideBar containerClass="sm:flex" widthClass="w-64" />
          <PortfolioSwiper />
        </div>
      </header>
    </>
  );
}

export default LandingHeader;
