import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Content extends Model {
  declare id: string;
  declare category: 'anomaly' | 'general' | 'travel';
  declare title: string;
  declare content: any;
  declare icon: string | null;
  declare order: number;
}

Content.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  category: {
    type: DataTypes.ENUM('anomaly', 'general', 'travel'),
    allowNull: false
  },
  title: { type: DataTypes.STRING, allowNull: false },
  content: {
    type: DataTypes.JSONB,
    allowNull: false
  },
  icon: { type: DataTypes.STRING, allowNull: true },
  order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, {
  sequelize,
  modelName: 'Content'
});