import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['admin', 'user'], {
    message: 'Valid role required',
  })
  role: 'admin' | 'user';

  age: number;
}
