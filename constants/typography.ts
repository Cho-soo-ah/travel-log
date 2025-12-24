import { Platform, TextStyle } from 'react-native';

export const Typography = {
  h1: {
    fontSize: 32,
    fontFamily: 'Geologica-Bold',
    lineHeight: 38,
  } as TextStyle,
  h2: {
    fontSize: 22,
    fontFamily: 'Geologica-SemiBold',
  } as TextStyle,
  label: {
    fontSize: 11,
    fontFamily: 'Geologica-Medium',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } as TextStyle,
  body: {
    fontSize: 15,
    fontFamily: 'Geologica-Regular',
    lineHeight: 22,
  } as TextStyle,
  note: {
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', // 수기 느낌용 세리프
    fontStyle: 'italic',
  } as TextStyle,
};