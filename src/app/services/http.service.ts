import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from '../models/device';
import {Category} from '../models/category';
import {Parameter} from '../models/parameter';
import {ParameterName} from '../models/parameter-name';
import {Comment} from '../models/comment';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {  }

  baseURL: string = 'http://localhost:8080';
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  getAllDevices(): Observable<Array<Device>> {
    return this.http.get<Array<Device>>(this.baseURL + '/devices');
  }

  getDeviceById(id: number): Observable<Device> {
    return this.http.get<Device>(this.baseURL + '/devices/' + id);
  }

  insertDevice(device: Device) {
    return this.http.post(this.baseURL + '/devices', JSON.stringify(device), {headers: this.headers})
      .subscribe();
  }

  updateDevice(device: Device) {

    console.log(JSON.stringify(device));
    console.log('cat_id: ' + device.category.id);
    return this.http.put(this.baseURL + '/devices' , JSON.stringify(device), {headers: this.headers}).subscribe();
  }

  deleteDevice(id: number) {
    return this.http.delete(this.baseURL + '/devices/' + id);
  }

  getCommentsByDeviceId(id: number): Observable<Array<Comment>> {
    return this.http.get<Array<Comment>>(this.baseURL + '/devices/' + id + '/comments');
  }

  getParametersByDeviceId(id: number): Observable<Array<Parameter>> {
    return this.http.get<Array<Parameter>>(this.baseURL + '/devices/' + id + '/parameters');
  }

  addParameter(id: number, parameter: Parameter) {
    return this.http.post(this.baseURL + '/devices/' + id + '/parameters', parameter);
  }

  addComment(id: number, comment: Comment) {
    return this.http.post(this.baseURL + '/devices/' + id + '/comments', comment);
  }

  reportMalfunction(id: number) {
    return this.http.head(this.baseURL + '/devices/' + id + '/report-malfunction');
  }

  reportMalfunctionRemoval(id: number) {
    return this.http.head(this.baseURL + '/devices/' + id + '/report-malfunction-removal');
  }

  getAllCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.baseURL + '/categories');
  }

  insertCategory(category: Category) {
    return this.http.post(this.baseURL + '/categories', JSON.stringify(category), {headers: this.headers})
      .subscribe();
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseURL + '/categories/' + id);
  }

  deleteCommentById(id: number) {
    return this.http.delete(this.baseURL + '/comments/' + id);
  }

  deleteParameterById(id: number) {
    return this.http.delete(this.baseURL + '/parameters/' + id);
  }

  getAllParameterNames(): Observable<Array<ParameterName>> {
    return this.http.get<Array<ParameterName>>(this.baseURL + '/parameters/names');
  }

  insertParameterName(parameterName: ParameterName) {
    return this.http.post(this.baseURL + '/parameters/names', JSON.stringify(parameterName), {headers: this.headers})
      .subscribe();
  }

  deleteParameterNameById(id: number) {
    return this.http.delete(this.baseURL + '/parameters/names/' + id);
  }
}
