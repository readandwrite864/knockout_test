function AppViewModel() {
  this.message = ko.observable("Hello World!");
}

ko.applyBindings(new AppViewModel());
