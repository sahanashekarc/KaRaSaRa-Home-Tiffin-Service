import React, { useState, useEffect } from 'react';
import { Camera, ShoppingBag, Mail, Phone, MapPin, Clock, User, LogOut, ChevronRight, Heart, Star, Check, X } from 'lucide-react';
import Egg_bonda from "./assets/Egg_bonda.png";
import akki_rotti from "./assets/akki_rotti.png";

import set_dosa from "./assets/set_dosa.png"; // corrected variable name
import idli from "./assets/idli.png";
import upma from "./assets/upma.png";
import pongal from "./assets/pongal.png";
import bisi_bath from "./assets/bisi_bath.png";
import veg_pulav from "./assets/veg_pulav.png";
import curd_rice from "./assets/curd_rice.png";
import menthe_rice from "./assets/menthe rice.png";
import corn_rice from "./assets/corn_rice.png";
import sambar_rice from "./assets/sambar_rice.png";
import lemon_rice from "./assets/lemon_rice.png";
import tomato_rice from "./assets/tomato_rice.png";
import cocunut_rice from "./assets/cocunut_rice.png";
import tamarind_rice from "./assets/tamarind_rice.png";
import jolada_rotti from "./assets/jolada_rotti.png";
import chapathi_egg from "./assets/chapathi_egg.png";
import kori_rotti from "./assets/kori_rotti.png";
import ragimudde from "./assets/ragimudde.png";
import chapathi_dal from "./assets/chapathi_dal.png";
import chapathi_paneer from "./assets/chapathi_paneer.png";
import parota_potato from "./assets/parota_potato.png";
import roti from "./assets/roti.png";
import golibaje from "./assets/golibaje.png";
import seasonal from "./assets/seasonal.png";
import lunch from "./assets/lunch.png";
import potato_bonda from "./assets/potato_bonda.png";
import masala_vada from "./assets/masala_vada.png";
import onion_pakoda from "./assets/onion_pakoda.png";
import mirchi_baji from "./assets/mirchi_baji.png";
import pomegranet from "./assets/pomegranet.png";
import special_biryani from "./assets/special_biriyani.png"; // added missing import

// Email sending function using Claude API
async function sendOrderConfirmationEmail(orderDetails) {
  const emailBody = `
Dear ${orderDetails.userName},

Thank you for choosing KaRaSaRa Home Tiffin! Your order has been confirmed.

ORDER DETAILS:
${orderDetails.items.map(item => `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}

Total Amount: ₹${orderDetails.total}
Delivery Address: ${orderDetails.address}
Expected Delivery: ${orderDetails.deliveryTime}

ABOUT OUR SERVICE:
🏠 100% Homemade Fresh Food
🌾 Traditional Halli-style cooking
👩‍🍳 Prepared by experienced home chefs
🥘 No preservatives, just pure love
🚚 Delivered hot to your doorstep

Your food is being freshly prepared with the same care and love as it would be in your own home. We use traditional recipes passed down through generations and the finest local ingredients.

Need help? Contact us at:
📞 +91 98765 43210
📧 support@KaRaSaRaHomeTiffin.com

