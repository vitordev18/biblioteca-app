import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useBooks } from '../../hooks/useBooks';

export default function GoalsScreen() {
  const { library, readingGoal, setReadingGoal } = useBooks();

  const totalRead = library?.length || 0;
  const progress = Math.min((totalRead / readingGoal) * 100, 100);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: true, title: 'Minhas Metas', headerStyle: { backgroundColor: '#0F172A' }, headerTintColor: '#F8FAFC' }} />

      <View style={styles.container}>
        <Text style={styles.label}>Meta de Livros para 2026</Text>
        <TextInput
          style={styles.goalInput}
          keyboardType="numeric"
          value={readingGoal.toString()}
          onChangeText={(val) => setReadingGoal(Number(val) || 0)}
        />

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progresso Atual</Text>
          <Text style={styles.percentage}>{progress.toFixed(0)}%</Text>

          <View style={styles.barBackground}>
            <View style={[styles.barFill, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.statusText}>
            Você leu {totalRead} de {readingGoal} livros.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0F172A' },
  container: { padding: 24, alignItems: 'center' },
  label: { color: '#94A3B8', fontSize: 14, fontWeight: '600', marginBottom: 10, textTransform: 'uppercase' },
  goalInput: { backgroundColor: '#1E293B', color: '#F8FAFC', fontSize: 32, fontWeight: '800', padding: 20, borderRadius: 16, width: 120, textAlign: 'center', borderWidth: 1, borderColor: '#6366F1', marginBottom: 40 },
  progressCard: { backgroundColor: '#1E293B', width: '100%', padding: 24, borderRadius: 24, borderWidth: 1, borderColor: '#334155', alignItems: 'center' },
  progressTitle: { color: '#F8FAFC', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  percentage: { color: '#6366F1', fontSize: 48, fontWeight: '900', marginBottom: 20 },
  barBackground: { width: '100%', height: 12, backgroundColor: '#0F172A', borderRadius: 6, overflow: 'hidden', marginBottom: 20 },
  barFill: { height: '100%', backgroundColor: '#6366F1' },
  statusText: { color: '#94A3B8', fontSize: 14 }
});
