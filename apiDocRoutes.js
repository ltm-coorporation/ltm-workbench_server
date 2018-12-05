const nano = require('nano')('http://127.0.0.1:5984');
let alice;

function createDoc(req, res){
    nano.db.destroy('alice')
    .then(response => {
        return nano.db.create('alice');
    })
    .then(response => {
        alice = nano.use('alice');

        return alice.insert({ happy: true }, 'rabbit');
    })
    .then((data) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
        res.end();
    })
    .catch(err => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(err));
        res.end();
    });
}

function readDoc(req, res){

    var alice = nano.use('alice');


    alice
    .get('rabbit', { revs_info: true })
    .then(doc => {
        // doc.insert()
        // console.log(doc);
        doc.happy = true;
        var revArray = doc._revs_info;
        var promiseArray = [];
        // return new Promise((resolve, reject) => {
        //     resolve(new Error('test'));
        // });
        return new Promise((resolve, reject) =>{
            alice.destroy('rabbit', revArray[1])
            .then(body => {
                resolve(body);
            })
            .catch(err => {
                reject(err);
            });
        });
        // revArray.forEach( revInfo => {
        //     if(revInfo === doc._rev) return;
        //     alice.destroy('rabbit', revInfo).then(response => {
        //         console.log(response);
        //     }).catch(err => {
        //         console.log(err);
        //     });
        //     // promiseArray.push(alice.destroy('rabbit', revInfo));
        // });

        // return Promise.all(promiseArray).then(bodye => console.log(bodye));

        // return alice.insert(doc, 'rabbit');
    })    
    .then(data => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({data}));
        res.end();
    })
    .catch((err) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(err));
        res.end();
    });

}

function updateDoc(req, res){

}

function deleteDoc(req, res){

}

module.exports = { createDoc, readDoc, updateDoc, deleteDoc };