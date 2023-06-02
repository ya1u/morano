import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Modal,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {LanguageMap} from './LanguageMap';

export default function LanguageSelectionModal(props: any) {
  const [rul, setRul] = useState(new Map());

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const saveRul = async (rul: Map<string, string>) => {
    try {
      const serializedRul = JSON.stringify(Array.from(rul.entries()));
      await AsyncStorage.setItem('rul', serializedRul);
    } catch (error) {
      console.log('Failed to save rul state:', error);
    }
  };

  const loadRul = async () => {
    try {
      const serializedRul = await AsyncStorage.getItem('rul');
      if (serializedRul !== null) {
        const rulArray = JSON.parse(serializedRul);
        return new Map(rulArray);
      }
    } catch (error) {
      console.log('Failed to load rul state:', error);
    }
    return new Map([
      ['en', '영어'],
      ['ko', '한국어'],
    ]);
  };

  const loadRulState = async () => {
    const loadedRul = await loadRul();
    setRul(loadedRul);
  };

  useEffect(() => {
    loadRulState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addRul = (key: string, value: string) => {
    const newRul = new Map(rul);
    newRul.set(key, value);
    setRul(newRul);

    saveRul(newRul);

    props.handleLanguageSelect(key);
  };

  const handleRulDelete = async (key: string) => {
    const newRul = new Map(rul);
    newRul.delete(key);
    saveRul(newRul);

    setRul(newRul);
  };

  const handleModalContentPress = (event: any) => {
    event.stopPropagation();
  };

  return (
    <Modal
      visible={props.visible}
      animationType="fade"
      transparent={true}
      onRequestClose={props.closeModal}>
      <TouchableWithoutFeedback onPress={props.closeModal}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={handleModalContentPress}>
            <View
              style={[
                styles.modalContent,
                props.isDarkMode && styles.modalContent_dm,
              ]}>
              <View style={styles.title}>
                <Text
                  style={[
                    styles.titleText,
                    props.isDarkMode && styles.titleText_dm,
                  ]}>
                  {props.modalMode === 'source'
                    ? '번역할 언어 선택'
                    : '결과 언어 선택'}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.modalCloseButton,
                    props.isDarkMode && styles.modalCloseButton_dm,
                  ]}
                  onPress={props.closeModal}>
                  <Text style={styles.modalCloseButtonText}>X</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                {rul.size > 0 ? (
                  <>
                    <Text
                      style={[
                        styles.subTitleText,
                        props.isDarkMode && styles.subTitleText_dm,
                      ]}>
                      최근 사용 언어
                    </Text>
                    <View>
                      {Array.from(rul).map(([key, value]) => (
                        <React.Fragment key={key}>
                          <TouchableOpacity
                            style={[
                              styles.modalLanguageButton,
                              props.isDarkMode && styles.modalLanguageButton_dm,
                            ]}
                            onPress={() => props.handleLanguageSelect(key)}>
                            <Text
                              style={[
                                styles.modalLanguageButtonText,
                                props.isDarkMode &&
                                  styles.modalLanguageButtonText_dm,
                              ]}>
                              {value}
                            </Text>
                            <TouchableOpacity
                              style={[
                                styles.rulDeleteButton,
                                props.isDarkMode && styles.rulDeleteButton_dm,
                              ]}
                              onPress={() => handleRulDelete(key)}>
                              {/* <Text style={styles.rulDeleteButtonImg}>X</Text> */}
                              {props.isDarkMode ? (
                                <Image
                                  style={styles.rulDeleteButtonImg}
                                  source={require('../assets/icon-recycleBin-darkmode.png')}
                                />
                              ) : (
                                <Image
                                  style={styles.rulDeleteButtonImg}
                                  source={require('../assets/icon-recycleBin.png')}
                                />
                              )}
                            </TouchableOpacity>
                          </TouchableOpacity>
                        </React.Fragment>
                      ))}
                    </View>
                  </>
                ) : null}

                <Text
                  style={[
                    styles.subTitleText,
                    props.isDarkMode && styles.subTitleText_dm,
                  ]}>
                  모든 언어
                </Text>
                <View>
                  {Array.from(LanguageMap).map(([key, value]) => (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.modalLanguageButton,
                        props.isDarkMode && styles.modalLanguageButton_dm,
                      ]}
                      onPress={() => addRul(key, value)}>
                      <Text
                        style={[
                          styles.modalLanguageButtonText,
                          props.isDarkMode && styles.modalLanguageButtonText_dm,
                        ]}>
                        {value}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    height: '80%',
  },
  modalContent_dm: {
    backgroundColor: '#202B38',
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    paddingTop: 3,
  },
  titleText: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  titleText_dm: {
    color: '#C2C2C2',
  },
  modalCloseButton: {
    position: 'absolute',
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  modalCloseButton_dm: {
    backgroundColor: '#003458',
  },
  modalCloseButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  subTitleText: {
    fontSize: 20,
    marginTop: 15,
  },
  subTitleText_dm: {
    color: '#C2C2C2',
  },
  rulDeleteButton: {
    position: 'absolute',
    top: 4.25,
    right: 1,
    width: 35,
    height: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rulDeleteButton_dm: {
    borderColor: '#C2C2C2',
  },
  rulDeleteButtonImg: {
    width: 20,
    height: 20,
  },
  modalLanguageButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  modalLanguageButton_dm: {
    backgroundColor: '#202B38',
  },
  modalLanguageButtonText: {
    fontSize: 23,
    color: 'black',
    textAlign: 'center',
  },
  modalLanguageButtonText_dm: {
    color: '#C2C2C2',
  },
});
