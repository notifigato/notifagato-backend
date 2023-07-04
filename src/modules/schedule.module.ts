import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule';
import { DynamicModule } from '@nestjs/common';

const ScheduleModule: DynamicModule = NestScheduleModule.forRoot();

export default ScheduleModule;
