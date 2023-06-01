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
import LanguageSelectionModal from '../utils/LanguageSelectionModal';
import languageName from '../utils/LanguageName';

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
    // console.log('Selected', modalMode, 'language:', language);
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
          style={styles.langArea}
          onPress={() => {
            setModalMode('source');
            openModal();
          }}>
          <Text
            style={[styles.langStyle, props.isDarkMode && styles.langStyle_dm]}>
            {languageName(props.sourceLang)}
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
          style={styles.langArea}
          onPress={() => {
            setModalMode('target');
            openModal();
          }}>
          <Text
            style={[styles.langStyle, props.isDarkMode && styles.langStyle_dm]}>
            {languageName(props.targetLang)}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={isModalVisible}
          animationType="none"
          transparent={true}
          onRequestClose={closeModal}>
          <LanguageSelectionModal
            closeModal={closeModal}
            modalMode={modalMode}
            isDarkMode={props.isDarkMode}
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
  },
  container_dm: {
    backgroundColor: '#003458',
    borderBottomColor: '#C2C2C2',
  },
  langArea: {
    flex: 1,
    alignItems: 'center',
  },
  langStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
  },
  langStyle_dm: {
    color: '#C2C2C2',
  },
  btnChange: {
    width: 28,
    height: 28,
  },
});
