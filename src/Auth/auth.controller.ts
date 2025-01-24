import { UsuariosService } from './../usuarios/usuarios.service';
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from "bcryptjs";
import { Request } from 'express';
import { CreateUsuarioDto } from 'src/usuarios/dto/create-usuario.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor (@Inject() private usuariosService:UsuariosService, @Inject() private jwtService:JwtService){}

    @Post("/signup")
    async registarNuevoUsuario(@Body() createUsuarioDto:CreateUsuarioDto){
        createUsuarioDto.password = await bcryptjs.hash(createUsuarioDto.password, 10);
        return this.usuariosService.create(createUsuarioDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    async iniciarSesion ( @Body() usuario: CreateUsuarioDto) {

        const elUsuario = await this.usuariosService.findByUserName(usuario.username);
        if (!elUsuario) throw new UnauthorizedException("No se encuentra al usuario");

        const passOk = await bcryptjs.compare(usuario.password, elUsuario.password);
        if (!passOk) throw new UnauthorizedException("Fallo de Token");

        const payload = { username: elUsuario.username, rol: elUsuario.rol }
        const miToken = await this.jwtService.signAsync(payload);

        const miRefreshToken = await this.jwtService.signAsync(payload, { expiresIn: "1h"});

        return { access_token: miToken, refresh_token: miRefreshToken }
    }

    @Post("/refresh")
    async refresh(@Body() body) {
       
        const actual_refresh_token = body.refresh_token;
        if(!actual_refresh_token) throw new UnauthorizedException();
       
        try {

            const payload = this.jwtService.verifyAsync(actual_refresh_token);
            
            const miToken = await this.jwtService.signAsync(payload);
            const mi_refresh_token = await this.jwtService.signAsync(payload, { expiresIn: "1h"});

            return { access_token : miToken, refresh_token: mi_refresh_token};

        } catch {
            throw new UnauthorizedException();
        }
    }


    @UseGuards(AuthGuard)
    @Get("/validar")
    async ValidarToken(@Req() req:Request){
       return req["user"];
        
    }
    private extraerTokendelaCabecera(req:Request): string | "a" {
       const [tipo, token]= req.headers.authorization?.split(" ") ?? []
      return (tipo==="Bearer")?token:"a";
    }
}
