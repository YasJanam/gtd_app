import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';




@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  

  async create(createUserDto: CreateUserDto) : Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password,10);

    const existUser = await this.userModel.findOne({username:createUserDto.username})
    if(existUser) {
        throw new ConflictException('username already exists')
    }

    const created = new this.userModel({
        ...createUserDto,password:hashedPassword
    })

    console.log(created)

    return created.save()
  }



  async findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }


  async update(id:string,updateUserDto:UpdateUserDto) :Promise<User | null> {
    if(updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password,10)
    }

    if(updateUserDto.username) {
        const existUser = await this.userModel.findOne({username:updateUserDto.username})
        if(existUser)
            throw new ConflictException('username already exsits')
    }

    const updated = await this.userModel.findByIdAndUpdate(id,updateUserDto,{returnDocument:'after'});
    if(!updated)
        throw new NotFoundException(`user by id=${id} not found`)

    return updated
  }



  async findById(id:string) : Promise<User | null> {
    return this.userModel.findById(id)
  }

  async remove(id:string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id)
  }

  async findByUsername(username:string) : Promise<User | null> {
    return this.userModel.findOne({username:username})
  }

}
