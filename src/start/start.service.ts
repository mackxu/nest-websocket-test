import { Injectable } from '@nestjs/common';
import { CreateStartDto } from './dto/create-start.dto';
import { UpdateStartDto } from './dto/update-start.dto';

@Injectable()
export class StartService {
  create(createStartDto: CreateStartDto) {
    return 'This action adds a new start';
  }

  findAll() {
    return `This action returns all start`;
  }

  findOne(id: number) {
    return `This action returns a #${id} start`;
  }

  update(id: number, updateStartDto: UpdateStartDto) {
    return `This action updates a #${id} start`;
  }

  remove(id: number) {
    return `This action removes a #${id} start`;
  }
}
