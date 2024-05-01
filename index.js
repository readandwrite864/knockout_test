import { data } from "./data.js";

function Category({ name, docs }) {
  const self = this;
  self.name = name;
  self.docs = ko.observableArray(docs.map((doc) => new Doc(doc)));

  self.opened = ko.observable(false);
  self.toggle = function () {
    self.opened(!self.opened());
  };

  self.openThreshold = 250;
  self.openTimeout = -1;
  self.onMouseOver = function (draggingDoc) {
    if (!draggingDoc) return;
    clearTimeout(self.openTimeout);
    self.openTimeout = setTimeout(() => self.opened(true), self.openThreshold);
  };

  self.onMouseOut = function () {
    clearTimeout(self.openTimeout);
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

  self.draggingDoc = false;

  const sortableOptions = {
    animation: 150,
    forceFallback: true,
    handle: ".drag-handle",

    onStart(e) {
      if (e.from.className === "categories") {
        const persistentClone = e.from.insertBefore(
          e.item.cloneNode(true),
          e.from.children[e.oldIndex]
        );
        persistentClone.classList.add("sortable-clone");
        persistentClone.classList.remove("sortable-chosen", "sortable-ghost");
      } else {
        self.draggingDoc = true;
      }
    },

    onChange(e) {
      e.to.style.maxHeight = e.to.scrollHeight + "px";
    },

    onEnd(e) {
      self.draggingDoc = false;
      e.from
        .querySelectorAll(".sortable-clone")
        .forEach((child) => child.remove());
      e.to.style.maxHeight = e.to.scrollHeight + "px";
    },
  };

  self.sortableCategoriesOptions = Object.assign({}, sortableOptions, {
    group: { name: "categories", put: ["categories"], pull: true },
    sort: true,
  });

  self.sortableDocsOptions = Object.assign({}, sortableOptions, {
    group: { name: "docs", put: ["docs"], pull: true },
    sort: true,
  });
}

ko.bindingHandlers.opened = {
  update: function (element, valueAccessor) {
    const opened = valueAccessor();
    element.style.maxHeight = opened ? element.scrollHeight + "px" : 0;
  },
};

ko.applyBindings(new AppViewModel());
