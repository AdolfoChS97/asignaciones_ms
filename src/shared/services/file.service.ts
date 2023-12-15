import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async getFile(name: string) {
    return fs.readFileSync(
      path.resolve(
        path.join(__dirname, '..', '..', '..', 'public', `${name}.hbs`),
      ),
    );
  }
}
