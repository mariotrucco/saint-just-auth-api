# Saint-Just Auth API
Auth API for the Saint-Just trolls persecutor project.
Development at early stage

## What is this?
A set of REST API in [node.js](https://nodejs.org) for users registration, authentication and management.

Version 1.0 will feature:

* Users registration & authentication with [JSON Web Token](https://tools.ietf.org/html/rfc7519)
  * by username and password
  * by a number of [OAuth 2](https://tools.ietf.org/html/rfc6749) providers
* Organization management: users can belong to organizations, with possibility to invite new or existing users to join an organization
* Roles management: define controls and roles, assign users their role
* Some stats

## Is this an OAuth 2 Server?
No, the [role](https://tools.ietf.org/html/rfc6749#section-1.1) of Saint-Just Auth API in [OAuth 2](https://tools.ietf.org/html/rfc6749) is **client**: it does not allow access to third party applications on its users' behalf, as Authorization/Resource Servers do. 

Instead, Saint-Just Auth API is the one that redirects a user to the provider's (e.g. Google's) Authorization Server to be granted permission to access their account, when they have decided to register through such provider rather than choosing a password

## What is the Saint-Just trolls persecutor thing?
This Auth API project stands on its own and will be general enough to be used for many projects. 

However, the author is building it for a project that will be called Saint-Just trolls persecutor, a tool for monitoring someone's social accounts or communities in order to get rid of abusive comments and unwanted accounts.

The idea for the name came from [Giap](http://www.wumingfoundation.com/giap/),  an Italian blog where an entity called like that already does the job. [Saint-Just](https://en.wikipedia.org/wiki/Louis_Antoine_de_Saint-Just "Louis Antoine de Saint-Just") has been persecuting trolls since 1792, the tool is named after him

## How do I get started?

Honestly, there is not much to do yet. But you can 

### Clone the repo
```bash
git clone https://github.com/mariotrucco/saint-just-auth-api.git
```

### Install node modules
```bash
npm install
```

### Open swagger description editor and view docs preview
```bash
swagger project edit
```

### Run tests
```bash
swagger project test
```

### Run Auth API server locally
```bash
swagger project start
```
or
```bash
node app.js
```

