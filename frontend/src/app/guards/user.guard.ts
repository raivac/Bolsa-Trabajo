import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { EmpleoService } from '../services/empleo.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private empleoService: EmpleoService,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {

    const idOferta = next.params['id'];
    const idUsuario = await this.tokenService.getId();
    const idEmpresa: number | undefined = (await this.empleoService.detail(idOferta).toPromise())?.idEmpresa;

    if (idEmpresa !== undefined && idUsuario !== idEmpresa) {
      return this.router.createUrlTree(['/error']);
    }

    return true;
  }

}
