import { StyleSheet } from 'react-native';

const loginStyle = StyleSheet.create({
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
    marginBottom: 5,
    marginTop: 20,
    width: "auto",
  },
  welcomeformat: {
    fontSize: 40,
    fontStyle: 'italic',
    fontFamily: 'Futura-CondensedMedium'
  },
  mottoformat: {
    fontSize: 35,
    fontFamily: 'Futura-CondensedMedium',
    marginBottom: 25
  },
  boxstyle1: {
    marginBottom: 15,
    borderRadius: 0,
    backgroundColor: 'transparent',
    alignItems: "center",
    width: '50%',
  }
  });

export default loginStyle;
