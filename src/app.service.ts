import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<center><h1>Hello 🖐, Welcome to RenphaConsult!</h1><center>';
  }
}
