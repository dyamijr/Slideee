import { Length, IsDefined, Matches } from 'class-validator';


export class SignupDto {
  @Length(3, 20)
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'), {message: 'Please enter a user name using only alphanumeric characters'})
  username: string;

  @Length(3, 20)
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'), {message: 'Please enter a display name using only alphanumeric characters'})
  displayName: string;

  @Length(3, 20)
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'), {message: 'Please enter a password using only alphanumeric characters'})
  password: string;
  
}
