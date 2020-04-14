import fs from "fs";
import path from "path";
import YAML from "yaml";
import crypto from "crypto";

type LangString = {
    en: string,
    "zh"?: string,
    "ja"?: string,
    "08n"?: string
};

type Item = {
    desc?: LangString,
    details?: LangString,
    level: number,
    leftImage?: string,
    rightImage?: string,
    leftComponent?: string,
    rightComponent?: string,
};

type Category = {
    name: LangString,
    items: Item[]
    filtered?: number
};

type Data = {
    trusted: {
        [id: number]: number
    },
    entries: Category[],
    token: string
};

type AuthInfo = {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    photo_url: string,
    auth_date: number,
    hash: string
};

type VerifiedEntriesOutcome = {
    data: Category[],
    verified: AuthInfo | null,
};

function filterEntries(entries: Category[], maxLevel: number = 100): Category[] {
    const filtered: Category[] = [];
    for (const i of entries) {
        const items = i.items.filter((v) => v.level <= maxLevel);
        if (items.length > 0) {
            filtered.push({
                name: i.name,
                filtered: i.items.length - items.length,
                items: items
            });
        }
    }
    return filtered;
}

function verifyAuthInfo(token: string, authInfo: AuthInfo): number | null {
    const hash = authInfo.hash;
    const sortedKeys = Object.keys(authInfo).filter((v) => v !== "hash").sort() as (keyof AuthInfo)[];
    const payload = sortedKeys.map((k) => `${k}=${authInfo[k]}`).join("\n");
    const key = crypto.createHash("sha256").update(token, "utf8").digest();
    const calculated = crypto.createHmac("sha256", key).update(payload).digest("hex");
    if (calculated.toLowerCase() === hash.toLowerCase()) {
        return authInfo.id;
    }
    return null;
}

export function getEntriesWithVerification(authInfo: AuthInfo | undefined = undefined): VerifiedEntriesOutcome {
    const file = fs.readFileSync(path.join(__dirname, "static", "data.yaml"), "utf8");
    const data: Data = YAML.parse(file);
    const id = authInfo === undefined ? null : verifyAuthInfo(data.token, authInfo);
    if (id === null) {
        return {
            data: filterEntries(data.entries),
            verified: null
        };
    }
    const level: number | undefined = data.trusted[id];
    if (level === undefined) {
        return {
            data: filterEntries(data.entries),
            verified: authInfo
        };
    } else {
        return {
            data: filterEntries(data.entries, level),
            verified: authInfo
        };
    }
}