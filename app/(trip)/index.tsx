import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Platform,
} from "react-native";
import { Plus, Share2, MapPin } from "lucide-react-native";

// config
import { MidoriColors } from "../../constants/colors";
import { Typography } from "../../constants/typography";

export default function MainDashboard() {
	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				{/* 상단 헤더 */}
				<View style={styles.header}>
					<Text style={[styles.headerDate, Typography.label]}>
						DECEMBER 2025
					</Text>
					<Text style={[styles.headerTitle, Typography.h1]}>My Journey</Text>
				</View>

				{/* 여행 카드 (아까 만든 아날로그 티켓 스타일) */}
				<View style={styles.contentPadding}>
					<TouchableOpacity activeOpacity={0.9} style={styles.analogCard}>
						<View
							style={[
								styles.maskingTape,
								{ backgroundColor: MidoriColors.tapeGreen },
							]}
						/>
						<View style={styles.cardHeader}>
							<Text style={[styles.cardLabel, Typography.label]}>
								CURRENT TRIP
							</Text>
							<Text style={[styles.tripName, Typography.h2]}>Tokyo, Japan</Text>
						</View>
						<View style={styles.divider} />
						<View style={styles.cardBody}>
							<View style={styles.infoRow}>
								<MapPin size={14} color={MidoriColors.primary} />
								<Text style={[styles.infoText, Typography.note]}>
									Day 2: Asakusa & Shibuya
								</Text>
							</View>
						</View>
						<View style={styles.cardFooter}>
							<Text style={styles.priceText}>Spent: ¥32,400</Text>
							<Share2 size={18} color={MidoriColors.secondary} />
						</View>
					</TouchableOpacity>
				</View>

				{/* 지난 여행들 (간결한 리스트) */}
				<View style={styles.historySection}>
					<Text style={styles.sectionLabel}>PAST LOGS</Text>
					{[1, 2].map((i) => (
						<View key={i} style={styles.historyItem}>
							<Text style={styles.historyTitle}>2024 Jeju Island</Text>
							<Text style={styles.historyDate}>10.12 - 10.15</Text>
						</View>
					))}
				</View>
				<View style={{ height: 100 }} />
			</ScrollView>

			{/* 실링 왁스 스타일의 '새 여행 추가' 플로팅 버튼 */}
			<TouchableOpacity
				style={styles.fab}
				onPress={() => {
					/* 여행 생성 모달/페이지 이동 */
				}}
			>
				<View style={styles.fabInner}>
					<Plus color={MidoriColors.white} size={28} />
				</View>
				{/* 버튼 옆에 수기 느낌의 텍스트 추가 가능 (선택 사항) */}
				<View style={styles.fabTag}>
					<Text style={styles.fabTagText}>New Trip</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: MidoriColors.background },
	scrollContent: { flex: 1 },
	header: { paddingHorizontal: 25, paddingTop: 60, marginBottom: 20 },
	headerDate: { fontSize: 12, color: MidoriColors.secondary, letterSpacing: 2 },
	headerTitle: { fontSize: 32, color: MidoriColors.ink, fontWeight: "300" },
	contentPadding: { padding: 25 },

	// 아날로그 카드 스타일
	analogCard: {
		backgroundColor: MidoriColors.paperLight,
		padding: 20,
		borderWidth: 0.5,
		borderColor: MidoriColors.line,
		shadowColor: MidoriColors.ink,
		shadowOpacity: 0.05,
		position: "relative",
	},
	maskingTape: {
		position: "absolute",
		top: -10,
		left: "30%",
		width: 60,
		height: 20,
		transform: [{ rotate: "-2deg" }],
	},

	cardHeader: { flexDirection: "row", justifyContent: "space-between" },
	cardBody: {
		paddingVertical: 5, // 상하 여백을 살짝 주어 텍스트가 답답하지 않게 함
		minHeight: 40, // 내용이 적어도 카드의 형태가 유지되도록 최소 높이 설정
		justifyContent: "center",
	},
	cardLabel: { fontSize: 10, color: MidoriColors.secondary, marginBottom: 5 },
	tripName: { fontSize: 22, fontWeight: "bold", color: MidoriColors.ink },
	divider: {
		height: 0.5,
		backgroundColor: MidoriColors.line,
		marginVertical: 15,
	},
	infoRow: { flexDirection: "row", alignItems: "center" },
	infoText: {
		marginLeft: 8,
		color: MidoriColors.softText,
		fontSize: 14,
		fontFamily: "serif",
	},
	cardFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		alignItems: "center",
	},
	priceText: { color: MidoriColors.primary, fontWeight: "600" },

	historySection: { paddingHorizontal: 25 },
	sectionLabel: {
		fontSize: 11,
		color: MidoriColors.secondary,
		letterSpacing: 1,
		marginBottom: 15,
	},
	historyItem: {
		paddingVertical: 15,
		borderBottomWidth: 0.5,
		borderBottomColor: MidoriColors.line,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	historyTitle: { fontSize: 15, color: MidoriColors.ink },
	historyDate: { fontSize: 12, color: MidoriColors.secondary },

	// 실링 왁스 느낌의 FAB
	fab: {
		position: "absolute",
		bottom: 30,
		right: 25,
		alignItems: "center",
	},
	fabInner: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: MidoriColors.primary, // 혹은 MidoriColors.accent(레드)
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
	},
	fabTag: {
		backgroundColor: MidoriColors.tapeYellow,
		paddingHorizontal: 8,
		paddingVertical: 2,
		marginTop: 5,
		borderRadius: 2,
		transform: [{ rotate: "2deg" }],
	},
	fabTagText: {
		fontSize: 10,
		color: MidoriColors.ink,
		fontWeight: "bold",
	},
});
