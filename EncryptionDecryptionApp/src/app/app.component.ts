import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EncryptionServiceService } from './encryption-service.service';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


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

  constructor(private encrypt: EncryptionServiceService,
    private _httpClient: HttpClient) { }

  ngOnInit() {
    let _obj = {
      "RegNo": 2700003,
      "Pwd": "abc"
    };

    let string = "test data"

    let json_data = 'Hiii'

    // this._httpClient.get('https://localhost:44327/api/Values').subscribe(res => {
    //   alert('get')
    // });

    let headerDict = {
      "AccessToken": 'TOKNAUT82022254696'
    }

    // let requestOptions:any = {                                                                                                                                                                                 
    //   headers: new Headers(headerDict), 
    // };

    // this._httpClient.get('https://localhost:44327/api/Values').subscribe(res => {
    //   alert('get')
    // });

    // this._httpClient.post('https://localhost:44327/api/Values/1',null).subscribe(res => {
    //   alert('post')
    // });

    let req = {
      "RegNo": 2700003,
      "Pwd": "abc"
    };

    this._httpClient.post('https://docsol.welcomecure.com/api/User/Login', req).subscribe((res: any) => {
      console.log(res.Data.AccessToken)
      let headerDict: any = {
        "AccessToken": res.Data.AccessToken
      }

      const headers = new HttpHeaders()
        .set('AccessToken', res.Data.AccessToken);

      let requestOptions: any = {
        headers: new Headers(headerDict),
      };
      this._httpClient.post('https://docsol.welcomecure.com/api/User/Login', req, { 'headers': headers }).subscribe(res => {
        console.log(res)
      });
    });

    // this._httpClient.post('http://localhost:51923/api/User/GetCall', JSON.stringify(_obj)).subscribe(res => {
    //   alert('post')
    // });

    // let requestOptions:any = {
    //   method: 'POST',
    //   redirect: 'follow'
    // };

    // fetch("https://localhost:44327/api/Values", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
  }

  encryptData() {
    this.encryptpassword = this.encrypt.encryptionAES(this.encryptForm.value.encryptStr);
  }
  decryptData() {
    this.decryptpassword = this.encrypt.decryptionAES(this.encryptpassword);
  }
}
