const Report = require('../models/report');

const post = req => Report.insert(req.body);
const get = ({ id }) => id ? getOne(id) : getAll();
const getOne = id => Report.findOne(id);
const getAll = () => Report.find({});
const del = req => Report.remove(req.id).then(() => ({ removed: true }));
const put = req => Report.update(req.body);




const methods = { post, get, delete: del, put };

module.exports = (req, res) => {
    const method = methods[req.method.toLowerCase()];
    return method(req, res);
};