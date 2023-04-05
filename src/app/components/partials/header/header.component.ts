import { Component } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';
import { user } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  cartQuantity = 0
  user!: user

  constructor (
    private userService: UserService,
    cartSerive: CartService
  ) {
    cartSerive.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount
    })

    userService.userObservable.subscribe((newUser) => {
      this.user = newUser
    })
  }

  logout(){
    this.userService.logout()
  }

  get isAuth(){
    return this.user.token
  }
}
