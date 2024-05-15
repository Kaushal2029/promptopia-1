import { atom } from "recoil";

const topics = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Web Designing' },
    { id: 3, name: 'SEO' },
    { id: 4, name: 'Graphic Designing' },
  ];

export const error_message = atom({
    key: "error_message",
    default: "",
});

export const success_message = atom({
    key: "success_message",
    default: "",
});

export const search_ = atom({
    key: "search_",
    default: "",
});

export const selectedTopic_ = atom({
    key: "selectedTopic_",
    default: topics[0],
})

export const prompts_ = atom({
    key: "prompts_",
    default: [],
});
