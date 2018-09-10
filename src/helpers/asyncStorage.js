import React from "react";
import { AsyncStorage } from "react-native";

export class Storage {
  constructor() {
    this.storage = AsyncStorage;
  }

  getItem(item) {
    return this.storage.getItem(item).then((data) => {
      return JSON.parse(data);
    }).catch((err) => {
      return JSON.parse(err);
    });
  }

  setItem(item, value) {
    const valueToPush = JSON.stringify(value);
    return this.storage.setItem(item, valueToPush).then((data) => {
      return JSON.parse(data);
    }).catch((err) => {
      return JSON.parse(err);
    });
  }
}

export default new Storage();
