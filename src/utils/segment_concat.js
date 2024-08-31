import {parse_emoji} from "./emoji_parse";
import {h} from "vue";
import {Image} from 'ant-design-vue'
import ForwardShow from "@/components/AppendixShow/Forward/ForwardShow.vue";
import {AppendixType, fetch_resources} from "@/utils/index";


export async function segment_concat(segments) {
    let components = [];
    for (let segment of segments) {
        if (segment.startsWith("http")) {
            if (segment.endsWith(AppendixType.IMAGE)) {
                components.push(h(Image, {src: segment, style: "width: 100%"}));
            } else if (segment.endsWith(AppendixType.VIDEO)) {
                components.push(h("video", {src: segment, controls: true, style: "width: 100%"}));
            } else if (segment.endsWith(AppendixType.REPLY)) {

            } else if (segment.endsWith(AppendixType.FORWARD)) {
                components.push(h(ForwardShow, {forwardMessages: await fetch_resources(segment)}));
            }
        } else {
            components.push(parse_emoji(segment));
        }
    }
    return components;
}