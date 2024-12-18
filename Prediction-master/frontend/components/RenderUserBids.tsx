import { Text, View } from "react-native";
import { currentTheme } from "~/app/constants/constants";
import { UserBidMapper } from "~/app/types/Types";

const renderUserBidItem = ({ item }: { item: UserBidMapper }) => {
    
  return(
    <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',  // Ensures vertical centering
      padding: 10,
      backgroundColor: currentTheme.base.background.secondary,
      marginVertical: 5,
      borderRadius: 100
    }}
  >
    {/* ID Column */}
    <Text style={{ color: currentTheme.base.text.primary, flex: 1 }}>
      {item.id.slice(0, 8)}
    </Text>
  
    {/* Amount Column */}
    <Text 
      style={{
        color: currentTheme.base.text.primary, 
        textAlign: 'center', 
        flex: 1
      }}
    >
      {item.amount}
    </Text>
  
    {/* Color/Number Column */}
    <Text  
      style={{
        color: item.number === 0 ? item.colorType.toLocaleLowerCase() : item.colorType.toLocaleLowerCase(),
        flex: 1,
        textAlign:"center"
      }}
    >
      {item.number === 0 ? item.colorType : item.number}
    </Text>
  
    {/* Status and Amount Adjustment Column */}
    <Text style={{ color: currentTheme.base.text.primary, flex: 1, textAlign: 'right' }}>
      {item.status === "WIN" ? (
        item.number === 0 ? (
          <Text style={{ color: 'green' }}>{`+${item.amount * 2}`}</Text>
        ) : (
          <Text style={{ color: 'green' }}>{`+${item.amount * 9}`}</Text>
        )
      ) : (
        <Text style={{ color: 'red' }}>{`-${item.amount}`}</Text>
      )}
    </Text>
  </View>
  
  )
};

export default renderUserBidItem;