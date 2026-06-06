import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    standalone: false
})
export class Header {
    @Output() selectedFeatureEvent = new EventEmitter<string>();

    onSelected(selectedEvent: string) {
        this.selectedFeatureEvent.emit(selectedEvent);
    }
}