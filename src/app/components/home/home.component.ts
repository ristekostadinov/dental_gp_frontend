import { Component, ChangeDetectionStrategy } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './home.component.css'
})
export class HomeComponent {

}
