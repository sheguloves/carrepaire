import lowdb from 'lowdb';
import shortid from 'shortid';

import path from 'path'
import { remote } from 'electron'

const FileSync = require('lowdb/adapters/FileSync');
const fileName = path.join(remote.app.getPath('userData'), '/db.json');
const adapter = new FileSync(fileName);
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
