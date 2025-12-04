import { IsOptional, IsString } from 'class-validator';

export class CreateClubDto {
  @IsString()
  club_name: string;

  @IsOptional()
  @IsString()
  address?: string;
}
