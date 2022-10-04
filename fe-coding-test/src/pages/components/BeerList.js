import axios from "axios";
import { useEffect, useState } from "react";

const calcIsMobile = () => {
  const breakpoint = 480; //set mobile breakpoint at 480px
  const currentWidth = window.innerWidth;
  return currentWidth < breakpoint;
};

function BeerList() {
  const [isMobile, setIsMobile] = useState(calcIsMobile);
  const [beers, getBeers] = useState([]);
  const apiUrl = "https://api.punkapi.com/v2/beers";

  useEffect(() => {
    getBeer();

    const handleWindowResize = () => {
      setIsMobile(calcIsMobile);
    };
    window.addEventListener("resize", handleWindowResize);
    // removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const getBeer = () => {
    axios
      .get(apiUrl, {
        params: {},
      })
      .then((response) => {
        const allBeers = response.data;
        getBeers(allBeers);
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <>
      <div class="container-main">
        {beers.map((beer) => {
          return (
            <article className="item">
              <div className="card-header">{beer.name}</div>
              <div classname="card-tagline">{beer.tagline}</div>
              <div className="card-img">
                <img src={beer.image_url} />
              </div>
              <div className="description">{beer.description}</div>
              {!isMobile && (
                <div>
                  <div>Pair it with: </div>
                  <ul>
                    {beer?.food_pairing?.map((pairing) => {
                      return <li>{pairing}</li>;
                    })}
                  </ul>
                  <ul className="inline-list">
                    <li className="list-item">
                      <span className="title">ABV: </span>
                      {beer.abv}
                    </li>
                    <li className="list-item">
                      <span className="title">IBU: </span>
                      {beer.ibu}
                    </li>
                    <li className="list-item">
                      <span className="title">PH: </span>
                      {beer.ph}
                    </li>
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}

export default BeerList;
