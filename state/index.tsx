import { atom } from "recoil";

const translationEditionState = atom({
    key: 'translationEditionState',
    default: 'en.asad',
    })

export {translationEditionState}