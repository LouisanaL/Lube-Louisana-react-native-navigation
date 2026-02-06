// src/screens/Checkout/index.tsx

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './styles';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Checkout'
>;

interface Props {
  navigation: CheckoutScreenNavigationProp;
}

const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = createStyles(colors);

  const totalPrice = getTotalPrice();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert(
        'Empty Cart',
        'Please add items to your cart before checking out.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert('Order Confirmed', 'Thank you for your order! We\'ll start preparing your baked goods right away.', [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.navigate('Home');
        },
      },
    ]);
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>{isDarkMode ? 'Light' : 'Dark'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items to checkout</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.7}
          >
            <Text style={styles.emptyButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Text style={styles.iconText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Text style={styles.iconText}>{isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Order Summary</Text>

        {cartItems.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>× {item.quantity}</Text>
              <Text style={styles.itemPrice}>
                ₱{item.price * item.quantity}
              </Text>
            </View>
            <Text style={styles.summaryLabel}>
              ₱{item.price} each
            </Text>
          </View>
        ))}

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items ({totalItems})</Text>
            <Text style={styles.summaryValue}>₱{totalPrice}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>₱{totalPrice}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.checkoutButton,
            cartItems.length === 0 && styles.checkoutButtonDisabled,
          ]}
          onPress={handleCheckout}
          activeOpacity={0.7}
          disabled={cartItems.length === 0}
        >
          <Text style={styles.checkoutButtonText}>Complete Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;