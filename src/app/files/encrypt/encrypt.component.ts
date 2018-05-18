import { Component, OnInit } from '@angular/core';
import { AesService } from '../../services/aes.service';
import { NotificationService } from '../../services/notification.service';
import { ApiService } from '../../services/api.service';
import { ElectronService } from 'ngx-electron';
import { FileService } from '../../services/file.service';
//import { Router } from '@angular/router';


@Component({
  selector: 'app-encrypt',
  templateUrl: './encrypt.component.html',
  styleUrls: ['./encrypt.component.scss']
})
export class EncryptComponent implements OnInit {

  constructor(
    private aes: AesService,
    private api: ApiService,
    public notification: NotificationService,
    private electron: ElectronService,
    public _fileService: FileService,
  ) { }

  public files: String[]
  public keySet: Boolean = this.aes.key_set

  getFiles() {
    if (this.files && this.files.length > 0) this.files = []
    let dialog = this.electron.remote.dialog
    this.files = dialog.showOpenDialog({properties: ['openFile', 'multiSelections']})
    console.log(this.files);
    this.files.map(file => {
      this._fileService.read(file, 'utf8')
    })
  }

  fetchFile(f) {
    console.log('Will attempt to fetch: ', f.value)
    let file = this._fileService.getContents(f.value)
    console.log("Should be fetched: ", file)

    let aesValue = this.aes.encrypt(file.content, 'secret password')
    console.log('AES: ', aesValue)
  }

  encrypt(f) {
    let file = this._fileService.getContents(f)
    console.log("Should be fetched: ", f)
    let cipherText = this.aes.encrypt(file.content, this.aes.getKey())
    console.log('AES: ', cipherText)
    file.encryptedContent = cipherText;
    console.log(this._fileService.files);
  }

  updateKey (key) {
    this.aes.setKey(key.target.value)
    this.keySet = this.aes.key_set
  }

  setKey (key) {
    this.aes.setKey(key.value)
    this.keySet = this.aes.key_set
  }

  ngOnInit() {
  }

}
