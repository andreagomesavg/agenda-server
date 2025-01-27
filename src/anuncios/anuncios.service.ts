import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Anuncio } from './entities/anuncio.entity';
import { Model } from 'mongoose';

@Injectable()
export class AnunciosService {
  constructor(@InjectModel(Anuncio.name) private anuncioModel: Model<Anuncio>){}

  create(createAnuncioDto: CreateAnuncioDto, username:string) {
    const nuevoAnuncio = new this.anuncioModel({...createAnuncioDto, usuario:username});
    return nuevoAnuncio.save();
  }

  findAll() {
    // return this.anuncioModel.find().select("titulo -_id").exec(); Esta opcion sería para que solo mostrase el título.
    return this.anuncioModel.find().select("titulo").exec();
  }

  findOne(id: string) {
    return this.anuncioModel.findById(id).exec();
  }

  async update(id: string, updateAnuncioDto: UpdateAnuncioDto, rol:string, username:string) 
  {
    const anuncio = await this.anuncioModel.findById(id).exec();
    if(rol === "admin" || anuncio?.usuario === username) {
       return this.anuncioModel.findByIdAndUpdate(id, updateAnuncioDto, {new: true}).exec();
    }
    else  {throw new UnauthorizedException;}
   
  }

 async remove(id: string, rol:string, username:string) {
    const anuncio = await this.anuncioModel.findById(id).exec();
    if(rol === "admin" || anuncio?.usuario === username) {
       return this.anuncioModel.findByIdAndDelete(id, {new: true}).exec();
    }
    else  {throw new UnauthorizedException;}
  }
}
