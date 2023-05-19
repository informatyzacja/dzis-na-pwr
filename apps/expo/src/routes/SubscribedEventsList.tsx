import AppbarComponent from '../components/AppbarComponent';
import EventCard from '../components/EventCard';
import { useSubscribedEvents } from '../hooks/useSubscribedEvents';
import { View, StyleSheet, FlatList } from 'react-native';

const SubscribedEventsList = () => {
  const { subscribedEvents } = useSubscribedEvents();

  return (
    <>
      <AppbarComponent title={'Zapisane wydarzenia'} />
      <View style={styles.eventListContainer}>
        <FlatList
          data={subscribedEvents}
          renderItem={({ item }) => <EventCard item={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  eventListContainer: {
    flex: 1,
    marginHorizontal: 13,
    marginTop: 10,
  },
});
export default SubscribedEventsList;
