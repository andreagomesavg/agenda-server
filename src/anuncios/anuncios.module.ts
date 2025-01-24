import { Module } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { AnunciosController } from './anuncios.controller';
import { Anuncio, anuncioSchema } from './entities/anuncio.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Anuncio.name, schema: anuncioSchema}])],
  controllers: [AnunciosController],
  providers: [AnunciosService],
})
export class AnunciosModule {}
