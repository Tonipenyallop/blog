# Welcome to Taesu's Blog

## How to run application in VM?

### Frontend side

- 1. create a build and secure copy builded file to VM

  ```
  bash build.bash
  ```

- 2. run front end
  ```
  npm run prod-front
  ```

### Backend side

- 1. Run command for enable backend server

  ```
  npm run prod-back
  ```

- Apparently latest version of type script doesn't work well. Better downgrade it

  ```
  npm install typescript@4.9.5
  ```

### Install Mocha

- https://gist.github.com/avermeulen/72598daf29171088689793fc145b999c

* 1. install mocha

```
  npm install ts-mocha

```

- 2. Update script

```
  "scripts": {
    "test": "ts-mocha test/*.ts"
  }
```

### Install type orm

- https://typeorm.io/

## Tech stack

- **Webauth** for
  - secure the login using **biometrics**
  - being able to remember username and password by **website** so that the user does not need to remember those
- **JWT** for
  - make sure the user is authorized
