import theme from '../theme';
import { TouchableHighlight } from 'react-native';
import { Avatar } from 'react-native-paper';

const SubscribeButton = ({ icon, onPress }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.5}
      underlayColor={theme.colors.primaryContainer}
      onPress={onPress}
    >
      <Avatar.Icon
        icon={icon}
        style={{
          backgroundColor: 'transparent',
        }}
        color={theme.colors.onSurface}
      />
    </TouchableHighlight>
  );
};
export default SubscribeButton;
