import styles from "./List.module.css";

const List = ({ hits }) => {
  return (
    <div>
      <ul>
        {hits.map((item) => (
          <li className={styles.item} key={item.objectID}>
            <a href={item.url} target="blank">
              {item.title || item.story_title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
