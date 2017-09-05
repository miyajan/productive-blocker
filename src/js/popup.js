(function () {
    const getEnabledElement = () => {
        return window.document.getElementById('enabled');
    };

    const save = () => {
        const enabled = getEnabledElement().checked;
        chrome.storage.sync.set({'enabled': enabled});
    };

    const load = () => {
        chrome.storage.sync.get(['enabled'], items => {
            if (items['enabled'] !== undefined) {
                getEnabledElement().checked = items['enabled'];
            }
        });
    };

    const setupLinks = () => {
        const optionsEl = document.getElementById('options');
        optionsEl.onclick = () => {
            chrome.tabs.create({url: chrome.extension.getURL('options.html'), selected: true});
        };
    };

    const listenEvents = () => {
        getEnabledElement().addEventListener('change', () => {
            save();
        });
        chrome.storage.onChanged.addListener(() => {
            load();
        });
    };

    const onLoad = () => {
        setupLinks();
        load();
        listenEvents();
    };

    window.onload = onLoad;
}());
