'use strict';

const Client = require('ssh2-sftp-client');
const fs = require('fs')

const config = {
    host: process.env.EMUELECHOST,
    port: process.env.EMUELECPORT,
    username: process.env.EMUELECUSER,
    password: process.env.EMUELECPASSWORD
};

const sftp = new Client('emuelec-client');

module.exports = {
    listFoldersFromRoot: async () => {
        let p = new Promise(async (f, r) => {
            sftp.connect(config)
                .then(() => {
                    return sftp.cwd();
                })
                .then(p => {
                    return new Promise(async (f, r) => {
                        try {
                            let lista = await sftp.list(p)
                            let _lista = lista.map((v, i) => {
                                return {
                                    name: `${v.name}`,
                                    fullname: `${p}/${v.name}`,
                                    obj: v
                                }
                            })
                            f(_lista)
                        } catch (error) {
                            sftp.end()
                            r(error)
                        }
                    })
                })
                .then((data) => {
                    f(data)
                    sftp.end()
                })
                .catch(err => {
                    r(err)
                    console.log(`Error: ${err.message}`); // error message will include 'example-client'
                })
        })
        return p
    },
    listFoldersFromDirectory: (directoryName) => {
        let p = new Promise((f, r) => {
            sftp.connect(config)
                .then(p => {
                    return new Promise(async (f, r) => {
                        try {
                            let lista = await sftp.list(directoryName)
                            let _lista = lista.map((v, i) => {
                                return {
                                    name: `${v.name}`,
                                    fullname: `${directoryName}/${v.name}`,
                                    obj: v
                                }
                            })
                            f(_lista)
                            return sftp.end()
                        } catch (error) {
                            r(error)
                        }
                    })
                })
                .then((data) => {
                    f(data)
                    //sftp.end();
                })
                .catch(err => {
                    r(err)
                    console.log(`Error: ${err.message}`); // error message will include 'example-client'
                })
        })
        return p
    },
    removeFile: async (fullFileName) => {
        return new Promise((f, r) => {
            sftp.connect(config)
                .then(() => {
                    console.error(`Tentando deletar ${fullFileName}`);
                    return sftp.delete(fullFileName);
                })
                .then((data) => {
                    console.log(data);
                    return sftp.end()
                })
                .then((data)=>{
                    console.log(`Tentando fechar a conexao ${data}`)
                    f()
                })
                .catch(err => {                    
                    r(err)
                    console.error(err.message);
                })
        })
    },
    putFile: (localFilePath, remoteFilePath) => {

        return new Promise((f, r) => {
            let data = fs.createReadStream(localFilePath);
            let remote = remoteFilePath;

            sftp.connect(config)
                .then(() => {
                    return sftp.put(data, remote);
                })
                .then(() => {
                    f()
                    sftp.end();
                })
                .catch(err => {
                    r(err.message);
                });
        })
    }
}