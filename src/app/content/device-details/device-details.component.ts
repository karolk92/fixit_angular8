import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Device} from "../../models/device";
import {Parameter} from "../../models/parameter";
import {ParameterName} from "../../models/parameter-name";
import {Comment} from "../../models/comment";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../models/category";
import {Condition} from "../../models/condition";

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getDeviceById(this.id);
      this.getCommentsByDeviceId(this.id);
      this.getParametersByDeviceId(this.id);
      this.getParameterNames();
      this.getAllCategories();
    });
  }

  editMode: boolean = false;
  condition: Condition;
  conditions = Condition;
  keys = Object.keys;
  id: number;
  private sub: any;
  device: Device;
  category: Category;
  categories: Array<Category> = [];
  comments: Array<Comment> = [];
  parameters: Array<Parameter> = [];
  parameterName: ParameterName;
  parameterNames: Array<ParameterName> = [];
  commentTitle: string;
  commentContent: string;
  parameterValue: string;

  getAllCategories() {
    this.httpService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  getDeviceById(id: number) {
    this.httpService.getDeviceById(id).subscribe(device => {
      this.device = device;
      this.condition = device.condition;
      this.category = device.category;
    });
  }

  deleteDevice(id: number) {
    this.httpService.deleteDevice(id).subscribe();
    this.backToDevicesPage();
  }

  getCommentsByDeviceId(id: number) {
    this.httpService.getCommentsByDeviceId(id).subscribe(comments => {
      this.comments = comments;
    });
  }

  getParametersByDeviceId(id: number) {
    this.httpService.getParametersByDeviceId(id).subscribe(parameters => {
      this.parameters = parameters;
    });
  }

  deleteCommentById(id: number) {
    this.httpService.deleteCommentById(id).subscribe();
    this.reloadComponent();
  }

  deleteParameterById(id: number) {
    this.httpService.deleteParameterById(id).subscribe();
    this.reloadComponent();
  }

  getParameterNames() {
    this.httpService.getAllParameterNames().subscribe(names => {
      this.parameterNames = names;
    });
  }

  addComment() {
    let comment: Comment = {
      title: this.commentTitle,
      content: this.commentContent
    };

    this.httpService.addComment(this.device.id, comment).subscribe();
    this.reloadComponent();
  }

  addParameter() {
    let parameter: Parameter = {
      name: this.parameterName,
      value: this.parameterValue
    };

    this.httpService.addParameter(this.device.id, parameter).subscribe();
    this.reloadComponent();
  }

  switchOnEditMode() {
    this.editMode = true;
  }

  saveChanges() {
    this.setCategoryId();

    let device: Device =  {
      category: this.category,
      condition: this.condition,
      id: this.device.id,
      name: this.device.name
    };
    this.httpService.updateDevice(device);
    this.editMode = false;
    this.reloadComponent();
  }

  reloadComponent() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/devices/:id', {id: this.id}]));
  }

  backToDevicesPage() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(['/devices']));
  }

   setCategoryId(){
    let cat: Array<Category> = this.categories.filter(x => x.name === this.category.name);
    console.log(cat[0].id);
    this.category.id = cat[0].id;
  }
}
