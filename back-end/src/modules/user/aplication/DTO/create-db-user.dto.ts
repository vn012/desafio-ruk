export interface CreateDbUserDto {
  name: string;
  email: string;
  password: string;
  telephones: {
    number: number;
    area_code: number;
  }[];
}
