import { StyleSheet } from 'react-native';

const colors = {
  primary: '#5B21B6',
  primaryLight: '#7C3AED',
  primaryDark: '#4C1D95',
  secondary: '#06B6D4',
  accent: '#EC4899',
  success: '#10B981',
  successLight: '#D1FAE5',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  info: '#3B82F6',
  background: '#F8FAFC',
  backgroundDark: '#EFF6FF',
  text: '#0F172A',
  textLight: '#64748B',
  textLighter: '#94A3B8',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  white: '#FFFFFF',
  gradientStart: '#5B21B6',
  gradientEnd: '#7C3AED',
};

const styles = StyleSheet.create({
  // ============ LAYOUT ============
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 120,
  },

  screenWrapper: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
  },

  // ============ HEADER ============
  header: {
    backgroundColor: colors.primary,
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
    letterSpacing: -0.5,
  },

  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },

  // ============ CARDS ============
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  cardPremium: {
    borderTopWidth: 4,
    borderTopColor: colors.primaryLight,
    backgroundColor: colors.backgroundDark,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  cardId: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
    letterSpacing: 0.5,
  },

  cardLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textLighter,
    marginTop: 12,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  cardValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },

  cardActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  // ============ INPUTS ============
  input: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 15,
    color: colors.text,
    fontWeight: '500',
  },

  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.backgroundDark,
  },

  inputError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerLight,
  },

  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    fontWeight: '600',
  },

  // ============ BUTTONS ============
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    minHeight: 48,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },

  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  buttonSecondary: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
  },

  buttonSecondaryText: {
    color: colors.primary,
  },

  buttonDanger: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },

  buttonSuccess: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },

  buttonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 0,
    borderRadius: 8,
    minHeight: 36,
  },

  buttonSmallText: {
    fontSize: 13,
  },

  buttonDisabled: {
    opacity: 0.5,
  },

  // ============ FORMS ============
  formContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  formTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 20,
    letterSpacing: -0.5,
  },

  formSubtitle: {
    fontSize: 13,
    color: colors.textLight,
    fontWeight: '500',
    marginBottom: 16,
  },

  // ============ LISTS ============
  listContainer: {
    paddingHorizontal: 16,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '600',
    textAlign: 'center',
  },

  // ============ NAVIGATION ============
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 14,
    paddingHorizontal: 16,
    marginBottom: 14,
  },

  navCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 18,
    flex: 0.48,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 130,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },

  navCardActive: {
    backgroundColor: colors.backgroundDark,
    borderColor: colors.primaryLight,
    borderWidth: 2,
  },

  navCardText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
  },

  navCardIcon: {
    fontSize: 36,
  },

  // ============ LOADING & STATES ============
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },

  loadingText: {
    marginTop: 16,
    fontSize: 15,
    color: colors.textLight,
    fontWeight: '600',
  },

  // ============ BADGES ============
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 11,
    fontWeight: '700',
    overflow: 'hidden',
  },

  badgeSuccess: {
    backgroundColor: colors.successLight,
    color: colors.success,
  },

  badgeDanger: {
    backgroundColor: colors.dangerLight,
    color: colors.danger,
  },

  badgeWarning: {
    backgroundColor: colors.warningLight,
    color: colors.warning,
  },

  badgeInfo: {
    backgroundColor: `${colors.info}20`,
    color: colors.info,
  },

  // ============ TYPOGRAPHY ============
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.success,
  },

  priceSmall: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
  },

  // ============ DIVIDERS ============
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 14,
  },

  // ============ LAYOUT HELPERS ============
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  gap8: {
    gap: 8,
  },

  gap12: {
    gap: 12,
  },

  gap16: {
    gap: 16,
  },

  // ============ PADDING HELPERS ============
  p12: {
    padding: 12,
  },

  p16: {
    padding: 16,
  },

  p20: {
    padding: 20,
  },

  pt20: {
    paddingTop: 20,
  },

  pb20: {
    paddingBottom: 20,
  },

  // ============ FLEX ============
  flex1: {
    flex: 1,
  },

  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
});

export { colors };
export default styles;