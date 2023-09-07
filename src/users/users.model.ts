import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreateAttrs {
  email: string;
  password: string;
}
@Table({ tableName: 'users' })
export class User extends Model< User, UserCreateAttrs > {
  @ApiProperty({example: '1',description: 'Уникальный идентификатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'test@mail.ru',description: 'Электронная почта'})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false
  })
  email: string;

  @ApiProperty({example: '123456',description: 'Пароль'})
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  password: string;

  @ApiProperty({example: 'false',description: 'Забанен или нет'})
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  banned: boolean;

  @ApiProperty({example: 'За хулиганство',description: 'Причина бана'})
  @Column ({
    type: DataType.STRING,
    allowNull: true
  })
  banReason: string
}