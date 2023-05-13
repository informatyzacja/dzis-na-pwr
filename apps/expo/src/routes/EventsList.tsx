import { RouterOutputs, api } from '../api';
import AppbarComponent from '../components/AppbarComponent';
import EventCard from '../components/EventCard';
import { RootStackParamList } from './Navbar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export type EventsListProps = NativeStackScreenProps<
  RootStackParamList,
  'EventsList'
>;

export type EventsListNavigationProp = EventsListProps['navigation'];

export type Event = RouterOutputs['events']['list'][number];

const EventsList = (props: EventsListProps) => {
  const { data, isLoading, error } = api.events.list.useQuery();
  return (
    <>
      <AppbarComponent title={'Wydarzenia'} />

      {isLoading === true ? (
        <View style={styles.loadingElementsContainer}>
          <Text variant="headlineSmall">Wczytuję dane</Text>
        </View>
      ) : isLoading === false && error === null && data ? (
        <View style={styles.eventListContainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => <EventCard item={item} />}
          />
        </View>
      ) : (
        <View style={styles.loadingElementsContainer}>
          <Text variant="headlineSmall">Wystąpił nieoczekiwany błąd</Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  eventListContainer: {
    flex: 1,
  },
  loadingElementsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EventsList;
