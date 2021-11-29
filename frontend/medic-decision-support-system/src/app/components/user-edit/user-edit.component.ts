import { User } from './../../interfaces/User';
import { TokenStorageService } from './../../services/security/token-storage.service';
import { UserService } from './../../services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  userEditForm: FormGroup;
  users$;
  users;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.userEditForm = this.formBuilder.group({
      username: '',
    });

    console.log('lol')
    console.log(this.tokenStorageService.getToken());

    this.users$ = this.userService.getUsers().pipe(
      map(
        res => res.map(
          re => ({
            id: re.id,
            firstName: re.firstName,
            lastName: re.lastName,
            userName: re.userName,
            role: re.role
          })
        )
      )
    )
  }

  number(str: string): number{
    return Number(str);
  }

  onClick(userName: string, role: number, firstName: string, lastName: string, id: string){
    let updatedUser: User = {
      userName: userName,
      role: role,
      firstName: firstName,
      lastName: lastName
    }
    console.log(updatedUser);

    this.userService.updateUser(updatedUser, id).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )


  }

}
