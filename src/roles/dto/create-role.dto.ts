import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {

  @ApiProperty({ example: 'Admin', description: 'Роль - название' })
  readonly value: string;
  @ApiProperty({ example: 'Администратор', description: 'Роль - описание' })
  readonly description: string;
}