import { StyleSheet, Text, View } from 'react-native';

type Props = {
  imageSize: number;
  stickerSource: string;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: imageSize }}>{stickerSource}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
