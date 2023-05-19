import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {LanguageMap} from './LanguageMap';

export default function LanguageSelectionModal(props: any) {
  const handleModalContentPress = (event: any) => {
    event.stopPropagation();
  };

  return (
    <Modal
      visible={props.visible}
      animationType="slide"
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
                {Array.from(LanguageMap).map(([key, value]) => (
                  <TouchableOpacity
                    key={key}
                    style={[
                      styles.modalLanguageButton,
                      props.isDarkMode && styles.modalLanguageButton_dm,
                    ]}
                    onPress={() => props.handleLanguageSelect(key)}>
                    <Text
                      style={[
                        styles.modalLanguageButtonText,
                        props.isDarkMode && styles.modalLanguageButtonText_dm,
                      ]}>
                      {value}
                    </Text>
                  </TouchableOpacity>
                ))}
                {/* Add more language options here */}
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
    fontSize: 18,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  modalLanguageButtonText_dm: {
    color: '#C2C2C2',
  },
});
