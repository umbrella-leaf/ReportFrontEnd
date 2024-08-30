import {parse_emoji} from "./emoji_parse";
import {segment_concat} from "./segment_concat";

const AppendixType = {
    IMAGE: 'image',
    VIDEO: 'video',
    REPLY: 'reply'
}

const AppendixTypeToButtonName = {
    [AppendixType.IMAGE]: '查看图片',
    [AppendixType.VIDEO]: '查看视频',
    [AppendixType.REPLY]: '查看回复'
}

function get_resource_suffix(url) {
    const parts = url.split(".");
    console
    return parts[parts.length - 1];
}

function get_button_name_from_appendix_type(url) {
    return AppendixTypeToButtonName[get_resource_suffix(url)];
}


export {parse_emoji, segment_concat, AppendixType, get_button_name_from_appendix_type, get_resource_suffix};