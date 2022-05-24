import { IsNumber, IsString, Length, Min } from 'class-validator';

export class AddProductDto {
  @IsString()
  name: string;

  @IsString()
  @Length(5, 100)
  description: string;

  @IsNumber()
  @Min(1)
  price: number;
}
