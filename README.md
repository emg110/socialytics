![houmanhadian.github.io](./public/img/hhadianproject.png?raw=true "Houman Hadian's Doctoral Project")
# houman-project:
Houman Hadian's doctoral project code base
@UAlg.pt

This application is intended to provide batch and realtime (LAMBDA) ETL functionality on Instagram service APIs (private web API)
in order to analyse brand engagement on Instagram via analytical models presented on 
[Houman Hadian's doctoral project research papers](https://houmanhadian.github.io/). 

**`Notice:` Work in progress!**

The front end application is primitive HTML just for sake of testing and 
needs to be completed. For now just links to API endpoints are available,
and you have to change the parameters directly inside URI. The login process is still shakey and PM2 integration is being completed.

**`TODO:`**

1- ~~Add Instagram login form as start page for frontend and store the session-id and csrf_token on server side (with security in mind!)~~

2- Add UI components for parameters

3- ~~Implement database loading (NeDB for time being with support for MongoDB, Postgress, ElasticSearch and Redis).~~

4- Add progress , start and stop for every ETL operation.

5- Add export to CSV/JSON option to every ETL process.

6- Add Analytics dashboards and components.

7- Add analytical models and algorithms.


//---------------------------------------------------


**`Quick start:`** 

1- Clone this project

2- Optionally-- Run: _npm install -g pm2_

3- Config your session_id  from your browser on Instagram website (within Instagram cookies!).

4- In CMD go to project root folder

5- Run: _npm install_ then Run: _pm2 start src/_ OR Run:_npm start_

6- Go to localhost:8080 and start analysing Instagram!


**`Contributors:`**
 
 M.Ghiasi (emg110@gmail.com), H.Hadian (a58976@ualg.pt)

Special thanks to these great open source projects which paved the client's starting point:

[yatsenkolesh/instagram-nodejs](https://www.github.com/yatsenkolesh/instagram-nodejs)


[dilame/instagram-private-api](https://www.github.com/dilame/instagram-private-api)




