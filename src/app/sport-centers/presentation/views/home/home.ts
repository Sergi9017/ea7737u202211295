import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslatePipe } from '@ngx-translate/core';
import { SportsCentersStore } from '../../../application/sports-centers.store';
import { SportsCenterSummary } from '../../components/sports-center-summary/sports-center-summary';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule, TranslatePipe, SportsCenterSummary],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly store = inject(SportsCentersStore);
}
