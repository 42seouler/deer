import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KickboardsModule } from './kickboards/kickboards.module';
import { AreaModule } from './area/area.module';
import { CalculatorModule } from './calculator/calculator.module';
import { RegularPolicesModule } from './regular-policies/regular-policies.module';
import { Kickboard } from './kickboards/kickboard.entity';
import { Area } from './area/area.entity';
import { ForbiddenAreaModule } from './forbidden-area/forbidden-area.module';
import { RegularPolicy } from './regular-policies/regular-policy';
import { ParkingZoneModule } from './parking-zone/parking-zone.module';
import { ParkingZone } from './parking-zone/parking-zone.entity';
import { ForbiddenArea } from './forbidden-area/forbidden-area.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    TypeOrmModule.forFeature([
      Area,
      Kickboard,
      RegularPolicy,
      ParkingZone,
      ForbiddenArea,
    ]),
    AuthModule,
    UsersModule,
    KickboardsModule,
    AreaModule,
    CalculatorModule,
    RegularPolicesModule,
    ForbiddenAreaModule,
    ParkingZoneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
