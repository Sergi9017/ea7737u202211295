import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { SportsCenterSummary as SportsCenterSummaryModel } from '../../../domain/model/sports-center-summary';

@Component({
  selector: 'app-sports-center-summary',
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './sports-center-summary.html',
  styleUrl: './sports-center-summary.css',
})
export class SportsCenterSummary {
  readonly summary = input.required<SportsCenterSummaryModel>();
}
