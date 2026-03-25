import { DataTypes, Model, type Sequelize } from 'sequelize';

export class AccordionItem extends Model {
  declare id: string;
  declare category: 'anomaly' | 'general';
  declare question: string;
  declare answer: any; // Pour stocker du JSON (Rich Text)
  declare order: number;
}

// Cette fonction sera appelée par database.ts au moment de la connexion réelle
export function initFaqModel(sequelize: Sequelize) {
  AccordionItem.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    category: {
      type: DataTypes.ENUM('anomaly', 'general'),
      allowNull: false
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.JSONB,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'AccordionItem',
    tableName: 'FaqItems' 
  });
}