import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async getFile(name: string , extension: string = "html") {
    try {
      return fs.readFileSync(
        path.resolve(
          path.join(__dirname, '..', '..', '..', 'public', `${name}.${extension}`),
        ),
      );
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
