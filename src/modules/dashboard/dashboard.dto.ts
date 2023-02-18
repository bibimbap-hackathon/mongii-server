import { IsString } from 'class-validator';

export class DashboardDto {
  @IsString()
  public name!: string;

  @IsString()
  public uid!: string;

  @IsString()
  public url!: string;
}
