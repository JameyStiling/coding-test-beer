import styles from "../beer.module.css";

function BeerImg({ url, screenType }) {
  // const rotateImage = screenType === "desktop" ? styles.rotate : "";

  return (
    <div>
      <img className={`${styles.img}`} src={url} />
    </div>
  );
}

export default BeerImg;
