# shoveler-api
back-end of #hackfrost submission
  
## Set up Database 
  
1. Add a `env` folder in the `config` folder
2. Add a file that shares the name of your environment, eg: `develolpment.js` or `production.js`
3. Export an object with the key `db` whose value is a mongo uri string: 

```javascript
module.exports = {
  db: 'MONGO URI HERE'
};
```
