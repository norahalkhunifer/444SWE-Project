import { Component } from '@angular/core';
import {  App,ActionSheetController,NavController,ToastController,AlertController } from 'ionic-angular';
import{AngularFireAuth}from 'angularfire2/auth';
import{AngularFireObject,AngularFireDatabase,AngularFireList} from'angularfire2/database';
import {FirebaseListObservable } from "angularfire2/database-deprecated";
import { WelcomeSlideoPage } from '../welcome-slideo/welcome-slideo';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user={} as User;
  tips: Observable<any[]>;
  usersdata :AngularFireObject<User>;

  constructor(public app: App,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private toast:ToastController,
    private authr:AngularFireAuth,
    private db:AngularFireDatabase,
    public navCtrl: NavController) {
      const unsubscribe = this.authr.authState.subscribe(logedin => {
        if(!logedin){
          this.user.name = "no user ";
          return;
          //return signout
        }
        else if (logedin.isAnonymous) {
          this.user.name= "anonymes";
        } else {

          this.user.id = logedin.uid;
          this.user.email= logedin.email;
          //from database
          this.user.name = logedin.displayName;
          //gitall info method !
          this.user.bio ="get from database";
          this.gitalltips( logedin.uid);

        }
      });
    }
     //  get (): FirebaseListObservable<any[]>{
  //  return this.db.list('/tips');
//}
  sittings(){
    this.navCtrl.push('SettingsPage');
  }
  add(){
//  this.navCtrl.push('SettingsPage');
  }
delete(tip){

}
gotoDishpage(id){
 // this.navCtrl.push('SettingsPage');+pass id with it
}
  gitalltips(uid){
    /*   firebase
    .database()
    .ref('/userProfile')
    .child(newUser.uid)
    .set({ email: email });
  });*/
     //this.tips = db.list('/tips').valueChanges();//change to user tipsth
    //this.tips= this.db.list('/tips/');//.only from regester user
  }
  showOptions(key,title){
//pop up window to delete or cancele
let deletetip = this.alertCtrl.create({
  title: 'do you want to delete this tip?$title',
  buttons: [
    {
      text: 'delete', role: 'destructive',
      handler: data => {
this.db.list('/tips/').remove(key);//.then()
    }
    },
    {
      text: 'cancle',
       role: 'cancel',
      handler: () => {
        console.log('cancel clicked');
      }
    }
  ]
});
deletetip.present();
}
ionViewWillLoad(){
  // this.authr.auth.currentUser?this.auther.auth.currentUser.email:null;

  this.authr.authState.subscribe(data=>{
    if(data&&data.email&&data.uid){

       this.usersdata=this.db.object(`users/${data.uid}`);
       this.toast.create({
        message: `welcome to pic a dish app ${this.user.name}`,
        duration:3000
      }).present();
      }else{
        this.toast.create({
          message: `register to enjoy our app`,
          duration:3000
        }).present();
      }
      }
  );
}
/*get currentUserAnonymous(): boolean {
  return this.authr ? this.authr.authState.anonymous : false
}*/
logout(){
  this.authr.auth.signOut();
  this.navCtrl.setRoot('WelcomeSlideoPage');
 // const root= this.app.getRootNavs();
//root.popToRoot();
//this.navCtrl.push('WelcomeSlideoPage');//error
}
}
