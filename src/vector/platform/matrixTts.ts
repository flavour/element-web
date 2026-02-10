/*
Copyright 2026 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

const SENTENCE_BOUNDARY = /(?<=[.!?])\s+/;

function normalizeText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

function chunkByMaxLength(text: string, maxChunkSize: number): string[] {
    const chunks: string[] = [];

    for (let offset = 0; offset < text.length; offset += maxChunkSize) {
        const chunk = text.slice(offset, offset + maxChunkSize).trim();
        if (chunk.length > 0) {
            chunks.push(chunk);
        }
    }

    return chunks;
}

export function splitTextForTts(text: string, maxChunkSize: number): string[] {
    const normalized = normalizeText(text);
    if (!normalized) {
        return [];
    }

    const safeMaxChunkSize = Math.max(1, Math.floor(maxChunkSize));
    const sentenceChunks = normalized.split(SENTENCE_BOUNDARY).map((segment) => segment.trim());

    const chunks: string[] = [];
    for (const sentence of sentenceChunks) {
        if (!sentence) {
            continue;
        }

        if (sentence.length <= safeMaxChunkSize) {
            chunks.push(sentence);
            continue;
        }

        chunks.push(...chunkByMaxLength(sentence, safeMaxChunkSize));
    }

    return chunks;
}
