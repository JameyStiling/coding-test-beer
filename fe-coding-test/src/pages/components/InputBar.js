import styles from "./inputbar.module.css";

const FilterBar = ({ onChange, onSubmit, screenType }) => {
  return (
    <form onSubmit={onSubmit}>
      <label className={styles.filterLabel}>Filter beer by name</label>
      <input
        className={styles.input}
        type="text"
        onChange={onChange}
        placeholder={"example: Hazy Jane"}
      />
    </form>
  );
};

export default FilterBar;
