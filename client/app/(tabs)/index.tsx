import { Image, StyleSheet, View, Text, Dimensions, ScrollView } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { OnBoarding } from '@/components/OnBoarding';
import React from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { Router, useRouter } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown'


const { width, height } = Dimensions.get('window');

// Define the Account type
interface Account {
  _id: string;
  account_number: string;
  balance: number;
  customer_id: string;
  nickname: string;
  rewards: number;
  type: string;
}

async function createAccount(loggedIn : string, router : Router) {
  try{
    const response = await fetch('http://10.22.236.99:4000/api/accounts/create', 
      {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              user_id: loggedIn,
            }),
      });
      if(response.ok) {
          const data = await response.json();
          router.push('./tabs');
          console.log(data.message);
      }
      else {
        console.log("No data found");
      }
  } catch (error) {
      console.error("Error: ", error);
  }
}


export default function HomeScreen() {
  const router = useRouter();
  const {loggedIn} = useAuth();
  const accounts = [
    { title: 'Checking' },
    { title: 'Savings'},
    { title: 'Credit Card'},
  ];
  const [selectedAccount, setSelectedAccount] = React.useState(accounts[0]);
  const [data, setData] = React.useState<Account[]>([]);
  
  React.useEffect(() => {
    async function getData() {
      try {
        const response = await fetch('http://10.22.236.99:4000/api/accounts/get', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: loggedIn,
          }),
        });
        if (response.ok) {
          const result = await response.json();
          setData(result.accounts);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error('Error: ', error);
        setData([]);
      }
    }

    getData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#004878', dark: '#004878' }}
      headerImage={<Image source={require('@/assets/images/capitalonewhite.png')} style={styles.imageLogo} />}
      headerText={<Text style={styles.clientName}>Hi, Imanol</Text>}
    >
      <View>
        <View>
          <View style={{alignSelf: 'center', width: '80%', marginTop: 30}}>
            <Text style={styles.textHeaders}>
              Trending Companies
            </Text>
          </View>

          <View style={{marginTop: 30, marginBottom: 10}}>
            <OnBoarding />
          </View>

          <View style={{alignSelf: 'center', width: '80%', marginTop: 30}}>
            <Text style={styles.textHeaders}>
              Check your monthly fianance
            </Text>
          </View>

          <View style={{alignSelf: 'center', width: '80%', marginTop: 30}}>
            <Text style={styles.textHeaders}>
              Register new account
            </Text>
            <View>
              <SelectDropdown
      data={accounts}
      onSelect={(selectedItem) => {
        setSelectedAccount(selectedItem);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text style={styles.dropdownButtonTxtStyle}>
              {(selectedItem && selectedItem.title) || 'Select your mood'}
            </Text>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
            </View>
          </View>
        </View>

        <View style={{ marginTop: 30, marginBottom: 10 }}>
          <OnBoarding />
        </View>

        <View style={{ alignSelf: 'center', width: '80%', marginTop: 30 }}>
          <Text style={styles.textHeaders}>Check your monthly finance</Text>
        </View>

        {/* Table to display balance and type */}
        <ScrollView style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Account Type</Text>
            <Text style={styles.tableHeaderText}>Balance</Text>
          </View>
          {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.type}</Text>
              <Text style={styles.tableCell}>{item.balance}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageLogo: {
    width: 150,
    height: 50,
  },
  clientName: {
    marginTop: 15,
    color: 'white',
    fontSize: 20,
  },
  textHeaders: {
    fontSize: 24,
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  table: {
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    fontSize: 16,
  },
});
