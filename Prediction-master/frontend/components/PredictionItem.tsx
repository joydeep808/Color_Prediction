import { Text, View } from "react-native";
import { currentTheme } from "~/app/constants/constants";
import { TColorResponse } from "~/app/types/Types";

 const renderPredictionItem = ({ item }: { item: TColorResponse }) =>{
  const backgroundColor = item.number === null ? "gray": item.number % 2 === 0? "green" :"red"; 
  return (
    (
  
      <View 
  
        style={{
          flexDirection: 'row', 
          justifyContent: 'space-around', 
          padding: 10,
          backgroundColor: backgroundColor,
          marginVertical: 5,
          borderRadius: 100,
          
          
        }}
      >
        <Text style={{ color: currentTheme.base.text.primary }}>
          {item.number ?? '?'}
        </Text>
        {/* <Text style={{ color: theme.base.text.primary }}>
          Status: {item.status}
        </Text> */}
      </View>
    )
  )
};

export default renderPredictionItem