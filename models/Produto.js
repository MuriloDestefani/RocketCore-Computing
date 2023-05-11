const db = require('./db');
const Produto = db.sequelize.define('produto',{
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    preco:{
        type: db.Sequelize.REAL,
        allowNull: false
    },
    vitrine:{
        type: db.Sequelize.BOOLEAN,
        allowNull: false
    },
    foto:{   
        type: db.Sequelize.STRING,
        allowNull: false
        }
    })

// Sincronizr com o BD, 
//se não existir esta tabela durante a execução ele
//vai criar no BD
Produto.sync();
module.exports = Produto;