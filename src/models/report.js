const mongo = require('../mongodb');
const { ObjectId } = require('mongodb');

module.exports = {
    insert(report) {
        return mongo.then(db => {
            return db.collection('reports')
                .insertOne(report)
                .then(result => result.ops[0]);
        });
    },
    find(query) {
        return mongo.then(db => {
            return db.collection('reports')
                .find(query)
                .toArray();
        });
    },
    findOne(id) {
        return mongo.then(db => {
            return db.collection('reports')
                .findOne({ _id: ObjectId(id) })
                .then(result => result);
        });
    },
    remove(id) {
        return mongo.then(db => {
            return db.collection('reports')
                .removeOne({ _id: ObjectId(id) });
        });
    },
    update(report) {
        const id = report._id;
        delete report._id;

        return mongo.then(db => {
            return db.collection('reports')
                .findOneAndUpdate({
                    _id: ObjectId(id)
                },
                {
                    $set: report
                },
                {
                    returnOriginal: false
                })
                .then(result => result.value);
        });
    }
};