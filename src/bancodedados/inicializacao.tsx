import { Conexao } from './conexao'

var db = null
var atualizar=0 // use 1 para apagar e refazer a tabela ou 0 para manter os dados
export default class DatabaseInit {

    constructor() {
        db = Conexao.getConnection()
        db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
        console.log('Chaves Estrangeiras turned on')
    );
        this.InitDb()
    }

    private InitDb() {
        if (atualizar==1){
            var sql = [
                `DROP TABLE IF EXISTS celular;`,
                `create table if not exists celular (
                id integer primary key autoincrement,
                marca text,            
                modelo text,
                ano text,
                armazenamento text,
                memoriaRAM text,
                SO text    
                );`                                  
               
            ];
        }
        else{
        var sql = [
            //`DROP TABLE IF EXISTS celular;`,
            `create table if not exists celular (
            id integer primary key autoincrement,
            marca text,            
            modelo text,
            ano text,
            armazenamento text,
            memoriaRAM text,
            SO text            
            );`                                  
           
        ];
    }
        db.transaction(
            tx => {
                for (var i = 0; i < sql.length; i++) {
                    console.log("execute sql : " + sql[i]);
                    tx.executeSql(sql[i]);
                }
            }, (error) => {
                console.log("error call back : " + JSON.stringify(error));
                console.log(error);
            }, () => {
                console.log("transaction complete call back ");
            }
        );
    }

}