With love and warm regards,
Team KaRaSaRa Home Tiffin
"Bringing home-cooked meals to your table"
  `.trim();

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          { 
            role: "user", 
            content: `Send an email to ${orderDetails.userEmail} with subject "Order Confirmed - KaRaSaRa Home Tiffin #${orderDetails.orderId}" and body:\n\n${emailBody}` 
          }
        ],
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error("Email sending failed:", error);
    return null;
  }
}

export default function TiffinServiceApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [selectedMealSet, setSelectedMealSet] = useState('set1');

  // Weekly Meal Sets - Two different sets for variety
  const weeklyMealSets = {
    set1: {
      name: 'Classic Homestyle Set',
      description: 'Traditional Karnataka meals with rotating variety',
      price: 1200, // per week for lunch + dinner
      meals: {
        Monday: {
          lunch: { name: 'Vegetable Pulav', image: veg_pulav },
          dinner: { name: 'Chapati with Veg Kurma', image: chapathi_dal }
        },
        Tuesday: {
          lunch: { name: 'Sambar Rice with Papad', image: sambar_rice },
          dinner: { name: 'Roti with Dal Fry', image: roti }
        },
        Wednesday: {
          lunch: { name: 'Bisi Bele Bath', image: bisi_bath

           },
          dinner: { name: 'Jolada Rotti with Enne Gai', image: jolada_rotti  }
        },
        Thursday: {
          lunch: { name: 'Curd Rice with Pickle', image: curd_rice },
          dinner: { name: 'Chapati with Paneer Curry', image: chapathi_paneer }
        },
        Friday: {
          lunch: { name: 'Lemon Rice', image: lemon_rice },
          dinner: { name: 'Chapati with Mixed Veg', image: chapathi_dal }
        },
        Saturday: {
          lunch: { name: 'Menthe Rice', image: menthe_rice },
          dinner: { name: 'Ragi Mudde with Saaru', image: ragimudde }
        },
        Sunday: {
          lunch: { name: 'Special Veg Biryani', image:veg_pulav },
          dinner: { name: 'Chapati with Kadai Veg', image: chapathi_dal }
        }
      }
    },
    set2: {
      name: 'Premium Variety Set',
      description: 'Diverse menu with special items every day',
      price: 1400, // per week for lunch + dinner
      meals: {
        Monday: {
          lunch: { name: 'Tomato Rice with Raita', image: tomato_rice },
          dinner: { name: 'Paratha with Aloo Gobi', image: parota_potato } // reused parota_potato placeholder
        },
        Tuesday: {
          lunch: { name: 'Corn Rice', image: corn_rice  },
          dinner: { name: 'Roti with Palak Paneer', image: roti}
        },
        Wednesday: {
          lunch: { name: 'Veg Pulav with Raita', image: veg_pulav  },
          dinner: { name: 'Chapati with Chole Masala', image: chapathi_paneer }
        },
        Thursday: {
          lunch: { name: 'Tamarind Rice', image: tamarind_rice },
          dinner: { name: 'Roti with Bhindi Masala', image: chapathi_dal }
        },
        Friday: {
          lunch: { name: 'Coconut Rice', image: cocunut_rice},
          dinner: { name: 'Ragi mudde with Mutton Curry', image: ragimudde }
        },
        Saturday: {
          lunch: { name: 'Khichdi with Kadhi', image: jolada_rotti },
          dinner: { name: 'Chapati with Egg Curry', image: chapathi_egg }
        },
        Sunday: {
          lunch: { name: 'Special Chicken Biryani', image: special_biryani },
          dinner: { name: 'Paratha with Paneer Butter Masala', image: parota_potato }
        }
      }
    }
  };

  // Expanded menu items with more variety
  const menuItems = [
    // Breakfast Items
    {
      id: 1,
      name: 'Set Dosa (3 pcs)',
      category: 'Breakfast',
      price: 70,
      description: 'Soft, fluffy dosas with coconut chutney and sambar',
      image: set_dosa,
      tag: 'Bestseller',
      rating: 4.9,
      time: '7 AM - 11 AM'
    },
    {
      id: 2,
      name: 'Akki Rotti with Chutney',
      category: 'Breakfast',
      price: 80,
      description: 'Rice flour roti with fresh coconut chutney and homemade butter',
      image: akki_rotti ,
      tag: 'Popular',
      rating: 4.8,
      time: '7 AM - 11 AM'
    },
    {
      id: 3,
      name: 'Rava Idli (4 pcs)',
      category: 'Breakfast',
      price: 60,
      description: 'Steamed semolina cakes with homemade chutney and sambar',
      image: idli,
      rating: 4.7,
      time: '7 AM - 11 AM'
    },
    {
      id: 4,
      name: 'Masala Dosa',
      category: 'Breakfast',
      price: 90,
      description: 'Crispy dosa stuffed with spiced potato masala, served with chutney',
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=300&fit=crop',
      
      tag: 'Classic',
      rating: 4.9,
      time: '7 AM - 11 AM'
    },
    {
      id: 5,
      name: 'Poha with Chutney',
      category: 'Breakfast',
      price: 50,
      description: 'Flattened rice tempered with curry leaves, peanuts & mustard',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
      rating: 4.6,
      time: '7 AM - 11 AM'
    },
    {
      id: 6,
      name: 'Upma',
      category: 'Breakfast',
      price: 55,
      description: 'Semolina cooked with vegetables, curry leaves and spices',
      image: upma,
      rating: 4.5,
      time: '7 AM - 11 AM'
    },
    {
      id: 7,
      name: 'Pongal',
      category: 'Breakfast',
      price: 65,
      description: 'Rice and lentil porridge with ghee, pepper and cashews',
      image: pongal,
      rating: 4.7,
      time: '7 AM - 11 AM'
    },

    // Lunch - Rice Varieties
    {
      id: 8,
      name: 'Bisi Bele Bath',
      category: 'Lunch',
      price: 90,
      description: 'Spicy lentil rice with fresh vegetables, ghee and boondi',
      image: bisi_bath,
      tag: 'Comfort Food',
      rating: 4.8,
      time: '12 PM - 3 PM'
    },
    {
      id: 9,
      name: 'Vegetable Pulav',
      category: 'Lunch',
      price: 100,
      description: 'Fragrant basmati rice with mixed vegetables and aromatic spices',
      image: veg_pulav,
      tag: 'Popular',
      rating: 4.7,
      time: '12 PM - 3 PM'
    },
    {
      id: 10,
      name: 'Curd Rice',
      category: 'Lunch',
      price: 60,
      description: 'Cooling rice mixed with fresh curd, tempered with curry leaves',
      image: curd_rice,
      rating: 4.6,
      time: '12 PM - 3 PM'
    },
    {
      id: 11,
      name: 'Menthe Rice',
      category: 'Lunch',
      price: 95,
      description: 'Fenugreek flavored rice with spices - authentic Karnataka style',
      image: menthe_rice,
      tag: 'Special',
      rating: 4.8,
      time: '12 PM - 3 PM'
    },
    {
      id: 12,
      name: 'Corn Rice',
      category: 'Lunch',
      price: 105,
      description: 'Sweet corn mixed rice with aromatic spices and coconut',
      image: corn_rice ,
      rating: 4.7,
      time: '12 PM - 3 PM'
    },
    {
      id: 13,
      name: 'Sambar Rice',
      category: 'Lunch',
      price: 85,
      description: 'Tangy sambar mixed with rice, ghee and papad',
      image: sambar_rice,
      tag: 'Homestyle',
      rating: 4.8,
      time: '12 PM - 3 PM'
    },
    {
      id: 14,
      name: 'Lemon Rice',
      category: 'Lunch',
      price: 70,
      description: 'Tangy lemon rice with peanuts, curry leaves and turmeric',
      image: lemon_rice,
      rating: 4.6,
      time: '12 PM - 3 PM'
    },
    {
      id: 15,
      name: 'Tomato Rice',
      category: 'Lunch',
      price: 80,
      description: 'Flavorful rice cooked with fresh tomatoes and spices',
      image: tomato_rice,
      rating: 4.7,
      time: '12 PM - 3 PM'
    },
    {
      id: 16,
      name: 'Coconut Rice',
      category: 'Lunch',
      price: 75,
      description: 'Aromatic rice with fresh coconut, cashews and curry leaves',
      image: cocunut_rice,
      rating: 4.6,
      time: '12 PM - 3 PM'
    },
    {
      id: 17,
      name: 'Tamarind Rice',
      category: 'Lunch',
      price: 85,
      description: 'Tangy rice with tamarind, peanuts and traditional tempering',
      image: tamarind_rice,
      rating: 4.7,
      time: '12 PM - 3 PM'
    },
    {
      id: 18,
      name: 'Veg Biryani',
      category: 'Lunch',
      price: 130,
      description: 'Fragrant basmati rice layered with vegetables and spices',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
      tag: 'Special',
      rating: 4.9,
      time: '12 PM - 3 PM'
    },

    // Dinner - Rotti & Chapati Meals
    {
      id: 19,
      name: 'Jolada Rotti with Enne Gai',
      category: 'Dinner',
      price: 120,
      description: 'Authentic sorghum roti with spicy brinjal curry - village style',
      image: jolada_rotti ,
      tag: 'Signature',
      rating: 4.9,
      time: '7 PM - 10 PM'
    },
    {
      id: 20,
      name: 'Chapati with Kurma',
      category: 'Dinner',
      price: 110,
      description: '4 soft chapatis with mixed vegetable kurma and onion raita',
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop',
      tag: 'Popular',
      rating: 4.7,
      time: '7 PM - 10 PM'
    },
    {
      id: 21,
      name: 'Kori Rotti Meal',
      category: 'Dinner',
      price: 130,
      description: 'Traditional rice roti with spicy chicken curry - Halli special',
      image: kori_rotti,
      tag: 'Non-Veg',
      rating: 4.9,
      time: '7 PM - 10 PM'
    },
    {
      id: 22,
      name: 'Ragi Mudde with Saaru',
      category: 'Dinner',
      price: 100,
      description: 'Finger millet balls with tangy rasam and chutney powder',
      image: ragimudde,
      tag: 'Healthy',
      rating: 4.7,
      time: '7 PM - 10 PM'
    },
    {
      id: 23,
      name: 'Chapati with Dal Fry',
      category: 'Dinner',
      price: 95,
      description: '4 chapatis with protein-rich dal fry and jeera rice',
      image: chapathi_dal,
      rating: 4.6,
      time: '7 PM - 10 PM'
    },
    {
      id: 24,
      name: 'Chapati with Paneer Curry',
      category: 'Dinner',
      price: 125,
      description: '4 chapatis with rich paneer curry and pulao',
      image: chapathi_paneer,
      rating: 4.8,
      time: '7 PM - 10 PM'
    },
    {
      id: 25,
      name: 'Paratha with Aloo Gobi',
      category: 'Dinner',
      price: 115,
      description: '3 parathas with potato-cauliflower curry and curd',
      image: parota_potato,
      rating: 4.7,
      time: '7 PM - 10 PM'
    },
    {
      id: 26,
      name: 'Roti with Palak Paneer',
      category: 'Dinner',
      price: 120,
      description: '4 rotis with spinach paneer curry and dal',
      image: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400&h=300&fit=crop',
      rating: 4.8,
      time: '7 PM - 10 PM'
    },

    // Evening Snacks
    {
      id: 27,
      name: 'Goli Baje (6 pcs)',
      category: 'Evening Snacks',
      price: 50,
      description: 'Fluffy deep-fried fritters made with maida, curd and spices',
      image: golibaje,
      tag: 'Hot Favorite',
      rating: 4.9,
      time: '4 PM - 7 PM'
    },
    {
      id: 28,
      name: 'Pav Bhaji',
      category: 'Evening Snacks',
      price: 80,
      description: 'Spicy mashed vegetable curry served with buttered pav',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&h=300&fit=crop',
      tag: 'Street Food',
      rating: 4.8,
      time: '4 PM - 7 PM'
    },
    {
      id: 29,
      name: 'Egg Bonda (4 pcs)',
      category: 'Evening Snacks',
      price: 60,
      description: 'Hard-boiled eggs coated in spiced gram flour and deep-fried',
      image: Egg_bonda,
      tag: 'Protein Rich',
      rating: 4.7,
      time: '4 PM - 7 PM'
    },
    {
      id: 30,
      name: 'Potato Bonda (4 pcs)',
      category: 'Evening Snacks',
      price: 45,
      description: 'Crispy gram flour fritters stuffed with spiced potato masala',
      image: potato_bonda,
      tag: 'Classic',
      rating: 4.8,
      time: '4 PM - 7 PM'
    },
    {
      id: 31,
      name: 'Masala Vada (4 pcs)',
      category: 'Evening Snacks',
      price: 50,
      description: 'Crunchy lentil fritters with onions, curry leaves and spices',
      image: masala_vada,
      rating: 4.7,
      time: '4 PM - 7 PM'
    },
    {
      id: 32,
      name: 'Samosa (4 pcs)',
      category: 'Evening Snacks',
      price: 55,
      description: 'Crispy triangular pastries filled with spiced potatoes and peas',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
      tag: 'Popular',
      rating: 4.8,
      time: '4 PM - 7 PM'
    },
    {
      id: 33,
      name: 'Onion Pakoda',
      category: 'Evening Snacks',
      price: 55,
      description: 'Crispy onion fritters with gram flour and aromatic spices',
      image: onion_pakoda,
      rating: 4.6,
      time: '4 PM - 7 PM'
    },
    {
      id: 34,
      name: 'Mirchi Bajji (5 pcs)',
      category: 'Evening Snacks',
      price: 60,
      description: 'Spicy green chilies stuffed and fried in crispy batter',
      image: mirchi_baji,
      tag: 'Spicy',
      rating: 4.7,
      time: '4 PM - 7 PM'
    },

    // Fresh Fruits - New Category
    {
      id: 35,
      name: 'Seasonal Fruit Platter',
      category: 'Fresh Fruits',
      price: 80,
      description: 'Fresh cut seasonal fruits - watermelon, papaya, banana, pomegranate',
      image: seasonal,
      tag: 'Healthy',
      rating: 4.7,
      time: 'All Day'
    },
    {
      id: 36,
      name: 'Fresh Fruit Salad Bowl',
      category: 'Fresh Fruits',
      price: 100,
      description: 'Mixed fruit salad with apple, grapes, orange, banana and honey dressing',
      image: 'https://images.unsplash.com/photo-1564093497595-593b96d80180?w=400&h=300&fit=crop',
      tag: 'Fresh',
      rating: 4.8,
      time: 'All Day'
    },
    {
      id: 37,
      name: 'Mango Delight Cup',
      category: 'Fresh Fruits',
      price: 90,
      description: 'Fresh mango chunks with a hint of mint (Seasonal)',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop',
      tag: 'Seasonal',
      rating: 4.9,
      time: 'All Day'
    },
    {
      id: 38,
      name: 'Berry Mix Bowl',
      category: 'Fresh Fruits',
      price: 120,
      description: 'Premium berries - strawberries, blueberries with Greek yogurt',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
      tag: 'Premium',
      rating: 4.8,
      time: 'All Day'
    },
    {
      id: 39,
      name: 'Watermelon Cube Box',
      category: 'Fresh Fruits',
      price: 60,
      description: 'Refreshing watermelon cubes - perfect summer snack',
      image: 'https://images.unsplash.com/photo-1589984662646-e7b2e4962f18?w=400&h=300&fit=crop',
      tag: 'Refreshing',
      rating: 4.6,
      time: 'All Day'
    },
    {
      id: 40,
      name: 'Pineapple Chunks',
      category: 'Fresh Fruits',
      price: 70,
      description: 'Sweet and tangy fresh pineapple chunks with chat masala',
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400&h=300&fit=crop',
      rating: 4.7,
      time: 'All Day'
    },
    {
      id: 41,
      name: 'Pomegranate Bowl',
      category: 'Fresh Fruits',
      price: 110,
      description: 'Fresh pomegranate arils - rich in antioxidants',
      image: pomegranet,
      tag: 'Superfood',
      rating: 4.8,
      time: 'All Day'
    },
    {
      id: 42,
      name: 'Tropical Fruit Mix',
      category: 'Fresh Fruits',
      price: 130,
      description: 'Exotic mix of dragon fruit, kiwi, passion fruit and mango',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&h=300&fit=crop',
      tag: 'Exotic',
      rating: 4.9,
      time: 'All Day'
    }
  ];

  const addToCart = (item) => {
    // Check if user is logged in before adding to cart
    if (!isLoggedIn) {
      alert('Please login to place an order');
      setCurrentPage('login');
      return;
    }
    
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
    setShowCart(true);
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, delta) => {
    setCart(cart.map(i => {
      if (i.id === itemId) {
        const newQuantity = i.quantity + delta;
        return newQuantity > 0 ? {...i, quantity: newQuantity} : i;
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleLogin = (email, password) => {
    // Simulate login
    setUser({ name: email.split('@')[0], email });
    setIsLoggedIn(true);
    setCurrentPage('menu');
  };

  const handleSignup = (name, email, password) => {
    // Simulate signup
    setUser({ name, email });
    setIsLoggedIn(true);
    setCurrentPage('menu');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCart([]);
    setCurrentPage('home');
  };

  const handlePlaceOrder = async (deliveryDetails) => {
    if (!isLoggedIn) {
      setCurrentPage('login');
      return;
    }

    const orderId = `GKS${Date.now()}`;
    const orderDetails = {
      orderId,
      userName: user.name,
      userEmail: user.email,
      items: cart,
      total: cartTotal + 30, // Adding delivery fee
      address: deliveryDetails.address,
      deliveryTime: deliveryDetails.time,
      timestamp: new Date().toLocaleString()
    };

    // Send confirmation email
    await sendOrderConfirmationEmail(orderDetails);

    setOrderConfirmation(orderDetails);
    setCart([]);
    setShowCart(false);
    setCurrentPage('confirmation');
  };

  // Weekly Plan Page
  const WeeklyPlanPage = () => {
    const [planDetails, setPlanDetails] = useState({
      portions: 1,
      forParents: false,
      parentPortions: 0,
      startDate: '',
      deliveryAddress: '',
      parentAddress: ''
    });

    const currentSet = weeklyMealSets[selectedMealSet];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const calculateTotal = () => {
      let total = currentSet.price * planDetails.portions;
      if (planDetails.forParents) {
        total += currentSet.price * planDetails.parentPortions;
      }
      return total;
    };

    const handleSubscribe = async () => {
      if (!isLoggedIn) {
        alert('Please login to subscribe to a weekly plan');
        setCurrentPage('login');
        return;
      }

      if (!planDetails.startDate || !planDetails.deliveryAddress) {
        alert('Please fill in all required details');
        return;
      }

      const subscriptionDetails = {
        orderId: `WP${Date.now()}`,
        userName: user.name,
        userEmail: user.email,
        mealSet: currentSet.name,
        portions: planDetails.portions,
        forParents: planDetails.forParents,
        parentPortions: planDetails.parentPortions,
        startDate: planDetails.startDate,
        deliveryAddress: planDetails.deliveryAddress,
        parentAddress: planDetails.parentAddress,
        weeklyTotal: calculateTotal(),
        timestamp: new Date().toLocaleString()
      };

      // Send confirmation email
      await sendWeeklyPlanEmail(subscriptionDetails);

      setOrderConfirmation(subscriptionDetails);
      setCurrentPage('confirmation');
    };

    return (
      <div className="weekly-plan-page">
        <div className="plan-header">
          <h1>Weekly Meal Plan</h1>
          <p>Perfect for students! Fixed meals for the entire week - Order today for next week</p>
          <div className="plan-notice">
            <span>📅</span>
            <p>Subscribe by <strong>Saturday</strong> to start meals from <strong>Monday</strong></p>
          </div>
        </div>

        {/* Meal Set Selection */}
        <div className="set-selector">
          <h2>Choose Your Meal Set</h2>
          <div className="set-cards">
            <div 
              className={`set-card ${selectedMealSet === 'set1' ? 'active' : ''}`}
              onClick={() => setSelectedMealSet('set1')}
            >
              <div className="set-badge">Set 1</div>
              <h3>{weeklyMealSets.set1.name}</h3>
              <p>{weeklyMealSets.set1.description}</p>
              <div className="set-price">₹{weeklyMealSets.set1.price}<span>/week</span></div>
              <div className="set-meals-preview">
                Includes: Lunch + Dinner (Mon-Sun)
              </div>
            </div>
            <div 
              className={`set-card ${selectedMealSet === 'set2' ? 'active' : ''}`}
              onClick={() => setSelectedMealSet('set2')}
            >
              <div className="set-badge premium">Set 2</div>
              <h3>{weeklyMealSets.set2.name}</h3>
              <p>{weeklyMealSets.set2.description}</p>
              <div className="set-price">₹{weeklyMealSets.set2.price}<span>/week</span></div>
              <div className="set-meals-preview">
                Includes: Lunch + Dinner (Mon-Sun)
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Menu Display */}
        <div className="weekly-menu">
          <h2>This Week's Menu - {currentSet.name}</h2>
          <div className="days-grid">
            {days.map(day => (
              <div key={day} className="day-card">
                <div className="day-header">{day}</div>
                <div className="meal-slot">
                  <div className="meal-time">Lunch</div>
                  <img src={currentSet.meals[day].lunch.image} alt={currentSet.meals[day].lunch.name} />
                  <div className="meal-name">{currentSet.meals[day].lunch.name}</div>
                </div>
                <div className="meal-slot">
                  <div className="meal-time">Dinner</div>
                  <img src={currentSet.meals[day].dinner.image} alt={currentSet.meals[day].dinner.name} />
                  <div className="meal-name">{currentSet.meals[day].dinner.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Form */}
        <div className="subscription-form">
          <h2>Subscription Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Number of Portions (For You)</label>
              <select 
                value={planDetails.portions}
                onChange={(e) => setPlanDetails({...planDetails, portions: parseInt(e.target.value)})}
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
              </select>
            </div>

            <div className="form-group">
              <label>Start Date (Next Week)</label>
              <input 
                type="date"
                value={planDetails.startDate}
                onChange={(e) => setPlanDetails({...planDetails, startDate: e.target.value})}
                min={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
              />
            </div>

            <div className="form-group full-width">
              <label>Your Delivery Address</label>
              <textarea 
                value={planDetails.deliveryAddress}
                onChange={(e) => setPlanDetails({...planDetails, deliveryAddress: e.target.value})}
                placeholder="Enter your complete delivery address"
                rows="2"
              />
            </div>

            <div className="form-group full-width">
              <div className="checkbox-group">
                <input 
                  type="checkbox"
                  id="forParents"
                  checked={planDetails.forParents}
                  onChange={(e) => setPlanDetails({...planDetails, forParents: e.target.checked})}
                />
                <label htmlFor="forParents">
                  <strong>Order for Parents/Family Too</strong>
                  <span>Send meals to your parents back home 💝</span>
                </label>
              </div>
            </div>

            {planDetails.forParents && (
              <>
                <div className="parent-section">
                  <h3>Parent's Meal Details</h3>
                  <div className="form-group">
                    <label>Portions for Parents</label>
                    <select 
                      value={planDetails.parentPortions}
                      onChange={(e) => setPlanDetails({...planDetails, parentPortions: parseInt(e.target.value)})}
                    >
                      <option value="0">Select</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 People</option>
                      <option value="3">3 People</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label>Parent's Delivery Address</label>
                    <textarea 
                      value={planDetails.parentAddress}
                      onChange={(e) => setPlanDetails({...planDetails, parentAddress: e.target.value})}
                      placeholder="Enter parent's complete delivery address"
                      rows="2"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="plan-summary">
            <h3>Plan Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>Meal Set:</span>
                <strong>{currentSet.name}</strong>
              </div>
              <div className="summary-row">
                <span>Your Portions:</span>
                <strong>{planDetails.portions} × ₹{currentSet.price} = ₹{currentSet.price * planDetails.portions}</strong>
              </div>
              {planDetails.forParents && planDetails.parentPortions > 0 && (
                <div className="summary-row">
                  <span>Parent's Portions:</span>
                  <strong>{planDetails.parentPortions} × ₹{currentSet.price} = ₹{currentSet.price * planDetails.parentPortions}</strong>
                </div>
              )}
              <div className="summary-row total">
                <span>Weekly Total:</span>
                <strong>₹{calculateTotal()}</strong>
              </div>
              <div className="plan-features">
                <span>✓ 14 meals per week (Lunch + Dinner)</span>
                <span>✓ Fresh homemade food daily</span>
                <span>✓ No cooking, no hassle</span>
                <span>✓ Cancel anytime</span>
              </div>
            </div>
            <button 
              className="subscribe-btn"
              onClick={handleSubscribe}
              disabled={!isLoggedIn}
            >
              {isLoggedIn ? 'Subscribe Now' : 'Login to Subscribe'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Email function for weekly plan
  async function sendWeeklyPlanEmail(subscriptionDetails) {
    const emailBody = `
