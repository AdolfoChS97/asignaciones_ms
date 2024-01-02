import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async getFile(files: Array<string>, extension: string = 'html') {
    try {
      if (Array.isArray(files)) {
        return files.map((n) => {
          return fs.readFileSync(
            path.resolve(
              path.join(
                __dirname,
                '..',
                '..',
                '..',
                'public',
                `${n}.${extension}`,
              ),
            ),
          );
        });
      }
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }
}
