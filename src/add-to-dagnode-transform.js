'use strict'

const map = require('async/map')
const waterfall = require('async/waterfall')

const getDagNode = require('./get-dagnode')

// transform { Hash: '...' } objects into { path: 'string', node: DAGNode }
module.exports = (err, res, send, done) => {
  if (err) {
    return done(err)
  }

  map(res, (entry, next) => waterfall([
    (cb) => getDagNode(send, entry.Hash, cb),
    (node, cb) => node.size((err, size) => {
      if (err) {
        return cb(err)
      }

      next(null, {
        path: entry.Name,
        hash: entry.Hash,
        size: size
      })
    })
  ], next), done)
}