Dear ${subscriptionDetails.userName},

Thank you for subscribing to KaRaSaRa Home TiffinWeekly Meal Plan!

SUBSCRIPTION DETAILS:
Meal Plan: ${subscriptionDetails.mealSet}
Start Date: ${subscriptionDetails.startDate}
Your Portions: ${subscriptionDetails.portions}
${subscriptionDetails.forParents ? `Parent's Portions: ${subscriptionDetails.parentPortions}` : ''}

DELIVERY ADDRESSES:
Your Address: ${subscriptionDetails.deliveryAddress}
${subscriptionDetails.forParents ? `Parent's Address: ${subscriptionDetails.parentAddress}` : ''}

Weekly Total: ₹${subscriptionDetails.weeklyTotal}

WHAT'S INCLUDED:
✓ Lunch + Dinner for 7 days (Monday to Sunday)
✓ Fresh homemade meals delivered daily
✓ Different menu every day
✓ No cooking hassle for the entire week

IMPORTANT NOTES:
📅 Meals will start from ${subscriptionDetails.startDate}
🕐 Lunch delivery: 12:30 PM - 1:00 PM
🕐 Dinner delivery: 7:30 PM - 8:00 PM
📞 Call us at +91 98765 43210 for any changes

Perfect for students living away from home! We cook with the same love and care your mother would.

