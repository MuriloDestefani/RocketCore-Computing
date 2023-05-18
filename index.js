const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
// add o comando para chamar o módulo:
const bodyParser = require('body-parser');
//IMPORTAR MODEL USUARIOS
const Usuario = require('./models/Usuario');
//IMPORTAR MODEL PRODUTOS
const Produto = require('./models/Produto');
// Configuracao do HandleBars
app.engine('hbs',hbs.engine({
    extname: 'hbs', 
    defaultLayout: 'main'
})); 
app.set('view engine', 'hbs');
// rota inicial 
// renderiza o home.hbs para abra dentro da tag {{{body}}} no layout
app.get('/',(req,res)=>{
res.render('home'); 
});
//ativar o sistema
app.listen(PORT,()=>{
console.log('Servidor rodando em http://localhost:' +PORT);
})

//rota para os arquivos CSS e JS
app.use(express.static('public'));

// criar a rota middlewares
app.use(bodyParser.urlencoded({extended:false}));

// rota renderizada para o cad_users
app.get('/cad_users',(req,res)=>{
res.render('cad_users'); 
});

// rota renderizada para o cad_users
// app.get('/vitrine',(req,res)=>{
//     res.render('vitrine'); 
// });

//criar a rota para receber o formulario de usuário
app.post('/insert_users',(req,res)=>{
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    // Salvar no Banco de Dados
    Usuario.create({
        nome: nome,
        email: email.toLowerCase(),
        senha: senha
        }).then(function(){
        console.log('Cadastro de Usuario realizado com sucesso!');
        //  req.session.succes = true;
        return res.redirect('/exibir_users');
        }).catch(function(erro){
        console.log(`Ops, deu erro: ${erro}`);
        })
    }); // fim do post    

//criar a rota para receber o formulario de produtos
app.post('/insert_prods',(req,res)=>{
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var vitrine = req.body.vitrine;
    var foto = req.body.foto;
    // Salvar no Banco de Dados
    Produto.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        vitrine: vitrine,
        foto: foto
        }).then(function(){
        console.log('Cadastro de Produto realizado com sucesso!');
        //  req.session.succes = true;
        return res.redirect('/exibir_prods');
        }).catch(function(erro){
        console.log(`Ops, deu erro: ${erro}`);
        })
    }); // fim do post    

// rota renderizada 
app.get('/exibir_users',(req,res)=>{    
    Usuario.findAll().then((valores)=>{
    if(valores.length >0){
            return res.render('exibir_users',{NavActiveUsers:true, table:true, usuarios: valores.map(valores => valores.toJSON()) });
        }else{
            res.render('exibir_users',{NavActiveUsers:true, table:false});
        }
    }).catch((err)=>{
        console.log(`Houve um problema: ${err}`);
    })
})

// rota renderizada 
app.get('/exibir_prods',(req,res)=>{    
    Produto.findAll().then((valores)=>{
    if(valores.length >0){
            return res.render('exibir_prods',{NavActiveUsers:true, table:true, produtos: valores.map(valores => valores.toJSON()) });
        }else{
            res.render('exibir_prods',{NavActiveUsers:true, table:false});
        }
    }).catch((err)=>{
        console.log(`Houve um problema: ${err}`);
    })
})

// rota renderizada 
app.get('/vitrine',(req,res)=>{    
    Produto.findAll().then((valores)=>{
    if(valores.length >0){
            return res.render('vitrine',{NavActiveUsers:true, table:true, produtos: valores.map(valores => valores.toJSON()) });
        }else{
            res.render('vitrine',{NavActiveUsers:true, table:false});
        }
    }).catch((err)=>{
        console.log(`Houve um problema: ${err}`);
    })
})

// rota renderizada 
app.get('/editar_users',(req,res)=>{
res.render('editar_users'); 
});

// rota renderizada 
app.get('/prods',(req,res)=>{
res.render('prods'); 
});

// rota renderizada 
app.get('/cad_prods',(req,res)=>{
    res.render('cad_prods'); 
});

// rota renderizada 
app.get('/exibir_prods',(req,res)=>{
    res.render('exibir_prods'); 
});

// rota renderizada 
app.get('/',(req,res)=>{
    res.render('home'); 
    });

app.post('/editar_users',(req,res)=>{
    var id = req.body.id;
    Usuario.findByPk(id).then((dados)=>{
        return res.render('editar_users',{error:false, id: dados.id, nome: dados.nome, email:dados.email, senha: dados.senha});
    }).catch((err)=>{
        console.log(err);
        return res.render('editar_users',{error:true, problema: 'Não é possível editar este registro'});
    }) 
})

app.post('/editar_prods',(req,res)=>{
    var id = req.body.id;
    Produto.findByPk(id).then((dados)=>{
        return res.render('editar_prods',{error:false, id: dados.id, nome: dados.nome, descricao:dados.descricao, preco: dados.preco, vitrine: dados.vitrine, foto: dados.foto});
    }).catch((err)=>{
        console.log(err);
        return res.render('editar_prods',{error:true, problema: 'Não é possível editar este registro'});
    }) 
})

app.post('/update_users',(req,res)=>{
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    
    //ATUALIZAR REGISTRO NO BANCO DE DADOS
    Usuario.update(
        { nome: nome,
        email: email.toLowerCase(),
        senha: senha, },
        {  where: {
            id: req.body.id  }
        }).then((resultado)=>{
            console.log(resultado);
            return res.redirect('/exibir_users');
        }).catch((err)=>{
            console.log(err);
        })
})

app.post('/update_prods',(req,res)=>{
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var vitrine = req.body.vitrine;
    var foto = req.body.foto;
    
    //ATUALIZAR REGISTRO NO BANCO DE DADOS
    Produto.update(
        { nome: nome,
        descricao: descricao,
        preco: preco,
        vitrine: vitrine,
        foto: foto,},
        {  where: {
            id: req.body.id  }
        }).then((resultado)=>{
            console.log(resultado);
            return res.redirect('/exibir_prods');
        }).catch((err)=>{
            console.log(err);
        })
})

app.post('/excluir_users',(req,res)=>{
    Usuario.destroy({
        where:{
            id: req.body.id
        }
    }).then((retorno)=>{
        return res.redirect('/exibir_users');
    }).catch((err)=>{
        console.log(err);
    })
})

app.post('/excluir_prods',(req,res)=>{
    Produto.destroy({
        where:{
            id: req.body.id
        }
    }).then((retorno)=>{
        return res.redirect('/exibir_prods');
    }).catch((err)=>{
        console.log(err);
    })
})