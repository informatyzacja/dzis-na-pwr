import { RouterOutputs } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

interface Notification {
  eventId: string;
  notificationId: string;
}

const storage = createJSONStorage<Notification[]>(() => AsyncStorage);

export const notificationsAtom = atomWithStorage<Notification[]>(
  'notifications',
  [],
  storage
);
