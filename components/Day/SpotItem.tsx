// components/Day/SpotItem.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Home, ChevronRight } from 'lucide-react-native';
import { Place } from '../../types/travel'; // 타입 불러오기

interface SpotItemProps {
  item: Place;
  isHome?: boolean;
}

const SpotItem = ({ item, isHome = false }: SpotItemProps) => {
  return (
    <View style={[styles.spotItem, isHome && styles.homeItem]}>
      <View style={styles.spotLeft}>
        <View style={styles.iconCircle}>
          {isHome ? <Home size={18} color="#4A90E2" /> : <MapPin size={18} color="#FF5A5F" />}
        </View>
        <View style={styles.spotInfo}>
          <Text style={styles.spotName}>{item.name}</Text>
          <Text style={styles.spotSubText}>
            {item.category} {item.visitTime && `· ${item.visitTime}`}
          </Text>
        </View>
      </View>

      {/* 지출 정보: 숙소가 아니고 지출 데이터가 있을 때만 렌더링 */}
      {!isHome && item.expense && (
        <View style={styles.spotRight}>
          <Text style={styles.amountLocal}>
            {item.expense.currency} {item.expense.amountLocal.toLocaleString()}
          </Text>
          <Text style={styles.amountKRW}>
            ≈ ₩{item.expense.amountKRW.toLocaleString()}
          </Text>
        </View>
      )}
      <ChevronRight size={16} color="#ccc" />
    </View>
  );
};

const styles = StyleSheet.create({
  spotItem: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 15,
		borderRadius: 12,
		marginBottom: 10,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	homeItem: { borderLeftWidth: 4, borderLeftColor: "#4A90E2" },
	spotLeft: { flex: 1, flexDirection: "row", alignItems: "center" },
	iconCircle: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#f8f9fa",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
  },
  spotInfo: { flex: 1 },
	spotName: { fontSize: 15, fontWeight: "bold", color: "#333" },
	spotSubText: { fontSize: 12, color: "#888", marginTop: 2 },
	spotRight: { alignItems: "flex-end", marginRight: 10 },
	amountLocal: { fontSize: 15, fontWeight: "bold", color: "#000" },
	amountKRW: { fontSize: 11, color: "#888" },
});

export default SpotItem;