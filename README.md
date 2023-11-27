# Welcome to Taesu's Blog

## How to run application in VM?

### Frontend side

- 1. create a build

  ```
  npm run build
  ```

- 2. run built file
  ```
  serve -s build
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
