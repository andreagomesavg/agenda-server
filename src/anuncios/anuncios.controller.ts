import { AuthGuard } from './../Auth/guards/auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AnunciosService } from './anuncios.service';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';

@Controller('anuncios')
export class AnunciosController {
  constructor(private readonly anunciosService: AnunciosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAnuncioDto: CreateAnuncioDto, @Req() request:any) {
    const user = request.user;
    const username = user.username;
    return this.anunciosService.create(createAnuncioDto, username);
  }

  @Get()
  findAll() {
    return this.anunciosService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.anunciosService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnuncioDto: UpdateAnuncioDto, @Req() request:any) {
    const user = request.user;
    const username = user.username;
    const rol = user.rol;
    return this.anunciosService.update(id, updateAnuncioDto, rol, username);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() request:any) {
    const user = request.user;
    const username = user.username;
    const rol = user.rol;
    return this.anunciosService.remove(id, rol, username);
  }
}
