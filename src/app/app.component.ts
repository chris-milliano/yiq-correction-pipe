import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    // TODO: Allow user some way to view and set colorOptions
    // Hold color variables
    innerColor: string = '#ff0000';
    backgroundColor: string = '#0000ff';
    colorOptions: string[] = [
        '#ff0000',
        '#ff7f00',
        '#ffff00',
        '#00ff00',
        '#0000ff',
        '#8b00ff'
    ];
}
