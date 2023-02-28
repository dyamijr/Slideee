import { Length } from 'class-validator';

export class EditGroupDto {
    @Length(3, 20)
    displayName: string;
    
    isPrivate: Boolean;
}
