import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  file: Express.Multer.File;
}

export class UpdateFileDto {
  @IsOptional()
  file: Express.Multer.File;
}
