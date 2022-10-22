import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../entity/user";
import {UserService} from "../service/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

const COLUMNS = [
  {
    key: "id",
    type: "bigint",
    label: "ID"
  },
  {
    key: "name",
    type: "text",
    label: "Name"
  },
  {
    key: "age",
    type: "number",
    label: "Edad"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
]

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users?: User[];
  columns = COLUMNS;

  displayedColumns: string[] = COLUMNS.map(col => col.key);
  dataSource = new MatTableDataSource(this.users);

  constructor(private userService: UserService, private _liveAnnouncer: LiveAnnouncer) {
  }



  @ViewChild(MatSort) sort: MatSort = new MatSort();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;




  ngOnInit(): void {
    this.userService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  addRow() {
    const newRow = {"id": "*", "name": "", "age": 0, isEdit: true}
    this.dataSource = new MatTableDataSource([newRow, ...this.dataSource.data]) ;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
