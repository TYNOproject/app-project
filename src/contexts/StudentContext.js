import { createContext, useState } from "react";

const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [items, setItems] = useState([]);
  /* Items:
        1. name
        2. lastname
    */
  const addToStudent = (newKey, newValue) => {
    const existingIndex = items.findIndex((item) => item[newKey] !== undefined);
    if (existingIndex >= 0) {
      setItems((prevState) => {
        const updatedItems = [...prevState];
        updatedItems[existingIndex][newKey] = newValue;
        return updatedItems;
      });
    } else {
      setItems((prevState) => [...prevState, { [newKey]: newValue }]);
    }
  };

  function clearItems() {
    for (let i = 0; i < items.length; i++) {
      for (let key in items[i].studentDetails) {
        items[i].studentDetails[key] = "";
      }
    }
  }
  

  const getVal = (objArray, name) => {
    const obj = objArray.find((obj) => obj[name]);
    if (obj) {
      return obj[name];
    } else {
      return null;
    }
  };

  return (
    <StudentContext.Provider
      value={{ items, addToStudent, clearItems, getVal }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export default StudentContext;