${subscriptionDetails.forParents ? '💝 Special: Your parents will also receive the same delicious meals at their home!' : ''}

Thank you for choosing KaRaSaRa Home Tiffin - where every meal feels like home!

Best regards,
Team KaRaSaRa Home Tiffin
    `.trim();

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { 
              role: "user", 
              content: `Send an email to ${subscriptionDetails.userEmail} with subject "Weekly Meal Plan Confirmed - KaRaSaRa Home Tiffin #${subscriptionDetails.orderId}" and body:\n\n${emailBody}` 
            }
          ],
        })
      });
      
      return await response.json();
    } catch (error) {
      console.error("Email sending failed:", error);
      return null;
    }
  }
  const HomePage = () => (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              <span>Serving Fresh Since 2020</span>
            </div>
            <h1 className="hero-title">
              <span className="title-line">KaRaSaRa</span>
              <span className="title-line accent">Home Tiffin</span>
            </h1>
            <p className="hero-subtitle">Experience the authentic taste of home-cooked Karnataka cuisine, delivered fresh to your doorstep</p>
            <div className="hero-tags">
              <span className="tag">🏠 100% Homemade</span>
              <span className="tag">🌾 Halli Style</span>
              <span className="tag">❤️ Made with Love</span>
              <span className="tag">🔥 Fresh & Hot</span>
            </div>
            <div className="hero-buttons">
              <button className="cta-button primary" onClick={() => setCurrentPage('menu')}>
                Explore Menu <ChevronRight size={20} />
              </button>
              {!isLoggedIn && (
                <button className="cta-button secondary" onClick={() => setCurrentPage('login')}>
                  Login / Sign Up
                </button>
              )}
            </div>
            <div className="hero-stats">
              <div className="stat">
                <strong>5000+</strong>
                <span>Happy Customers</span>
              </div>
              <div className="stat">
                <strong>4.8★</strong>
                <span>Average Rating</span>
              </div>
              <div className="stat">
                <strong>42+</strong>
                <span>Menu Items</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="food-circle circle-1"></div>
            <div className="food-circle circle-2"></div>
            <div className="food-circle circle-3"></div>
            <div className="decorative-element element-1"></div>
            <div className="decorative-element element-2"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🍳</div>
          <h3>Freshly Prepared</h3>
          <p>Every meal cooked fresh daily by experienced home chefs using traditional methods</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌿</div>
          <h3>Pure Ingredients</h3>
          <p>No preservatives, just natural ingredients sourced from local farms</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Fast Delivery</h3>
          <p>Hot meals delivered to your doorstep within 45 minutes guaranteed</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👨‍🍳</div>
          <h3>Expert Chefs</h3>
          <p>Traditional recipes passed down through generations</p>
        </div>
      </section>

      {/* Menu Categories Preview */}
      <section className="categories-preview">
        <h2 className="section-title">Explore Our Menu</h2>
        <p className="section-subtitle">From breakfast to dinner, we've got you covered</p>
        <div className="category-grid">
          <div className="category-card" onClick={() => setCurrentPage('menu')}>
            <div className="category-image breakfast-bg"></div>
            <div className="category-overlay">
              <h3>Breakfast</h3>
              <p>7 AM - 11 AM</p>
              <span className="category-count">7 items</span>
            </div>
          </div>
          <div className="category-card" onClick={() => setCurrentPage('menu')}>
            <div className="category-image lunch-bg"></div>
            <div className="category-overlay">
              <h3>Lunch</h3>
              <p>12 PM - 3 PM</p>
              <span className="category-count">11 items</span>
            </div>
          </div>
          <div className="category-card" onClick={() => setCurrentPage('menu')}>
            <div className="category-image dinner-bg"></div>
            <div className="category-overlay">
              <h3>Dinner</h3>
              <p>7 PM - 10 PM</p>
              <span className="category-count">8 items</span>
            </div>
          </div>
          <div className="category-card" onClick={() => setCurrentPage('menu')}>
            <div className="category-image snacks-bg"></div>
            <div className="category-overlay">
              <h3>Evening Snacks</h3>
              <p>4 PM - 7 PM</p>
              <span className="category-count">8 items</span>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Plan Promotion */}
      <section className="weekly-plan-promo">
        <div className="promo-content">
          <div className="promo-text">
            <div className="promo-badge">🎓 Perfect for Students</div>
            <h2>Weekly Meal Plans</h2>
            <p>Living away from home? Miss mom's cooking? We've got you covered!</p>
            <ul className="promo-features">
              <li>✓ Fixed meals for entire week (Lunch + Dinner)</li>
              <li>✓ Two different meal sets to choose from</li>
              <li>✓ Order extra for your parents back home</li>
              <li>✓ Subscribe by Saturday for next week</li>
              <li>✓ Starting from just ₹1200/week</li>
            </ul>
            <button className="cta-button primary" onClick={() => setCurrentPage('weeklyplan')}>
              View Weekly Plans <ChevronRight size={20} />
            </button>
          </div>
          <div className="promo-visual">
            <div className="promo-card">
              <h4>Monday</h4>
              <div className="promo-meal-preview">
                <div>🍛 Veg Pulav</div>
                <div>🫓 Chapati with Kurma</div>
              </div>
            </div>
            <div className="promo-card">
              <h4>Tuesday</h4>
              <div className="promo-meal-preview">
                <div>🍚 Sambar Rice</div>
                <div>🫓 Roti with Dal</div>
              </div>
            </div>
            <div className="promo-card highlight">
              <div className="highlight-badge">7 Days!</div>
              <h4>Full Week</h4>
              <div className="promo-meal-preview">
                <div>14 Meals</div>
                <div>Different Every Day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Dishes Preview */}
      <section className="popular-preview">
        <h2 className="section-title">Most Loved Dishes</h2>
        <p className="section-subtitle">Our customers' favorites</p>
        <div className="dish-grid">
          {menuItems.filter(item => item.tag && item.category !== 'Fresh Fruits').slice(0, 6).map(item => (
            <div key={item.id} className="dish-card-mini" onClick={() => setCurrentPage('menu')}>
              <img src={item.image} alt={item.name} />
              <div className="dish-mini-tag">{item.tag}</div>
              <div className="dish-info">
                <h4>{item.name}</h4>
                <div className="dish-mini-footer">
                  <span className="price">₹{item.price}</span>
                  <div className="rating-mini">
                    <Star size={12} fill="#f59e0b" stroke="#f59e0b" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fresh Fruits Section */}
      <section className="fruits-section">
        <div className="fruits-header">
          <div className="fruits-header-content">
            <h2 className="section-title">Fresh & Healthy</h2>
            <p className="section-subtitle">Farm-fresh fruits delivered daily</p>
          </div>
          <button className="view-all-btn" onClick={() => setCurrentPage('menu')}>
            View All Fruits <ChevronRight size={18} />
          </button>
        </div>
        <div className="fruits-grid">
          {menuItems.filter(item => item.category === 'Fresh Fruits').slice(0, 4).map(item => (
            <div key={item.id} className="fruit-card" onClick={() => setCurrentPage('menu')}>
              <div className="fruit-image-wrapper">
                <img src={item.image} alt={item.name} />
                <div className="fruit-overlay">
                  <span className="fruit-emoji">🍎</span>
                </div>
              </div>
              <div className="fruit-content">
                {item.tag && <span className="fruit-badge">{item.tag}</span>}
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="fruit-footer">
                  <span className="fruit-price">₹{item.price}</span>
                  <div className="fruit-rating">
                    <Star size={14} fill="#10b981" stroke="#10b981" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="fruits-features">
          <div className="fruit-feature">
            <span className="feature-emoji">🌱</span>
            <p>100% Organic</p>
          </div>
          <div className="fruit-feature">
            <span className="feature-emoji">🚚</span>
            <p>Same Day Delivery</p>
          </div>
          <div className="fruit-feature">
            <span className="feature-emoji">✨</span>
            <p>Freshly Cut</p>
          </div>
          <div className="fruit-feature">
            <span className="feature-emoji">💚</span>
            <p>No Preservatives</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">Real reviews from real food lovers</p>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"The best homemade food in Bengaluru! The taste reminds me of my grandmother's cooking. Jolada Rotti is absolutely authentic!"</p>
            <div className="testimonial-author">
              <strong>Priya Sharma</strong>
              <span>Regular Customer</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"Finally found a place that serves real Karnataka food. The Bisi Bele Bath is spot on, and delivery is always on time!"</p>
            <div className="testimonial-author">
              <strong>Rajesh Kumar</strong>
              <span>Food Enthusiast</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"As someone who works long hours, this service is a lifesaver. Healthy, tasty, and feels like eating at home. Highly recommend!"</p>
            <div className="testimonial-author">
              <strong>Anita Desai</strong>
              <span>Working Professional</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Experience Home-Cooked Goodness?</h2>
          <p>Join thousands of happy customers enjoying authentic meals daily</p>
          <button className="cta-button large" onClick={() => setCurrentPage(isLoggedIn ? 'menu' : 'login')}>
            {isLoggedIn ? 'Order Now' : 'Get Started'} <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );

  // Login Page
  const LoginPage = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isSignup) {
        handleSignup(formData.name, formData.email, formData.password);
      } else {
        handleLogin(formData.email, formData.password);
      }
    };

    return (
      <div className="login-page">
        <div className="login-container">
          <div className="login-visual">
            <h2>Welcome to</h2>
            <h1>KaRaSaRa Home Tiffin</h1>
            <p>Where every meal feels like home</p>
          </div>
          <div className="login-form-wrapper">
            <h3>{isSignup ? 'Create Account' : 'Welcome Back'}</h3>
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              )}
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
              <button type="submit" className="submit-btn">
                {isSignup ? 'Sign Up' : 'Log In'}
              </button>
            </form>
            <p className="toggle-text">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}
              <button onClick={() => setIsSignup(!isSignup)} className="toggle-btn">
                {isSignup ? 'Log In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Menu Page
  const MenuPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Evening Snacks', 'Fresh Fruits'];
    
    const filteredItems = selectedCategory === 'All' 
      ? menuItems 
      : menuItems.filter(item => item.category === selectedCategory);

    return (
      <div className="menu-page">
        <div className="menu-header">
          <h1>Our Menu</h1>
          <p>Authentic homestyle cooking, just like Amma makes</p>
          {!isLoggedIn && (
            <div className="login-notice">
              <span>🔒</span>
              <p>Please <button onClick={() => setCurrentPage('login')}>login</button> to place an order</p>
            </div>
          )}
        </div>

        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-item-card">
              <div className="item-image-wrapper">
                <img src={item.image} alt={item.name} />
                {item.tag && <span className="item-tag">{item.tag}</span>}
                {item.time && <span className="item-time">{item.time}</span>}
              </div>
              <div className="item-details">
                <div className="item-header">
                  <h3>{item.name}</h3>
                  <div className="rating">
                    <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <p className="item-description">{item.description}</p>
                <span className="item-category">{item.category}</span>
                <div className="item-footer">
                  <span className="item-price">₹{item.price}</span>
                  <button 
                    className={`add-btn ${!isLoggedIn ? 'disabled' : ''}`}
                    onClick={() => addToCart(item)}
                  >
                    <ShoppingBag size={16} /> {isLoggedIn ? 'Add' : 'Login to Add'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Cart Sidebar
  const CartSidebar = () => {
    const [deliveryDetails, setDeliveryDetails] = useState({
      address: '',
      time: 'ASAP (45 mins)'
    });

    return (
      <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
        <div className="cart-overlay" onClick={() => setShowCart(false)}></div>
        <div className="cart-content">
          <div className="cart-header">
            <h2>Your Order</h2>
            <button onClick={() => setShowCart(false)}>
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <span className="cart-item-price">₹{item.price}</span>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="delivery-section">
                <h3>Delivery Details</h3>
                <input
                  type="text"
                  placeholder="Delivery Address"
                  value={deliveryDetails.address}
                  onChange={(e) => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                />
                <select
                  value={deliveryDetails.time}
                  onChange={(e) => setDeliveryDetails({...deliveryDetails, time: e.target.value})}
                >
                  <option>ASAP (45 mins)</option>
                  <option>1 hour</option>
                  <option>2 hours</option>
                  <option>Evening (6-7 PM)</option>
                </select>
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee</span>
                  <span>₹30</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{cartTotal + 30}</span>
                </div>
                <button 
                  className="checkout-btn"
                  onClick={() => handlePlaceOrder(deliveryDetails)}
                  disabled={!deliveryDetails.address}
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  // Order Confirmation Page
  const ConfirmationPage = () => (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="success-icon">
          <Check size={48} />
        </div>
        <h1>Order Confirmed!</h1>
        <p className="order-id">Order #{orderConfirmation?.orderId}</p>
        <div className="confirmation-details">
          <p>✉️ A confirmation email has been sent to <strong>{orderConfirmation?.userEmail}</strong></p>
          <p>🚚 Expected delivery: <strong>{orderConfirmation?.deliveryTime}</strong></p>
          <p>📍 Delivery address: <strong>{orderConfirmation?.address}</strong></p>
        </div>
        <div className="order-items">
          <h3>Your Items:</h3>
          {orderConfirmation?.items.map(item => (
            <div key={item.id} className="conf-item">
              <span>{item.name} x{item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="conf-total">
            <strong>Total Paid:</strong>
            <strong>₹{orderConfirmation?.total}</strong>
          </div>
        </div>
        <button className="back-btn" onClick={() => setCurrentPage('menu')}>
          Continue Shopping
        </button>
      </div>
    </div>
  );

  // Navigation
  const Navigation = () => (
    <nav className="navbar">
      <div className="nav-content">
        <div className="logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-icon">🏠</span>
          <span className="logo-text">KaRaSaRa Home Tiffin</span>
        </div>
        <div className="nav-links">
          <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'active' : ''}>
            Home
          </button>
          <button onClick={() => setCurrentPage('menu')} className={currentPage === 'menu' ? 'active' : ''}>
            Menu
          </button>
          <button onClick={() => setCurrentPage('weeklyplan')} className={currentPage === 'weeklyplan' ? 'active' : ''}>
            Weekly Plan
          </button>
          {isLoggedIn ? (
            <>
              <button className="cart-icon-btn" onClick={() => setShowCart(true)}>
                <ShoppingBag size={20} />
                {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
              </button>
              <div className="user-menu">
                <User size={20} />
                <span>{user?.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <button onClick={() => setCurrentPage('login')} className="login-nav-btn">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );

  // Footer
  const Footer = () => (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>KaRaSaRa Home Tiffin</h3>
          <p>Bringing authentic homemade meals to your doorstep</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p><Phone size={16} /> +91 420-840</p>
          <p><Mail size={16} /> support@karasarahometiffin.com</p>
          <p><MapPin size={16} /> Mangaluru, Karnataka</p>
        </div>
        <div className="footer-section">
          <h4>Hours</h4>
          <p><Clock size={16} /> Mon-Sun: 7 AM - 10 PM</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'menu' && <MenuPage />}
        {currentPage === 'weeklyplan' && <WeeklyPlanPage />}
        {currentPage === 'confirmation' && <ConfirmationPage />}
      </main>
      <CartSidebar />
      <Footer />

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Poppins', sans-serif;
        }

        .app {
          min-height: 100vh;
          background: #faf8f3;
        }

        /* Navigation */
        .navbar {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          padding: 1rem 2rem;
          box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .logo:hover {
          transform: scale(1.05);
        }

        .logo-icon {
          font-size: 2rem;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links button {
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s;
        }

        .nav-links button:hover,
        .nav-links button.active {
          background: rgba(255, 255, 255, 0.2);
        }

        .cart-icon-btn {
          position: relative;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #dc2626;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 25px;
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.3) !important;
          padding: 0.5rem !important;
          border-radius: 50% !important;
        }

        .login-nav-btn {
          background: white !important;
          color: #ff6b35 !important;
          font-weight: 600 !important;
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%);
          padding: 4rem 2rem 6rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255, 107, 53, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        .hero-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          padding: 0.5rem 1.25rem;
          border-radius: 25px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #ff6b35;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
          animation: slideInLeft 0.8s ease-out;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: blink 2s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .hero-title {
          font-size: 5rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          animation: slideInLeft 0.8s ease-out 0.2s both;
        }

        .title-line {
          color: #2d3748;
        }

        .title-line.accent {
          color: #ff6b35;
          font-size: 6rem;
          text-shadow: 4px 4px 0 rgba(247, 147, 30, 0.3);
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: #4a5568;
          margin-bottom: 2rem;
          line-height: 1.6;
          animation: slideInLeft 0.8s ease-out 0.4s both;
        }

        .hero-tags {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          animation: slideInLeft 0.8s ease-out 0.6s both;
        }

        .tag {
          background: white;
          padding: 0.6rem 1.2rem;
          border-radius: 25px;
          font-size: 0.95rem;
          font-weight: 500;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .tag:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2.5rem;
          animation: slideInLeft 0.8s ease-out 0.8s both;
        }

        .cta-button {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(255, 107, 53, 0.5);
        }

        .cta-button.secondary {
          background: white;
          color: #ff6b35;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .cta-button.secondary:hover {
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
        }

        .cta-button.large {
          padding: 1.25rem 3rem;
          font-size: 1.2rem;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          animation: slideInLeft 0.8s ease-out 1s both;
        }

        .stat {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat strong {
          font-size: 2rem;
          color: #ff6b35;
          font-weight: 800;
        }

        .stat span {
          font-size: 0.9rem;
          color: #718096;
        }

        .hero-image {
          position: relative;
          height: 500px;
          animation: fadeIn 1s ease-out 0.5s both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .food-circle {
          position: absolute;
          border-radius: 50%;
          background-size: cover;
          background-position: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
          animation: float 6s ease-in-out infinite;
          border: 5px solid white;
        }

        .circle-1 {
          width: 280px;
          height: 280px;
          top: 0;
          left: 0;
          background-image: url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop');
          animation-delay: 0s;
          z-index: 3;
        }

        .circle-2 {
          width: 220px;
          height: 220px;
          top: 120px;
          right: 80px;
          background-image: url('https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&h=400&fit=crop');
          animation-delay: 2s;
          z-index: 2;
        }

        .circle-3 {
          width: 200px;
          height: 200px;
          bottom: 20px;
          right: 0;
          background-image: url('https://images.unsplash.com/photo-1589301773859-76c4d16b6e59?w=400&h=400&fit=crop');
          animation-delay: 4s;
          z-index: 1;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(5deg);
          }
        }

        .decorative-element {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          opacity: 0.1;
        }

        .element-1 {
          width: 150px;
          height: 150px;
          top: 10%;
          right: 5%;
          animation: rotate 20s linear infinite;
        }

        .element-2 {
          width: 100px;
          height: 100px;
          bottom: 15%;
          left: 10%;
          animation: rotate 15s linear infinite reverse;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Features */
        .features {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .feature-card {
          background: white;
          padding: 2.5rem 2rem;
          border-radius: 25px;
          text-align: center;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: 2px solid transparent;
        }

        .feature-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 15px 45px rgba(255, 107, 53, 0.2);
          border-color: #ff6b35;
        }

        .feature-icon {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          display: inline-block;
          transition: transform 0.3s;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.2) rotate(10deg);
        }

        .feature-card h3 {
          color: #2d3748;
          margin-bottom: 0.75rem;
          font-size: 1.4rem;
          font-weight: 700;
        }

        .feature-card p {
          color: #718096;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* Popular Preview */
        .popular-preview {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          background: #fafafa;
        }

        .section-title {
          text-align: center;
          font-size: 2.8rem;
          color: #2d3748;
          margin-bottom: 1rem;
          font-weight: 800;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.2rem;
          color: #718096;
          margin-bottom: 3rem;
        }

        .dish-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .dish-card-mini {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s;
          cursor: pointer;
          position: relative;
        }

        .dish-card-mini:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .dish-card-mini img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.5s;
        }

        .dish-card-mini:hover img {
          transform: scale(1.1);
        }

        .dish-mini-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          padding: 0.4rem 0.9rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          z-index: 10;
        }

        .dish-info {
          padding: 1.25rem;
        }

        .dish-info h4 {
          font-size: 1.05rem;
          color: #2d3748;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .dish-mini-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .rating-mini {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          color: #f59e0b;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .price {
          color: #ff6b35;
          font-weight: 700;
          font-size: 1.2rem;
        }

        /* Fresh Fruits Section */
        .fruits-section {
          max-width: 1400px;
          margin: 4rem auto;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border-radius: 40px;
          position: relative;
          overflow: hidden;
        }

        .fruits-section::before {
          content: '🍓';
          position: absolute;
          top: -30px;
          right: 10%;
          font-size: 8rem;
          opacity: 0.15;
          animation: float 6s ease-in-out infinite;
        }

        .fruits-section::after {
          content: '🥭';
          position: absolute;
          bottom: -30px;
          left: 5%;
          font-size: 8rem;
          opacity: 0.15;
          animation: float 8s ease-in-out infinite reverse;
        }

        .fruits-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
        }

        .fruits-header-content h2 {
          color: #065f46;
        }

        .fruits-header-content p {
          color: #047857;
        }

        .view-all-btn {
          background: white;
          color: #10b981;
          border: 2px solid #10b981;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.2);
        }

        .view-all-btn:hover {
          background: #10b981;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
        }

        .fruits-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
          position: relative;
          z-index: 1;
        }

        .fruit-card {
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.15);
          transition: all 0.4s;
          cursor: pointer;
        }

        .fruit-card:hover {
          transform: translateY(-12px) rotate(2deg);
          box-shadow: 0 15px 45px rgba(16, 185, 129, 0.25);
        }

        .fruit-image-wrapper {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .fruit-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s;
        }

        .fruit-card:hover .fruit-image-wrapper img {
          transform: scale(1.15);
        }

        .fruit-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.3));
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .fruit-card:hover .fruit-overlay {
          opacity: 1;
        }

        .fruit-emoji {
          font-size: 4rem;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .fruit-content {
          padding: 1.5rem;
        }

        .fruit-badge {
          display: inline-block;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .fruit-content h3 {
          color: #065f46;
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .fruit-content p {
          color: #6b7280;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .fruit-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .fruit-price {
          color: #10b981;
          font-size: 1.4rem;
          font-weight: 800;
        }

        .fruit-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: #d1fae5;
          padding: 0.3rem 0.7rem;
          border-radius: 15px;
          color: #065f46;
          font-weight: 600;
        }

        .fruits-features {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 3rem;
          position: relative;
          z-index: 1;
        }

        .fruit-feature {
          background: white;
          padding: 1.5rem;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);
          transition: all 0.3s;
        }

        .fruit-feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.2);
        }

        .feature-emoji {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.75rem;
        }

        .fruit-feature p {
          color: #065f46;
          font-weight: 600;
          font-size: 1rem;
          margin: 0;
        }

        /* Categories Preview */
        .categories-preview {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .category-card {
          position: relative;
          height: 280px;
          border-radius: 25px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.15);
          transition: all 0.4s;
        }

        .category-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
        }

        .category-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.5s;
        }

        .category-card:hover .category-image {
          transform: scale(1.15);
        }

        .breakfast-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&h=400&fit=crop');
        }

        .lunch-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1589301773859-76c4d16b6e59?w=600&h=400&fit=crop');
        }

        .dinner-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop');
        }

        .snacks-bg {
          background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop');
        }

        .category-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2rem;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: white;
        }

        .category-overlay h3 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .category-overlay p {
          font-size: 0.95rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .category-count {
          display: inline-block;
          background: rgba(255, 107, 53, 0.9);
          padding: 0.3rem 0.8rem;
          border-radius: 15px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* Testimonials */
        .testimonials {
          max-width: 1400px;
          margin: 0 auto;
          padding: 4rem 2rem;
          background: white;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .testimonial-card {
          background: #f7fafc;
          padding: 2.5rem;
          border-radius: 20px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s;
          border-left: 4px solid #ff6b35;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.1);
        }

        .stars {
          color: #f59e0b;
          font-size: 1.2rem;
          margin-bottom: 1rem;
        }

        .testimonial-card p {
          color: #4a5568;
          line-height: 1.7;
          font-size: 1.05rem;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .testimonial-author strong {
          color: #2d3748;
          font-size: 1.05rem;
        }

        .testimonial-author span {
          color: #718096;
          font-size: 0.9rem;
        }

        /* CTA Section */
        .cta-section {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          padding: 5rem 2rem;
          margin-top: 4rem;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -25%;
          width: 100%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta-content h2 {
          font-size: 3rem;
          color: white;
          margin-bottom: 1rem;
          font-weight: 800;
        }

        .cta-content p {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.95);
          margin-bottom: 2.5rem;
        }

        .cta-content .cta-button {
          background: white;
          color: #ff6b35;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        }

        .cta-content .cta-button:hover {
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
        }

        /* Login Page */
        .login-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .login-container {
          background: white;
          border-radius: 30px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          display: grid;
          grid-template-columns: 1fr 1fr;
          max-width: 900px;
          width: 100%;
        }

        .login-visual {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          padding: 3rem;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-visual h1 {
          font-size: 3rem;
          margin: 1rem 0;
        }

        .login-visual h2 {
          font-size: 1.5rem;
          font-weight: 400;
        }

        .login-visual p {
          margin-top: 1rem;
          opacity: 0.9;
        }

        .login-form-wrapper {
          padding: 3rem;
        }

        .login-form-wrapper h3 {
          font-size: 1.8rem;
          color: #2d3748;
          margin-bottom: 2rem;
        }

        .login-form-wrapper input {
          width: 100%;
          padding: 1rem;
          margin-bottom: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: border-color 0.3s;
        }

        .login-form-wrapper input:focus {
          outline: none;
          border-color: #ff6b35;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
        }

        .toggle-text {
          text-align: center;
          margin-top: 1.5rem;
          color: #718096;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: #ff6b35;
          font-weight: 600;
          cursor: pointer;
          margin-left: 0.5rem;
        }

        /* Menu Page */
        .menu-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .menu-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .menu-header h1 {
          font-size: 3rem;
          color: #2d3748;
          margin-bottom: 0.5rem;
          font-weight: 800;
        }

        .menu-header p {
          color: #718096;
          font-size: 1.2rem;
        }

        .login-notice {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: #fef3c7;
          border: 2px solid #fbbf24;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          margin-top: 1.5rem;
          box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2);
        }

        .login-notice span {
          font-size: 1.5rem;
        }

        .login-notice p {
          margin: 0;
          color: #92400e;
          font-weight: 500;
        }

        .login-notice button {
          background: none;
          border: none;
          color: #ff6b35;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          font-size: 1rem;
        }

        .category-filter {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .category-btn {
          padding: 0.85rem 1.75rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 30px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .category-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border-color: #ff6b35;
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.3);
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2.5rem;
        }

        .menu-item-card {
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
          transition: all 0.4s;
          border: 2px solid transparent;
        }

        .menu-item-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
          border-color: #ff6b35;
        }

        .item-image-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .item-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s;
        }

        .menu-item-card:hover .item-image-wrapper img {
          transform: scale(1.15) rotate(2deg);
        }

        .item-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 700;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .item-time {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(10px);
          color: white;
          padding: 0.4rem 0.9rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.3rem;
        }

        .item-time::before {
          content: '🕐';
        }

        .item-details {
          padding: 1.75rem;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 0.75rem;
        }

        .item-header h3 {
          color: #2d3748;
          font-size: 1.3rem;
          font-weight: 700;
          flex: 1;
          line-height: 1.3;
        }

        .rating {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #f59e0b;
          font-weight: 700;
          font-size: 1rem;
          background: #fef3c7;
          padding: 0.3rem 0.7rem;
          border-radius: 15px;
        }

        .item-description {
          color: #718096;
          font-size: 0.95rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }

        .item-category {
          display: inline-block;
          background: #f7fafc;
          color: #4a5568;
          padding: 0.4rem 0.9rem;
          border-radius: 15px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 2px solid #f7fafc;
        }

        .item-price {
          color: #ff6b35;
          font-size: 1.8rem;
          font-weight: 800;
        }

        .add-btn {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border: none;
          padding: 0.85rem 1.75rem;
          border-radius: 30px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
          font-size: 1rem;
        }

        .add-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }

        .add-btn.disabled {
          background: #cbd5e0;
          cursor: not-allowed;
          box-shadow: none;
        }

        .add-btn.disabled:hover {
          transform: none;
        }

        /* Cart Sidebar */
        .cart-sidebar {
          position: fixed;
          top: 0;
          right: -450px;
          width: 450px;
          height: 100vh;
          background: white;
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.2);
          transition: right 0.3s;
          z-index: 1000;
        }

        .cart-sidebar.open {
          right: 0;
        }

        .cart-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .cart-sidebar.open ~ .cart-overlay {
          display: block;
        }

        .cart-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .cart-header {
          padding: 2rem;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-header h2 {
          font-size: 1.5rem;
        }

        .cart-header button {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .empty-cart {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #cbd5e0;
          gap: 1rem;
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }

        .cart-item {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
          align-items: center;
        }

        .cart-item img {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          object-fit: cover;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-info h4 {
          font-size: 0.95rem;
          color: #2d3748;
          margin-bottom: 0.25rem;
        }

        .cart-item-price {
          color: #ff6b35;
          font-weight: 600;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f7fafc;
          border-radius: 20px;
          padding: 0.25rem;
        }

        .quantity-controls button {
          background: white;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          font-weight: 600;
          color: #ff6b35;
        }

        .remove-btn {
          background: #fee;
          border: none;
          color: #dc2626;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
        }

        .delivery-section {
          padding: 1.5rem;
          border-top: 2px solid #e2e8f0;
        }

        .delivery-section h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: #2d3748;
        }

        .delivery-section input,
        .delivery-section select {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 0.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.95rem;
        }

        .cart-summary {
          padding: 1.5rem;
          border-top: 2px solid #e2e8f0;
          background: #f7fafc;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          color: #4a5568;
        }

        .summary-row.total {
          font-size: 1.3rem;
          font-weight: 700;
          color: #2d3748;
          padding-top: 0.75rem;
          border-top: 2px solid #e2e8f0;
          margin-top: 0.75rem;
        }

        .checkout-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 1rem;
          transition: transform 0.3s;
        }

        .checkout-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .checkout-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Confirmation Page */
        .confirmation-page {
          min-height: calc(100vh - 200px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .confirmation-card {
          background: white;
          border-radius: 30px;
          padding: 3rem;
          max-width: 600px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .success-icon {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          color: white;
        }

        .confirmation-card h1 {
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .order-id {
          color: #718096;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }

        .confirmation-details {
          background: #f7fafc;
          padding: 1.5rem;
          border-radius: 15px;
          margin-bottom: 2rem;
          text-align: left;
        }

        .confirmation-details p {
          margin-bottom: 0.75rem;
          color: #4a5568;
          line-height: 1.6;
        }

        .order-items {
          text-align: left;
          margin-bottom: 2rem;
        }

        .order-items h3 {
          margin-bottom: 1rem;
          color: #2d3748;
        }

        .conf-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #e2e8f0;
        }

        .conf-total {
          display: flex;
          justify-content: space-between;
          padding-top: 1rem;
          margin-top: 1rem;
          border-top: 2px solid #e2e8f0;
          font-size: 1.2rem;
        }

        .back-btn {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border: none;
          padding: 1rem 2rem;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .back-btn:hover {
          transform: translateY(-2px);
        }

        /* Footer */
        .footer {
          background: #2d3748;
          color: white;
          padding: 3rem 2rem;
          margin-top: 4rem;
        }

        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }

        .footer-section h3,
        .footer-section h4 {
          margin-bottom: 1rem;
          color: #ff6b35;
        }

        .footer-section p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        .main-content {
          min-height: calc(100vh - 200px);
        }

        /* Weekly Plan Promo Section */
        .weekly-plan-promo {
          max-width: 1400px;
          margin: 4rem auto;
          padding: 0 2rem;
        }

        .promo-content {
          background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%);
          border-radius: 30px;
          padding: 4rem;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          align-items: center;
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
        }

        .promo-badge {
          display: inline-block;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 25px;
          font-weight: 600;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .promo-text h2 {
          font-size: 2.8rem;
          color: #2d3748;
          margin-bottom: 1rem;
          font-weight: 800;
        }

        .promo-text p {
          font-size: 1.2rem;
          color: #4a5568;
          margin-bottom: 2rem;
        }

        .promo-features {
          list-style: none;
          margin-bottom: 2rem;
        }

        .promo-features li {
          padding: 0.75rem 0;
          font-size: 1.05rem;
          color: #2d3748;
          font-weight: 500;
        }

        .promo-visual {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .promo-card {
          background: white;
          padding: 1.5rem;
          border-radius: 20px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
          position: relative;
        }

        .promo-card:hover {
          transform: translateX(-10px);
        }

        .promo-card.highlight {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          transform: scale(1.05);
        }

        .promo-card.highlight:hover {
          transform: scale(1.08) translateX(-10px);
        }

        .highlight-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #10b981;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .promo-card h4 {
          margin-bottom: 0.75rem;
          font-size: 1.3rem;
        }

        .promo-meal-preview {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.95rem;
        }

        /* Weekly Plan Page */
        .weekly-plan-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .plan-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .plan-header h1 {
          font-size: 3rem;
          color: #2d3748;
          margin-bottom: 0.75rem;
          font-weight: 800;
        }

        .plan-header p {
          font-size: 1.2rem;
          color: #718096;
          margin-bottom: 1.5rem;
        }

        .plan-notice {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: #dbeafe;
          border: 2px solid #3b82f6;
          padding: 1rem 2rem;
          border-radius: 50px;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
        }

        .plan-notice span {
          font-size: 1.5rem;
        }

        .plan-notice p {
          margin: 0;
          color: #1e40af;
          font-weight: 500;
        }

        /* Set Selector */
        .set-selector {
          margin-bottom: 4rem;
        }

        .set-selector h2 {
          text-align: center;
          font-size: 2.2rem;
          color: #2d3748;
          margin-bottom: 2rem;
          font-weight: 700;
        }

        .set-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .set-card {
          background: white;
          border: 3px solid #e2e8f0;
          border-radius: 25px;
          padding: 2.5rem;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }

        .set-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
        }

        .set-card.active {
          border-color: #ff6b35;
          box-shadow: 0 15px 40px rgba(255, 107, 53, 0.3);
          background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%);
        }

        .set-badge {
          position: absolute;
          top: -12px;
          left: 20px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .set-badge.premium {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        }

        .set-card h3 {
          font-size: 1.8rem;
          color: #2d3748;
          margin-bottom: 0.75rem;
          margin-top: 1rem;
        }

        .set-card p {
          color: #718096;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .set-price {
          font-size: 2.5rem;
          color: #ff6b35;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .set-price span {
          font-size: 1.2rem;
          color: #718096;
          font-weight: 500;
        }

        .set-meals-preview {
          background: rgba(255, 107, 53, 0.1);
          padding: 0.75rem;
          border-radius: 10px;
          text-align: center;
          color: #2d3748;
          font-weight: 500;
        }

        /* Weekly Menu */
        .weekly-menu {
          margin-bottom: 4rem;
        }

        .weekly-menu h2 {
          text-align: center;
          font-size: 2.2rem;
          color: #2d3748;
          margin-bottom: 3rem;
          font-weight: 700;
        }

        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1rem;
        }

        .day-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        }

        .day-header {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          padding: 1rem;
          text-align: center;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .meal-slot {
          padding: 1rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .meal-slot:last-child {
          border-bottom: none;
        }

        .meal-time {
          font-size: 0.8rem;
          color: #ff6b35;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .meal-slot img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          border-radius: 10px;
          margin-bottom: 0.5rem;
        }

        .meal-name {
          font-size: 0.85rem;
          color: #2d3748;
          font-weight: 500;
          text-align: center;
          line-height: 1.3;
        }

        /* Subscription Form */
        .subscription-form {
          background: white;
          padding: 3rem;
          border-radius: 30px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }

        .subscription-form h2 {
          font-size: 2rem;
          color: #2d3748;
          margin-bottom: 2rem;
          font-weight: 700;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          padding: 0.9rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: border-color 0.3s;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #ff6b35;
        }

        .checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1.25rem;
          background: #f7fafc;
          border-radius: 15px;
          border: 2px solid #e2e8f0;
        }

        .checkbox-group input[type="checkbox"] {
          width: 20px;
          height: 20px;
          margin-top: 0.25rem;
          cursor: pointer;
        }

        .checkbox-group label {
          flex: 1;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .checkbox-group label strong {
          color: #2d3748;
          font-size: 1.05rem;
        }

        .checkbox-group label span {
          color: #718096;
          font-size: 0.9rem;
        }

        .parent-section {
          grid-column: 1 / -1;
          background: #fff5e6;
          padding: 2rem;
          border-radius: 15px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .parent-section h3 {
          grid-column: 1 / -1;
          color: #ff6b35;
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }

        /* Plan Summary */
        .plan-summary {
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
          padding: 2rem;
          border-radius: 20px;
          margin-top: 2rem;
        }

        .plan-summary h3 {
          font-size: 1.5rem;
          color: #2d3748;
          margin-bottom: 1.5rem;
        }

        .summary-details {
          margin-bottom: 2rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          color: #4a5568;
        }

        .summary-row.total {
          border-top: 2px solid #cbd5e0;
          padding-top: 1rem;
          margin-top: 1rem;
          font-size: 1.3rem;
          color: #2d3748;
        }

        .plan-features {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 2px solid #cbd5e0;
        }

        .plan-features span {
          color: #10b981;
          font-weight: 500;
        }

        .subscribe-btn {
          width: 100%;
          padding: 1.25rem;
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: white;
          border: none;
          border-radius: 15px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
        }

        .subscribe-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 107, 53, 0.5);
        }

        .subscribe-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 1024px) {
          .features {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .testimonial-grid {
            grid-template-columns: 1fr;
          }

          .days-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .promo-content {
            grid-template-columns: 1fr;
          }

          .set-cards {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .parent-section {
            grid-template-columns: 1fr;
          }

          .fruits-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .fruits-features {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-content,
          .features,
          .dish-grid,
          .login-container,
          .footer-content,
          .category-grid,
          .testimonial-grid {
            grid-template-columns: 1fr;
          }

          .hero-title {
            font-size: 3rem;
          }

          .title-line.accent {
            font-size: 4rem;
          }

          .hero-image {
            height: 300px;
          }

          .circle-1 {
            width: 200px;
            height: 200px;
          }

          .circle-2 {
            width: 160px;
            height: 160px;
          }

          .circle-3 {
            width: 140px;
            height: 140px;
          }

          .hero-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }

          .stat strong {
            font-size: 1.5rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .cta-button {
            width: 100%;
            justify-content: center;
          }

          .cart-sidebar {
            width: 100%;
            right: -100%;
          }

          .menu-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 2rem;
          }

          .cta-content h2 {
            font-size: 2rem;
          }

          .category-card {
            height: 200px;
          }

          .days-grid {
            grid-template-columns: 1fr;
          }

          .promo-content {
            padding: 2rem;
          }

          .promo-text h2 {
            font-size: 2rem;
          }

          .subscription-form {
            padding: 2rem;
          }

          .plan-header h1 {
            font-size: 2rem;
          }

          .fruits-grid {
            grid-template-columns: 1fr;
          }

          .fruits-features {
            grid-template-columns: 1fr;
          }

          .fruits-header {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}