import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/category";
import {Condition} from "../../../models/condition";
import {Device} from "../../../models/device";
import {HttpService} from "../../../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.css']
})
export class AddNewDeviceComponent implements OnInit{

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.device = {};

    this.getAllCategories();
  }

  device: any;
  deviceName: string = '';
  categories: Array<Category>;
  category: Category;
  condition: Condition;
  conditions = Condition;
  keys = Object.keys;

  getAllCategories() {
    this.httpService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  insertDevice() {
    let device: Device = {
      name: this.deviceName,
      condition: this.condition,
      category: this.category
    };

    this.httpService.insertDevice(device);
    this.reloadComponent();
  }

  reloadComponent() {
    this.router.navigateByUrl('/devices/1', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/devices']));
  }
}
