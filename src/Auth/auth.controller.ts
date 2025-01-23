import { UsuariosService } from './../usuarios/usuarios.service';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import * as bcryptjs from "bcryptjs";
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
    constructor (@Inject() private usuariosService:UsuariosService){}

    @Post("/register")
    async registarNuevoUsuario(@Body() createUsuarioDto:CreateUsuarioDto){
        createUsuarioDto.password = await bcryptjs.hash(createUsuarioDto.password, 10);
        return this.usuariosService.create(createUsuarioDto);

    }
}
