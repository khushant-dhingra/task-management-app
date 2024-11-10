import { format, parseISO } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

const formatDateToLocal = (
  dateString?: string,
  formatString: string = "dd MMM yyyy HH:mm:ss"
) => {
  if (!dateString) {
    return "";
  }

  return format(
    toZonedTime(
      parseISO(dateString),
      Intl.DateTimeFormat().resolvedOptions().timeZone
    ),
    formatString
  );
};

export const formatDateToUTC = (
  dateString?: string,
  formatString: string = "yyyy-MM-dd'T'HH:mm:ssxxx"
) => {
  if (!dateString) {
    return "";
  }

  return format(
    fromZonedTime(
      parseISO(dateString),
      Intl.DateTimeFormat().resolvedOptions().timeZone
    ),
    formatString
  );
};

export default formatDateToLocal;
