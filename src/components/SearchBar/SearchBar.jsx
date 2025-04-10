import { Field, Form, Formik } from "formik";
import styles from "./SearchBar.module.css";

const SearchBar = ({ handleChangeQuery }) => {
  const initialValues = {
    query: "",
  };
  const handleSubmit = (values, options) => {
    console.log(values);
    handleChangeQuery(values.query);
    options.resetForm();
  };
  return (
    <div className={styles.box}>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field className={styles.field} name="query" />
          <button className={styles.btn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
