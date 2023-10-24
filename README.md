### Anna Bot

**Used for supporting any patient interested to have a medical appointment or medical test** 

## Setup docker
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

## Instance connection
```
chmod 400 annabotmeta.pem
ssh -i "annabotmeta.pem" ubuntu@ec2-{{ip}}.compute-1.amazonaws.com
sudo apt update && sudo apt upgrade -y
sudo reboot now
```

## Docker EC2 Instance setup
```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo docker run hello-world
```

## Caprover Installation
```
sudo ufw allow 80,443,3000,996,7946,4789,2377/tcp
sudo ufw allow 7946,4789,2377/udp
sudo docker run -p 80:80 -p 443:443 -p 3000:3000 -e ACCEPTED_TERMS=true -v /var/run/docker.sock:/var/run/docker.sock -v /captain:/captain caprover/caprover

sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm install node

npm install -g caprover
caprover serversetup
```