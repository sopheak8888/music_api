import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  content: string;

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  musicId: string;
}
