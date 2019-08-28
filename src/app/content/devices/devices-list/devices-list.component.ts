import {Component, OnInit} from '@angular/core';
import {Device} from "../../../models/device";
import {HttpService} from "../../../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) { }

  devices: Array<Device>;
  device: Device;

  ngOnInit() {
    this.getAllDevices();
  }

  getAllDevices() {
    this.httpService.getAllDevices().subscribe(devices => {
      this.devices = devices;
    });
  }

  deleteDevice(id: number) {
    this.httpService.deleteDevice(id).subscribe();
    this.reloadComponent();
  }

  reloadComponent() {
    this.router.navigateByUrl('/content', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/devices']));
  }
}
