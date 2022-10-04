import BeerList from "./components/BeerList.js";
import styles from "./beer.module.css";

function BeerPage() {
  return (
    <>
      <header>
        <h1 className={styles.beerTitle}>Punk API Beers</h1>
      </header>
      <nav class="container-filter"></nav>
      <section>
        <BeerList />
      </section>
    </>
  );
}

export default BeerPage;
