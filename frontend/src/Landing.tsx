import { StyleSheet, View, Button } from 'react-native';

export default function Landing({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() =>
          navigation.navigate('Login')
        }
      />
      <Button
        title="Signup"
        onPress={() =>
          navigation.navigate('Signup')
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
