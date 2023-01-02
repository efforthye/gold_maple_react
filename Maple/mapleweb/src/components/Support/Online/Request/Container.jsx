import UncontrolledExample from "./Component";
import { useEffect, useState } from "react";
import axios from "axios";
const categoryArrFun = async (setCategory) => {
  try {
    let categoryArr = (
      await axios.post("/api/support/displaycategory")
    ).data;
    setCategory(categoryArr);
  } catch (err) {
    console.error(err);
  }
};

const RequestContainer = () => {
  const [categoryArr, setCategory] = useState([]);
  useEffect(() => {
    categoryArrFun(setCategory);
  }, []);
  return <UncontrolledExample categoryArr={categoryArr} />;
};

export default RequestContainer;
