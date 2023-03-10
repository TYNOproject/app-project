import React from "react";
import { View, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const SelectOption = ({
  options,
  defaultText,
  buttonStyle,
  onSelectOption,
}) => {
  return (
    <SelectDropdown
      buttonStyle={buttonStyle}
      renderDropdownIcon={(isOpened) => {
        return (
          <FontAwesome
            name={isOpened ? "chevron-up" : "chevron-down"}
            color={"#444"}
            size={18}
          />
        );
      }}
      dropdownIconPosition={"left"}
      data={options}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
      onSelect={(selectedItem, index) => onSelectOption(selectedItem)}
      defaultButtonText={defaultText}
    />
  );
};

const styles = StyleSheet.create({});

export default SelectOption;
