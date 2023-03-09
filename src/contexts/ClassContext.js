import { createContext, useState } from "react";

const ClassContext = createContext();

export function ClassProvider({ children }) {
  const [itemsClass, setItemsClass] = useState([]);
  /* Items:
        1. courseId
        2. teacherId
        3. startTime
        4. endTime
    */
  const addToClass = (newKey, newValue) => {
    const existingIndex = itemsClass.findIndex(
      (item) => item[newKey] !== undefined
    );
    if (existingIndex >= 0) {
      setItemsClass((prevState) => {
        const updatedItems = [...prevState];
        updatedItems[existingIndex][newKey] = newValue;
        return updatedItems;
      });
    } else {
      setItemsClass((prevState) => [...prevState, { [newKey]: newValue }]);
    }
  };

  const clearItemsClass = () => {
    setItemsClass([]);
  };

  const getValClass = (objArray, name) => {
    const obj = objArray.find((obj) => obj[name]);
    if (obj) {
      return obj[name];
    } else {
      return null;
    }
  };

  return (
    <ClassContext.Provider
      value={{ itemsClass, addToClass, clearItemsClass, getValClass }}
    >
      {children}
    </ClassContext.Provider>
  );
}

export default ClassContext;
