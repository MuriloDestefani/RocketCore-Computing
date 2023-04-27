const Sequelize = require('sequelize');
const sequelize = new Sequelize('bd_loja', 'postgres', '031016',{
    host: '127.0.0.1',
    dialect: 'postgres',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

//TESTANDO A CONEXAO COM O BANCO
 sequelize.authenticate().then(function(){
         console.log('Conectado no banco com sucesso!');
 }).catch(function(err){
    console.log('Falha ao se conectar:'+err);
 })

module.exports = {Sequelize, sequelize}