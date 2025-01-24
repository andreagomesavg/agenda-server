import { UsuariosService } from './../usuarios/usuarios.service';
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Post, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from "bcryptjs";
import { Request } from 'express';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';

@Controller('auth')
export class AuthController {
    constructor (@Inject() private usuariosService:UsuariosService, @Inject() private jwtService:JwtService){}

    @Post("/register")
    async registarNuevoUsuario(@Body() createUsuarioDto:CreateUsuarioDto){
        createUsuarioDto.password = await bcryptjs.hash(createUsuarioDto.password, 10);
        return this.usuariosService.create(createUsuarioDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async iniciarSesion(@Body() usuario:CreateUsuarioDto){
        const elUsuario = await this.usuariosService.findByUserName(usuario.username);
        if(elUsuario==null) throw new HttpException("Acceso denegado", HttpStatus.NOT_FOUND)
            const passOk = await bcryptjs.compare( usuario.password, elUsuario.password);
            if (!passOk) throw new HttpException("Contrasena no valida", HttpStatus.NOT_FOUND);

            const payload = {username: elUsuario.username, rol:elUsuario.rol}
            const miToken = await this.jwtService.signAsync(payload);


        return {access_token: miToken}
    }

    @Get("/validar")
    async ValidarToken(@Req() req:Request){
        
    }
}
