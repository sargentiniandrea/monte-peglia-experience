import axios from "axios";
import { useState, useEffect } from "react";
import { useGlobalContext } from "./context";

const useFetch = (postType = "attivita", slug) => {
  const url = "https://backend.andreasargentini.com/wp-json/wp/v2/";
  const { setFilterProducts } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [categorie, setCategorie] = useState([]);

  useEffect(() => {
    (async (postType, slug) => {
      setIsError(false);
      setIsLoading(true);
      try {
        let response = [];
        if (slug) {
          response = await axios.get(`${url}${postType}?slug=${slug}`);
        } else {
          response = await axios.get(`${url}${postType}`);
        }
        setData(response.data);
        if (postType === "attivita") {
          const set = new Set();
          response.data.map((el) => {
            if (el.ACF.categorie_attivita) {
              el.ACF.categorie_attivita.map((el2) => {
                set.add(el2);
              });
            }
          });
          const nuoveCategorie = Array.from(set);
          nuoveCategorie.unshift("Tutto");
          setCategorie(nuoveCategorie);
          setFilterProducts(response.data);
        }
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
      setIsLoading(false);
    })(postType, slug);
  }, []);
  return {
    isLoading,
    isError,
    data,
    categorie,
  };
};

export default useFetch;
