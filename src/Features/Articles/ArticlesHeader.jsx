import Icons from "../../Ui/Icons";
import MenuBar from "../../Ui/MenuBar";
import NavBar from "./../../Ui/NavBar";
import SideBar from "../../Ui/SideBar";
import { useArticles } from "./useArticles";
import Spinner from "../../Ui/Spinner";
import Article from "./Article";

function ArticlesHeader() {
  const { isLoading, articles } = useArticles();

  if (isLoading) return <Spinner />;

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

        <div className="flex gap-x-10 mx-2.5 lg:mx-33.75">
          <SideBar containerClass="xl:flex" widthClass="w-64" />
          <div className="flex flex-col gap-y-8 xl:w-[70%] mt-5 xl:mt-0">
            {articles.map((article) => (
              <Article article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

export default ArticlesHeader;
