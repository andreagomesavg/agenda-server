import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: 
  [
    MongooseModule.forFeature(
      [
        {name: Usuario.name, schema: UserSchema}
      ]
    )],
  controllers: [AuthController],
  providers: [UsuariosService]
})
export class AuthModule {}
