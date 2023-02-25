import React, { useState } from "react";
import { Stack, Button, Text } from "@react-native-material/core";
import PopUpMenu from "../components/PopUpMenu";

const HomeScreen = ({ navigation }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Stack fill center spacing={10}>
    <Button
      title={<Text style={{ color: "black", fontSize: 40 }}>≡</Text>}
      onPress={handleMenuToggle}
      style={{
        position: "absolute",
        top: 0,
        left: 315,
        height: 60,
        width: 100
      }}
    />


      {showMenu && (
        <PopUpMenu
          navigation={navigation}
          hideMenu={handleMenuToggle}
        />
      )}
    </Stack>
  );
};

export default HomeScreen;
