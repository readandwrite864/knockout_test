import { data } from "./data.js";

function Category({ name, docs }) {
  const self = this;
  self.name = name;
  self.docs = ko.observableArray(docs.map((doc) => new Doc(doc)));
}

function Doc({ name }) {
  const self = this;
  self.name = name;
}

function AppViewModel() {
  const self = this;
  self.categories = ko.observableArray(
    data.map((category) => new Category(category))
  );
}

ko.applyBindings(new AppViewModel());
