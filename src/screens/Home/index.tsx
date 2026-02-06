// src/screens/Home/index.tsx

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { products } from '../../data/products';
import { createStyles } from './styles';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { cartItems, addToCart } = useCart();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = createStyles(colors);
  
  const slideAnim = useRef(new Animated.Value(100)).current;

  const totalItemsInCart = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleAddToCart = (product: any) => {
    addToCart(product);
    
    // Slide up the View Cart button
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleViewCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home of Bakers</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.themeButton}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Text style={styles.themeButtonText}>
              {isDarkMode ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => navigation.navigate('Cart')}
            activeOpacity={0.7}
          >
            <Text style={styles.cartButtonText}>Cart</Text>
            {totalItemsInCart > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalItemsInCart}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image 
            source={require('../../../assets/Home_of_Bakers.jpg')} 
            style={styles.logoImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollContent}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Our Products</Text>
        
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity 
              key={product.id} 
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
              activeOpacity={0.8}
            >
              <View style={styles.productImageContainer}>
                {product.imageUrl ? (
                  <Image 
                    source={product.imageUrl} 
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>No Image</Text>
                  </View>
                )}
              </View>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.productPrice}>₱{product.price}</Text>
                
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToCart(product)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {totalItemsInCart > 0 && (
        <Animated.View
          style={[
            styles.viewCartContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={handleViewCart}
            activeOpacity={0.7}
          >
            <Text style={styles.viewCartButtonText}> View Cart ({totalItemsInCart})</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;