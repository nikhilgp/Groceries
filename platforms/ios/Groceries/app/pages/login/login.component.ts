import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

/**
 * Define UI and styles of this app.
 */
@Component({
  selector: "login",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
/**
 * Define logic for login page.
 */
export class LoginComponent implements OnInit {
  // Local variables.
  user: User;
  isLoggingIn = true;
  @ViewChild("container") container: ElementRef;

  /**
   * Define a user for this page.
   */
  constructor(private router: Router, private userService: UserService, private page: Page) {
    this.user = new User();
    this.user.email = "test@nikhil.com";
    this.user.password = "password";
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = "res://bg_login";
  }

  /**
   * On sign in we need to output and appropriate message.
   */
  submit() {
    if (this.isLoggingIn) {
      this.login();
    }
    else {
      this.signUp();
    }
    // alert(`fuck you @ ${new Date()} with email ${this.user.email}`);
  }

  /**
   * Get a session token or cookie to access sensative pii
   */
  login() {
    this.userService.login(this.user)
    .subscribe(
      () => {
        this.router.navigate(["list"]);
      },
      (error) => alert("Telrik doesn't own your information yet.")
    );
  }

  signUp() {
    this.userService.register(this.user)
    .subscribe(
      () => {
        this.toggleDisplay();
        alert("You were able to sign up doofus, now telrik has your email!");
      },
      () => {
        alert("Your info was garbage or Telril hates you!");
      }
    );
  }

  /**
   * Toggle the button options.
   */
  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }
}