import {ViewChild , Component , OnInit, HostBinding } from '@angular/core';
import {Slides , AlertController,LoadingController,IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import{AngularFireAuth}from 'angularfire2/auth';
import { ProfilePage } from '../profile/profile';
import { TabsPage } from '../tabs/tabs';
import { EmailValidator } from '../../validators/email';
import{RegisterPage} from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user={} as User;
loading: any;
@ViewChild('slider') slider: Slides;
slideIndex = 0;
slides = [1,2,3];
//public backgroundImage = 'assets/img/background/background-6.jpg';
  constructor(    public loadingCtrl: LoadingController,
     public alertCtrl: AlertController,
    private authr:AngularFireAuth,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
     public navParams: NavParams) {
  }
async login(user:User){
  try{
const r=this.authr.auth.signInWithEmailAndPassword(user.email,user.password);
if(r){
  this.navCtrl.setRoot(TabsPage);//ProfilePage);// +to profile tab
}else{
  this.Loading('user name or passord incorrict');
}}catch(e){
  this.Loading(e);
}
}
register(){this.navCtrl.push('RegisterPage')}

ionViewWillLoad(){
 /*this.OfAuth.outhState.subscribe(data=>{
    if(data.email &&data.uid){
      this.toast.create({
        message:'wecome',${data,email},duration:3000
      }).present();
    }else{

    }
  })*/
    }
    async onSlideChanged() {
      this.slideIndex = this.slider.getActiveIndex();
      console.log('Slide changed! Current index is', this.slideIndex);
    }

    skip() {
      //anonmis login
       this.authr.auth.signInAnonymously().catch(function(error) {
      this.Loading (error.message);
      });
       this.navCtrl.setRoot(TabsPage);
    }
    //tested sucsess :)
    Loading(message) {
       const loading = this.loadingCtrl.create({
         duration: 500
       });
       loading.onDidDismiss(() => {
         const alert = this.alertCtrl.create({
           subTitle: message,
           buttons: ['Dismiss']
         });
         alert.present();
       });

       loading.present();
     }

   //tested success :)
     resetPassword() {
             let alert = this.alertCtrl.create({
               title:'enter your email',
                 inputs:[
                   {
                     name:'recoverEmail',
                     placeholder:'email'
                   },
                 ],
                 buttons: [
                     {
                         text: "send",
                         handler: data=> {
                  this.authr.auth.sendPasswordResetEmail(data.recoverEmail)
                           .then(()=>{
                                     this.navCtrl.popToRoot();
                             this.Loading('email sended check your email ');})
                           .catch((err)=>{
                             this.navCtrl.popToRoot();
                             this.Loading(err.message);
                           });
                     }
                     },
                     {
                       text: "cancel",
                       role: 'Dismiss'

                   }
                 ]
             });
             alert.present();

     }

}
