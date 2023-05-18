import React from 'react';
import {
  // Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import {LanguageMap} from './LanguageMap';

export default function LanguageSelectionModal(props: any) {
  return (
    <ScrollView style={styles.modalContent}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          {props.modalMode === 'source' ? '번역할 언어 선택' : '결과 언어 선택'}
        </Text>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={props.closeModal}>
          <Text style={styles.modalCloseButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
      {Array.from(LanguageMap).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          style={styles.modalLanguageButton}
          onPress={() => props.handleLanguageSelect(key)}>
          <Text style={styles.modalLanguageButtonText}>{value}</Text>
        </TouchableOpacity>
      ))}
      {/* Add more language options here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    // width: Dimensions.get('window').width - 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    marginVertical: 80,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 18,
  },
  modalCloseButton: {
    position: 'absolute',
    right: 10,
    height: 80,
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
