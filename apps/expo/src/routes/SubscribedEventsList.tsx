import AppbarComponent from '../components/AppbarComponent';
import EventCard from '../components/EventCard';
import { useSubscribedEvents } from '../hooks/useSubscribedEvents';
import { View, StyleSheet, FlatList } from 'react-native';

const SubscribedEventsList = ({ navigation }) => {
  const { subscribedEvents } = useSubscribedEvents();

  return (
    <>
      <AppbarComponent title={'Zapisane wydarzenia'} navigation={navigation} />
      <View style={styles.eventListContainer}>
        <FlatList
          data={subscribedEvents}
          renderItem={({ item }) => (
            <EventCard item={item} navigation={navigation} />
          )}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  eventListContainer: {
    flex: 1,
  },
});
export default SubscribedEventsList;
