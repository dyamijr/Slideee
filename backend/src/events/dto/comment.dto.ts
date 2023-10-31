import { Length, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import mongoose from 'mongoose';

export class CommentDto {
    
    cid: mongoose.Types.ObjectId
    @Length(1, 100)
    content: string;
  }