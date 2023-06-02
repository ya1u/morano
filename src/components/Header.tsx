import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Switch,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';

interface HeaderProps {
  isDarkMode: boolean;
  darkModeSwitch: () => void;
}

const Header: React.FC<HeaderProps> = ({isDarkMode, darkModeSwitch}) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleDarkModeSwitch = () => {
    darkModeSwitch();
    if (isDarkMode) {
      showMessage({
        message: '라이트모드',
        icon: 'info',
        duration: 700,
      });
    } else {
      showMessage({
        message: '다크모드',
        icon: 'info',
        duration: 700,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.container, isDarkMode && styles.container_dm]}>
        <Text style={[styles.btnTitle, isDarkMode && styles.btnTitle_dm]}>
          morano
        </Text>
        <Switch
          style={styles.btnSwitch}
          trackColor={{false: '#767577', true: '#CCAC00'}}
          thumbColor={isDarkMode ? '#F4F3F4' : '#F4F3F4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={handleDarkModeSwitch}
          value={isDarkMode}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'skyblue',
  },
  container_dm: {
    backgroundColor: '#003458',
  },
  btnTitle: {
    color: 'black',
    fontSize: 38,
    fontWeight: 'bold',
  },
  btnTitle_dm: {
    color: '#C2C2C2',
  },
  btnSwitch: {
    position: 'absolute',
    right: 10,
  },
});

export default Header;
