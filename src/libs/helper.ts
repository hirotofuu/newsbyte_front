import { formatDistance, format } from "date-fns";
import { ja } from "date-fns/locale";
import { useRouter } from "next/router";

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

export function deleteSpaceStr(data: string){
  let result = data
  result = result.replace(/\s+/, '')

  return result
}


export const textToLink = (text: string) => {
  const regexp_url = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;
  let linkedText = text.replace(regexp_url, '<a href="$1" target="_blank" class="text-blue-500 hover:underline">$1</a>');

  return linkedText;
};

export const textToUser = (text: string) => {
  const regexp_url = /@+([\w/:%#\$&\?\(\)~\.=\+\-]+)/g;
  let linkedText = text.replace(regexp_url, '<a href="/user/$1" class="text-blue-500 hover:underline">@$1</a>');

  return linkedText;
};

