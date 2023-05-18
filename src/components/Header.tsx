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

export default function Header(props: {
  isDarkMode: boolean | undefined;
  darkModeSwitch: ((value: boolean) => void | Promise<void>) | null | undefined;
}) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.container, props.isDarkMode && styles.container_dm]}>
        <Text style={[styles.btnTitle, props.isDarkMode && styles.btnTitle_dm]}>
          morano
        </Text>
        <Switch
          style={styles.btnSwitch}
          trackColor={{false: '#767577', true: '#CCAC00'}}
          thumbColor={props.isDarkMode ? '#F4F3F4' : '#F4F3F4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={props.darkModeSwitch}
          value={props.isDarkMode}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

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
    fontSize: 30,
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
