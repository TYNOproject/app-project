import React from "react";
import { Button } from "@react-native-material/core";

const EntranceScreen = () => (
  <Button title="Click Me" onPress={() => alert("EntranceScreen")}/>
);

export default EntranceScreen;