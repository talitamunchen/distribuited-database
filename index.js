'use strict'; //utilizando es6, ultima versão do javascript
require('dotenv').config(); //configura as variaveis de ambiente

const Database = require('./Database');
const d = new Database();
/*
const maria = d.insert({
    nome: 'Maria',
    idade: 12
});

const joao = d.insert({
    nome: 'Joao',
    idade: 22
});

const jose = d.insert({
    nome: 'Jose',
    idade: 12
});

const joao2 = d.insert({
    nome: 'Joao',
    idade: 13
});

const joaoSilva = d.insert({
    sobrenome: 'Silva'
});
*/

d.delete('40d42d67-ae54-4779-a18c-138e7c193cad');
//console.log(JSON.stringify(d.find({})));
