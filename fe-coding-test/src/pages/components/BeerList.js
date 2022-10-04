import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./beerlist.module.css";
import BeerImg from "./BeerImg.js";
import BeerExtraInfo from "./BeerExtraInfo.js";

function BeerList({ screenType, beerName }) {
  const [beers, getBeers] = useState([]);
  const [page, setPage] = useState(1);
  const apiUrl = "https://api.punkapi.com/v2/beers";

  useEffect(() => {
    getBeer(1, beerName);
  }, [beerName]);

  const getBeer = (page, beer_name) => {
    axios
      .get(apiUrl, {
        params: {
          per_page: 20,
          page,
          ...(beer_name && { beer_name }),
        },
      })
      .then((response) => {
        const beersResponse = response.data;
        if (page === 1) {
          getBeers(beersResponse);
        } else {
          getBeers([...beers, ...beersResponse]);
        }
      })
      .catch((err) => console.log("err", err));
  };

  const handleGetMoreBeer = () => {
    getBeer(page + 1, beerName);
    setPage(page + 1);
  };

  return (
    <>
      <div className={styles.container}>
        {beers.map((beer) => {
          return (
            <article key={beer.tagline} className={styles.item}>
              <div className={styles.beerTitle}>{beer.name}</div>
              <div>{beer.tagline}</div>
              <BeerImg url={beer.image_url} screenType={screenType} />
              <div className={styles.description}>{beer.description}</div>
              {screenType === "desktop" && <BeerExtraInfo beer={beer} />}
            </article>
          );
        })}
      </div>
      <button className={styles.button} onClick={handleGetMoreBeer}>
        Load more Beer
      </button>
    </>
  );
}

export default BeerList;
