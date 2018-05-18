import { Component, OnInit } from '@angular/core';
import { AesService } from '../../services/aes.service';
import { NotificationService } from '../../services/notification.service';
import { ApiService } from '../../services/api.service';
import { ElectronService } from 'ngx-electron';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.scss']
})
export class DecryptComponent implements OnInit {

  constructor(
    private aes: AesService,
    private api: ApiService,
    public notification: NotificationService,
    private electron: ElectronService,
    public _fileService: FileService
  ) { }

   private file_names: String[]
   public keySet: Boolean = this.aes.key_set

  getFiles() {
    let dialog = this.electron.remote.dialog
    this.file_names = dialog.showOpenDialog({properties: ['openFile', 'multiSelections']})
    console.log(this.file_names);
    this.file_names.map(file => {
      this._fileService.read(file, 'utf8')
    })
  }

  decrypt(f) {
    console.log('Will attempt to fetch: ', f)
    let file = this._fileService.getContents(f)
    console.log("Should be fetched: ", f, file)

    // let cipherText = this.aes.encrypt(file.content, password.value)
    // console.log('Cipher Text: ', cipherText)

    let plainText = this.aes.decrypt(file.encryptedContent, this.aes.getKey())
    console.log('Plain Text: ', plainText)
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
