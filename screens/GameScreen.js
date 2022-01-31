import React, { useState, useRef, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
const GameScreen = (props) => {
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 99, props.userChoice)
  );
  const [confirmed, setConfirmed] = useState();
  const [rounds, setRounds] = useState(0);

  const { userChoice, onGameOver } = props

  useEffect(() => {
      if(currentGuess === userChoice){
          onGameOver(rounds)
      }
  },[currentGuess,userChoice,onGameOver])

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess > props.userChoice) ||
      (direction === "upper" && currentGuess < props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <View>
        <Text>You selected</Text>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
          <Button
            title="LOWER"
            onPress={() => {
              nextGuessHandler.bind(this, "lower");
            }}
          />
          <Button
            title="UPPER"
            onPress={() => {
              nextGuessHandler.bind(this, "upper");
            }}
          />
        </Card>
      </View>
    );
  }

  
  return (
    <View>
      <Text></Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Button title="Lower" onPress={() => {}} />
        <Button title="Higher" onPress={() => {}} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});
export default GameScreen;
