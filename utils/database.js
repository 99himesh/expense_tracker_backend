const {Sequelize}=require('sequelize');
console.log(process.env.DB_PASSWORD,"dssd");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.USER_NAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});


(async ()=>{try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
})();

module.exports=sequelize;