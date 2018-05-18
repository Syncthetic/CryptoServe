import { Injectable } from '@angular/core';

@Injectable()
export class AesService {

  public key_set: Boolean

  // instantiate an aes object from npm package aes256
  private aes = window.require('aes256')

  /*
    Shared key from symmetric encryption (share the key with trusted sources only)
    key may be set with the setKey() method
  */
  private key: String // You may wish to have the key automatically set from envrionment variables (process.env)

  constructor() { }

  public setKey (key) {
    this.key = key
    this.key_set = true
  }

  public encrypt (data, key: String = undefined) {
    if(key) this.setKey(key)
    if(this.keyExists) return this.aes.encrypt(this.key, data)
    return 'No key set'
  }

  public decrypt (data, key: String = undefined) {
    if(key) this.setKey(key)
    if(this.keyExists) return this.aes.decrypt(this.key, data)
    return 'No key set'
  }

  private keyExists () {
    if(!this.key) return false;
    return true;
  }

  public getKey () { return this.key }
}