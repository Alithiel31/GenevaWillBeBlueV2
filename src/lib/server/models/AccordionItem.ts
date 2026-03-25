import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class AccordionItem extends Model {
  declare id: number;
  declare category: string; // 'FAQ', 'Program', 'Rules', etc.
  declare title: string;    // La question / Le titre de l'onglet
  declare content: string;  // La réponse (peut contenir du HTML/Markdown)
  declare order: number;    // Pour trier l'affichage
  declare isActive: boolean;
}

AccordionItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT, // TEXT permet de stocker de longs paragraphes
    allowNull: false,
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  sequelize,
  modelName: 'AccordionItem',
});