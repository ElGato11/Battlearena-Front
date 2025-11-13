import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router} from "@angular/router";
import { UserService } from "./service/user.service";

export const Adminguard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  if(userService.isAdmin()){
    return true;
  }

  return router.createUrlTree(['/login']);
};
