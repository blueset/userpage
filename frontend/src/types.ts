export type LangString = {
    en: string,
    "zh"?: string,
    "ja"?: string,
    "08n"?: string
};

export type ItemType = {
    desc?: LangString,
    details?: LangString,
    level: number,
    leftImage?: string,
    rightImage?: string,
    leftComponent?: string,
    rightComponent?: string,
};

export type CategoryType = {
    name: LangString,
    items: ItemType[]
    filtered?: number
};

export type Data = {
    trusted: {
        [id: number]: number
    },
    entries: CategoryType[],
    token: string
};

export type AuthInfo = {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    photo_url: string,
    auth_date: number,
    hash: string
};

export type VerifiedEntriesOutcome = {
    data: CategoryType[],
    verified: AuthInfo | null,
};