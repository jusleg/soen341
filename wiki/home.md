* [Meeting Notes](https://github.com/jusleg/soen341/wiki/Meeting-Notes)
* [Scrum Meetings](https://github.com/jusleg/soen341/wiki/Scrum-meetings)



## Setup

* [How to install dependencies](https://github.com/jusleg/soen341/wiki/#how-to-install-dependencies)
  * [Locally](https://github.com/jusleg/soen341/wiki/#locally)
  * [Remote Server](https://github.com/jusleg/soen341/wiki/#remote-server)
* [How to run the application on a server](https://github.com/jusleg/soen341/wiki/#how-to-run-the-application-on-a-server)
  * [Start Application](https://github.com/jusleg/soen341/wiki/#start-application)
  * [Redeploy master branch](https://github.com/jusleg/soen341/wiki/#redeploy-master-branch)


## How to install dependencies

### Locally
This project has numerous dependencies that must be installed in order for it run.

First, install [Node](https://nodejs.org/en/) and make sure it is properly installed by doing 
```
node -v && npm -v
```

Once node is installed, make sure to get bower by running the command 
```
npm install -g bower
```

Download the required dependencies by running 
```
bower install && npm install
```

Next, we need to install sass. First, verify that ruby is installed by doing
`ruby -v`

Install sass by typing the following command in your terminal
`gem install sass`

### Remote Server

First, install [Node](https://nodejs.org/en/) and make sure it is properly installed by doing 
```
node -v && npm -v
```

Once node is installed, make sure to get bower by running the command 
```
sudo npm install -g bower
```

Download the required dependencies by running 
```
sudo bower install --allow-root && sudo npm install
```

Next, we need to install sass. First, verify that ruby is installed by doing
`ruby -v`

Install sass by typing the following command in your terminal
`gem install sass`

## How to run the application on a server

### Start Application

Generate css files by running
`sass --sourcemap=none --watch public/scss:public/css`

Start the [database](https://github.com/jusleg/soen341/wiki/Database-Documentation) first, then start the node application. Forever will make the app run indefinitely.

`mongod --fork --logpath /var/log/mongod.log && forever run index.js`

### Redeploy master branch

A [python script](https://gist.github.com/jusleg/7a53d9839855b6688cb5fd34463c6e85) was made to stop the application, pull the latest version of master branch and restart the application. The script is located in `/var/www/` To run, simply do:

`python3 redeploy.py`
