import { Length } from 'class-validator';

export class SignupDto {
  @Length(3, 20)
  username: string;
  
  @Length(3, 20)
  password: string;
}
