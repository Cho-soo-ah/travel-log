import { Tabs } from 'expo-router';
import { Plane, Map, Languages } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#FF5A5F', tabBarShowLabel: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '나의 여행',
          tabBarIcon: ({ color }) => <Plane color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: '전체 지도',
          tabBarIcon: ({ color }) => <Map color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="translate"
        options={{
          title: '번역',
          tabBarIcon: ({ color }) => <Languages color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}