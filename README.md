# Conduit(Backend)

## Idea

This project is an attempt to get myself started with writing backends for big projects in proper industry style.Reffered to backend writing tutorial by Arnav Gupta to get myself started,here is the part 1 of it https://www.youtube.com/watch?v=Wos3T6TuOKw. Have tried to adhere to api specifications provided at https://realworld-docs.netlify.app/docs/specs/backend-specs/endpoints.

## Progress

### users
- [X] POST /api/users/login
- [X] POST /api/users

### user
- [X] GET /api/user
- [X] PATCH /api/user

### profiles
- [X] GET /api/profiles/:username
- [X] POST /api/profiles/:username/follow


### articles
- [ ]  GET /api/articles
- [ ]  GET /api/articles/feed
- [X] GET /api/articles/:slug
- [X] POST /api/articles
- [X] PATCH /api/articles/:slug
- [X] DELETE /api/articles/:slug
- [X] POST /api/articles/:slug/comments
- [ ]  GET /api/articles/:slug/comments
- [ ]  DELETE /api/articles/:slug/comments/:id
- [X] POST /api/articles/:slug/favorite

### tags
- [ ] GET /api/tags


- [ ] Proper HTTP codes 
- [ ] Proper error messages