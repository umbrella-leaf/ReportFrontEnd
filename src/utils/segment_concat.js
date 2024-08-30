import {parse_emoji} from "./emoji_parse";

let image_url_reg = /http.*?image/g;
let video_url_reg = /http.*?video/g;
let reply_url_reg = /http.*?reply/g;


export function segment_concat(segments) {
    let message = "";
    for (let segment of segments) {
        if (image_url_reg.test(segment)) {
            message += `<img src="${segment}" style="width: 100%"/>`;
        } else if (video_url_reg.test(segment)) {
            message += `<video src="${segment}" style="width: 100%"/>`;
        } else if (reply_url_reg.test(segment)) {

        } else {
            message += parse_emoji(segment);
        }
    }
    return message;
}