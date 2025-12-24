import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';

export default function TripDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topInfo}>
        <Text style={styles.region}>도쿄 · 일본</Text>
        <Text style={styles.exchange}>1 JPY ≈ 9.02 KRW</Text>
      </View>

      <View style={styles.dayList}>
        {[1, 2, 3, 4].map((day) => (
          <TouchableOpacity 
            key={day} 
            style={styles.dayItem}
            onPress={() => router.push(`/(trip)/day-${day}`)}
          >
            <View>
              <Text style={styles.dayText}>Day {day}</Text>
              <Text style={styles.daySpots}>시부야 스카이 외 3곳</Text>
            </View>
            <View style={styles.dayRight}>
              <Text style={styles.dayAmount}>¥12,000</Text>
              <ChevronRight size={18} color="#CCC" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topInfo: { padding: 20, backgroundColor: '#F8F9FA', borderRadius: 12, margin: 20 },
  region: { fontSize: 22, fontWeight: 'bold' },
  exchange: { color: '#666', marginTop: 4 },
  dayList: { paddingHorizontal: 20 },
  dayItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  dayText: { fontSize: 18, fontWeight: 'bold' },
  daySpots: { fontSize: 12, color: '#888', marginTop: 4 },
  dayRight: { flexDirection: 'row', alignItems: 'center' },
  dayAmount: { marginRight: 8, fontWeight: '600', color: '#333' }
});