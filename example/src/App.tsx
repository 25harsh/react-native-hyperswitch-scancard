import * as React from 'react';

import { StyleSheet, View, Text, SafeAreaView, Button } from 'react-native';
import { launchScanCard } from 'react-native-hyperswitch-scancard';

export default function App() {
  const [result, setResult] = React.useState<Record<string, any> | undefined>();

  const callbackFunction = (result: Record<string, any>) => {
  console.log("Scan result:", result);
  setResult(result)

};

function launch() {
  launchScanCard(inputString, callbackFunction)
}

const inputString = "YourInputString";

  React.useEffect(() => {
    launchScanCard(inputString, callbackFunction);
  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Card Number: {result == undefined? "" : result.pan}</Text>
        {/* <Text>Card Holder Name: {result == undefined? "" : result.name}</Text>r */}
        <Text>Expiry Month: {result == undefined? "" : result.expiryMonth}</Text>
        <Text>Expiry Year: {result == undefined? "" : result.expiryYear}</Text>
        <Button
  onPress={launch}
  title="relaunch scan card"
  color="#841584"
/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    height: '100%',
    marginVertical: 20,
    backgroundColor: "white"
  },
});
