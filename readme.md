## This contain the backend programmes for a simple blogging website  
## Written in Nodejs
### It was initially developed to learn mongoose populate method

## Routes and methods

## Users

- Get all users route: GET:  [http://localhost:3030/users/](http://localhost:3030/users/)

- Get some users with the provided value for the limit users route: GET:  [http://localhost:3030/users/?limit=limit](http://localhost:3030/users/?limit=limit)

- Get a user by id : GET : [http://localhost:3030/users/:user_id](http://localhost:3030/users/:user_id)

- Search for a user with email: GET: [http://localhost:3030/users/?email=user@example.com]( http://localhost:3030/users/?email=user@example.com) 

- Search for a user with name : GET: [http://localhost:3030/users/?username=@userusername]( http://localhost:3030/users/?name=user@example.com)

<br> <h4> Note that name or email must be provided for the above get requests

- create a new user : POST : [http://localhost:3030/users/](http://localhost:3030/users/)

- update user information : PUT : [http://localhost:3030/users/:user_id](http://localhost:3030/users/:user_id)

- delete a user account : DELETE : [http://localhost:3030/users/:user_id](http://localhost:3030/users/:user_id)

