import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private  authService: AuthService) {
    }
    @Post('/registration')
    login(@Body() userDto: CreateUserDto) {}

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){}
}
