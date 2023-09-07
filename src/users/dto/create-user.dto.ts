import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto{

  @ApiProperty({example: 'user@mail.ru',description: 'Электронная почта'})
  readonly email: string;
  @ApiProperty({example: '123456',description: 'Пароль'})
  readonly password: string
}