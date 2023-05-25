// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('bd_loja', 'postgres', '031016',{
//     host: '127.0.0.1',
//     dialect: 'postgres',
//     define: {
//         charset: 'utf8',
//         collate: 'utf8_general_ci',
//         timestamps: true
//     },
//     logging: false
// })

// //TESTANDO A CONEXAO COM O BANCO
//  sequelize.authenticate().then(function(){
//          console.log('Conectado no banco com sucesso!');
//  }).catch(function(err){
//     console.log('Falha ao se conectar:'+err);
//  })

// module.exports = {Sequelize, sequelize}

const Sequelize = require('sequelize');
const sequelize = new Sequelize('dbffrfoy', 'dbffrfoy', 'zxsLTYBw2e-bSKyV6zI3vAVCoSdw9z3c',{
    host: 'silly.db.elephantsql.com',
    dialect: 'postgres',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: false
})

sequelize.authenticate().then(function(){
         console.log('Conectado no banco com sucesso!');
 }).catch(function(err){
    console.log('Falha ao se conectar:'+err);
 })
module.exports={Sequelize,sequelize}