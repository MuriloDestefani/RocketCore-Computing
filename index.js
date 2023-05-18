const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');

app.listen(PORT,()=>{
    console.log('Servidor rodando em http://localhost:' +PORT);
})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.engine('hbs',hbs.engine({
    extname: 'hbs', 
    defaultLayout: 'main'
})); 

app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
res.render('home'); 
});

app.get('/vitrine',(req,res)=>{    
    Produto.findAll().then((valores)=>{
    if(valores.length >0){
        let produtosVitrine = [valores.length];
        let i = 0;
        valores.map(produtos => {
            if (produtos.dataValues.vitrine === true) {
                produtosVitrine[i] = produtos;
                i++;
            }
        })
        return res.render('vitrine',{NavActiveUsers:true, table:true, produtos: produtosVitrine.map(valores => valores.toJSON()) });
    }else{
        res.render('vitrine',{NavActiveUsers:true, table:false});
    }
    }).catch((err)=>{
        console.log(`Houve um problema: ${err}`);
    })
})

app.get('/cad_users',(req,res)=>{
    res.render('cad_users');
});

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

app.get('/cad_prods',(req,res)=>{
    res.render('cad_prods'); 
});

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

app.post('/insert_users',(req,res)=>{
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    Usuario.create({
        nome: nome,
        email: email.toLowerCase(),
        senha: senha
    }).then(function(){
        console.log('Cadastro de Usuario realizado com sucesso!');
        return res.redirect('/exibir_users');
    }).catch(function(erro){
        console.log(`Ops, deu erro: ${erro}`);
    })
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

app.post('/update_users',(req,res)=>{
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    
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

app.post('/insert_prods',(req,res)=>{
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var vitrine = req.body.vitrine;
    var foto = req.body.foto;

    Produto.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        vitrine: vitrine,
        foto: foto
        }).then(function(){
        console.log('Cadastro de Produto realizado com sucesso!');
        return res.redirect('/exibir_prods');
        }).catch(function(erro){
        console.log(`Ops, deu erro: ${erro}`);
    })
}); 

app.post('/editar_prods',(req,res)=>{
    var id = req.body.id;
    Produto.findByPk(id).then((dados)=>{
        return res.render('editar_prods',{error:false, id: dados.id, nome: dados.nome, descricao:dados.descricao, preco: dados.preco, vitrine: dados.vitrine, foto: dados.foto});
    }).catch((err)=>{
        console.log(err);
        return res.render('editar_prods',{error:true, problema: 'Não é possível editar este registro'});
    }) 
})

app.post('/update_prods',(req,res)=>{
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var vitrine = req.body.vitrine;
    var foto = req.body.foto;
    
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