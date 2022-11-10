import { IsNotEmpty, IsOptional } from 'class-validator';

export class FilterMusicDto {
  @IsNotEmpty()
  page: number;

  @IsOptional()
  title: string;

  @IsOptional()
  artist: string;

  @IsOptional()
  album: string;

  @IsOptional()
  genre: string;

  @IsOptional()
  yearFrom: string;

  @IsOptional()
  yearTo: string;

  @IsOptional()
  user: string;
}
