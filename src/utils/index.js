import {parse_emoji} from "./emoji_parse";
import {segment_concat} from "./segment_concat";

const AppendixType = {
    IMAGE: 'image',
    VIDEO: 'video',
    REPLY: 'reply',
    FORWARD: 'forward'
}

const AppendixTypeToButtonName = {
    [AppendixType.IMAGE]: '查看图片',
    [AppendixType.VIDEO]: '查看视频',
    [AppendixType.REPLY]: '查看回复',
    [AppendixType.FORWARD]: '查看转发消息'
}

function get_resource_suffix(url) {
    const parts = url.split(".");
    return parts[parts.length - 1];
}

function get_button_name_from_appendix_type(url) {
    return AppendixTypeToButtonName[get_resource_suffix(url)];
}

function fetch_resources(url) {
    return fetch(url).then((response) => {
        return response.json()
    });
}


export {
    parse_emoji,
    segment_concat,
    AppendixType,
    get_button_name_from_appendix_type,
    get_resource_suffix,
    fetch_resources
};