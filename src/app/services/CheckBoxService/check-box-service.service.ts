import { Injectable } from '@angular/core';

@Injectable()
export class CheckBoxService {

  public selected = {};
  public selectedArray = [];
  obj: any;
  constructor() { }
  setCheckBoxData(data) {
    this.selected = data;
    if (this.selectedArray.length === 0) {
      this.selectedArray.push(data);
      this.getCheckBoxData();
    } else {
      for (this.obj in this.selectedArray) {
        if (this.selectedArray[this.obj].program_ref_no === data.program_ref_no) {
          this.selectedArray.splice(this.obj, 1);
          this.getCheckBoxData();
          return;
        }
      }

      this.selectedArray.push(data);
      this.getCheckBoxData();
    }
  }
  getCheckBoxData() {
    return this.selectedArray;
  }

  removeCheckBoxData(data) {
    for (this.obj in this.selectedArray) {
      if (this.selectedArray[this.obj].program_name === data) {
        this.selectedArray.splice(this.obj, 1);
        this.getCheckBoxData();
      }
    }
  }

  removeCompleteData() {
    for (this.obj in this.selectedArray) {
      if (this.selectedArray[this.obj].selected) {
        this.selectedArray[this.obj].selected = false;
      }
    }
    this.selectedArray = [];
  }
}
