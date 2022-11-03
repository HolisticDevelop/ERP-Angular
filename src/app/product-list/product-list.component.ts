import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../entity/product";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ActivatedRoute, Router} from "@angular/router";

const COLUMNS = [
  {
    key: "id",
    type: "bigint",
    label: "ID"
  },
  {
    key: "name",
    type: "text",
    label: "Nombre"
  },
  {
    key: "brand",
    type: "text",
    label: "Marca"
  },
  {
    key: "code",
    type: "text",
    label: "Código"
  },
  {
    key: "quantity",
    type: "number",
    label: "Cantidad"
  },
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  }
]

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products?: Product[];
  columns = COLUMNS;

  displayedColumns: string[] = COLUMNS.map(col => col.key);
  dataSource = new MatTableDataSource(this.products);

  constructor(
    private productService: ProductService,
    private _liveAnnouncer: LiveAnnouncer,
    private route: ActivatedRoute,
    private router: Router) { }

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.productService.findAll().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  addRow() {
    const newRow = {"id": "", "name": "", "brand": "", code: "", isEdit: true}
    this.dataSource = new MatTableDataSource([newRow, ...this.dataSource.data]) ;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  saveProduct = (product: Product) => {
    this.productService.save(product).subscribe(result=> this.getData());

  }


  deleteUser = (product: Product) => this.productService.delete(product).subscribe(result => {
    console.log(result);
    this.getData();
  });

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

}
