import * as React from 'react';

import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { ScanCardModule, ScanCardReturnType} from 'react-native-hyperswitch-scancard';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function App() {
  const [result, setResult] = React.useState<ScanCardReturnType | null>(null);

  const handleScanCardCallback = (scanData: ScanCardReturnType | null) => {
    setResult(scanData);
    console.log(scanData);
  };

  var button = <Text style={styles.button}>Start Scan</Text>

  return (
    <SafeAreaView style={styles.container}>
      <View>
      <Text>Card Number: {result?.data?.pan}</Text>
      <Text>Expiry Month: {result?.data?.expiryMonth}</Text>
      <Text>Expiry Year: {result?.data?.expiryYear}</Text>
      <ScanCardModule.ScanCardComponent buttonView = {button} callback={handleScanCardCallback}/>
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
  button: {
    backgroundColor: "red"
  },
  box: {
    width: '100%',
    height: '100%',
    marginVertical: 20,
    backgroundColor: "white"
  },
});
