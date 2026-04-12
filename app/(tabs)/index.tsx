import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="library" size={100} color="#6366F1" />
      </View>
      <Text style={styles.title}>Minha Biblioteca</Text>
      <Text style={styles.subtitle}>Organize suas leituras de forma profissional.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', padding: 20 },
  iconCircle: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center', marginBottom: 30, borderWidth: 1, borderColor: '#334155' },
  title: { color: '#F8FAFC', fontSize: 32, fontWeight: '800', marginBottom: 10 },
  subtitle: { color: '#94A3B8', fontSize: 16, textAlign: 'center' },
});
