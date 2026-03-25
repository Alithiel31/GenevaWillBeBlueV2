import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Agent extends Model {
  declare id: number;
  declare nickname: string;
  declare level: number;
  declare platform: string;
  declare contact: string;
  declare location: string;
  declare comment: string;
}

Agent.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  platform: {
    type: DataTypes.ENUM('Telegram', 'Discord', 'Autre'),
    defaultValue: 'Telegram'
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.ENUM('On-site', 'Off-site'),
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Agent',
});