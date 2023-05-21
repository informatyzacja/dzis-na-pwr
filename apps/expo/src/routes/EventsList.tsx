import { RouterOutputs, api } from '../api';
import EventCard from '../components/EventCard';
import { RootStackParamList } from './Navbar';
import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';

export type EventsListProps = MaterialBottomTabScreenProps<
  RootStackParamList,
  'Events'
>;

export type EventsListNavigationProp = EventsListProps['navigation'];

export type Event = RouterOutputs['events']['list'][number];

const EventsList = (props: EventsListProps) => {
  const { data, isLoading, error, refetch } = api.events.list.useQuery();

  const [isManuallyRefetching, setIsManuallyRefetching] = useState(false);

  const onRefetch = () => {
    setIsManuallyRefetching(true);
    refetch().then(() => {
      setIsManuallyRefetching(false);
    });
  };

  return (
    <>
      <View style={styles.eventListContainer}>
        <Searchbar
          value=""
          style={{
            marginBottom: 10,
          }}
          onPressIn={() => {
            props.navigation.navigate('Search');
          }}
          placeholder="Szukaj wydarzenia"
        />
        {isLoading === true ? (
          <View style={styles.loadingElementsContainer}>
            <Text variant="headlineSmall">Wczytuję dane</Text>
          </View>
        ) : isLoading === false && error === null && data ? (
          <FlatList
            refreshing={isManuallyRefetching}
            onRefresh={() => onRefetch()}
            data={data}
            renderItem={({ item }) => <EventCard item={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        ) : (
          <View style={styles.loadingElementsContainer}>
            <Text variant="headlineSmall">Wystąpił nieoczekiwany błąd</Text>
          </View>
        )}
      </View>
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
