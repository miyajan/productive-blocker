setInterval(() => {
    const padding = value => {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };

    chrome.storage.sync.get(['enabled', 'blockSettings'], items => {
        if (items['enabled'] && items['blockSettings'] !== undefined) {
            const lines = items['blockSettings'].split('\n');
            lines.forEach(line => {
                const columns = line.split(' ');
                const url = columns[0];
                if (url === location.href) {
                    const currentDate = new Date();
                    const currentHours = currentDate.getHours();
                    const currentMinutes = currentDate.getMinutes();
                    const currentTime = Number('' + padding(currentHours) + padding(currentMinutes));

                    const times = columns[1].split(',');
                    times.forEach(time => {
                        const pair = time.split('-');
                        const startTime = pair[0];
                        const endTime = pair[1];
                        if (startTime <= currentTime && currentTime <= endTime) {
                            location.href = chrome.extension.getURL('blocked.html') + '?url=' + encodeURIComponent(location.href);
                        }
                    });
                }
            });
        }
    });
}, 1000);
