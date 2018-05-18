import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { AccountService } from '../account/account.service';

@Injectable()
export class FileService {
  
  public files: [{name: String, content: any, encryptedContent: any}]

  constructor(
    private electron: ElectronService,
    private api: ApiService,
    private account: AccountService,
  ) { }

  read(name, type = 'utf-8', cb = undefined) {
    let fs = window.require('fs');
    return new Promise((resolve, reject) =>
      fs.readFile(name, type, (err, content) => {
        if (err) {
          console.log('Error: ', err)
        } else {
          console.log('Attempting to add: ', name, 'Content: ', content)
          this.addFile({ name, content })
          if(cb) cb();
        }
      })
    )
  }

  write (name, content, type = 'utf-8') {
    let fs = window.require('fs');
    try {
      fs.writeFileSync(name, content, type)
    } catch(e) {
      console.log('Failed to save the file !', e)
    }
  }

  getContents(name) {
    let file
    this.files.map((f) => {
      if(f.name === name) {
        file = f;
      }
    })
    return file
  }

  showFiles() {
    console.log(this.files)
  }

  private addFile(file) {
    if(!this.files) {
      this.files = [file]
    } else {
      this.files.push(file)
    }
  }

  upload(fileData: {fileName: String, fileContent: any}) {

    function responseValue(res) {
      console.log('Upload Response: ', res)
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
      })
    }
    fileData['owner_id'] = this.account.information.id
    this.api.post('file', fileData, responseValue, httpOptions)
  }

  returnFiles () {
    return this.files
  }

  returnServerFiles () {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.api.getToken('auth_token'),
        'RequestedBy': this.account.information.username
       })
     }
     console.log(this.account.information.id, this.api.getToken('auth_token'))
    this.api.get(`user/files/${this.account.information.username}`, ()=>{}, httpOptions)
  }
}