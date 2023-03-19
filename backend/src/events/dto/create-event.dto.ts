import { Length, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class CreateEventDto {
  @Length(3, 20)
  title: string;

  @Length(3, 20)
  description: string;

  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  collaborators: string[];
}
