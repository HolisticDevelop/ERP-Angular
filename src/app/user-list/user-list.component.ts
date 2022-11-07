import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../entity/user";
import {UserService} from "../service/user.service";
import {MatTableDataSource} from "@angular/material/table";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ChartDataset, ChartOptions} from "chart.js";

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

  chartData: ChartDataset[] = [
    {
      label: '$ millones en ventas',
      data: [1500, 1600, 1800, 1900, 2200, 2600],
      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8, // grows the point when hovered
    },
    {
      label: '$ millones en compras',
      data: [800, 900, 1200, 1300, 1500, 1800],
      pointHitRadius: 15, // expands the hover 'detection' area
      pointHoverRadius: 8, // grows the point when hovered
    }
  ];
  chartLabels: string[] = [ '2016 Revenue', '2017 Revenue', '2018 Revenue', '2019 Revenue', '2020 Revenue', '2021 Revenue' ];

  chartOptions: ChartOptions = {};


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

  saveUser = (user: User) =>  this.userService.save(user).subscribe(result => console.log(result));

  deleteUser = () => console.log('deleting...');

}
