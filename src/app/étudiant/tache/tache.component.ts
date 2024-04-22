
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TacheDialogComponent } from '../tache-dialog/tache-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { Task, yourDataArray } from './task.model';
import { CommonModule, DatePipe } from '@angular/common';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tache',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatSortModule],
  providers:[DatePipe],
  templateUrl: './tache.component.html',
  styleUrl: './tache.component.css'
})

export class TacheComponent implements OnInit {
  
  dataSource = new MatTableDataSource<Task>(yourDataArray);
  displayedColumns: String[] = ['id', 'subject', 'priority', 'startDate', 'dueDate', 'status'];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(public dialog: MatDialog,private router: Router) {
    // Initialize dataSource with your task data
    this.dataSource = new MatTableDataSource<Task>(yourDataArray);
  }

  ngOnInit(): void {
    // Set up sorting
    this.dataSource.sort = this.sort;
  }

  goToKanbanBoard(){
    this.router.navigate(['/kanban-bord']);
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TacheDialogComponent, {
      width: '500px',
      // You can pass data to the dialog if needed
      // data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      // You can handle the result from the dialog here
      if (result) {
        // Add the new task to your data source
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription(); // Update table data
      }
    });
  }

  // Function to get priority color
  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
        return 'green';
      default:
        return '';
    }
  }

  // Function to get status color
  getStatusColor(status: string): string {
    switch (status) {
      case 'To do':
        return 'blue';
      case 'In Progress':
        return 'orange';
      case 'Completed':
        return 'green';
      default:
        return '';
    }
  }
}
