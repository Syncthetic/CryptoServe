# CryptoServe

### CryptoServe is built with Angular 5 on top of Electron.
### This project in part, is designed to establish a secure file sharing and or storage service. This project is in early stages, lots of work still needs to be done.

# How it works
- ### Encryption:
  - CryptoServe currently uses AES-256 CRT (`symmetric key encryption`) with random initialization vectors. This means that the same data, once encrypted will poses varied results. In the future, CryptoServ will update to `GCM`.

  - Encryption always happens offline, and keys are never shared with the server. This ensures that a web admin can not decrypt your sensitive files from stored keys.

- ### API
  - #### Rgistration:
    If you wish to store files on the server, you'll need to register an account. By default, after an account is registered, an event is fired to log you in with the registered account information.

   - #### Login:
     When you log in, the server will respond with an `auth_token`. For future requests which require authentication, this token must be set as the value for an `Authorization` header. In addition, for other server-side related things, set a `RequestedBy` header, with your authenticated `username`. If these two headers are not set, and do not match, the request will fail.

     Here is a snippet of code from within the app, which does just that.

         // SomeComponent.ts

         fetchInformation (user) {
           const httpOptions = {
             headers: new HttpHeaders({
               'Content-Type': 'application/json',
               'Authorization': this.api.getToken('auth_token'),
               'RequestedBy': user
              })
            }
         this.api.get(`user/${user}`, this.setInformation.bind(this), httpOptions);
         }
    - #### Requests
      When sending requests requiring authentication, ensure the `auth_token` and `RequestedBy` headers are being sent correctly.
      
      All requests made from the API Service can take an optional callback function as a parameter, as shown above.

      By default, the API Service will store the last result, in a `public` variable called `lastResponse`.

# Todo
- Update to `GCM`
- Multiple symmetric keys
  - Dropdown list of profile keys when encrypting/decrypting data
  - Store symmetric keys in a database locally, or a `conf` file *Most likely these keys will be encrypted with a master key*
- Update UI/UX to be more friendly
- File Sharing
  - Allow clients to set files on the server to `share mode`, this will generate a `share key`, which can be distributed to others, allowing them to download your file.
  - Create a method to only share with a specified `user`, as  well as a method to generate a new `share key`