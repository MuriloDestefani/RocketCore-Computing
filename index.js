const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const PORT = process.env.PORT || 3000;
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

// rota renderizada para o cad_users
app.get('/cad_users',(req,res)=>{
res.render('cad_users'); 
});
// rota renderizada 
app.get('/exibir_users',(req,res)=>{
res.render('exibir_users'); 
});
    
// rota renderizada 
app.get('/editar_users',(req,res)=>{
res.render('editar_users'); 
});
    
