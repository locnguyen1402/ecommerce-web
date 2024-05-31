import { PlainMessage } from '@bufbuild/protobuf';
import { DateOnly } from './../generated/vklink/libs/protobuf/date_only_pb';

declare module '../generated/vklink/libs/protobuf/date_only_pb' {
  namespace DateOnly {
    export function fromDate(value: Date | string): DateOnly;
    export function toDate(value: DateOnly | PlainMessage<DateOnly>): Date;
  }
}

DateOnly.fromDate = (dateValue: Date | string) => {
  const date = new Date(dateValue);

  return new DateOnly({
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  });
};

DateOnly.toDate = (value: DateOnly | PlainMessage<DateOnly>) => {
  return new Date(value.year, value.month - 1, value.day);
};
