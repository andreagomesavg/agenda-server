import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject() private jwtService:JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extraerTokendelaCabecera(request);
        if(!token) throw new UnauthorizedException();
        try {
            const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});
            request["user"]=payload;
       } catch {
        throw new UnauthorizedException();
       }
       return true;
    }
    private extraerTokendelaCabecera(req:Request): string | "a" {
           const [tipo, token]= req.headers.authorization?.split(" ") ?? []
          return (tipo==="Bearer")?token:"a";
        }

}