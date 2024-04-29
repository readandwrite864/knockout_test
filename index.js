import { data } from "./data.js";

function Category({ name, docs }) {
  const self = this;
  self.name = name;
  self.docs = ko.observableArray(docs.map((doc) => new Doc(doc)));

  self.opened = ko.observable(false);
  self.toggle = function () {
    self.opened(!self.opened());
  };
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

ko.bindingHandlers.opened = {
  update: function (element, valueAccessor) {
    const opened = valueAccessor();
    element.style.maxHeight = opened ? element.scrollHeight + "px" : null;
  },
};

ko.applyBindings(new AppViewModel());
