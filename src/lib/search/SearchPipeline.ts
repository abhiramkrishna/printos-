import Fuse from "fuse.js";
import type { Product } from "../../types";

// --- 1. Query Processing Layer ---

// A. Spell Correction (Levenshtein Distance)
const levenshteinDistance = (s: string, t: string): number => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++) {
            arr[i][j] =
                i === 0
                    ? j
                    : Math.min(
                        arr[i - 1][j] + 1,
                        arr[i][j - 1] + 1,
                        arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                    );
        }
    }
    return arr[t.length][s.length];
};

// Common keywords for this specific e-commerce store
const knownKeywords = [
    "iphone", "samsung", "apple", "hoodie", "tshirt", "t-shirt", "mug", "bottle", "vinyl",
    "sticker", "acrylic", "canvas", "brochure", "flyer", "business", "card", "notebook",
    "keychain", "poster", "packaging", "mailer"
];

const correctSpelling = (word: string): string => {
    let bestMatch = word;
    let minDistance = Infinity;
    for (const keyword of knownKeywords) {
        const dist = levenshteinDistance(word.toLowerCase(), keyword);
        // Allow up to 2 typos for a word to be auto-corrected, provided it's the closest match
        if (dist > 0 && dist <= 2 && dist < minDistance) {
            bestMatch = keyword;
            minDistance = dist;
        }
    }
    return bestMatch;
};

// B. Synonym Expansion
const synonyms: Record<string, string> = {
    "earbuds": "earphones",
    "tv": "television",
    "laptop": "notebook",
    "pc": "computer",
    "tee": "t-shirt",
    "shirt": "t-shirt",
    "cups": "mug"
};

const expandSynonyms = (word: string): string => {
    return synonyms[word.toLowerCase()] || word;
};

// C. Stop Word Removal
const stopWords = new Set(["with", "and", "or", "the", "a", "an", "for", "in", "of", "on", "to"]);

const removeStopWords = (word: string): boolean => {
    return !stopWords.has(word.toLowerCase());
};

export const processQuery = (rawQuery: string): string => {
    if (!rawQuery.trim()) return "";

    const tokens = rawQuery.trim().split(/\s+/);

    const processedTokens = tokens
        .filter(removeStopWords)
        .map(word => {
            let corrected = correctSpelling(word);
            return expandSynonyms(corrected);
        });

    return processedTokens.join(" ");
};

// --- 2 & 3. Search Engine & Ranking Engine ---

export const executeSearchFlow = (query: string, data: Product[]): Product[] => {
    if (!query.trim()) return data;

    // 1. Process Query
    const processedQuery = processQuery(query);
    if (!processedQuery) return []; // If query was only stop words

    // 2. Search Engine (Fuse.js)
    // Provides Full Text Matching and Fuzzy Search capabilities
    const fuse = new Fuse(data, {
        keys: [
            { name: "name", weight: 0.5 },
            { name: "category", weight: 0.2 },
            { name: "subCategory", weight: 0.2 },
            { name: "tags", weight: 0.1 }
        ],
        includeScore: true,
        threshold: 0.3, // Fuzzy search tolerance
        ignoreLocation: true // Search anywhere in the text
    });

    const results = fuse.search(processedQuery);

    // 3. Ranking Engine
    // Adjust base Fuse score by combining Relevance Score with Product Rating & Popularity (CTR/Conversion proxies)
    const rankedResults = results.sort((a, b) => {
        // Extract base relevance score from Fuse (0.0 is exact match, 1.0 is no match)
        let aScore = a.score || 1;
        let bScore = b.score || 1;

        // We integrate business metrics (e.g. rating out of 5.0) to slightly boost highly rated/popular products
        const aRating = parseFloat(a.item.rating || "0");
        const bRating = parseFloat(b.item.rating || "0");

        // Normalize rating: a 5.0 rating improves (lowers) the score by 0.05
        aScore -= (aRating * 0.01);
        bScore -= (bRating * 0.01);

        return aScore - bScore;
    });

    // 4. Result API / Post-Processing
    // Returns raw product array to Frontend UI
    return rankedResults.map(result => result.item);
};
