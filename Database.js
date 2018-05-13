'use strict';
const uuid = require('uuid/v4'); //blibioteca para gerar chaves unicas - versao 4
const fs = require('fs');

module.exports = class Database {
    constructor () {
        this.datamap = {}; //inicializa a database em memória
        const files = fs.readdirSync(`${process.env.DATA_DIR}`);
        files.forEach(file => {
            //lendo os documento do disco, transformando em objeto
            const data = JSON.parse(fs.readFileSync(`${process.env.DATA_DIR}\\${file}`, {encoding: 'utf8'}));
            //lendo do disco e joga na memória
            this.datamap[data.id] = data; 
        });
    }

    insert (data) {
        const id = uuid(); //gera um id
        data.id = id;
        this.datamap[id] = data; //insere id no map
        //escrevendo em disco
        fs.writeFileSync(`${process.env.DATA_DIR}\\${id}`, JSON.stringify(data), {encoding: 'utf8'});
        return data;
    }

    delete (id) {
        delete this.datamap[id];
        fs.unlink(`${process.env.DATA_DIR}\\${id}`, function(err){
            if (err){
                console.log(`Erro ao deletar o arquivo ${err}`);
            }
        });
    }

    update (data) {
        this.datamap[data.id] = data; //sobrescre o documento na posição data do id especifico com o data que vem do parametro
        //sobrescrevendo em disco
        fs.writeFileSync(`${process.env.DATA_DIR}\\${data.id}`, JSON.stringify(data), {encoding: 'utf8'});
    }

    find (query) {
        //percore todos os valores do datamap filtrandos os que batem com a query de find desejada
        return Object.values(this.datamap).filter(document => {
            const keys = Object.keys(query);
            for (let i = 0; i < keys.length; i++){ //percorre todas as chaves que existem na query
                if (!document[keys[i]]){ //verifica se existe esta chave no documento
                    return false; // descarta o documento
                }else if (document[keys[i]] != query[keys[i]]) { //verifica se o valor da chave em questão bate com va lor da chave na query
                    return false; // descarta o documento
                }
            }
            return true; //inclui documento no retorno
        });
    }

    findById (id) {
        return this.datamap[id];
    }

    print () {
        console.log(`${JSON.stringify(this.datamap, null, 4)}`);
    }
}