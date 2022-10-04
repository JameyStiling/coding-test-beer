import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../beer.module.css";

const calcScreenType = () => {
  const breakpointMobile = 480;
  const breakpointDesktop = 1024;
  const currentWidth = window.innerWidth;
  return currentWidth < breakpointMobile
    ? "mobile"
    : currentWidth > breakpointDesktop
    ? "desktop"
    : "tablet";
};

function BeerList() {
  const [screenType, setScreenType] = useState(calcScreenType);
  const [beers, getBeers] = useState([]);
  const [page, setPage] = useState(1);
  const apiUrl = "https://api.punkapi.com/v2/beers";

  useEffect(() => {
    getBeer(page);

    const handleWindowResize = () => {
      setScreenType(calcScreenType);
    };
    window.addEventListener("resize", handleWindowResize);
    // removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const getBeer = (page) => {
    axios
      .get(apiUrl, {
        params: { per_page: 20, page },
      })
      .then((response) => {
        const allBeers = response.data;
        getBeers([...beers, ...allBeers]);
      })
      .catch((err) => console.log("err", err));
  };

  const handleGetMoreBeer = () => {
    getBeer(page + 1);
    setPage(page + 1);
  };

  return (
    <>
      <div className={styles.container}>
        {beers.map((beer) => {
          return (
            <article key={beer.tagline} className={styles.item}>
              <div className={styles.header}>{beer.name}</div>
              <div className={styles.tagline}>{beer.tagline}</div>
              <div className={styles.img}>
                <img src={beer.image_url} />
              </div>
              <div className={styles.description}>{beer.description}</div>
              {screenType === "desktop" && (
                <div>
                  <div>Pair it with: </div>
                  <ul>
                    {beer?.food_pairing?.map((pairing) => {
                      return <li>{pairing}</li>;
                    })}
                  </ul>
                  <ul className={styles.inlineList}>
                    <li className={styles.listItem}>
                      <span className={styles.title}>ABV: </span>
                      {beer.abv}
                    </li>
                    <li className={styles.listItem}>
                      <span className={styles.title}>IBU: </span>
                      {beer.ibu}
                    </li>
                    <li className={styles.listItem}>
                      <span className={styles.title}>PH: </span>
                      {beer.ph}
                    </li>
                  </ul>
                </div>
              )}
            </article>
          );
        })}
        <button onClick={handleGetMoreBeer}>Load more Beer</button>
      </div>
    </>
  );
}

export default BeerList;
