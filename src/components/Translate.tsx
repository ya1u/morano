import React, {useEffect, useState, useRef} from 'react';
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
import {showMessage} from 'react-native-flash-message';
import Tts from 'react-native-tts';
import {API_KEY, API_URL_TRANSLATE} from '@env';

const apiKey = API_KEY;
const apiUrl = API_URL_TRANSLATE;

const Translate: React.FC<any> = props => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [showCursor, setShowCursor] = useState<boolean>(true);
  const [cursorFlick, setCursorFlick] = useState<boolean>(true);
  const [eventListenersAdded, setEventListenersAdded] =
    useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorFlick(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const dismissKeyboard = (): void => {
    Keyboard.dismiss();
  };

  const btnReset = (): void => {
    setText('');
  };

  const btnClipboard = (): void => {
    showMessage({
      message: '클립보드에 복사되었습니다.',
      icon: 'success',
      duration: 700, // Duration in milliseconds
    });
    Clipboard.setString(result);
  };

  const translateText = async () => {
    const url = `${apiUrl}${apiKey}`;
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

  const textToSpeech = (txt: string, lang: string) => {
    if (
      lang === 'ko' ||
      lang === 'en' ||
      lang === 'ar' ||
      lang === 'bg' ||
      lang === 'ca' ||
      lang === 'zh-CN' ||
      lang === 'zh-TW' ||
      lang === 'hr' ||
      lang === 'cs' ||
      lang === 'da' ||
      lang === 'nl' ||
      lang === 'fi' ||
      lang === 'fr' ||
      lang === 'de' ||
      lang === 'el' ||
      lang === 'he' ||
      lang === 'hi' ||
      lang === 'hu' ||
      lang === 'id' ||
      lang === 'it' ||
      lang === 'ja' ||
      lang === 'kk' ||
      lang === 'ms' ||
      lang === 'no' ||
      lang === 'pl' ||
      lang === 'pt' ||
      lang === 'ro' ||
      lang === 'ru' ||
      lang === 'sk' ||
      lang === 'es' ||
      lang === 'sv' ||
      lang === 'th' ||
      lang === 'tr' ||
      lang === 'uk' ||
      lang === 'vi'
    ) {
      Tts.setDefaultLanguage(lang);
    } else {
      const modeMessage = '지원되지 않는 언어입니다.';
      showMessage({
        message: modeMessage,
        icon: 'info',
        duration: 700,
      });
      return;
    }
    Tts.getInitStatus().then(() => {
      // Tts.speak(txt, {
      //   iosVoiceId: 'default',
      //   rate: 0.5,
      //   androidParams: {
      //     KEY_PARAM_PAN: 0,
      //     KEY_PARAM_VOLUME: 1,
      //     KEY_PARAM_STREAM: 'STREAM_MUSIC',
      //   },
      // });
      Tts.speak(txt);
    });

    if (!eventListenersAdded) {
      // Add the event listeners
      Tts.addEventListener('tts-start', () => null);
      Tts.addEventListener('tts-progress', () => null);
      Tts.addEventListener('tts-finish', () => null);
      Tts.addEventListener('tts-cancel', () => null);

      setEventListenersAdded(true); // Update the flag
    }
  };

  useEffect(() => {
    translateText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, props.sourceLang, props.targetLang]);

  const renderCursor = () => {
    if (showCursor && text === '') {
      return (
        <View style={[styles.cursor, cursorFlick && styles.cursorVisible]} />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={dismissKeyboard}
      style={[styles.container, props.isDarkMode && styles.container_dm]}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.inputContainer,
          props.isDarkMode && styles.inputContainer_dm,
        ]}
        onPress={() => inputRef.current?.focus()}>
        <TextInput
          style={[styles.input, props.isDarkMode && styles.input_dm]}
          ref={inputRef}
          onChangeText={setText}
          value={text}
          placeholder="무엇을 번역해드릴까요?"
          placeholderTextColor={props.isDarkMode ? '#C2C2C2' : 'darkgrey'}
          multiline={true}
          onFocus={() => setShowCursor(false)}
          onBlur={() => setShowCursor(true)}
        />
        {renderCursor()}
        <TouchableOpacity
          style={[styles.xButton, props.isDarkMode && styles.button_dm]}
          onPress={() => {
            btnReset();
            Tts.stop();
          }}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
        {text ? (
          <TouchableOpacity
            style={[
              styles.soundButton,
              props.isDarkMode && styles.soundButton_dm,
            ]}
            onPress={() => textToSpeech(text, props.sourceLang)}>
            <Image
              style={styles.btnSound}
              source={
                props.isDarkMode
                  ? require('../assets/icon-sound-darkmode.png')
                  : require('../assets/icon-sound.png')
              }
            />
          </TouchableOpacity>
        ) : // <TouchableOpacity
        //   style={[
        //     styles.soundButton,
        //     props.isDarkMode && styles.soundButton_dm,
        //   ]}
        //   onPress={() => console.log('이미지 번역')}>
        //   <Image
        //     style={styles.btnSound}
        //     source={
        //       props.isDarkMode
        //         ? require('../assets/icon-camera-darkmode.png')
        //         : require('../assets/icon-camera.png')
        //     }
        //   />
        // </TouchableOpacity>
        null}
      </TouchableOpacity>
      <View
        style={[
          styles.outputContainer,
          props.isDarkMode && styles.outputContainer_dm,
        ]}>
        {text ? (
          <TextInput
            style={[styles.output, props.isDarkMode && styles.output_dm]}
            value={result}
            multiline={true}
            editable={false}
          />
        ) : (
          <Image
            style={styles.outputImg}
            source={require('../assets/icon-dot.png')}
          />
        )}

        {text ? (
          <TouchableOpacity
            style={[
              styles.soundButton,
              props.isDarkMode && styles.soundButton_dm,
            ]}
            onPress={() => textToSpeech(result, props.targetLang)}>
            <Image
              style={styles.btnSound}
              source={
                props.isDarkMode
                  ? require('../assets/icon-sound-darkmode.png')
                  : require('../assets/icon-sound.png')
              }
            />
          </TouchableOpacity>
        ) : null}
        {text ? (
          <TouchableOpacity
            style={[
              styles.clipboardButton,
              props.isDarkMode && styles.clipboardButton_dm,
            ]}
            onPress={btnClipboard}>
            <Image
              style={styles.btnClipboard}
              source={
                props.isDarkMode
                  ? require('../assets/icon-clipboard-darkmode.png')
                  : require('../assets/icon-clipboard.png')
              }
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View
        style={[
          styles.btnContainer,
          props.isDarkMode && styles.btnContainer_dm,
        ]}>
        <></>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 8,
    backgroundColor: 'skyblue',
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  container_dm: {
    backgroundColor: '#003458',
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'darkgrey',
    flexDirection: 'row',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  inputContainer_dm: {
    backgroundColor: '#202B38',
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
  cursor: {
    position: 'absolute',
    height: 30,
    width: 2,
    backgroundColor: 'darkgrey',
    opacity: 0.6,
  },
  cursorVisible: {
    opacity: 0,
  },
  outputContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  outputContainer_dm: {
    backgroundColor: '#202B38',
  },
  outputImg: {
    width: 60,
    height: 60,
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
    width: 40,
    height: 40,
    borderRadius: 25,
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
    fontSize: 24,
  },
  soundButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: 'skyblue',
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundButton_dm: {
    backgroundColor: '#003458',
  },
  btnSound: {
    width: 30,
    height: 30,
  },
  clipboardButton: {
    position: 'absolute',
    top: 10,
    left: 75,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: 'skyblue',
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clipboardButton_dm: {
    backgroundColor: '#003458',
  },
  btnClipboard: {
    width: 35,
    height: 35,
  },
  btnContainer: {
    flex: 0.3,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer_dm: {
    backgroundColor: '#003458',
  },
});

export default Translate;
