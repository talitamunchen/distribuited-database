'use strict'; //utilizando es6, ultima versão do javascript
const Database = require('./Database');

const d = new Database();

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
    idade: 12
});

const joaoSilva = d.insert({
    sobrenome: 'Silva'
});

d.print();

console.log(JSON.stringify(d.find({
    nome: "Joao"
})));
