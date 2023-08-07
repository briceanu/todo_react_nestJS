import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  todo: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
