import { Image, StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { OnBoarding } from '@/components/OnBoarding';
import React from 'react';
import { useAuth } from '@/hooks/AuthContext';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const { loggedIn } = useAuth();
  const [data, setData] = React.useState([]);

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
          const data = await response.json();
          console.log(data.accounts);
          setData(data.accounts);
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

  const renderAccount = ({ item } : any) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.type}</Text>
      <Text style={styles.tableCell}>{item.balance}</Text>
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#004878', dark: '#004878' }}
      headerImage={<Image source={require('@/assets/images/capitalonewhite.png')} style={styles.imageLogo} />}
      headerText={<Text style={styles.clientName}>Hi, Imanol</Text>}
    >
      <View>
        <View style={{ alignSelf: 'center', width: '80%', marginTop: 30 }}>
          <Text style={styles.textHeaders}>Trending Companies</Text>
        </View>

        <View style={{ marginTop: 30, marginBottom: 10 }}>
          <OnBoarding />
        </View>

        <View style={{ alignSelf: 'center', width: '80%', marginTop: 30 }}>
          <Text style={styles.textHeaders}>Check your monthly finance</Text>
        </View>

        {/* Table to display balance and type */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Account Type</Text>
            <Text style={styles.tableHeaderText}>Balance</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderAccount}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
  container: {
    flex: 1,
  },
  textHeaders: {
    fontSize: 24,
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
