import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Usuario } from './entities/usuario.entity';

@Module({
  imports: [MongooseModule.forFeature(
    [{name: Usuario.name, schema: UserSchema}]
  )],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}
