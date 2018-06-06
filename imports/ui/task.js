import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
 
import { Tasks } from '../api/tasks.js';
 
import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

 
Template.task.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete'() {
  	Meteor.call('tasks.remove', this._id);
  },
   'click .toggle-private'() {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
   'click .change-due-date'() {

   	toggleHide('.change-due-date');
   	toggleHide('.update-date');
  },
   'click .save-btn'(event) {

   	toggleHide('.change-due-date');
   	toggleHide('.update-date');

   	let newDueDate = document.getElementById("newDatepicker").value;
   	Meteor.call('tasks.update-due-date', this._id, newDueDate);
  },
   
});

function toggleHide(elem) { 
   $( elem ).toggleClass( "hide" );
}



