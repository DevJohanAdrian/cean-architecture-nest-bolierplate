import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interfce';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Post()
  // create(@Req() req: Request, @Res() res: Response) {
  //   // Accede al cuerpo de la solicitud directamente
  //   const createUserDto = req.body as CreateUserDto;

  //   // Llama al servicio y responde con el resultado
  //   const result = this.usersService.create(createUserDto);
  //   return res.status(201).json(result);
  // }

  @Get('getall')
  findAll(@Req() req: Request, @Res() res: Response) {
    res.json('hola mundo');
    // return this.usersService.findAll();
    // :Promise<IUser>
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
