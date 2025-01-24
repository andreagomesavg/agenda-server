import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Auth/Auth.module';
import { AnunciosModule } from './anuncios/anuncios.module';


@Module({
  imports: [AnunciosModule, UsuariosModule, MongooseModule.forRoot("mongodb+srv://andreavalentinagomesaraque:1234@cluster0.putdt.mongodb.net/midatabase"), AuthModule, AnunciosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
