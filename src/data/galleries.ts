
export interface GalleryImage {
    id: number;
    filename: string;
    title: string;
    category: string;
    path: string;
}

export const cleanTitle = (filename: string): string => {
    return filename
        .replace(/\.(png|jpg|jpeg|gif|webp)$/i, '')
        .replace(/\s*\(convert\.io\)\s*/gi, '')
        .replace(/\bmax\b/gi, '')
        .replace(/\betf\b/gi, '')
        .replace(/-?primer/gi, '')
        .replace(/flash\s*card\s*-?\s*/gi, '')
        .replace(/\bzome\b/gi, 'zone')
        .replace(/\s*-?\s*\d{8}\s*-?\s*/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^-\s*/, '')
        .replace(/\s*-\s*$/, '');
};

export interface GalleryConfig {
    id: string;
    titleKey: string;
    subtitleKey: string;
    basePaths: string[];
    images: { [key: string]: string[] };
    getCategory: (filename: string, t: (key: string) => string) => string;
}

export const GALLERY_CONFIGS: { [key: string]: GalleryConfig } = {
    'session-1': {
        id: 'session-1',
        titleKey: 'gallery.title',
        subtitleKey: 'gallery.subtitle',
        basePaths: [
            '/images/course/ProTrader_Systems  - Session 1 - Other Screenshots/',
            '/images/course/ProTrader_Systems  - Session 1 - Templates, indicators, pdf, screenshots/ETF S&P MOE Flash Cards/',
            '/images/course/ProTrader_Systems  - Session 1 - Templates, indicators, pdf, screenshots/ETF REMOE Flash Cards/'
        ],
        images: {
            other: [
                '1 - max etf-primer components and shifts - 20200615 (convert.io).png',
                '2 - trend mode - 20200615 - example 1 (convert.io).png',
                '3 - trend mode - 20200615 - example 2 (convert.io).png',
                '4 - counter-trend mode - 20200615 - example 1 (convert.io).png',
                '5 - counter-trend mode - 20200615 - example 2 (convert.io).png',
                '6 - consolidation zome mode - 20200615 - example 1 (convert.io).png',
                '7 - consolidation zome mode - 20200615 - example 2 (convert.io).png',
                '8 - choppy mode - 20200615 - example 1 (convert.io).png',
                '9 - choppy mode - 20200615 - example 2 (convert.io).png',
                '10 - choppy mode - 20200615 - example 3 (convert.io).png',
                '11 - spaghetti zone - 20200615 - example 1 (convert.io).png',
                '12 - spaghetti zone - 20200615 - example 2 (convert.io).png',
                '13 - spaghetti zone - 20200615 - example 3 (convert.io).png',
                '14 - spaghetti zone - 20200615 - example 4 (convert.io).png',
                '15 - the movements the classic max primer looks for - 20200615 - example 1 (convert.io).png',
                '16 - the movements the classic max primer looks for - 20200615 - example 2 (convert.io).png',
                '17 - poor price action - 20200615 - example 1 (convert.io).png',
                '18 - missed ample move - 20200615 - example 1 (convert.io).png',
                '19 - trend vs counter-trend - 20200615 - example 1 (convert.io).png',
                '20 - trend vs counter-trend - 20200615 - example 2 (convert.io).png',
                '21 - trend vs counter-trend - 20200615 - example 3 (convert.io).png',
                '22 - the movements the max etf-primer looks for - 20200615 - example 1 (convert.io) (1).png',
                '23 - the movements the max etf-primer looks for - 20200615 - example 2 (convert.io).png',
                '24 - etf s&p moe - 20200615 - example 1 (convert.io).png',
                '25 - etf s&p moe - 20200615 - example 2 (convert.io).png',
                '26 - etf s&p moe - 20200615 - example 3 (convert.io).png',
                '27 - etf s&p moe - 20200615 - example 4 (convert.io).png',
                '28 - etf remoe moe - 201200615 - example 1 (convert.io).png',
                '29 - etf remoe moe - 201200615 - example 2 (convert.io).png',
                '30 - etf remoe moe - 201200615 - example 3 (convert.io).png',
                '31 - etf remoe moe - 201200615 - example 4 (convert.io).png',
                '32 - etf remoe moe - 201200615 - example 5 (convert.io).png',
            ],
            spMoe: [
                '1 - etf s&p moe - flash card - part 1 - entry setup bar (convert.io).png',
                '1 - etf s&p moe - flash card - part 2 - entry trigger bar (convert.io).png',
                '1 - etf s&p moe - flash card - part 3 - movement (convert.io).png',
                '2 - etf s&p moe - flash card - part 1 - entry setup bar (convert.io).png',
                '2 - etf s&p moe - flash card - part 2 - entry trigger bar (convert.io).png',
                '2 - etf s&p moe - flash card - part 3 - movement (convert.io).png',
                '3 - etf s&p moe - flash card - part 1 - entry setup bar (convert.io).png',
                '3 - etf s&p moe - flash card - part 2 - entry trigger bar (convert.io).png',
                '3 - etf s&p moe - flash card - part 3 - movement (convert.io).png',
                '4 - etf s&p moe - flash card - part 1 - entry setup bar (convert.io).png',
                '4 - etf s&p moe - flash card - part 2 - entry trigger bar (convert.io).png',
                '4 - etf s&p moe - flash card - part 3 - movement (convert.io).png',
            ],
            remoe: [
                '1 - remoe - flash card - part 1 - entry setup bar.png',
                '1 - remoe - flash card - part 2 - entry trigger bar.png',
                '1 - remoe - flash card - part 3 - movement.png',
                '2 - remoe - flash card - part 1 - entry setup bar.png',
                '2 - remoe - flash card - part 2 - entry trigger bar.png',
                '2 - remoe - flash card - part 3 - movement.png',
                '3 - remoe - flash card - part 1 - entry setup bar.png',
                '3 - remoe - flash card - part 2 - entry trigger bar.png',
                '3 - remoe - flash card - part 3 - movement.png',
                '4 - remoe - flash card - part 1 - entry setup bar.png',
                '4 - remoe - flash card - part 2 - entry trigger bar.png',
                '4 - remoe - flash card - part 3 - movement.png',
                '5 - remoe - flash card - part 1 - entry setup bar.png',
                '5 - remoe - flash card - part 2 - entry trigger bar.png',
                '5 - remoe - flash card - part 3 - movement.png',
            ]
        },
        getCategory: (filename: string, t: (k: string) => string) => {
            const lower = filename.toLowerCase();
            if (lower.includes('s&p moe')) return 'S&P MOE';
            if (lower.includes('remoe')) return 'REMOE';
            return t('gallery.category.price_modes');
        }
    },
    'session-2': {
        id: 'session-2',
        titleKey: 'gallery.title',
        subtitleKey: 'gallery.subtitle',
        basePaths: [
            '/images/course/Session 2/ProTrader_Systems - Session 2 - Other Screenshots/',
            '/images/course/Session 2/ProTrader_Systems - Session 2 - Flash Cards/'
        ],
        images: {
            other: [
                '1 - different types of ts and bs - 20200629 - example 1 (convert.io).png',
                '2 - different types of ts and bs - 20200629 - example 2 (convert.io).png',
                '3 - exit technique with storsi ts-bs - 20200629 - example 1 (convert.io).png',
                '4 - exit technique with storsi ts-bs - 20200629 - example 2 (convert.io).png',
                '5 - exit technique with storsi ms - ws - 20200629 - example 1 (convert.io).png',
                '6 - exit technique with storsi ms - ws - 20200629 - example 2 (convert.io).png',
                '7 - exit technique with storsi divs - 20200629 - example 1 (convert.io).png',
                '8 - exit technique with storsi divs - 20200629 - example 2 (convert.io).png',
                '9 - exit technique with storsi divs - 20200629 - example 3 (convert.io).png',
                '10 - exit technique with storsi divs - 20200629 - example 4 (convert.io).png',
                '11 - exit technique with lb - 20200629 - example 1 (convert.io).png',
                '12 - exit technique with lb - 20200629 - example 2 (convert.io).png',
                '13 - exit technique with lb - 20200629 - example 3 (convert.io).png',
                '14 - exit technique with hb rejection - 20200629 - example 1 (convert.io).png',
                '15 - exit technique with hb rejection - 20200629 - example 2 (convert.io).png',
                '16 - exit technique with tp - 20200629 - example 1 (convert.io).png',
                '17 - exit technique with tp - 20200629 - example 2 (convert.io).png',
                '18 - exit technique with etf trend reversal - 20200629 - example 1 (convert.io).png',
                '19 - exit technique with etf trend reversal - 20200629 - example 2 (convert.io).png',
                '20 - putting it all together - how to mark a chart - 20200629 - example 1 (convert.io).png',
                '21 - putting it all together - how to mark a chart - 20200629 - example 2 (convert.io).png',
                '22 - smoothed movement - good one - 20200629 - example 1 (convert.io).png',
                '23 - not smoothed movement - not good one - 20200629 - example 1 (convert.io).png',
            ],
            flashCards: [
                '3 - exit setup with ts - bs - part 1 - exit setup bar.png',
                '3 - exit setup with ts - bs - part 2 - exit trigger bar.png',
                '3 - exit setup with ts - bs - part 3 - movement.png',
                '4 - exit setup with ts - bs - part 1 - exit setup bar.png',
                '4 - exit setup with ts - bs - part 2 - exit trigger bar.png',
                '4 - exit setup with ts - bs - part 3 - movement.png',
                '5 - exit setup with ms - ws - part 1 - exit setup bar.png',
                '5 - exit setup with ms - ws - part 2 - exit trigger bar.png',
                '5 - exit setup with ms - ws - part 3 - movement.png',
                '6 - exit setup with ms - ws - part 1 - exit setup bar.png',
                '6 - exit setup with ms - ws - part 2 - exit trigger bar.png',
                '6 - exit setup with ms - ws - part 3 - movement.png',
                '7 - exit setup with div - part 1 - exit setup bar.png',
                '7 - exit setup with div - part 2 - exit trigger bar.png',
                '7 - exit setup with div - part 3 - movement.png',
                '8 - exit setup with div - part 1 - exit setup bar.png',
                '8 - exit setup with div - part 2 - exit trigger bar.png',
                '8 - exit setup with div - part 3 - movement.png',
                '9 - exit setup with e.div - part 1 - exit setup bar.png',
                '9 - exit setup with e.div - part 2 - exit trigger bar.png',
                '9 - exit setup with e.div - part 3 - movement.png',
                '10 - exit setup with e.div - part 1 - exit setup bar.png',
                '10 - exit setup with e.div - part 2 - exit trigger bar.png',
                '10 - exit setup with e.div - part 3 - movement.png',
                '11 - exit setup with lb - part 1 - exit setup bar.png',
                '11 - exit setup with lb - part 2 - exit no trigger bar.png',
                '11 - exit setup with lb - part 3 - movement.png',
                '12 - exit setup with lb - part 1 - exit setup bar.png',
                '12 - exit setup with lb - part 2 - exit trigger bar.png',
                '12 - exit setup with lb - part 3 - movement.png',
                '13 - exit setup with lb - part 1 - exit setup bar.png',
                '13 - exit setup with lb - part 2 - exit trigger bar.png',
                '13 - exit setup with lb - part 3 - movement.png',
                '14 - exit setup with tp - part 1 - exit setup bar.png',
                '14 - exit setup with tp - part 2 - exit trigger bar.png',
                '14 - exit setup with tp - part 3 - movement.png',
                '15 - exit setup with tp - part 1 - exit setup bar.png',
                '15 - exit setup with tp - part 2 - exit trigger bar.png',
                '15 - exit setup with tp - part 3 - movement.png',
                '16 - exit setup with hb rej - part 1 - exit setup bar.png',
                '16 - exit setup with hb rej - part 2 - exit trigger bar.png',
                '16 - exit setup with hb rej - part 3 - movement.png',
                '17 - exit setup with hb rej - part 1 - exit setup bar.png',
                '17 - exit setup with hb rej - part 2 - exit trigger bar.png',
                '17 - exit setup with hb rej - part 3 - movement.png',
                '18 - exit setup with etr - part 1 - exit setup bar.png',
                '18 - exit setup with etr - part 2 - exit trigger bar.png',
                '18 - exit setup with etr - part 3 - movement.png',
                '19 - exit setup with etr - part 1 - exit setup bar.png',
                '19 - exit setup with etr - part 2 - exit trigger bar.png',
                '19 - exit setup with etr - part 3 - movement.png',
            ]
        },
        getCategory: (filename: string, t: (k: string) => string) => {
            const lower = filename.toLowerCase();
            if (lower.includes('ts') && lower.includes('bs')) return 'Exit: TS-BS';
            if (lower.includes('ms') && lower.includes('ws')) return 'Exit: MS-WS';
            if (lower.includes('e.div') || lower.includes('divs') || lower.includes('div')) return 'Exit: Divergence';
            if (lower.includes('lb')) return 'Exit: LB';
            if (lower.includes('hb') || lower.includes('rejection')) return 'Exit: HB Rejection';
            if (lower.includes('tp')) return 'Exit: TP';
            if (lower.includes('etr') || lower.includes('trend reversal')) return 'Exit: Trend Reversal';
            if (lower.includes('smoothed')) return 'Smoothed Movement';
            if (lower.includes('how to mark')) return 'Chart Marking';
            return 'Other';
        }
    }
};
