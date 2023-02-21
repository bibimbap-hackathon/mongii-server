import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ModuleDto {
  @IsString()
  public ip!: string;

  @IsString()
  public name!: string;

  @IsString()
  public info!: string;

  @Type(() => Number)
  @IsNumber()
  public priority!: number;

  @Type(() => Number)
  @IsNumber()
  public errorNo!: number;

  @Type(() => Number)
  @IsNumber()
  public edge_id!: number;

  @Type(() => Number)
  @IsNumber()
  public node_id!: number;
}
