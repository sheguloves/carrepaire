import lowdb from 'lowdb';
import shortid from 'shortid';

import path from 'path';
import { remote } from 'electron';
import fs from 'fs';

const dialog = remote.dialog;

const FileSync = require('lowdb/adapters/FileSync');
// const fileName = path.join(remote.app.getPath('userData'), '/db.json');
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

// Set some defaults
db.defaults({ orders: []}).write();
const orders = db.get('orders').value();
const state = {
  orders: [...orders]
}

const mutations = {
  UPDATE_ORDER (state, orders) {
    state.orders = [...orders.orders];
  }
};

const actions = {
  addOrder ({ commit }, order) {
    db.get('orders')
      .push({ ...order, id: shortid.generate() })
      .write();
    commit({
      type:'UPDATE_ORDER',
      orders: db.get('orders').value()
    });
  },
  updateOrder ({ commit }, order) {
    db.get('orders')
      .remove({ id: order.id})
      .write();
    db.get('orders')
      .push({...order})
      .write();
    commit({
      type:'UPDATE_ORDER',
      orders: db.get('orders').value()
    });
  },
  deleteOrder ({ commit }, order) {
    db.get('orders')
      .remove({ id: order.id })
      .write();
    commit({
      type:'UPDATE_ORDER',
      orders: db.get('orders').value()
    });
  },
  daochushuju () {
    let content = db.get('orders').value();
    dialog.showSaveDialog((fileName) => {
      if (fileName === undefined){
        return;
      }
      // fileName is a string that contains the path and filename created in the save file dialog.
      fs.writeFile(fileName, JSON.stringify(content), (err) => {
        if(err){
        }
      });
    });
  },
  daorushuju ({ commit }) {
    dialog.showOpenDialog((fileNames) => {
      // fileNames is an array that contains all the selected
      if(!fileNames || fileNames.length === 0){
        return;
      }

      fs.readFile(fileNames[0], 'utf-8', (err, data) => {
        if(err){
          return;
        }
        var content = JSON.parse(data);
        if (content && content.length > 0) {
          content.forEach(function(item) {
            db.get('orders')
              .push({ ...item, id: shortid.generate() })
              .write();
          });
          commit({
            type:'UPDATE_ORDER',
            orders: db.get('orders').value()
          });
        }
      });
    });
  }
};

const getter = {
  getOrderById: (state) => (id) => {
    return state.orders.find(order => order.id === id);
  }
};

export default {
  state,
  getter,
  mutations,
  actions
};
