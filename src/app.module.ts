import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ParkingzoneModule } from './parkingzone/parkingzone.module';
import { ForbiddenModule } from './forbidden/forbidden.module';
import { ForbiddenModule } from './forbiddenzone/forbidden.module';
import { AreaModule } from './area/area.module';
import { ParkingzoneModule } from './parkingzone/parkingzone.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AuthModule,
    UsersModule,
    ParkingzoneModule,
    AreaModule,
    ForbiddenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
