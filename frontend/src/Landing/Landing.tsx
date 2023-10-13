import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import landingStyle from './LandingStyle'

export default function Landing({ navigation }: { navigation: any }) {
  return (
    <View style={landingStyle.container}>
      <Image 
      style = {landingStyle.logoImage}
      source={require('../../assets/slide.png')} />
      <Button style = {landingStyle.button} mode="outlined" onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button style = {landingStyle.button} mode="outlined" onPress={() => navigation.navigate('Signup')}>
        Signup
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
