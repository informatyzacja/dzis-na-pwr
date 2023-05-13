import { RouterOutputs } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

type Event = RouterOutputs['events']['list'][number];

const storage = createJSONStorage<Event[]>(() => AsyncStorage);

export const subscribedEventsAtom = atomWithStorage<Event[]>(
  'subscribedEvents',
  [],
  storage
);
