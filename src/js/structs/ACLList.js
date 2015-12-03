import List from "./List";
import Item from "./Item";

export default class ACLList extends List {
  constructor() {
    super(...arguments);

    // Replace list items instances of Item.
    this.list = this.list.map(function (item) {
      if (item instanceof Item) {
        return item;
      } else {
        return new Item(item);
      }
    });
  }
}
