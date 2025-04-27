import Icons from "../../Ui/Icons";
import MenuBar from "../../Ui/MenuBar";
import NavBar from "../../Ui/NavBar";
import SideBar from "../../Ui/SideBar";
import ArticleDetail from "./ArticleDetail";
import { useArticleDetail } from "./useArticleDetail";

function EachArticleHeader() {
  const { articleDetail } = useArticleDetail();

  return (
    <>
      <Icons />
      <header>
        <NavBar
          containerClass="xl:flex"
          hiddenClass="xl:hidden"
          positionClass="top-20"
          widthClass="lg:w-44"
        />
        <MenuBar
          containerClass="xl:flex"
          hiddenClass="hidden"
          widthClass="lg:w-64"
        />
        <div className="flex flex-wrap xl:flex-nowrap  mt-6 xl:mt-0 mx-2.5 lg:mx-33.75">
          <SideBar
            containerClass="xl:flex"
            widthClass="w-64"
            shrinkClass="shrink-0"
          />
          <ArticleDetail
            articleDetail={articleDetail}
            key={articleDetail.slug}
          />
        </div>
      </header>
    </>
  );
}

export default EachArticleHeader;
