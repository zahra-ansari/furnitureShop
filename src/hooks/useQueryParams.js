import { useLocation } from "react-router-dom";

function useQueryParams() {
  const { search } = useLocation();
  //console.log(search);  // ?search=%D9%85%D8%AF%D8%B1%D9%86&category=all

  // it returns an object that allows us to access the parameters of search(searchTerm, category)
  return new URLSearchParams(search);
}

export default useQueryParams;
