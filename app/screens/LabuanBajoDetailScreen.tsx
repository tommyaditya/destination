import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Modal,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// ================== CONFIG ==================
const BASE_PRICE: number = 10000;
const avatarPlaceholder = require('../assets/images/avatar-placeholder.jpg');
const phinisiImage = require('../assets/images/Liveaboard.jpg');
const bajoImage = require('../assets/images/labuanbajo.jpg');

const formatPrice = (price: number): string => {
  return `$${price.toLocaleString('en-US')}`;
};

// ================== TYPES ==================
interface Comment {
  id: string;
  author: string;
  avatar: any;
  text: string;
}

// ================== COMMENT ITEM COMPONENT ==================
const CommentItem: React.FC<{ item: Comment }> = ({ item }) => (
  <View style={styles.commentItem}>
    <Image source={item.avatar} style={styles.commentAvatar} />
    <View style={{ flex: 1 }}>
      <Text style={styles.commentAuthor}>{item.author}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </View>
  </View>
);

// ================== MAIN SCREEN ==================
const LabuanBajoDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState<number>(1);
  const [totalAmount, setTotalAmount] = useState<number>(BASE_PRICE);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  const comments: Comment[] = [
    {
      id: '1',
      author: 'Jiwoo H2H',
      avatar: avatarPlaceholder,
      text: 'Wow amazing yanh, best experience in my life very very worth it i like it! Very good very well',
    },
    {
      id: '2',
      author: 'Carmen H2H',
      avatar: avatarPlaceholder,
      text: 'Great trip, highly recommend — beautiful views and friendly crew.',
    },
    {
      id: '3',
      author: 'Juun H2H',
      avatar: avatarPlaceholder,
      text: 'Service was excellent and itinerary was well planned.',
    },
  ];

  const handleAdd = () => setQuantity((prev) => prev + 1);
  const handleSubtract = () => setQuantity((prev) => Math.max(1, prev - 1));

  useEffect(() => {
    setTotalAmount(quantity * BASE_PRICE);
  }, [quantity]);

  return (
    <SafeAreaView style={styles.container}>
      {/* ================== MODAL ================== */}
      <Modal visible={showAllComments} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>All Reviews</Text>
              <TouchableOpacity
                onPress={() => setShowAllComments(false)}
                style={styles.modalClose}
                accessibilityLabel="Close reviews"
              >
                <Ionicons name="close" size={20} color="#0B1020" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <CommentItem item={item} />}
            />
          </View>
        </View>
      </Modal>

      {/* ================== HEADER ================== */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        style={styles.contentWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        <View style={styles.headerContainer}>
          <ImageBackground source={bajoImage} style={styles.imageBackground} resizeMode="cover">
            <View style={styles.headerOverlayTop}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => navigation.goBack()}
                accessible={true}
                accessibilityLabel="Go back"
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>

              <View style={styles.weatherContainer}>
                <Text style={styles.weatherText}>☀️ 24° C</Text>
              </View>
            </View>

            <View style={styles.bottomGradient} />

            <View style={styles.overlayContent}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#fff" />
                <Text style={styles.ratingText}>5.0</Text>
              </View>
              <Text style={styles.locationTitle} numberOfLines={2}>
                Labuan Bajo
              </Text>
              <Text style={styles.locationDescription} numberOfLines={3}>
                From crystal-clear waters to breathtaking sunsets, Labuan Bajo is calling! Explore
                hidden islands, swim with manta rays, and create memories that last a lifetime.
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* ================== CONTENT ================== */}
        <View style={styles.contentContainer}>
          <Text style={styles.countryLabel}>🇮🇩 Indonesia</Text>
          <Text style={styles.title}>Discover the Beauty of Labuan Bajo</Text>

          {/* Review Preview */}
          <View style={styles.reviewBox}>
            <View style={styles.reviewerInfo}>
              <Image style={styles.reviewerAvatar} source={avatarPlaceholder} />
              <Text style={styles.reviewerName}>Jiwoo H2H</Text>
            </View>
            <Text style={styles.reviewText}>{comments[0].text}</Text>
          </View>

          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => setShowAllComments(true)}
            accessible={true}
            accessibilityLabel="View all reviews"
          >
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>

          {/* Recommendation */}
          <Text style={styles.recommendationTitle}>Recommendation in Bajo</Text>
          <View style={styles.recommendationCard}>
            <Image source={phinisiImage} style={styles.cardImage} />
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Phinisi Luxury Private Trip</Text>
              <Text style={styles.cardSubtitle}>Complimentary pick-up</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ================== BOTTOM BAR ================== */}
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBarInner}>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.qtyCircleOrange}
              onPress={handleSubtract}
              accessibilityLabel="Decrease quantity"
            >
              <Text style={styles.qtyCircleText}>−</Text>
            </TouchableOpacity>

            <View style={styles.qtyPill}>
              <Text style={styles.quantityText}>{quantity}</Text>
            </View>

            <TouchableOpacity
              style={styles.qtyCircleWhite}
              onPress={handleAdd}
              accessibilityLabel="Increase quantity"
            >
              <Text style={styles.qtyCircleTextDark}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.priceAndButton}>
            <View style={styles.priceContainer}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmountText}>{formatPrice(totalAmount)}</Text>
            </View>

            <TouchableOpacity
              style={styles.bookButtonLarge}
              onPress={() => console.log('Booking...')}
              accessible={true}
              accessibilityLabel="Book your trip"
            >
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

