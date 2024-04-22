import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { jqxKanbanComponent, jqxKanbanModule } from 'jqwidgets-ng/jqxkanban'
@Component({
  selector: 'app-kanban-bord',
  standalone: true,
  imports: [CommonModule, jqxKanbanModule
  ],
  templateUrl: './kanban-bord.component.html',
  styleUrls: ['./kanban-bord.component.css','../../../../node_modules/jqwidgets-ng/jqwidgets/styles/jqx.material.css']
})
export class KanbanBordComponent {

  @ViewChild('kanbanReference') mykanban!: jqxKanbanComponent;

  public columns: any[] = [
    { text: 'Backlog', dataField: 'backlog', maxItems: 5 },
    { text: 'In Progress', dataField: 'inProgress', maxItems: 5 },
    { text: 'Completed', dataField: 'completed', maxItems: 5 }
  ];

  public data: any[] = [
    { id: 1, status: 'backlog', text: 'Task 1', tags: 'bug,ui,', color: '#5dc3f0', resourceId: 1, startDate: new Date(), dueDate: new Date(), priority: 'High' },
    { id: 2, status: 'inProgress', text: 'Task 2', tags: 'bug,', color: '#6bbd49', resourceId: 2, startDate: new Date(), dueDate: new Date(), priority: 'Low' },
    { id: 3, status: 'completed', text: 'Task 3', tags: 'bug,', color: '#5dc3f0', resourceId: 3, startDate: new Date(), dueDate: new Date(), priority: 'Medium' }
  ];

  source = {
    localdata: this.data,
    datafields: [
      { name: 'status', type: 'string' },
      { name: 'text', type: 'string' },
      { name: 'tags', type: 'string' },
      { name: 'color', type: 'string' },
      { name: 'resourceId', type: 'number' },
      { name: 'startDate', type: 'date' },
      { name: 'dueDate', type: 'date' },
      { name: 'priority', type: 'string' }
    ],
    datatype: 'array'
  }

  dataAdapter = new jqx.dataAdapter(this.source);

  resourcesAdapterFunc: any = (): any => {
    let resourcesSource =
    {
      localData:
        [
          { id: 0, name: "No name", common: true },
          { id: 1, name: "Andrew Fuller",  },
          { id: 2, name: "Janet Leverling",  },
          { id: 3, name: "Steven Buchanan",  },
          { id: 4, name: "Nancy Davolio",  },
          { id: 5, name: "Michael Buchanan",  },
          { id: 6, name: "Margaret Buchanan",  },
          { id: 7, name: "Robert Buchanan",  },
          { id: 8, name: "Laura Buchanan",  },
          { id: 9, name: "Laura Buchanan",  }
        ],
      dataType: "array",
      dataFields:
        [
          { name: "id", type: "number" },
          { name: "name", type: "string" },
          { name: "common", type: "boolean" }
        ]
    };
    let resourcesDataAdapter = new jqx.dataAdapter(resourcesSource);
    return resourcesDataAdapter;
  }

  KanbanSettings =
  {
    width: '100%',
    height: '100%',
    columns:
      [
        {
          text: "Backlog", dataField: "new", maxItems: 5
        },
        {
          text: "In Progress", dataField: "work", maxItems: 5
        },
        {
          text: "Done", dataField: "done", maxItems: 5
        }
      ],
    resources: this.resourcesAdapterFunc(),
    source: this.dataAdapter,
    columnRenderer: (element: any, collapsedElement: any, column: any): void => {
      let columnItems = this.mykanban.getColumnItems(column.dataField).length;
      let headerStatus = element[0].getElementsByClassName("jqx-kanban-column-header-status")[0];
      headerStatus.innerHTML = " (" + columnItems + "/" + column.maxItems + ")";
      let collapsedHeaderStatus = collapsedElement[0].getElementsByClassName("jqx-kanban-column-header-status")[0];
      collapsedHeaderStatus.innerHTML = " (" + columnItems + "/" + column.maxItems + ")";
    }
  };

  ngAfterViewInit(): void {
    this.mykanban.createComponent(this.KanbanSettings);
  }

  public allowDragAndDrop: Boolean = true;
}
