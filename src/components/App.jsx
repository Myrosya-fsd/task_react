import { useState, useEffect } from "react";
import { fetchHits } from "../services/api";
import List from "./List/List";
import SearchBar from "./SearchBar/SearchBar";
import Loader from "./Loader/loader";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import toast from "react-hot-toast";
import LoadMore from "./LoadMore/LoadMore";
import "./App.css";

function App() {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    //axios.get("https://hn.algolia.com/api/v1/search?").then((res) => {
    //  setHits(res.data.hits);
    //});
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsErrorMessage(false);
        const data = await fetchHits(query, page, abortController.signal);
        setHits((prev) => [...prev, ...data.hits]);
        setTotalPages(data.nbPages - 1);
      } catch (error) {
        console.log(error);
        if (error.code !== "ERR_CANCELED") {
          setIsErrorMessage(true);
          toast.error("Try again later...");
        }
      } finally {
        setIsLoading(false);
      }
    };
    getData();
    return () => {
      abortController.abort();
    };
  }, [query, page]);
  const handleChangeQuery = (newQuery) => {
    toast.success(`Query changed to ${newQuery}`);
    setQuery(newQuery);
    setHits([]); //скидає попередньозавантажені сторінки після зміни теми запиту
    setPage(0); //скидає номер сторінки до 0 після введення нового запиту
  };

  const canLoadMore = page < totalPages && !isLoading;

  return (
    <>
      <SearchBar handleChangeQuery={handleChangeQuery} />
      <List hits={hits.filter((item) => item.title || item.story_title)} />
      {isErrorMessage && <ErrorMessage message="Server is dead..." />}
      {isLoading && <Loader />}
      <LoadMore onClick={() => setPage(page + 1)} isVisible={canLoadMore} />
    </>
  );
}

export default App;
