import { IsBoolean, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class TaskDto{
  @IsString()
  public info!: string

  @IsBoolean()
  @Transform(({ value} ) => value === 'true')
  public is_completed!: boolean
}