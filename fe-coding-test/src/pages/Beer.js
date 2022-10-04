import BeerList from "./components/BeerList.js";
import "./beer.css";

function BeerPage() {
  return (
    <>
      <header>
        <h1 className="beer-title">Punk API Beers</h1>
      </header>
      <nav class="container-filter"></nav>
      <section>
        <BeerList />
      </section>
    </>
  );
}

export default BeerPage;
