import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  // @Cron('1/15 * * * 1-5') //* -> At every 15th minute from 1 through 59 on every day-of-week from Monday through Friday.
  @Cron(CronExpression.EVERY_30_SECONDS)
  showSomeInfo() {
    console.log('Date info', new Date());
  }
}
