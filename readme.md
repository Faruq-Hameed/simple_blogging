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

- Get signUp form : GET : [http://localhost:3030/users/signup](http://localhost:3030/users/signup)
- create a new user : POST : [http://localhost:3030/users/](http://localhost:3030/users/)

- update user information : PUT : [http://localhost:3030/users/:user_id](http://localhost:3030/users/:user_id)

- delete a user account : DELETE : [http://localhost:3030/users/:user_id](http://localhost:3030/users/:user_id)

#### Note the delete request will also delete all comments and blog posts made by the user


## Blogs

- Get all blogs route: GET:  [http://localhost:3030/blogs/](http://localhost:3030/blogs/)

- Get some blogs with the provided value for the limit blogs route: GET:  [http://localhost:3030/blogs/?limit=limit](http://localhost:3030/blogs/?limit=limit)

- Get a blog by id : GET : [http://localhost:3030/blogs/:blog_id](http://localhost:3030/blogs/:blog_id)

- create a new blog : POST : [http://localhost:3030/blogs/](http://localhost:3030/blogs/)

- update blog information : PUT : [http://localhost:3030/blogs/:blog_id](http://localhost:3030/blogs/:blog_id)

- delete a blog account : DELETE : [http://localhost:3030/blogs/:blog_id](http://localhost:3030/blogs/:blog_id)

#### Note the delete request will also delete all comments made to the blog


## Comments

- Get a comment by id : GET : [http://localhost:3030/comments/:comment_id](http://localhost:3030/comments/:comment_id)

- create a new comment on a post: POST : [http://localhost:3030/comments/](http://localhost:3030/comments/)

- update comment (edit user comment) : PUT : [http://localhost:3030/comments/:comment_id](http://localhost:3030/comments/:comment_id)

- delete a comment  : DELETE : [http://localhost:3030/comments/:comment_id](http://localhost:3030/comments/:comment_id)

