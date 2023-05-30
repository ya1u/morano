import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Tts from 'react-native-tts';

const apiKey = 'AIzaSyBOPrHwjKxyy7QyTipWR8qvqThlZQhSem0'; // replace with your own API key

export default function Translate(props: any) {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const dismissKeyboard = (): void => {
    Keyboard.dismiss();
  };

  const btnReset = (): void => {
    setText('');
  };

  const btnClipboard = (): void => {
    Alert.alert('Clipboard');
    Clipboard.setString(result);
  };

  const translateText = async () => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const format = 'text';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: props.sourceLang,
          target: props.targetLang,
          format: format,
        }),
      });

      const rs = await response.json();

      if (rs.data && rs.data.translations && rs.data.translations.length > 0) {
        setResult(rs.data.translations[0].translatedText);
      } else {
        Alert.alert('Translation failed');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Translation failed');
    }
  };

  // Define a flag to track if the event listeners have been added
  let eventListenersAdded = false;

  const textToSpeech = (txt: string) => {
    Tts.getInitStatus().then(() => {
      Tts.speak(txt, {
        iosVoiceId: 'default',
        rate: 0.55,
        androidParams: {
          KEY_PARAM_PAN: 0,
          KEY_PARAM_VOLUME: 1,
          KEY_PARAM_STREAM: 'STREAM_MUSIC',
        },
      });
    });

    if (!eventListenersAdded) {
      // Add the event listeners
      Tts.addEventListener('tts-start', () => null);
      Tts.addEventListener('tts-progress', () => null);
      Tts.addEventListener('tts-finish', () => null);
      Tts.addEventListener('tts-cancel', () => null);

      eventListenersAdded = true; // Update the flag
    }
  };

  useEffect(() => {
    translateText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, props.sourceLang, props.targetLang]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={dismissKeyboard}
      style={[styles.container, props.isDarkMode && styles.container_dm]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, props.isDarkMode && styles.input_dm]}
          onChangeText={setText}
          value={text}
          placeholder="무엇을 번역해드릴까요?"
          placeholderTextColor={props.isDarkMode ? '#C2C2C2' : 'darkgrey'}
          multiline={true}
        />

        <TouchableOpacity
          style={[styles.xButton, props.isDarkMode && styles.button_dm]}
          onPress={btnReset}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
        {text ? (
          <TouchableOpacity
            style={[
              styles.soundButton,
              props.isDarkMode && styles.soundButton_dm,
            ]}
            onPress={() => textToSpeech(text)}>
            {props.isdarkMode ? (
              <Image
                style={styles.btnSound}
                source={require('../assets/icon-sound-darkmode.png')}
              />
            ) : (
              <Image
                style={styles.btnSound}
                source={require('../assets/icon-sound.png')}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={[styles.outputContainer]}>
        {text ? (
          <TextInput
            style={[styles.output, props.isDarkMode && styles.output_dm]}
            value={result}
            multiline={true}
            editable={false}
          />
        ) : (
          <Image
            source={
              props.isDarkMode
                ? require('../assets/icon-what-darkmode.png')
                : require('../assets/icon-what.png')
            }
          />
        )}

        {text ? (
          <TouchableOpacity
            style={[
              styles.soundButton,
              props.isDarkMode && styles.soundButton_dm,
            ]}
            onPress={() => textToSpeech(result)}>
            {props.isdarkMode ? (
              <Image
                style={styles.btnSound}
                source={require('../assets/icon-sound-darkmode.png')}
              />
            ) : (
              <Image
                style={styles.btnSound}
                source={require('../assets/icon-sound.png')}
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={[
          styles.btnContainer,
          props.isDarkMode && styles.btnContainer_dm,
        ]}>
        <TouchableOpacity onPress={btnClipboard}>
          {props.isDarkMode ? (
            <Image
              style={styles.btnImg}
              source={require('../assets/icon-clipboard-darkmode.png')}
            />
          ) : (
            <Image
              style={styles.btnImg}
              source={require('../assets/icon-clipboard.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          {props.isDarkMode ? (
            <Image
              style={styles.btnImg}
              source={require('../assets/icon-screenCapture-darkmode.png')}
            />
          ) : (
            <Image
              style={styles.btnImg}
              source={require('../assets/icon-screenCapture.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          {/* <Image
            style={styles.btnImg}
            source={require('../assets/icon-zoomIn.png')}
          /> */}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: '#FFF',
    width: Dimensions.get('window').width,
  },
  container_dm: {
    backgroundColor: '#202B38',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'darkgrey',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    fontSize: 24,
    paddingHorizontal: 10,
    color: 'black',
    textAlign: 'center',
  },
  input_dm: {
    color: '#C2C2C2',
  },
  outputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  output: {
    flex: 1,
    fontSize: 24,
    paddingHorizontal: 10,
    color: 'black',
    textAlign: 'center',
  },
  output_dm: {
    color: '#C2C2C2',
  },
  xButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    marginTop: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_dm: {
    backgroundColor: '#003458',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  soundButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: 'skyblue',
    width: 60,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundButton_dm: {
    backgroundColor: '#003458',
  },
  btnSound: {
    width: 22,
    height: 22,
  },
  btnContainer: {
    flex: 1,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer_dm: {
    backgroundColor: '#003458',
  },
  btnImg: {
    width: 46,
    height: 46,
    marginHorizontal: 5,
  },
});
