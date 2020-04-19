'use strict';

const Client = require('ssh2-sftp-client');

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
                            r(error)
                        }
                    })
                    //return sftp.list(p)
                })
                .then((data) => {
                    f(data)
                    return sftp.end();
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
                    //return sftp.list(directoryName)
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
                        } catch (error) {
                            r(error)
                        }
                    })
                })
                .then((data) => {
                    f(data)
                    return sftp.end();
                })
                .catch(err => {
                    r(err)
                    console.log(`Error: ${err.message}`); // error message will include 'example-client'
                })
        })
        return p
    },
    removeFile: async(fullFileName) => {
        return new Promise((f, r) => {
            sftp.connect(config)
                .then(() => {
                    return sftp.delete(fullFileName);
                })
                .then(() => {
                    f('Registro removido')
                    sftp.end();
                })
                .catch(err => {
                    r(err)
                    console.error(err.message);
                })
        })
    }
}