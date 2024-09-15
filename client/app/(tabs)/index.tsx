import { Image, StyleSheet, View, Text, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { OnBoarding } from '@/components/OnBoarding';
import React from 'react';
import { useAuth } from '@/hooks/AuthContext';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const {loggedIn} = useAuth();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      try{
          const response = await fetch('http://10.22.236.99:4000/api/accounts/get', 
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
              console.log(data.accounts);
              setData(data.accounts);
          }
          else {
              setData([]);
          }
      } catch (error) {
          console.error("Error: ", error);
          setData([]);
      }
    }

    getData();
  }, []
);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#004878', dark: '#004878' }}
      headerImage={ 
        <Image source={require('@/assets/images/capitalonewhite.png')} style={styles.imageLogo}/>
      }
      headerText={
        <Text style={styles.clientName}>
          Hi, Imanol
        </Text>
      }
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

        </View>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  imageLogo : {
    width: 150,
    height: 50,
  },
  clientName : {
    marginTop: 15,
    color: 'white',
    fontSize: 20,
  },
  container: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeaders: {
    fontSize: 24,
  }
});
