import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: number, data: Partial<User>) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, data);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);

    return { message: 'User deleted successfully' };
  }
}
