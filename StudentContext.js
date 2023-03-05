import { createContext, useState} from "react";

const StudentContext = createContext();

export function StudentProvider({children}){
    const [items, setItems] = useState([]);
    /* Items:
        1. name
        2. lastname
    */
    const addToStudent = (newKey, newValue) =>{
        setItems((prevState) => [...prevState, {[newKey]: newValue}]);
      };

      const clearItems = () => {
        setItems([]);
    };

    const getVal = (objArray, name) => {
        const obj = objArray.find(obj => obj[name]);
        if (obj) {
          return obj[name];
        } else {
          return null;
        }
    }

    return (
        <StudentContext.Provider value = {{items, addToStudent, clearItems, getVal}}>
            {children}
        </StudentContext.Provider>
    );
}

export default StudentContext;