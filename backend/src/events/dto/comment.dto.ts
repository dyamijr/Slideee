import { Length, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import mongoose from 'mongoose';

export class CommentDto {
    
    @Length(1, 2200)
    content: string;
  }