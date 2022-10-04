import BeerList from "./components/BeerList.js";
import styles from "./beer.module.css";
import InputBar from "./components/InputBar.js";
import { calcScreenType } from "./helpers/helpers";
import { useEffect, useState } from "react";

function BeerPage() {
  const [screenType, setScreenType] = useState(calcScreenType);
  const [inputValue, setInputValue] = useState("");
  const [beerName, setBeerName] = useState("");

  useEffect(() => {
    const handleWindowResize = () => {
      setScreenType(calcScreenType);
    };
    window.addEventListener("resize", handleWindowResize);
    // removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setBeerName(inputValue);
  };

  return (
    <>
      <header className={styles.pageHeading}>
        <h1 className={styles.pageTitle}>Punk API Beers</h1>
        <InputBar
          screenType={screenType}
          onSubmit={handleSubmit}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </header>
      <section>
        <BeerList beerName={beerName} screenType={screenType} />
      </section>
    </>
  );
}

export default BeerPage;
