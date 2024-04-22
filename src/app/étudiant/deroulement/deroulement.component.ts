import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import frlocale from '@fullcalendar/core/locales/fr';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/* interface EventItem {
  Title: String;
  Color: String;
} */

@Component({
  selector: 'app-deroulement',
  standalone: true,
  imports: [FullCalendarModule, CommonModule, ReactiveFormsModule],
  templateUrl: './deroulement.component.html',
  styleUrl: './deroulement.component.css'
})
export class DeroulementComponent {

  ListColor: String[] = ["primary", "secondary", "success", "danger", "warning", "info"];
  colorAdd: String = "primary";
  eventTitle = new FormControl();
  ListTitle: EventInput[] = [];


  ngAfterViewInit() {
    const containerEl = document.getElementById('external-events');

    if (containerEl) {
      new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          return {
            title: eventEl.innerText
          };
        }
      });


    }
  }
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    locale: frlocale,
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
      bootstrap5Plugin
    ],
    themeSystem: 'bootstrap5',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    events: INITIAL_EVENTS,
    weekends: true,
    editable: true,
    selectable: true,
    droppable: true,
    drop: this.handleDrop.bind(this),
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleDrop(info: any) {

    const checkbox = document.getElementById('drop-remove') as HTMLInputElement;
    if (checkbox && checkbox!.checked) {
      info.draggedEl.parentNode?.removeChild(info.draggedEl);
    } 
    // Get the dragged event object
    const draggedEvent = info.draggedEl.innerText;

    // Find the event in ListTitle by its title
    const event = this.ListTitle.find(event => event.title === draggedEvent);
    if (event) {
      const newEvent = {
        title: event.title,
        start: info.date,
        backgroundColor: event.color as string // Set the background color of the event
      };
  
      /// Update the events array
    const updatedEvents = [...(this.calendarOptions.arguments || []), newEvent];

    // Update the calendarOptions with the updated events array
    this.calendarOptions.update((options: CalendarOptions) => ({
      ...options,
      events: updatedEvents
    }));
      info.draggedEl.style.backgroundColor = event.color as string;
    }
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Veuillez saisir un nouveau titre pour votre événement');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'événement '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  changeColorAdd(Color: String): void {
    console.log(Color);
    this.colorAdd = Color;
    console.log(this.colorAdd);
  }

  addevent(color: String): void {
    const title = this.eventTitle.value;
    if (title) {
      switch (color) {
        case "primary":
          color = "#007bff";
          break;
        case "secondary":
          color = "#6c757d";
          break;
        case "success":
          color = "#28a745";
          break;
        case "danger":
          color = "#dc3545";
          break;
        case "warning":
          color = "#ffc107";
          break;
        case "info":
          color = "#17a2b8";
          break;
        default:
          console.log("oops error !");
      }
      this.ListTitle.push({ title: title, color: <string>color });
      this.eventTitle.setValue('');
      console.log(this.ListTitle);
    }
  }
}

