import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, Usuario } from 'src/usuarios/entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: 
  [
    MongooseModule.forFeature(
      [
        {name: Usuario.name, schema: UserSchema}
      ]
    ),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: "60s"}
  })],
  controllers: [AuthController],
  providers: [UsuariosService]
})
export class AuthModule {}
