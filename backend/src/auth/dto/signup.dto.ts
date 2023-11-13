import { Length, IsDefined, Matches } from 'class-validator';


export class SignupDto {
  @Length(3, 20)
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'), {message: 'Please enter a user name using one or more letters (uppercase and lowercase), digits, underscores, and hyphens.'})
  username: string;
  //This regular expression allows usernames to consist of one or more letters (uppercase and lowercase), digits, underscores, and hyphens.
  @Length(3, 20)
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'), {message: 'Please enter a display name using only alphanumeric characters'})
  displayName: string;

  @Length(8, 20)
  @Matches(RegExp(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,20}$/),
  {message: 'Please enter a password with at least one upper case letter and at least one lower case letter is required. At least one digit is required. At least one special character from the set [@#$%^&+=!] is required. The total length of the password must be at least 8 characters.'})
  password: string;
  //passsword needs to have At least one letter (uppercase or lowercase) is required. At least one digit is required. At least one special character from the set [@#$%^&+=!] is required. The total length of the password must be at least 8 characters.
}
