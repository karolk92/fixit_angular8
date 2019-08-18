import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ContentComponent} from './content/content.component';
import {FooterComponent} from './footer/footer.component';
import {DevicesComponent} from './content/devices/devices.component';
import {DeviceDetailsComponent} from './content/device-details/device-details.component';
import {DevicesListComponent} from './content/devices/devices-list/devices-list.component';
import {AddNewDeviceComponent} from './content/devices/add-new-device/add-new-device.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatSelectModule, MatIconModule, MatInputModule } from '@angular/material';
import {RouterModule, Routes} from "@angular/router";
import { AdditionalOptionsComponent } from './content/additional-options/additional-options.component';
import { LoginPageComponent } from './content/login-page/login-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'devices', pathMatch: 'full' },
  {path: 'devices/:id', component: DeviceDetailsComponent},
  {path: 'devices', component: DevicesComponent},
  {path: 'options', component: AdditionalOptionsComponent},
  {path: 'content', component: ContentComponent},
  {path: 'login', component: LoginPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    DevicesComponent,
    DeviceDetailsComponent,
    DevicesListComponent,
    AddNewDeviceComponent,
    AdditionalOptionsComponent,
    LoginPageComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
