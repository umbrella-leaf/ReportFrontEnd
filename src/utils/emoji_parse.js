export function parse_emoji(message) {
  let regExp = /\[CQ:face,id=(\d+).*?]/g;
  return message.replace(regExp, '<img src="/images/s$1.image" style="width: 24px;"/>');
}
