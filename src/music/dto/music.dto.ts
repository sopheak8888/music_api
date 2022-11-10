import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMusicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(1)
  artist: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(1)
  album: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(1)
  genre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4)
  year: string;

  file: Express.Multer.File;
}

export class UpdateMusicDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  artist: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  album: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  @MinLength(1)
  genre: string;

  @IsOptional()
  @IsString()
  @MaxLength(4)
  year: string;

  file: Express.Multer.File;
}
