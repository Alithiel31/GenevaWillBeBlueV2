import { DataTypes, Model, type Sequelize } from 'sequelize';

export class Content extends Model {
  declare id: string;
  declare category: 'anomaly' | 'general' | 'travel';
  declare title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  declare content: any; // On autorise explicitement 'any' ici pour le JSONB
  declare icon: string | null;
  declare order: number;
}

export function initTravelModel(sequelize: Sequelize) {
  Content.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    category: { type: DataTypes.ENUM('anomaly', 'general', 'travel'), allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.JSONB, allowNull: false },
    icon: { type: DataTypes.STRING, allowNull: true },
    order: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    sequelize,
    modelName: 'Content'
  });
}