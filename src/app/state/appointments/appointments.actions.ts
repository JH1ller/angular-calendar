export class FetchData {
  static readonly type = '[Appointments] Fetch data';
  constructor() {}
}

export class SetCurrentDate {
  static readonly type = '[Appointments] Set current date';
  constructor(public date: Date) {}
}

export class SetDatePrevMonth {
  static readonly type = '[Appointments] Set date to previous month';
  constructor() {}
}

export class SetDateNextMonth {
  static readonly type = '[Appointments] Set date to next month';
  constructor() {}
}

export class SetDatePrevWeek {
  static readonly type = '[Appointments] Set date to previous week';
  constructor() {}
}

export class SetDateNextWeek {
  static readonly type = '[Appointments] Set date to next week';
  constructor() {}
}

export class SetDatePrevAppointment {
  static readonly type = '[Appointments] Set date to previous appointment';
  constructor() {}
}

export class SetDateNextAppointment {
  static readonly type = '[Appointments] Set date to next appointment';
  constructor() {}
}
