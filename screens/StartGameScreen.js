import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Card from "../components/Card";
import color from "../constants/color";
import Input from "../components/Input";
const StartGameScreen = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const numberInputHandler = () => {
    setEnteredValue(enteredValue.replace(/[^1-9]/g, "10"));
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
  };
  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = <Text>Chosen Number: {selectedNumber}</Text>;
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss;
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.Input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboard="number-pad"
            maxLength={2}
            value={enteredValue}
            onChange={numberInputHandler}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Reset"
              onPress={() => {
                resetInputHandler;
              }}
              color={color.accent}
            />
            <Button
              title="Confirm"
              onPress={() => {
                confirmInputHandler;
              }}
              color={color.primary}
            />
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    //flex: 1,
    //padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  Input: {
    width: 50,
    textAlign: "center",
  },
});
export default StartGameScreen;
