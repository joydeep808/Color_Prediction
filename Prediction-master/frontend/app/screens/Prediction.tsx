import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  FlatList, 
  ToastAndroid
} from 'react-native';
import { NavigationProp, TColorResponse, TReponse, UserBidMapper } from '../types/Types';
import { useTheme } from '../auth/ThemeContext';
import { axiosInstance } from '../auth/AuthenticationHelper';
import renderUserBidItem from '~/components/RenderUserBids';
import renderPredictionItem from '~/components/PredictionItem';
import { userStore } from '../store/UserStore';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const PredictionGame: React.FC = () => {
  const [currentSec, setCurrentSec] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { currentThemeColor: theme } = useTheme();
  const dialNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const {predictions  , balance,  setBalance ,  setSinglePrediction , setSingleUserBid , userBids , setPredictions , setUserBids} = userStore();
  const fetchBalance = async()=>{
try {
      const response = await axiosInstance.get("http://192.168.179.98:3005/api/v1/user/balance")
      const data = await response.data;
      userStore.setState({balance:data.data.balance})
} catch (error) {
  console.log(error)
}
  }
  const fetchPredictionData = async () => {

    
    try {
      const response = await fetch('http://192.168.179.98:3005/api/v1/prediction/get/0?size=20');
      const data = await response.json() as TReponse<TColorResponse[]>;
      setPredictions!(data.data);
      setIsButtonDisabled(false);
    } catch (error) {
      console.error('Error fetching prediction data:', error);
    }
  };

  useEffect(() => {
    fetchPredictionData();
    fetchUserBids()
    fetchBalance()
  }, []);


  const showToast = (message:string) => {
    ToastAndroid.show(message, ToastAndroid.CENTER);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (predictions.length > 0) {
      interval = setInterval(() => {
        const remainingTime = Math.max(0, (predictions[0].endTime - Date.now()) / 1000);
        
        setCurrentSec(Math.floor(remainingTime));

        // Disable buttons when timer is less than 5 seconds
        if (remainingTime <= 5) {
          setIsButtonDisabled(true);
        }

        // Fetch new predictions when timer reaches 0
        if (remainingTime <= 0) {
          if (interval) clearInterval(interval);
          fetchPredictionData();
        }
      }, 1000);
    }

    // Cleanup interval on component unmount or when predictions change
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [predictions]);

  const handleNumberSelect = (number: number) => {
     Toast.show({
      text1: `Clicked ${number}`,
      type:"success"
     })
  };

  const handleColorBid = async (color: 'GREEN' | 'RED') => {
    if (isButtonDisabled) return;

    try {
      const bidData = {
        amount: 200,
        color: color,
        number: selectedNumber
      };
      
      const response = await axiosInstance.post('http://192.168.179.98:3005/api/v1/user/bid/create', bidData);
      
      const data = await response.data;
      setBalance(balance-bidData.amount)
        Toast.show({
          text1:data.message , 
          type:"success"
        })
      fetchUserBids();
    } catch (error) {
      console.error('Error creating bid:', error);
    }
  };

  const fetchUserBids = async () => {
    try {
      const response = await axiosInstance.get('http://192.168.179.98:3005/api/v1/user/bid/get/0');
      const data = await response.data;
      setUserBids!(data.data);
    } catch (error) {
      console.error('Error fetching user bids:', error);
    }
  };

  

  

  return (
    <View 
      style={{ 
        flex: 1, 
        backgroundColor: theme.base.background.primary, 
        padding: 10 
      }}
    >

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text 
          style={{ 
            color: theme.base.text.primary, 
            fontSize: 24, 
            fontWeight: 'bold' 
          }}
        >
          Current Balance: {balance}
        </Text>
      </View>
      
      
      
      {/* Timer and Predictions Section */}
      <View style={{ 
        alignItems: 'center', 
        marginBottom: 20 
      }}>
        <Text 
          style={{ 
            color: theme.base.text.primary, 
            fontSize: 24, 
            fontWeight: 'bold' 
          }}
        >
          Time Remaining: {currentSec} seconds
        </Text>
          
        {/* Predictions Display */}
        <FlatList
  data={predictions}
  renderItem={renderPredictionItem}
  keyExtractor={(item, index) => index.toString()}
  horizontal
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{
    paddingHorizontal: 8, // Optional: Adds padding around the whole list
  }}
  ItemSeparatorComponent={() => <View style={{ width: 10 }} />} // Gap between items
  ListEmptyComponent={() => (
    <Text 
      style={{ 
        color: theme.base.text.muted, 
        textAlign: 'center' 
      }}
    >
      No predictions available
    </Text>
  )}
/>

      </View>

      {/* Number Selector Section */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        {dialNumbers.map(number => (
          <TouchableOpacity
            key={number}
            onPress={() => handleNumberSelect(number)}
            disabled={isButtonDisabled}
            style={{
              width: SCREEN_WIDTH / 5,
              height: SCREEN_WIDTH / 5,
              justifyContent: 'center',
              alignItems: 'center',
              margin: 5,
              borderRadius: 10,
              backgroundColor: "hsl(220, 15%, 15%)",
              opacity: isButtonDisabled ? 0.8 : 1
            }}
          >
            <Text 
              style={{ 
                color: "white", 
                fontSize: 18 
              }}
            >
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Color Bid Section */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-around', 
        marginVertical: 20 
      }}>
        <TouchableOpacity
          onPress={() => handleColorBid('GREEN')}
          disabled={isButtonDisabled}
          style={{
            backgroundColor:"green",
            padding: 15,
            borderRadius: 10,
            width: '45%',
            alignItems: 'center',
            opacity: isButtonDisabled ? 0.8 : 1
          }}
        >
          <Text style={{ color: theme.interactive.button.text }}>Green</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => handleColorBid('RED')}
          disabled={isButtonDisabled}
          style={{
            backgroundColor: "red",
            padding: 15,
            borderRadius: 10,
            width: '45%',
            alignItems: 'center',
            opacity: isButtonDisabled ? 0.5 : 1
          }}
        >
          <Text style={{ color: theme.interactive.button.text }}>Red</Text>
        </TouchableOpacity>
      </View>

      

      {/* User Bid History */}
      <View style={{ flex: 1 }}>
        <Text 
          style={{ 
            color: theme.base.text.primary, 
            fontSize: 18, 
            textAlign: 'center', 
            marginBottom: 10 
          }}
        >
          User Bid History
        </Text>
        <View className='flex-row justify-between items-center w-full mb-4'> 
  {["Period", "Select", "Point", "Amount"].map((item, index) => (
    <Text 
      key={index} 
      className='text-center' 
      style={{
        color: theme.base.text.primary, 
        flex: 1, 
        textAlign: 'center', 
        fontWeight: 'bold'
      }}
    >
      {item}
    </Text>
  ))}
</View>

<FlatList
  data={userBids}
  renderItem={renderUserBidItem}
  keyExtractor={(item) => item.id}
  ListEmptyComponent={() => (
    <Text 
      style={{ 
        color: theme.base.text.muted, 
        textAlign: 'center', 
        fontSize: 16, 
        marginTop: 10 
      }}
    >
      No bids yet
    </Text>
  )}
/>

      </View>
    </View>
  );
};

export default PredictionGame;