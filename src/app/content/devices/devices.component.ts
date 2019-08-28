import {Component, OnInit} from '@angular/core';
import {Device} from "../../models/device";
import {Category} from "../../models/category";
import {Condition} from "../../models/condition";
import {Comment} from "../../models/comment";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  constructor() {
  }

  devices: Array<Device> = [];
  categories: Array<Category> = [];
  comments: Array<Comment>;
  condition: Condition;

  ngOnInit() {
  }

}
