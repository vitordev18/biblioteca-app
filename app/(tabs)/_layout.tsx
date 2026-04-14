import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { BooksProvider } from '../../hooks/useBooks';

export default function TabLayout() {
  const activeColor = '#6366F1';
  const inactiveColor = '#64748B';

  return (
    <BooksProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: activeColor,
          tabBarInactiveTintColor: inactiveColor,
          headerStyle: { backgroundColor: '#0F172A' },
          headerTintColor: '#F8FAFC',
          tabBarStyle: {
            backgroundColor: '#0F172A',
            borderTopColor: '#1E293B',
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} /> }} />
        <Tabs.Screen name="library" options={{ title: 'Estante', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'library' : 'library-outline'} color={color} size={24} /> }} />
        <Tabs.Screen name="wishlist" options={{ title: 'Desejos', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} color={color} size={24} /> }} />
        <Tabs.Screen name="goals" options={{ title: 'Metas', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'flag' : 'flag-outline'} color={color} size={24} /> }} />
      </Tabs>
    </BooksProvider>
  );
}
