import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User }               from 'src/app/models/ui-models/user.model';
import { UserService }        from 'src/app/components/users/user.service';

@Component({
  selector: 'app-medicines',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit
{
  users: User[] = [];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'phone', 'dob', 'address', 'fund', 'type', 'status'];

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();

  //Kiru-Paginator
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;

  //Kiru-Sorting
  @ViewChild(MatSort) matSort!: MatSort;

  filterString ='';
  User: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void
  {
    //Fetch Users
    this.userService.getAllUser().subscribe
    ({
        next:(successResponse) =>
        {
          this.users = successResponse;
          this.dataSource = new MatTableDataSource<User>(this.users);

          //Kiru-Paginator
          if(this.matPaginator)
          {
            this.dataSource.paginator = this.matPaginator;
          }

          //Kiru-Sorting
          if(this.matSort)
          {
            this.dataSource.sort = this.matSort;
          }

        },
        error: (errorResponse) =>
        {
          console.log(errorResponse);
        }
    });
  }

  filterUsers(){
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
}
