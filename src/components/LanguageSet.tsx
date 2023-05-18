import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LanguageModal from '../utils/LanguageSelectionModal';
import LanguageMapping from '../utils/LanguageMapping';

export default function LanguageSet(props: any) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('');

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLanguageSelect = (language: string) => {
    // Handle selected language
    console.log('Selected', modalMode, 'language:', language);
    if (modalMode === 'source') {
      props.setSourceLang(language);
    }
    if (modalMode === 'target') {
      props.setTargetLang(language);
    }
    closeModal();
  };

  const btnChangeLanguage = () => {
    const temp = props.sourceLang;
    props.setSourceLang(props.targetLang);
    props.setTargetLang(temp);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.container, props.isDarkMode && styles.container_dm]}>
        <TouchableOpacity
          onPress={() => {
            setModalMode('source');
            openModal();
          }}>
          <Text
            style={[styles.langStyle, props.isDarkMode && styles.langStyle_dm]}>
            {LanguageMapping(props.sourceLang)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={btnChangeLanguage}>
          {props.isDarkMode ? (
            <Image
              style={styles.btnChange}
              source={require('../assets/icon-change-darkmode.png')}
            />
          ) : (
            <Image
              style={styles.btnChange}
              source={require('../assets/icon-change.png')}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalMode('target');
            openModal();
          }}>
          <Text
            style={[styles.langStyle, props.isDarkMode && styles.langStyle_dm]}>
            {LanguageMapping(props.targetLang)}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}>
          <LanguageModal
            closeModal={closeModal}
            handleLanguageSelect={handleLanguageSelect}
          />
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    width: Dimensions.get('window').width,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container_dm: {
    backgroundColor: '#003458',
    borderBottomColor: '#C2C2C2',
  },
  langStyle: {
    textAlign: 'center',
    fontSize: 18,
  },
  langStyle_dm: {
    color: '#C2C2C2',
  },
  btnChange: {
    width: 28,
    height: 28,
  },
});
