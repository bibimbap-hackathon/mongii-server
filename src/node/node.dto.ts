import { IsString } from 'class-validator'

export class NodeDto {
  @IsString()
  public ip!: string;

  @IsString()
  public name!: string;

  @IsString()
  public info!: string;
}