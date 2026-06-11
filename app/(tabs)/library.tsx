import { Stack } from 'expo-router';
import { memo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Book, useBooks } from '../../hooks/useBooks';
import { useBuscaLivro } from '../../hooks/useBuscaLivro';

const BookCard = memo(function BookCard({
  book,
  onDelete,
  onRead,
}: {
  book: Book;
  onDelete: () => void;
  onRead: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{book.title}</Text>
        <Text style={styles.cardAuthor}>{book.author}</Text>
      </View>
      <TouchableOpacity
        onPress={onRead}
        style={[styles.readButton, book.isRead && { opacity: 0.5 }]}
        disabled={book.isRead}
      >
        <Text style={styles.readText}>{book.isRead ? 'Lido' : 'Ler'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
});

export default function LibraryScreen() {
  const {
    library,
    newBookTitle,
    newBookAuthor,
    setNewBookTitle,
    setNewBookAuthor,
    addToLibrary,
    deleteBook,
    markAsRead,
  } = useBooks();

  const { query, setQuery, resultado, erro, carregando, buscarLivro, limpar } = useBuscaLivro();

  const [searchQuery, setSearchQuery] = useState('');

  const handleUsarResultado = () => {
    if (resultado) {
      setNewBookTitle(resultado.titulo);
      setNewBookAuthor(resultado.autor);
      limpar();
    }
  };

  const filteredLibrary = library.filter(
    book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Estante Digital',
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#F8FAFC',
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.formSection}>
          <Text style={styles.formLabel}>Novo Registro</Text>

          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchApiInput}
              placeholder="Buscar livro por título..."
              placeholderTextColor="#64748B"
              value={query}
              onChangeText={setQuery}
            />
            <TouchableOpacity style={styles.searchButton} onPress={buscarLivro}>
              {carregando ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <Text style={styles.searchButtonText}>BUSCAR</Text>
              )}
            </TouchableOpacity>
          </View>

          {erro !== '' && <Text style={styles.erroText}>{erro}</Text>}

          {resultado && (
            <TouchableOpacity style={styles.resultadoCard} onPress={handleUsarResultado}>
              <View style={styles.resultadoInfo}>
                <Text style={styles.resultadoTitulo}>{resultado.titulo}</Text>
                <Text style={styles.resultadoAutor}>{resultado.autor}</Text>
              </View>
              <Text style={styles.resultadoUsar}>Usar</Text>
            </TouchableOpacity>
          )}

          <TextInput
            style={styles.input}
            placeholder="Título da obra"
            placeholderTextColor="#64748B"
            value={newBookTitle}
            onChangeText={setNewBookTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor(a)"
            placeholderTextColor="#64748B"
            value={newBookAuthor}
            onChangeText={setNewBookAuthor}
          />
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => addToLibrary(newBookTitle, newBookAuthor)}
          >
            <Text style={styles.primaryButtonText}>SALVAR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listSection}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por título ou autor..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <FlatList
            data={filteredLibrary}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <BookCard
                book={item}
                onDelete={() => deleteBook(item.id, false)}
                onRead={() => markAsRead(item.id)}
              />
            )}
            contentContainerStyle={styles.listScroll}
            ListEmptyComponent={
              <Text style={styles.emptyLabel}>
                {searchQuery
                  ? 'Nenhuma correspondência encontrada.'
                  : 'Sua estante ainda está vazia.'}
              </Text>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0F172A' },
  container: { flex: 1 },
  formSection: {
    padding: 24,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6366F1',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  searchRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  searchApiInput: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#6366F1',
  },
  searchButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: { color: '#ffffff', fontWeight: '800', fontSize: 12 },
  erroText: { color: '#EF4444', fontSize: 13, marginBottom: 8 },
  resultadoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  resultadoInfo: { flex: 1 },
  resultadoTitulo: { color: '#F8FAFC', fontSize: 14, fontWeight: '700' },
  resultadoAutor: { color: '#94A3B8', fontSize: 12, marginTop: 2 },
  resultadoUsar: { color: '#10B981', fontSize: 13, fontWeight: '800' },
  input: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
  },
  primaryButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: { color: '#ffffff', fontWeight: '800', fontSize: 14, letterSpacing: 0.5 },
  listSection: { flex: 1, paddingHorizontal: 20 },
  searchWrapper: { marginTop: 20, marginBottom: 16 },
  searchInput: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#334155',
  },
  listScroll: { paddingBottom: 40 },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#F8FAFC', marginBottom: 4 },
  cardAuthor: { fontSize: 14, color: '#94A3B8', fontWeight: '500' },
  deleteButton: { paddingVertical: 8, paddingHorizontal: 12 },
  readButton: { paddingVertical: 8, paddingHorizontal: 12 },
  deleteText: { color: '#EF4444', fontSize: 14, fontWeight: '600' },
  readText: { color: '#10B981', fontSize: 14, fontWeight: '600' },
  emptyLabel: {
    textAlign: 'center',
    color: '#64748B',
    marginTop: 60,
    fontSize: 16,
    lineHeight: 24,
  },
});
