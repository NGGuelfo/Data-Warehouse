//Importar models
const { User, Region, Country, City, Contact, Company } = require('../models');

//Asociaciones en base de datos

Contact.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Contact);
Contact.belongsTo(Company);
Company.belongsTo(City);
Contact.belongsTo(City);
Contact.belongsTo(Country);
Contact.belongsTo(Region);
Country.hasMany(City);
City.belongsTo(Country);
Region.hasMany(Country);
Country.belongsTo(Region);