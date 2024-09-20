import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import { map, take } from "rxjs";

type LoggedInUser = User | undefined;

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): MaybeAsync<GuardResult> {


        console.log('route', route);
        let routeRoles = route.data['roles'] ?? [];
        routeRoles = routeRoles.map((role: any) => role.toLowerCase());

        const allowedUser = (user: LoggedInUser) => {
            if (!user)
                return false;
            if (routeRoles.length === 0)
                return true;
            return user.roles.find(role => routeRoles.includes(role.toLowerCase())) !== undefined;
        }

        return this.userService
            .user
            .pipe(
                take(1),
                map(user => {
                    if (allowedUser(user))
                        return true;
                    else {
                        this.router.navigate(['/login'], {
                            queryParams: {
                                message: 'Please login to access theis resource',
                                returnPath: state.url,

                            }
                        });
                        return false;
                    }
                })
            );

    }
}