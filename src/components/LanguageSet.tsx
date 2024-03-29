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
  Alert,
} from 'react-native';
import LanguageSelectionModal from '../utils/LanguageSelectionModal';
import languageName from '../utils/LanguageName';

interface LanguageSetProps {
  isDarkMode: boolean;
  sourceLang: string;
  targetLang: string;
  setSourceLang: (language: string) => void;
  setTargetLang: (language: string) => void;
}

const LanguageSet: React.FC<LanguageSetProps> = ({
  isDarkMode,
  sourceLang,
  setSourceLang,
  targetLang,
  setTargetLang,
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'source' | 'target'>('source');

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
    if (modalMode === 'source') {
      if (language !== targetLang) {
        setSourceLang(language);
      } else if (language === targetLang) {
        Alert.alert('결과 언어와 같은 언어입니다.');
        return;
      }
    }
    if (modalMode === 'target') {
      if (language !== sourceLang) {
        setTargetLang(language);
      } else if (language === sourceLang) {
        Alert.alert('번역할 언어와 같은 언어입니다.');
        return;
      }
    }
    closeModal();
  };

  const btnChangeLanguage = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={[styles.container, isDarkMode && styles.container_dm]}>
        <TouchableOpacity
          style={styles.langArea}
          onPress={() => {
            setModalMode('source');
            openModal();
          }}>
          <Text style={[styles.langStyle, isDarkMode && styles.langStyle_dm]}>
            {languageName(sourceLang)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={btnChangeLanguage}>
          {isDarkMode ? (
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
          <Text style={[styles.langStyle, isDarkMode && styles.langStyle_dm]}>
            {languageName(targetLang)}
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
            isDarkMode={isDarkMode}
            handleLanguageSelect={handleLanguageSelect}
            visible={true}
          />
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
    fontSize: 28,
    fontWeight: '500',
  },
  langStyle_dm: {
    color: '#C2C2C2',
  },
  btnChange: {
    width: 34,
    height: 34,
  },
});

export default LanguageSet;
