import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopController } from './shop/shop.controller';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://HentyiOsmy:hhZrCwY6BXVe7efF@cluster0.qxuqepw.mongodb.net/?retryWrites=true&w=majority',
    ),
    ShopModule,
  ],
  controllers: [AppController, ShopController],
  providers: [AppService],
})
export class AppModule {}
