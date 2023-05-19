import { RouterOutputs, api } from '../api';
import AppbarComponent from '../components/AppbarComponent';
import EventCard from '../components/EventCard';
import { RootStackParamList } from './Navbar';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar, Text, TextInput } from 'react-native-paper';

export type EventsListProps = MaterialBottomTabScreenProps<
  RootStackParamList,
  'Events'
>;

export type EventsListNavigationProp = EventsListProps['navigation'];

export type Event = RouterOutputs['events']['list'][number];

const EventsList = (props: EventsListProps) => {
  const { data, isLoading, error } = api.events.list.useQuery();

  return (
    <>
      <Searchbar
        value=""
        style={{
          marginTop: 50,
          marginBottom: 10,
          marginHorizontal: 13,
        }}
        placeholder="Szukaj wydarzenia"
      />

      {isLoading === true ? (
        <View style={styles.loadingElementsContainer}>
          <Text variant="headlineSmall">Wczytuję dane</Text>
        </View>
      ) : isLoading === false && error === null && data ? (
        <View style={styles.eventListContainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => <EventCard item={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
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
    marginHorizontal: 13,
  },
  loadingElementsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EventsList;
