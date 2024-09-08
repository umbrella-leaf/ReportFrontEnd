import {parse_emoji} from "./emoji_parse";
import {segment_concat} from "./segment_concat";

const DocumentSuffices = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'txt'];
const AppendixType = {
    IMAGE: 'image',
    VIDEO: 'video',
    REPLY: 'reply',
    FORWARD: 'forward',
    DOCUMENT: 'document'
}

const AppendixTypeToButtonName = {
    [AppendixType.IMAGE]: '查看图片',
    [AppendixType.VIDEO]: '查看视频',
    [AppendixType.REPLY]: '查看回复',
    [AppendixType.FORWARD]: '查看转发消息',
    [AppendixType.DOCUMENT]: '查看文档'
}

function get_resource_suffix(url) {
    const parts = url.split(".");
    const suffix = parts[parts.length - 1];
    return DocumentSuffices.includes(suffix) ? AppendixType.DOCUMENT : suffix;
}

function get_button_name_from_appendix_type(url) {
    return AppendixTypeToButtonName[get_resource_suffix(url)];
}

function fetch_resources(url) {
    return fetch(url).then((response) => {
        return response.json()
    });
}

function get_document_show_url(doc_url) {
    if (doc_url.endsWith('.txt') || doc_url.endsWith('.pdf')) {
        return doc_url;
    }
    return `https://view.officeapps.live.com/op/embed.aspx/?src=${doc_url}`;
}


export {
    parse_emoji,
    segment_concat,
    AppendixType,
    get_button_name_from_appendix_type,
    get_resource_suffix,
    fetch_resources,
    get_document_show_url
};