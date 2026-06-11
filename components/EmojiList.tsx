import { useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onSelect: (emoji: string) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emojis] = useState<string[]>(['📚', '⭐', '❤️', '🔥', '✅', '🏆', '🎯', '💡']);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      data={emojis}
      contentContainerStyle={styles.listContainer}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}
          style={styles.emojiItem}
        >
          <Text style={styles.emojiText}>{item}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emojiItem: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emojiText: {
    fontSize: 32,
  },
});
