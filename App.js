import React from 'react';
import {StyleSheet, View, Button, Text} from 'react-native';
import {pickDocument} from "./components/utils";

export default function App() {

  const [data, setData] = React.useState([])

  const handlePress = async () => {
    const fileContent =  await pickDocument()
    setData(fileContent)
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',fileContent)
  }

  return (
      <View style={styles.container}>
        <Text>Dosya Seç: </Text>
        <Button title="Dosya Seç" onPress={handlePress} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
