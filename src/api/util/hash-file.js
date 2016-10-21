'use strict'

const UnixFs = require('ipfs-unixfs')
const DAGNode = require('ipfs-merkle-dag').DAGNode

module.exports = (file) => {
  const data = new UnixFs('file', file)
  const dagNode = new DAGNode(data.marshal(), [])
  return dagNode.toJSON().Hash
}
