import styles from "./beerlist.module.css";

const BeerExtraInfo = ({ beer }) => {
  return (
    <div>
      <div className={styles.pairWith}>Pair it with: </div>
      <ul>
        {beer?.food_pairing?.map((pairing, i) => {
          return <li key={i}>{pairing}</li>;
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
  );
};

export default BeerExtraInfo;
