const elasticsearch = require('elasticsearch')
const users = require('./users.json')

const client = new elasticsearch.Client({
  hosts: ['http://localhost:9200'] //
})
client.ping({
  requestTimeout: 30000
}, function(err) {
  if (err) {
    console.error('ElasticSearch cluster is down!');
  } else {
    console.log('Everything is ok!')
  }
})

// 要有索引 相当于 mongodb  collection 
// client.indices.create({
//   index: "tutorial"
// }, function(error, response, status) {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log('create a new index', response)
//   }
// })

var bulk = []
users.forEach(user => {
  bulk.push(({
    index: {
      _index: "juejin",
      _type: "users_list"
    }
  }))
  bulk.push(user)
})

client.bulk({body: bulk}, function(err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log(res)
  }
})

