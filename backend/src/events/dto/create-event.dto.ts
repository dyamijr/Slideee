import { Length, ArrayMinSize, ArrayMaxSize, IsDateString, MinDate} from 'class-validator';

export class CreateEventDto {
  @Length(3, 20)
  title: string;

  @Length(3, 50)
  description: string;

  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  collaborators: string[];

  @Length(3, 20)
  location: string;

  @IsDateString()
  date: Date;

}
