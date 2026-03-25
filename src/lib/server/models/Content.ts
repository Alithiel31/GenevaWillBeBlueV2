import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Content extends Model {
  declare id: number;
  declare category: 'anomaly' | 'general' | 'travel';
  declare title: string;
  declare body: string;
  declare icon: string | null;
  declare order: number;
}

Content.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  category: { 
    type: DataTypes.ENUM('anomaly', 'general', 'travel'), 
    allowNull: false 
  },
  title: { type: DataTypes.STRING, allowNull: false },
  body: { type: DataTypes.TEXT, allowNull: false }, 
  icon: { type: DataTypes.STRING, allowNull: true },
  order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  sequelize, // Utilise l'instance importée
  modelName: 'Content'
});