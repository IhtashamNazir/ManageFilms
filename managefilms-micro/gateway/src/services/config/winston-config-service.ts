import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import WinstonCloudWatch from 'winston-cloudwatch';

export class WinstonConfigService {
  private readonly options: winston.LoggerOptions;
  constructor() {
    this.options = {
      exitOnError: false,
      format: winston.format.combine(winston.format.uncolorize(), winston.format.json(), winston.format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }), winston.format.printf(msg => {
        return `[${msg.level}]: ${msg.timestamp} || ${msg.message}`;
      })),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
      ]
    };
    if (process.env.CLOUDWATCH_USE_AS_LOGGER == 'true') {
      this.options.transports = [new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
      new WinstonCloudWatch({
        logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
        logStreamName: process.env.CLOUDWATCH_STREAM_NAME,
        awsOptions: {
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_KEY_SECRET,
          },
          region: process.env.CLOUDWATCH_AWS_REGION,
        },
        jsonMessage: true,
        // messageFormatter: function(msg){
        //   return `[${msg.level}]: ${msg.timestamp} || ${msg.message}`;
        // }
      })
      ]
    }
  }
  public createWinstonModuleOptions(): object {
    return this.options;
  }
}