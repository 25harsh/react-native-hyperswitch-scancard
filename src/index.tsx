import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-hyperswitch-scancard' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const HyperswitchScancard = NativeModules.HyperswitchScancard
  ? NativeModules.HyperswitchScancard
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function launchScanCard(
  scanCardRequest: string,
  scanCardCallback: (s: Record<string, any>) => void
): void {
  return HyperswitchScancard.launchScanCard(scanCardRequest, scanCardCallback);
}
