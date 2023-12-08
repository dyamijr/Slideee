import { StyleSheet } from 'react-native';

const landingStyle = StyleSheet.create({
  logoImage: {
    width: 75,
    height: 75,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 40,
    borderColor: 'black',
    borderRadius: 0,
    marginBottom: 10,
    marginTop: 20,
    width: "25%",
  },
  welcomeformat: {
    marginBottom: 15,
    fontSize: 40,
    fontStyle: 'italic',
    fontFamily: 'Futura-CondensedMedium'
  },
  mottoformat: {
    fontSize: 25,
    fontFamily: 'Futura-CondensedMedium',
    marginTop: 17,
    marginBottom: 25
  }
  });

export default landingStyle;
