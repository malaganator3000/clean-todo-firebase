export class NotFoundException extends Error {
  status: number;
  constructor(message: string, entity: string) {
    super(message);
    this.name = `${entity}NotFoundException`;
    this.status = 404;
  }
}
