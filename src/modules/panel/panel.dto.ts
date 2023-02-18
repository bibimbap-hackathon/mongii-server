import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PanelDto {
  @IsString()
  public uid!: string;

  @Type(() => Number)
  @IsNumber()
  public x!: number;

  @Type(() => Number)
  @IsNumber()
  public y!: number;

  @Type(() => Number)
  @IsNumber()
  public z!: number;

  @Type(() => Number)
  @IsNumber()
  public h!: number;

  @IsString()
  public mode!: string;
}
