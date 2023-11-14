import { formatDistance, format } from "date-fns";
import { ja } from "date-fns/locale";

export function timee(date: string) {
  let time = formatDistance(new Date(), Date.parse(date), {
    locale: ja,
  });
  if (time.indexOf("未満") !== -1) {
    time = "たった今";
  } else if (time.indexOf("か月") !== -1 || time.indexOf("年") !== -1) {
    time = format(Date.parse(date), "yyyy年M月d日", {
      locale: ja,
    });
  } else {
    time = time + "前";
  }
  return time
}

export function makeTags(data: string) {
  let result
  result = data.replace("{", "")
  result = result.replace("}", "")
  return result.split(',')
}
