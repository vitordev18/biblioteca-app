import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Não Encontrada' }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Página não encontrada.</Text>
        <Link href="/" style={styles.button}>
          Voltar ao Início
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f7', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 80, fontWeight: '900', color: '#1c1c1e' },
  subtitle: { fontSize: 18, color: '#8e8e93', marginBottom: 30 },
  button: { backgroundColor: '#007aff', color: '#fff', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10, fontWeight: 'bold', overflow: 'hidden' }
});
