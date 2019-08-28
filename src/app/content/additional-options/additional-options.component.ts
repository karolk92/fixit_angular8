import { Component, OnInit } from '@angular/core';
import {ParameterName} from "../../models/parameter-name";
import {Category} from "../../models/category";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-additional-options',
  templateUrl: './additional-options.component.html',
  styleUrls: ['./additional-options.component.css']
})
export class AdditionalOptionsComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit() {
    this.getAllCategories();
    this.getParameterNames()
  }

  categoryName: string;
  categories: Array<Category> = [];
  parameterName: string;
  parameterNames: Array<ParameterName> = [];

  saveParameterType() {
    this.addParameterType();
    this.reloadComponent();
  }

  saveCategory() {
    this.addCategory();
    this.reloadComponent();
  }

  addParameterType() {
    let parameterType: ParameterName = {
      value: this.parameterName.toUpperCase()
    };

    this.httpService.insertParameterName(parameterType);
  }

  addCategory() {
    let category: Category = {
      name: this.categoryName.toUpperCase()
    };

    this.httpService.insertCategory(category);
  }

  deleteParameterName(id: number) {
    this.httpService.deleteParameterNameById(id).subscribe();
    this.reloadComponent();
  }

  deleteCategory(id: number) {
    this.httpService.deleteCategory(id).subscribe();
    this.reloadComponent();
  }

  getAllCategories() {
    this.httpService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getParameterNames() {
    this.httpService.getAllParameterNames().subscribe(parameterNames => {
      this.parameterNames = parameterNames;
    });
  }

  reloadComponent() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['options']));
  }
}
