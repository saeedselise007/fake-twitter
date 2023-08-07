import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {debounceTime, tap} from 'rxjs/operators'
@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  public form: FormGroup;
  public allUserList;
  public isLoading: boolean;
  constructor(public service: HomeService,    private _router: Router,
              private _snackBar: MatSnackBar,
              private _fb: FormBuilder,
              public authService: AuthService) {
  }

  ngOnInit(): void {

    this.form = this._fb.group({search: ['']})
    this.getAllUserList();
    this.getSearchData();
  }

  getSearchData(): void {
    this.form.get('search').valueChanges.pipe(
      tap(() => (this.isLoading = true)),
      debounceTime(1000)
    ).subscribe(res => {
      if(res){
        this.searchingUserDetails(res);
      }
        this.isLoading = false;
      },
      err => {
        console.error(err.error);
      });
  }

  getAllUserList(): void {
    this.isLoading = true;
    this.service.getAllUserList().subscribe((res) => {
      this.allUserList = res.users.filter((obj) => obj.id !== this.authService.authInfo.id);
      this.isLoading = false;
    })
  }

  onClick(id) {
    this._router.navigateByUrl(`/home/user/${id}`).then(r => r);
  }

  follow(id) {
    this.isLoading = true;
    this.service.requestFollow({"user_id":id}).subscribe((res) => {
      this.openSnackBar(res.resp)
      this.isLoading = false;
    })
  }

  openSnackBar(message): void {
    this._snackBar.open(message, 'X', {
      duration: 3000,
    });
  }

  Unfollow(id) {
    this.isLoading = true;
    this.service.requestUnFollow({"user_id":id}).subscribe((res) => {
      this.openSnackBar(res.resp)
      this.isLoading = false;
    })
  }
  searchingUserDetails(data) {
    this.isLoading = true;
    this.service.requestSearch({"token": data}).subscribe((res) => {
      if(res){
        this.allUserList = res.search_results;
      }
      this.isLoading = false;
    })
  }
}
