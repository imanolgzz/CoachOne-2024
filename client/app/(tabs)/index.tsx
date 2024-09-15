import { Image, StyleSheet, View, Text, Dimensions } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { OnBoarding } from '@/components/OnBoarding';

const { width, height } = Dimensions.get('window');


export default function HomeScreen() {
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
    height: 65
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
