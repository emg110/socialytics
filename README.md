# houman-project
@UAlg.pt

Houman Hadian's doctoral project code base


This application is intended to provide batch and realtime (LAMBDA) ETL functionality on Instagram service APIs (private web API)
in order to analyse brand engagement on Instagram via analytical models presented on 
[Houman Hadian's doctoral project research papers](https://houmanhadian.github.io/). 

**`Notice:` Work in progress!**

The front end application is primitive HTML just for sake of testing and 
needs to be completed. For now just links to API endpoints are available,
and you have to change the parameters directly inside URI. The login process is still shakey and PM2 integration is being completed.

**`TODO:`**

1- adding Instagram login form as start page for frontend and store the session-id and csrf_token on server side (with security in mind!)

2- adding react components for parameters

3- Implement database loading (Mongo, Postgress, ElasticSearch and Redis)

4- Adding progress , start and stop for every ETL operation.

5- Adding export to CSV/JSON option to every ETL process.

6- Adding Analytics Dashboards and components

7- Adding Analytical models and algorithms


//---------------------------------------------------


**`Quick start:`** 

1- Clone this project

2- Run _npm install -g pm2_

3- Config your session_id & csrf_token from your browser on Instagram website (these are Instagram website cookies).

4- In CMD go to project root folder

5- Run: _pm2 start backend_ , then run _pm2 start frontend_

6- Go to localhost:8080 and start surfing Instagram!


**`Contributors:`**
 
 M.Ghiasi (emg110@gmail.com), H.Hadian (a58976@ualg.pt)

Special thanks to these great open source projects which paved the client's starting point:

[yatsenkolesh/instagram-nodejs](https://www.github.com/yatsenkolesh/instagram-nodejs)


[dilame/instagram-private-api](https://www.github.com/dilame/instagram-private-api)


