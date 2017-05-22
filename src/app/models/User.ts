import { Organisation } from './Organisation';
import { Course } from './Course';
import { Progress } from './Progress';
/**
 * Created by vladr on 02.05.2017.
 */
export class User {
  public id: number;
  public username: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public money: number;
  public info: string;
  public created: Date;
  public roles: any[];

  constructor() {
  }
}
