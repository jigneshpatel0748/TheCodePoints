import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptionServiceService } from './encryption-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  encryptpassword: string | any;
  decryptpassword: string | any;
  encryptForm = new FormGroup({
    encryptStr: new FormControl(),
    decryptStr: new FormControl()
  });

  decryptForm = new FormGroup({
    decryptStr: new FormControl()
  });

  constructor(private encrypt: EncryptionServiceService) { }

  ngOnInit() {
  }

  encryptData() {
    this.encryptpassword = this.encrypt.encryptionAES(this.encryptForm.value.encryptStr);
  }
  decryptData() {
    this.decryptpassword = this.encrypt.decryptionAES(this.encryptpassword);
  }
}