// ================== STYLES ==================
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5EB' },
  contentWrapper: { backgroundColor: 'transparent' },
  headerContainer: { height: 380, borderBottomLeftRadius: 28, borderBottomRightRadius: 28, overflow: 'hidden' },
  imageBackground: { width: '100%', height: '100%', justifyContent: 'flex-start' },
  headerOverlayTop: {
    marginTop: Platform.OS === 'android' ? 28 : 36,
    marginHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
  },
  weatherContainer: {
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)',
  },
  weatherText: { color: '#fff', fontWeight: '600' },
  bottomGradient: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    height: 220, backgroundColor: 'rgba(0,0,0,0.45)',
  },
  overlayContent: { position: 'absolute', left: 22, right: 22, bottom: 80, zIndex: 12 },
  ratingContainer: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: { color: '#fff', fontWeight: '700' },
  locationTitle: { color: '#fff', fontSize: 28, fontWeight: '800', lineHeight: 34, marginBottom: 4 },
  locationDescription: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
    paddingRight: 10,
  },

  // Content
  contentContainer: {
    padding: 16,
    backgroundColor: '#F7F5EB',
    marginTop: -24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  countryLabel: { color: '#6B7280', fontSize: 13, marginBottom: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#0B1020', marginBottom: 12 },

  // Review
  reviewBox: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  reviewerInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewerAvatar: { width: 34, height: 34, borderRadius: 17, marginRight: 10 },
  reviewerName: { color: '#54606B', fontSize: 12 },
  reviewText: { color: '#23313F', fontSize: 14, lineHeight: 20, marginBottom: 8 },
  viewAllButton: { alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8, backgroundColor: '#F0EBD9', borderRadius: 20 },
  viewAllText: { color: '#0B1020', fontSize: 13, fontWeight: '600' },

  // Recommendation
  recommendationTitle: { fontSize: 16, fontWeight: '700', color: '#0B1020', marginBottom: 10 },
  recommendationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E1B2B',
    padding: 12,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardImage: { width: width * 0.18, height: width * 0.14, borderRadius: 8, marginRight: 12 },
  cardText: { flex: 1 },
  cardTitle: { color: '#FFFFFF', fontWeight: '700', fontSize: 15, marginBottom: 6 },
  cardSubtitle: { color: '#B6C4D6', fontSize: 12 },

  // Bottom Sheet
  bottomBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10,12,15,0.85)',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  bottomBarInner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', maxWidth: '100%' },
  quantityControl: { flexDirection: 'row', alignItems: 'center', flex: 0.8 },
  qtyCircleOrange: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyCircleWhite: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyCircleText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  qtyCircleTextDark: { color: '#0B1020', fontSize: 18, fontWeight: '700' },
  qtyPill: {
    minWidth: 48,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  quantityText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  priceAndButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', flex: 1, marginLeft: 8 },
  priceContainer: { marginRight: 8, alignItems: 'flex-end' },
  totalLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 11 },
  totalAmountText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  bookButtonLarge: { backgroundColor: '#FF6B4A', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 24, marginLeft: 12 },
  bookButtonText: { color: '#fff', fontWeight: '700', fontSize: 15 },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' },
  modalContent: { maxHeight: '70%', backgroundColor: '#F7F5EB', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16 },
  modalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  modalTitle: { fontSize: 16, fontWeight: '700', color: '#0B1020' },
  modalClose: { padding: 6 },
  commentItem: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: 'rgba(11,16,32,0.04)' },
  commentAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 12 },
  commentAuthor: { fontSize: 13, fontWeight: '700', color: '#0B1020', marginBottom: 4 },
  commentText: { color: '#23313F', fontSize: 13, lineHeight: 18 },
});

export default LabuanBajoDetailScreen;