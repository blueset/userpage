import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';


// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translations: {
            "goToTop": "Go to top",
            "pageTitle": "User:<1><0></0></1>Eana Hufwe",
            "barTitle": "User:Eana Hufwe",
            "pageDesc": "Eana’s user page. A simple and rough about-me page heavily inspired by <2>Wikipedia Userboxes</2>.",
            "langSwitcher": "Switch language",
            "entry_icon_alt": "{{ side }} icon of {{ name }}.",
            "left": "Left",
            "right": "Right",
            "footer": "User page made by <1>Eana Hufwe</1>. View source on <3>GitHub</3>.",
            "hidden": {
                "line2": {
                    "unauth": "Log in to see if you have access to more boxes.",
                    "authed": "Unfortunately, it seems that Eana has not met you in person before. Ping me up if you think that’s a mistake."
                },
                "line1": "There is {{count}} entry not shown here.",
                "line1_plural": "There are {{count}} entries not shown here."
            },
        }
    },
    ja: {
        translations: {
            "goToTop": "トップへ",
            "pageTitle": "利用者:<1><0></0></1>Eana Hufwe",
            "barTitle": "利用者:Eana Hufwe",
            "pageDesc": "Eana の利用者ページです。<2>ウィキペディア・ユーザーボックス</2>にインスパイアされたシンプルかつラフな「Eana について」のページです。",
            "langSwitcher": "言語の切り替え",
            "footer": "User page by <1>Eana Hufwe</1>. <3>GitHub</3>.",
            "hidden": {
                "line2": {
                    "unauth": "ログインして、もっとマス目を開けるかどうかを確認しましょう。",
                    "authed": "残念ながら、Eana はあなたとお会いしたことがないようでした。勘違いだと思いましたら、是非ご一報ください。"
                },
                "line1": "{{count}} マスが表示されていません。"
            },
        }
    },
    zh: {
        translations: {
            "goToTop": "返回顶部",
            "pageTitle": "用户:<1><0></0></1>Eana Hufwe",
            "barTitle": "用户:Eana Hufwe",
            "pageDesc": "Eana 的用户页。一个简单、粗糙的关于页面，启发自<2>维基百科用户框</2>。",
            "langSwitcher": "切换语言",
            "footer": "User page by <1>Eana Hufwe</1>. <3>GitHub</3>.",
            "hidden": {
                "line2": {
                    "unauth": "登录试试，看看是否可以显示更多信息。",
                    "authed": "很遗憾，看起来 Eana 似乎没有和你见过面。如果你觉得这是个错误，请告诉我。"
                },
                "line1": "这里隐藏了 {{count}} 个条目。"
            },
        }
    },
    "08n": {
        translations: {
            "pageTitle": "Saryu:<1><0></0></1>Eana Hufwe",
            "barTitle": "Saryu:Eana Hufwe",
            "pageDesc": "Saryu puk Eanä. Teri-puk afyin aekxtxu, slantire si <2>Wikipedia saryu-yì</2>l.",
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",

        // have a common namespace used around the full app
        ns: ["translations"],
        defaultNS: "translations",

        // keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

i18n.on("languageChanged", (lang: string) => {
    document.documentElement.lang = lang;
})

export default i18n;