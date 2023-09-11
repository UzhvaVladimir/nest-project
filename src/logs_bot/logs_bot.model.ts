import { Column, DataType, Model, Table } from "sequelize-typescript";

interface logsCreateAttrs {
  chat_id: string;
  message: string;
}
@Table({ tableName: 'logs_bot' })
export class logs_bot extends Model< logs_bot, logsCreateAttrs > {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false
  })
  chat_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  message: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  first_name: string;
}