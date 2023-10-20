import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import landingStyle from './LandingStyle'
import styles from '../../styles/main'

export default function Landing({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Image 
      style = {styles.logoImage}
      source={require('../../../assets/slide.png')} />
      <Button style = {styles.button} mode="outlined" onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button style = {styles.button} mode="outlined" onPress={() => navigation.navigate('Signup')}>
        Signup
      </Button>
    </View>
  );
}

