import Users from '../../database/models/users';

interface IUserWithPassDTO {
  id: number,
  username: string,
  role: string,
  email: string
  password:string
}
class User {
  private metodos = Users;

  getByEmail = async (email:string):Promise<IUserWithPassDTO | null> => {
    const user = await this.metodos.findOne({ where: { email }, raw: true });
    return user as unknown as IUserWithPassDTO | null;
  };
}
export default User;
