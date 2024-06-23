import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currentUser = authService.getCurrentUser();

  if (currentUser && currentUser.Role === 'Admin') {
    return true;
  } else {
    router.navigate(['/']); // Navigate to home or login page
    return false;
  }
};
