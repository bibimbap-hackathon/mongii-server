import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ScriptDto {
  @IsString()
  public name!: string;

  @IsString()
  public src!: string;

  @IsString()
  public env!: string;

  @Type(() => Number)
  @IsNumber()
  public module_id!: number;
}
