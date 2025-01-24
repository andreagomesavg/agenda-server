import { Injectable } from '@nestjs/common';
import { CreateAnuncioDto } from './dto/create-anuncio.dto';
import { UpdateAnuncioDto } from './dto/update-anuncio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Anuncio } from './entities/anuncio.entity';
import { Model } from 'mongoose';

@Injectable()
export class AnunciosService {
  constructor(@InjectModel(Anuncio.name) private anuncioModel: Model<Anuncio>){}

  create(createAnuncioDto: CreateAnuncioDto) {
    const nuevoAnuncio = new this.anuncioModel(createAnuncioDto);
    return nuevoAnuncio.save();
  }

  findAll() {
    return this.anuncioModel.find().exec();
  }

  findOne(id: string) {
    return this.anuncioModel.findById(id).exec();
  }

  update(id: string, updateAnuncioDto: UpdateAnuncioDto) {
    return this.anuncioModel.findByIdAndUpdate(id, updateAnuncioDto).exec();
  }

  remove(id: string) {
    return this.anuncioModel.findByIdAndDelete(id).exec();
  }
}
