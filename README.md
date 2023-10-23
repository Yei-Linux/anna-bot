### Anna Bot

**Used for supporting any patient interested to have a medical appointment or medical test** 

```
docker build . -t botwhatsapp:latest
docker run -d --add-host=host.docker.internal:host-gateway --name bot_last -p 3000:3000 botwhatsapp:latest
```

## Setup mongosh
```
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
brew services list
/opt/homebrew/etc/mongod.conf --> add replica set config
rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})

to delete lock file -> sudo rm -rf /tmp/mongodb-27017.sock
set in bindIp your own ip(or 0.0.0.0) to bridge gateway
directConnection=true :To force operations on the host designated in the connection URI
```