export class user {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly telephones: { number: number; area_code: number }[] = [],
    public readonly created_at: Date = new Date(),
    public readonly modified_at?: Date,
    public readonly deleted_at?: Date,
  ) {}
}
