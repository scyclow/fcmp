# Set up:
- have node 6, running instance of mongo
- `npm install`
- acquire `fastcashmoneyplus.pem`

npm run dummyData -- populate dummy data in database.

npm start -- starts app on port 8421



# Heroku
- App hosted at https://fastcashmoneyplus.herokuapp.com/
- `heroku config` lists `MONGODB_URI` and `SECRET` environment variables

# Mongo
Mongo URI: `mongodb://<username>:<password>@<address>`
`mongo <address> -u <username> -p <password>`


# TODO
Don't use babel-register in production
