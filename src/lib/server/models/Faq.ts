import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class AccordionItem extends Model {
  declare id: string; 
  declare category: string; 
  declare title: string;    
  declare content: string;  
  declare order: number;    
  declare isActive: boolean;
}

AccordionItem.init({
  id: {
    type: DataTypes.STRING, 
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
    type: DataTypes.TEXT, 
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