import { Component, OnInit } from '@angular/core';
import { UsersService, User } from '../shared/users.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  users: User[] = []

  public loading: boolean = true
  // public users = [
  //   {id: 1, name: 'Pavel'},
  //   {id: 2, name: 'Test'},
  //   {id: 3, name: 'George'},
  // ]
  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.fetchUsers()
    .pipe(delay(10))
    .subscribe(() => {
      this.loading = false
    })
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }

  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++
  }

  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--
  }

}
