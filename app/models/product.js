import Datastore from 'nedb';

const db = new Datastore(/*{ filename: 'db/products.db', autoload: true }*/);

const crud = {
  getAll: () => new Promise((resolve, reject) => {
    db.find({}, (err, docs) => {
      if (err) return reject(err);
      return resolve(docs);
    });
  }),
  get: id => new Promise((resolve, reject) => {
    db.find({ id: Number(id) }, (err, docs) => {
      if (err) return reject(err);
      return resolve(docs);
    });
  }),
  create: ({ id, name, price = 0, currency = 'RUR' }) => {
    const product = {
      id: Number(id),
      name: String(name),
      price: Number(price),
      currency: String(currency),
    };

    return new Promise((resolve, reject) => {
      db.insert(product, (err, doc) => {
        if (err) return reject(err);
        return resolve(doc);
      });
    });
  },
  update: (id, product) => new Promise((resolve, reject) => {
    db.update({ id: Number(id) }, { $set: product }, {}, (err, num) => {
      if (err) return reject(err);
      return resolve(num);
    });
  }),
  delete: id => new Promise((resolve, reject) => {
    db.remove({ id: Number(id) }, (err, num) => {
      if (err) return reject(err);
      return resolve(num);
    });
  }),
};

export default crud;
