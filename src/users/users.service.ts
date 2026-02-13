import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>) {
    const hashedPassword = await bcrypt.hash(data.password!, 10);

    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }
}
