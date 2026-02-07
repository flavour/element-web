/*
Copyright 2026 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only OR GPL-3.0-only OR LicenseRef-Element-Commercial
Please see LICENSE files in the repository root for full details.
*/

import { defaultBindingsProvider } from "../../src/KeyBindingsDefaults";
import SettingsStore from "../../src/settings/SettingsStore";
import { KeyBindingAction } from "../../src/accessibility/KeyboardShortcuts";
import { Key } from "../../src/Keyboard";

describe("KeyBindingsDefaults", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("adds Alt+Enter as newline when Enter sends", () => {
        jest.spyOn(SettingsStore, "getValue").mockReturnValue(false);

        const bindings = defaultBindingsProvider.getMessageComposerBindings();

        expect(bindings).toContainEqual({
            action: KeyBindingAction.NewLine,
            keyCombo: {
                key: Key.ENTER,
                altKey: true,
            },
        });
    });
});
