export class Items {
    id: number;
    value: string = '';
    completed: boolean = false;
    details: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}
