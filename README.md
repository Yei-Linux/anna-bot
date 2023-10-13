### Anna Bot

**Used for supporting any patient interested to have a medical appointment or medical test** 

```
npm i
npm start
```

## Setup mongosh
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
brew services list
/opt/homebrew/etc/mongod.conf --> add replica set config
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})