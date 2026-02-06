// src/screens/Cart/index.tsx

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './styles';

type CartScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Cart'
>;

interface Props {
  navigation: CartScreenNavigationProp;
}

const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = createStyles(colors);

  const handleIncrement = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const totalPrice = getTotalPrice();

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
          <Text style={styles.headerTitle}>Cart</Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Text style={styles.iconText}>{isDarkMode ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyCartIcon}>🛒</Text>
          </View>
          <Text style={styles.emptyText}>Your cart is empty</Text>
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
        <Text style={styles.headerTitle}>Cart</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Text style={styles.iconText}>{isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemContent}>
              <View style={styles.itemImageContainer}>
                {item.imageUrl ? (
                  <Image 
                    source={item.imageUrl} 
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.itemEmoji}>{item.image}</Text>
                  </View>
                )}
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.originalPrice}>
                    ₱{item.price} each
                  </Text>
                  <Text style={styles.itemPrice}>
                    ₱{item.price * item.quantity}
                  </Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleDecrement(item.id, item.quantity)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.quantityButtonText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleIncrement(item.id, item.quantity)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.deleteIcon}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>₱{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => navigation.navigate('Checkout')}
          activeOpacity={0.7}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;