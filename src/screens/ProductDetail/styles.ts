import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.primary,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 3,
      elevation: 3,
    },
    backButton: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFF',
    },
    scrollContent: {
      flex: 1,
    },
    imageContainer: {
      width: '100%',
      height: 300,
      backgroundColor: colors.background,
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: '100%',
    },
    placeholderImage: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.border,
    },
    placeholderText: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    contentContainer: {
      padding: 16,
    },
    productName: {
      fontSize: 26,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    productPrice: {
      fontSize: 24,
      fontWeight: '700',
      color: colors.primary,
      marginBottom: 20,
    },
    descriptionContainer: {
      marginBottom: 24,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    descriptionLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    descriptionText: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    quantityContainer: {
      marginBottom: 24,
    },
    quantityLabel: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 12,
    },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    quantityButton: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    quantityButtonText: {
      fontSize: 20,
      fontWeight: '600',
      color: colors.text,
    },
    quantityValue: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      minWidth: 30,
      textAlign: 'center',
    },
    addToCartButton: {
      backgroundColor: colors.primary,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 16,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 4,
    },
    addToCartButtonSuccess: {
      backgroundColor: colors.success,
    },
    addToCartButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 0.3,
    },
    successMessage: {
      backgroundColor: colors.success,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    successText: {
      color: '#FFF',
      fontSize: 14,
      fontWeight: '600',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '600',
    },
  });
