## __KEEPIN__
###### keep your accounts safe with us
---

### Client
__Screens__
* Authentication pages
  - [x] Signin
  - [x] Signup
  - [x] ForgotPassword
  - [x] ResetPassword
* Application pages
  * Common components
    - [x] SearchBar
    - [x] Sidebar
  * Basic Components
    - [x] Dashboard
    - [] Profile
    - [x] Modal
    - [x] DataListing
      - [x] DataCard
    - [x] AddNew
    - [x] Details
    - [x] Edit

### Server
__APIs__
* Authentication
  * [x] `POST`: `/auth/signin` signin 
  * [x] `POST`: `/auth/signup` signup
  * [x] `GET`: `/auth/user-profile` user profile
  * [x] `POST`: `/auth/forgot-password`forgot password
  * [x] `PUT`: `/auth/reset-password/:resetToken` reset password
* Password CRUD
  * [x] `POST`: `/passwords/create` Create
  * [x] `GET`: `/passwords/read` Read
  * [x] `GET`: `/passwords/read?q=` Search with `{params: {q: 'value'}}`
  * [x] `GET`: `/passwords/details/:id` Read
  * [x] `PUT`: `/passwords/edit/:id` Update
  * [x] `POST`: `/passwords/delete` Delete
* Helpers
  * [x] Encrypting password 
  * [x] `GET`: `/auth/decrypt` Decrypting encrypted password

### How to start?

- Install dependencies/node_modules
  - `npm install` or `yarn`
- To start server 
  - `npm server` or `yarn server`
- To start reactjs 
  - `npm start` or `yarn start`