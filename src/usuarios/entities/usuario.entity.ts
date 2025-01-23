import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Usuario {
    @Prop()
    username:string;
    @Prop()
    password: string;
    @Prop()
    nombre: string;
    @Prop()
    rol: string;

}
export const UserSchema = SchemaFactory.createForClass(Usuario);