import { Length } from 'class-validator';

export class CreateEventDto {
  @Length(3, 20)
  title: string;

  @Length(3, 20)
  description: string;
}
