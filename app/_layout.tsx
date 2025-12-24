import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Plane, Map, Languages, ClipboardList } from 'lucide-react-native';
import * as SplashScreen from 'expo-splash-screen';
import { 
  useFonts, 
  Geologica_400Regular, 
  Geologica_500Medium,
  Geologica_600SemiBold,
  Geologica_700Bold 
} from '@expo-google-fonts/geologica';
import { MidoriColors } from '../constants/colors';

// 폰트 로딩 중 스플래시 화면 유지
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Geologica-Regular': Geologica_400Regular,
    'Geologica-Medium': Geologica_500Medium,
    'Geologica-SemiBold': Geologica_600SemiBold,
    'Geologica-Bold': Geologica_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: MidoriColors.primary,
      tabBarInactiveTintColor: MidoriColors.secondary,
      tabBarStyle: {
        backgroundColor: MidoriColors.paperLight,
        borderTopWidth: 0.5,
        borderTopColor: MidoriColors.line,
        height: 60,
        paddingBottom: 8,
      },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '기록',
          tabBarIcon: ({ color }) => <ClipboardList color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: '지도',
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