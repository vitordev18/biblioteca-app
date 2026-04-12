import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useBooks } from '../../hooks/useBooks';

export default function WishlistScreen() {
  const { wishlist, addToWishlist, moveToLibrary, deleteBook } = useBooks();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleAdd = () => {
    addToWishlist(title, author);
    setTitle('');
    setAuthor('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Lista de Desejos',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#F8FAFC'
        }}
      />

      <View style={styles.headerForm}>
        <TextInput
          style={styles.input}
          placeholder="Livro que desejo..."
          placeholderTextColor="#64748B"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor"
          placeholderTextColor="#64748B"
          value={author}
          onChangeText={setAuthor}
        />
        <TouchableOpacity style={styles.wishButton} onPress={handleAdd}>
          <Text style={styles.buttonText}>ADICIONAR À WISHLIST</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardAuthor}>{item.author}</Text>
            </View>
            <View style={styles.actionGroup}>
              <TouchableOpacity
                onPress={() => moveToLibrary(item)}
                style={styles.buyButton}
              >
                <Text style={styles.actionText}>Comprei!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteBook(item.id, true)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0F172A' },
  headerForm: { padding: 20, backgroundColor: '#1E293B' },
  input: { backgroundColor: '#0F172A', borderRadius: 10, padding: 14, color: '#F8FAFC', marginBottom: 10, borderWidth: 1, borderColor: '#334155' },
  wishButton: { backgroundColor: '#6366F1', padding: 16, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: '800' },
  card: { backgroundColor: '#1E293B', padding: 16, borderRadius: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  cardTitle: { color: '#F8FAFC', fontSize: 16, fontWeight: '700' },
  cardAuthor: { color: '#94A3B8', fontSize: 13 },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  buyButton: { backgroundColor: '#10B981', padding: 8, borderRadius: 6 },
  deleteButton: { backgroundColor: 'transparent', padding: 8 },
  actionText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  deleteText: { color: '#EF4444', fontSize: 12, fontWeight: 'bold' }
});
