import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-page-not-found',
  imports: [MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
})
export class PageNotFound {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly invalidPath =
    '/' + this.route.snapshot.url.map((segment) => segment.path).join('/');

  protected navigateToHome(): void {
    this.router.navigate(['/home']).then();
  }
}
