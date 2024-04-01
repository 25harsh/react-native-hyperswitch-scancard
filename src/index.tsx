import React from 'react';
import { NativeModules, TouchableOpacity} from 'react-native';

const HyperswitchScancard = NativeModules.HyperswitchScancard || null;

const isAvailable = HyperswitchScancard != null

export interface ScanCardReturnType {
  status: string;
  data?: ScanCardData;
}

interface ScanCardData {
  pan: string;
  expiryMonth: string;
  expiryYear: string;
}

function launchScanCard(message: string, callback: (s: ScanCardReturnType) => void): void {
  if (HyperswitchScancard) {
  return HyperswitchScancard.launchScanCard(message, (response: Record<string, any>) => {
    const status = response.status || 'Default';
    const data: ScanCardData | undefined = response.data;
    const scanData: ScanCardReturnType = {
      status,
      data: data
        ? {
            pan: data.pan || '',
            expiryMonth: data.expiryMonth || '',
            expiryYear: data.expiryYear || '',
          }
        : undefined,
    };
    callback(scanData);
  });
}}

interface ScanCardProps {
  callback: (data: ScanCardReturnType) => void;
  buttonView: React.ReactNode;
}

const ScanCardComponent: React.FC<ScanCardProps> = ({ buttonView, callback }) => {
  if (HyperswitchScancard) {
    return (
      <TouchableOpacity onPress={() => launchScanCard('', callback)}>
        {buttonView}
      </TouchableOpacity>
    );
  }
   else {
    return null;
  }
};

export const ScanCardModule = {
  ScanCardComponent,
  isAvailable,
};
