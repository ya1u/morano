import React from 'react';
import {
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function LanguageSelectionModal(props: any) {
  return (
    <ScrollView style={styles.modalContent}>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('en')}>
        <Text style={styles.modalLanguageButtonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('ko')}>
        <Text style={styles.modalLanguageButtonText}>Korean</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('en')}>
        <Text style={styles.modalLanguageButtonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('ko')}>
        <Text style={styles.modalLanguageButtonText}>Korean</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('en')}>
        <Text style={styles.modalLanguageButtonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('ko')}>
        <Text style={styles.modalLanguageButtonText}>Korean</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('en')}>
        <Text style={styles.modalLanguageButtonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('ko')}>
        <Text style={styles.modalLanguageButtonText}>Korean</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('en')}>
        <Text style={styles.modalLanguageButtonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('ko')}>
        <Text style={styles.modalLanguageButtonText}>Korean</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('en')}>
        <Text style={styles.modalLanguageButtonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('ko')}>
        <Text style={styles.modalLanguageButtonText}>Korean</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('en')}>
        <Text style={styles.modalLanguageButtonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.modalLanguageButton}
        onPress={() => props.handleLanguageSelect('ko')}>
        <Text style={styles.modalLanguageButtonText}>Korean</Text>
      </TouchableOpacity>
      {/* Add more language options here */}
      <TouchableOpacity
        style={styles.modalCloseButton}
        onPress={props.closeModal}>
        <Text style={styles.modalCloseButtonText}>Close</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  modalCloseButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: 'blue',
  },
  modalLanguageButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: 'lightgray',
  },
  modalLanguageButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});
