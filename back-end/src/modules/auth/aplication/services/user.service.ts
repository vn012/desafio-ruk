// import { Injectable } from '@nestjs/common';
// import { UserService } from 'src/modules/user/aplication/services/user.service';

// @Injectable()
// export class AuthService {
//   constructor(private readonly userService: UserService) { }

//   async auth(email: string, password: string): Promise<any> {
//     let user = this.userService.findAll()[0];
//     if (!user.email)
//         return "Usuario ou senha invalido";

//     if (user.email === email && user.password === password) {
//         var token = this.GenerateJwtToken(user.name);
//         return token;
//         }
//     }

//     GenerateJwtToken(userName: string): string {

//         return `ASDUISFHIL#$@&*FDSFHSEF${userName}`;
//     }

// }
