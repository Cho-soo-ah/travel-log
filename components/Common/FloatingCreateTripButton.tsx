// components/Common/FloatingWriteButton.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Plus } from 'lucide-react-native';
import { MidoriColors } from '../../constants/colors';
import { Typography } from '../../constants/typography';

interface Props {
  onPress: () => void;
}

export const FloatingCreateTripButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity 
      activeOpacity={0.85} 
      style={styles.fabContainer} 
      onPress={onPress}
    >
      <View style={styles.waxSeal}>
        <View style={styles.waxInnerBorder}>
        <Plus color={MidoriColors.white} size={22} strokeWidth={3} />
        </View>
      </View>
      
      {/* 버튼 옆 마스킹 테이프 라벨 */}
      <View style={styles.fabTag}>
        <Text style={[styles.fabTagText]}>New Trip</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    fabContainer: {
      position: 'absolute',
      bottom: 30,
      right: 25,
      alignItems: 'center',
      zIndex: 999,
    },
    waxSeal: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: MidoriColors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: MidoriColors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
    waxInnerBorder: {
      width: 38,  
      height: 38,
      borderRadius: 19,
        borderWidth: 1.2,
      borderStyle:'dashed',
      borderColor: 'rgba(255, 255, 255, 0.35)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fabTag: {
      marginTop: 6,
      backgroundColor: MidoriColors.tapeYellow,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 2,
      transform: [{ rotate: '3deg' }],
    },
    fabTagText: {
      fontSize: 9, 
      color: MidoriColors.ink,
      fontWeight: '700',
      letterSpacing: 0.3,
    },
  });