import theme from '../theme';
import CardRow from './CardRow';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const SubEventCard = ({ subEvent }) => {
  const startDateSplitted = subEvent.startDate.split('T');
  return (
    <View style={styles.cardContainer}>
      <View style={styles.titleContainer}>
        <Text variant="titleMedium">{subEvent.name}</Text>
      </View>
      <View style={styles.timeContainer}>
        <CardRow icon={'calendar'} text={startDateSplitted[0]} />
        <CardRow icon={'clock'} text={startDateSplitted[1].slice(0, -1)} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: theme.colors.surfaceVariant,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'center',
    paddingLeft: 5,
    flexGrow: 1.5,
  },
  timeContainer: { flex: 1, flexDirection: 'column', alignSelf: 'flex-end' },
});
export default SubEventCard;
