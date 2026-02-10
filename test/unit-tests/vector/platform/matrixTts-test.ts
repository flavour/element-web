/*
Copyright 2026 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { splitTextForTts } from "../../../../src/vector/platform/matrixTts";

describe("splitTextForTts", () => {
    it("splits by sentence boundaries when possible", () => {
        const segments = splitTextForTts("Hello world. How are you today?", 120);
        expect(segments).toEqual(["Hello world.", "How are you today?"]);
    });

    it("forces chunk boundaries when punctuation is missing", () => {
        const segments = splitTextForTts("abcdefghij", 4);
        expect(segments).toEqual(["abcd", "efgh", "ij"]);
    });

    it("trims and drops empty segments", () => {
        const segments = splitTextForTts("   One.   \n\n  Two.   ", 120);
        expect(segments).toEqual(["One.", "Two."]);
    });
});
