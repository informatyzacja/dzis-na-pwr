import theme from '../theme';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

const CardRow = ({ icon, text }) => {
  return (
    <View style={styles.cardRowContainer}>
      <Avatar.Icon
        color={theme.colors.onSurfaceVariant}
        style={{ backgroundColor: 'transparent' }}
        size={28}
        icon={icon}
      />
      <Text variant="bodyLarge">{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  cardRowContainer: { flex: 1, flexDirection: 'row' },
});
export default CardRow;
