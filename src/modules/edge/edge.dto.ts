import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import 'reflect-metadata';

export class EdgeDto {
  @IsString()
  public ip!: string;

  @IsString()
  public name!: string;

  @IsString()
  public info!: string;

  @IsString()
  public password!: string;

  @Type(() => Number)
  @IsNumber()
  public node_id!: number;
}
