import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async getFile(name: string) {
    try {
      return fs.readFileSync(
        path.resolve(
          path.join(__dirname, '..', '..', '..', 'public', `${name}.hbs`),
        ),
      );
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
