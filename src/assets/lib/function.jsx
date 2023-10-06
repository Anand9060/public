import Message from "../data/message.json";
import label from "../data/label.json";

export function validateEmail(email_str) {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email_str);
}
export function validatePhone(str) {
  const regexp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
  return regexp.test(str);
}

export function createMessage(message_id, param_1, param_2, param_3) {
  var str = Message[message_id].message_text;

  str = str.replace("{param_1}", param_1);
  str = str.replace("{param_2}", param_2);

  return str;
}
export function labelMessage(message_id, param_1, param_2) {
  // var str = label[message_id].name;

  str = str.replace("{param_1}", param_1);
  str = str.replace("{param_2}", param_2);

  return str;
}

export function truncate(str, len) {
  return str == ""
    ? ""
    : str.length > len
    ? str.substring(0, len) + "..."
    : str;
}

export function formatDate(input) {
  var datePart = input.match(/\d+/g);
  var year = datePart[0];
  var month = datePart[1];
  var day = datePart[2];

  return day + "/" + month + "/" + year;
}

export function validateURL(url_str) {
  const regexp = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return regexp.test(url_str);
}

export function isEmpty(val) {
  return val === undefined || val == null || val.length <= 0 ? true : false;
}

export function nl2br(str, replaceMode, isXhtml) {
  var breakTag = isXhtml ? "<br />" : "<br>";
  var replaceStr = replaceMode ? "$1" + breakTag : "$1" + breakTag + "$2";
  return (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}

export function br2nl(str, replaceMode) {
  var replaceStr = replaceMode ? "\n" : "";
  // Includes <br>, <BR>, <br />, </br>
  return str.replace(/<\s*\/?br\s*[\/]?>/gi, replaceStr);
}
