import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Landing({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={() => navigation.navigate('Login')}>
        Login
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('Signup')}>
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
