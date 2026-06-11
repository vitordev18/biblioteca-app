import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function EmojiPicker({ isVisible, onClose, children }: Props) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Escolha um marcador 📌</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#F8FAFC" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#1E293B',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderColor: '#334155',
  },
  titleContainer: {
    height: 52,
    backgroundColor: '#0F172A',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '700',
  },
});
