(function() {
    const getEnabledElement = () => {
        return window.document.getElementById('enabled');
    };

    const getBlockSettingsElement = () => {
        return window.document.getElementById('block-settings');
    };

    const save = () => {
        const enabled = getEnabledElement().checked;
        const blockSettings = getBlockSettingsElement().value;
        chrome.storage.sync.set({'enabled': enabled});
        chrome.storage.sync.set({'blockSettings': blockSettings});
    };

    const load = () => {
        chrome.storage.sync.get(['enabled', 'blockSettings'], items => {
            if (items['enabled'] !== undefined) {
                getEnabledElement().checked = items['enabled'];
            }
            if (items['blockSettings'] !== undefined) {
                getBlockSettingsElement().value = items['blockSettings'];
            }
        });
    };

    const listenEvents = () => {
        getEnabledElement().addEventListener('change', () => {
            save();
        });
        getBlockSettingsElement().addEventListener('change', () => {
            save();
        });
        chrome.storage.onChanged.addListener(() => {
            load();
        });
    };

    const onLoad = () => {
        load();
        listenEvents();
    };

    window.onload = onLoad;
}());
