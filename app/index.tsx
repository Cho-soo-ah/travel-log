import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, MapPin, Share2, Plus } from 'lucide-react-native';

import { MidoriColors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { FloatingCreateTripButton } from '../components/Common/FloatingCreateTripButton';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.78; 
const GAP = 16; // 카드 사이 간격
const OFFSET = (width - CARD_WIDTH) / 2; // 중앙 정렬을 위한 오프셋

// 가짜 데이터 (최대 5개)
const MOCK_TRIPS = [
  { id: '1', title: 'Tokyo, Japan', date: 'Dec 24, 2025', image: 'https://picsum.photos/id/101/200/200' },
  { id: '2', title: 'Seoul, Korea', date: 'Jan 15, 2026', image: 'https://picsum.photos/id/102/200/200' },
  { id: '3', title: 'Paris, France', date: 'May 04, 2026', image: 'https://picsum.photos/id/103/200/200' },
];

export default function MainDashboard() {
  const router = useRouter();

  // 리스트 구성: 데이터(최대 5개) + 마지막 '새 여행' 카드
  const displayData = useMemo(() => {
    const limitedTrips = MOCK_TRIPS.slice(0, 5);
    return [...limitedTrips, { id: 'ADD_CARD', isAddCard: true }];
  }, []);

  const renderItem = ({ item, index }: any) => {
    if (item.isAddCard) {
      return (
        <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
          <TouchableOpacity 
            style={[styles.analogCard, styles.addCard]} 
            onPress={() => console.log("New Trip")}
          >
            <View style={styles.stampBorder}>
              <Plus color={MidoriColors.primary} size={32} />
            </View>
            <Text style={[styles.addCardText, Typography.h2]}>New Journey</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.cardContainer}>
       

        <TouchableOpacity 
          activeOpacity={0.9}
          style={styles.analogCard}
          onPress={() => router.push(`/(trip)/${item.id}`)}
        >
          <View style={[styles.maskingTape, { backgroundColor: MidoriColors.tapeGreen }]} />
          
          <View style={styles.cardContent}>
            <Text style={[styles.cardLabel, Typography.label]}>DESTINATION</Text>
            <Text style={[styles.tripTitle, Typography.h2]}>{item.title}</Text>
            
            <View style={styles.divider} />
            
            <View style={styles.body}>
              <View style={styles.infoRow}>
                <MapPin size={14} color={MidoriColors.primary} />
                <Text style={[styles.infoText, Typography.note]}>{item.date}</Text>
              </View>
              <Text style={[styles.memoText, Typography.body]} numberOfLines={3}>
                • 아사쿠사 센소지 방문{"\n"}
                • 시부야 스카이 예약 확인
              </Text>
            </View>

            <View style={styles.cardFooter}>
                <Text style={[styles.footerPrice, Typography.label]}>EXPENSE: ¥32,400</Text>
                <Share2 size={16} color={MidoriColors.secondary} />
            </View>
          </View>

          {/* 원형 스탬프 */}
          <View style={styles.circleStamp}>
             <Text style={styles.circleStampText}>{index + 1}</Text>
          </View>
            </TouchableOpacity>
            
             {/* 랜덤 사진 네일 효과 (노트 상단에 붙인 느낌) */}
        {/* <View style={styles.nailContainer}>
          <View style={[styles.photoNail, { transform: [{ rotate: '-8deg' }] }]}>
            <Image source={{ uri: `https://picsum.photos/id/${index + 10}/100` }} style={styles.nailImg} />
          </View>
          <View style={[styles.photoNail, { transform: [{ rotate: '5deg' }], marginTop: 10 }]}>
            <Image source={{ uri: `https://picsum.photos/id/${index + 20}/100` }} style={styles.nailImg} />
          </View>
        </View> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* 1. Slim Header (60px) */}
      <View style={styles.header}>
        <Menu color={MidoriColors.ink} size={24} />
        <Text style={[styles.logoText, Typography.h2]}>Midori Log</Text>
        <View style={styles.arrivalStamp}>
          <Text style={styles.arrivalStampText}>ARRIVED</Text>
        </View>
      </View>

      {/* 2. Carousel Section */}
      <FlatList
        data={displayData}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + GAP}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: OFFSET, 
          alignItems: 'center',
          paddingBottom: 60,
        }}
        ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
        keyExtractor={(item) => item.id}
      />

      {/* 3. Floating Button */}
      <FloatingCreateTripButton onPress={() => {}} />
    </View>
  );
}
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: MidoriColors.background },
    header: {
      height: 60,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 25,
    },
    logoText: { color: MidoriColors.ink, fontSize: 18 },
    arrivalStamp: {
      borderWidth: 1.2,
      borderColor: MidoriColors.stampRed,
      paddingHorizontal: 6,
      transform: [{ rotate: '12deg' }],
    },
    arrivalStampText: { color: MidoriColors.stampRed, fontSize: 8, fontWeight: '900' },
  
    cardContainer: {
      paddingTop: 60, // 사진 네일이 올라갈 공간
    },
    analogCard: {
      backgroundColor: MidoriColors.paperLight,
      padding: 24,
      borderWidth: 0.5,
      borderColor: MidoriColors.line,
      shadowColor: MidoriColors.ink,
      shadowOpacity: 0.04,
      shadowRadius: 10,
      position: 'relative',
      height: 420,
    },
    cardContent: { flex: 1 },
    maskingTape: {
      position: 'absolute', top: -10, alignSelf: 'center',
      width: 70, height: 20, opacity: 0.7,
    },
    nailContainer: {
      flexDirection: 'row',
      position: 'absolute',
      top: 25,
      left: 20,
      zIndex: 1,
    },
    photoNail: {
      width: 55, height: 55,
      backgroundColor: MidoriColors.white,
      padding: 3,
      borderWidth: 0.5,
      borderColor: MidoriColors.line,
      marginRight: -10,
    },
    nailImg: { width: '100%', height: '100%' },
    cardLabel: { color: MidoriColors.secondary, marginBottom: 4 },
    tripTitle: { color: MidoriColors.ink, marginBottom: 15 },
    divider: { height: 0.5, backgroundColor: MidoriColors.line, borderStyle: 'dashed', marginBottom: 15 },
    body: { flex: 1 },
    infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    infoText: { color: MidoriColors.primary, marginLeft: 6 },
    memoText: { color: MidoriColors.softText, lineHeight: 24, fontSize: 13 },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 15,
      borderTopWidth: 0.5,
      borderTopColor: MidoriColors.line,
    },
    footerPrice: { color: MidoriColors.primary },
    circleStamp: {
      position: 'absolute', bottom: 15, right: 15,
      width: 36, height: 36, borderRadius: 18,
      borderWidth: 1, borderColor: MidoriColors.stampInk,
      justifyContent: 'center', alignItems: 'center',
      opacity: 0.3, transform: [{ rotate: '-15deg' }]
    },
    circleStampText: { fontSize: 10, color: MidoriColors.stampInk, fontWeight: 'bold' },
  
    addCard: { justifyContent: 'center', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1 },
    stampBorder: {
      width: 60, height: 60, borderRadius: 30,
      borderWidth: 1.5, borderColor: MidoriColors.primary,
      borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center',
      marginBottom: 15,
    },
    addCardText: { color: MidoriColors.primary },
  });