import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateCoachDto {
  @IsString()
  coach_name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  club_id: string;
}
