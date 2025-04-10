import styles from "./LoadMore.module.css";

function LoadMore({ onClick, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className={styles.box}>
      <button onClick={onClick} className={styles.btn}>
        Load more
      </button>
    </div>
  );
}

export default LoadMore;
