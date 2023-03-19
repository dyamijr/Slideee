import { Length } from 'class-validator';

export class CreateGroupDto {
  @Length(3, 20)
  groupName: string;

  @Length(3, 20)
  displayName: string;

  isPrivate: boolean;
}
