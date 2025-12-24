// app/(trip)/day-[num].tsx
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Plus } from 'lucide-react-native';

// 컴포넌트 및 타입 불러오기
import SpotItem from '../../components/Day/SpotItem';
import { Place } from '../../types/travel';

// 가짜 데이터 (실제로는 API나 DB에서 가져옵니다)
const MOCK_ACCOMMODATION: Place = {
  id: 'home_01',
  name: '신주쿠 호텔 A',
  category: '숙소',
  latitude: 35.6895,
  longitude: 139.6917,
  isAccommodation: true,
};

const MOCK_SPOTS: Place[] = [
  {
    id: 'p1',
    name: '시부야 스시집',
    category: '식사',
    visitTime: '13:00',
    latitude: 35.658,
    longitude: 139.701,
    isAccommodation: false,
    expense: { amountLocal: 3200, amountKRW: 28800, currency: 'JPY' }
  },
  {
    id: 'p2',
    name: '시부야 스카이',
    category: '명소',
    visitTime: '15:30',
    latitude: 35.661,
    longitude: 139.702,
    isAccommodation: false,
    expense: { amountLocal: 2000, amountKRW: 18000, currency: 'JPY' }
  }
];

export default function DayDetailScreen() {
  const { num } = useLocalSearchParams();
  const [isHomeEnabled, setIsHomeEnabled] = useState(true);

  // 핵심 로직: 토글 상태에 따라 렌더링할 리스트를 동적으로 생성
  const displayList = useMemo(() => {
    if (isHomeEnabled) {
      // 숙소 ON: [숙소, 장소1, 장소2, ..., 숙소]
      return [MOCK_ACCOMMODATION, ...MOCK_SPOTS, MOCK_ACCOMMODATION];
    }
    // 숙소 OFF: [장소1, 장소2, ...]
    return MOCK_SPOTS;
  }, [isHomeEnabled]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Day ${num} 동선` }} />

      {/* 상단 컨트롤 바 */}
      <View style={styles.header}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>숙소를 출발/도착에 포함</Text>
          <Switch
            value={isHomeEnabled}
            onValueChange={setIsHomeEnabled}
            trackColor={{ false: "#767577", true: "#34d23e" }}
          />
        </View>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="white" size={18} />
          <Text style={styles.addButtonLabel}>장소 추가</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* 지도 영역 (추후 TravelMap 컴포넌트로 대체) */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.placeholderText}>
            지도가 이곳에 표시됩니다.{"\n"}
            (총 {displayList.length}개의 포인트 연결 중)
          </Text>
        </View>

        {/* 리스트 영역 */}
        <View style={styles.listContainer}>
          {displayList.map((item, index) => (
            <React.Fragment key={`${item.id}-${index}`}>
              <SpotItem 
                item={item} 
                isHome={item.isAccommodation} 
              />
              {/* 마지막 아이템이 아닐 때만 연결선 표시 */}
              {index < displayList.length - 1 && (
                <View style={styles.connector} />
              )}
            </React.Fragment>
          ))}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  toggleRow: { flexDirection: 'row', alignItems: 'center' },
  toggleText: { fontSize: 14, fontWeight: '500', marginRight: 8 },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  addButtonLabel: { color: '#fff', marginLeft: 4, fontWeight: 'bold', fontSize: 13 },
  content: { flex: 1 },
  mapPlaceholder: {
    height: 250,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { textAlign: 'center', color: '#868e96', lineHeight: 20 },
  listContainer: { padding: 16 },
  connector: {
    width: 2,
    height: 12,
    backgroundColor: '#ddd',
    marginLeft: 32, // SpotItem의 아이콘 중앙 위치에 맞춤
    marginVertical: 4,
  }
});